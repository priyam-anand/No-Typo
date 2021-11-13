const express = require("express");
const app = express();
const socket = require('socket.io');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config({ path: './config.env' })
const PORT = process.env.PORT;

const expressServer = app.listen(PORT);
const io = socket(expressServer, {
    cors: {
        origin: ["http://localhost:3000"]
    }
});

require('./DB/connect.js');

const Game = require("./Models/Game");

const url = "http://api.quotable.io/random?minLength=100&maxLength=140";

const getData = async () => {
    const res = await axios.get(url);
    return res.data.content.split(" ");
}

const startGameClock = async (gameId) => {
    let game = await Game.findById(gameId);
    game.startTime = new Date().getTime();
    game = await game.save();

    let time = 12;
    let timerId = setInterval(function gameIntervalFunc(){
        if(time >=0)
        {
            const formatTime = calculateTime(time);
            io.to(gameId).emit('timer',{countDown:formatTime,msg:"Time remaining"});
            time--;
        }
        else
        {
            (async () => {
                let endTime = new Date().getTime();
                let game = await Game.findById(gameId);
                let {startTime} = game;
                game.isOver = true;
                game.players.forEach((player,index) => {
                    if(player.WPM === -1)
                    {
                        game.players[index].WPM = calculateWPM(endTime,startTime,player);
                    }
                });
                game = await game.save();
                io.to(gameId).emit('update-game',game);
                clearInterval(timerId);
            })();
        }
        return gameIntervalFunc;
    }(),1000);
}

const calculateWPM = (endTime,startTime,player) => {
    let numOfWords = player.currentWordIndex;
    const timeInSec = (endTime - startTime)/1000;
    const timeInMin = timeInSec/60;

    const WPM = Math.floor(numOfWords/timeInMin);
    return WPM
}

const calculateTime = (time) => {
    let minutes = Math.floor(time/60);
    let sec = time%60;

    return `${minutes}:${sec<10?'0'+sec:sec}`;
}

io.on('connect', (socket) => 
{
    socket.on('create-game', async (nickName) => {
        try {
            const quotableData = await getData();
            let game = new Game();
            game.words = quotableData;
            let player = {
                socketId: socket.id,
                isPartyLeader: true,
                nickName,
            }
            game.players.push(player);
            game = await game.save();

            const gameId = game._id.toString();
            socket.join(gameId);

            io.to(gameId).emit('update-game', game);
        } catch (err) {
            console.log(err)
        }
    });
    socket.on('user-input', async ({userInput,gameId}) => {
        try {
            let game = await Game.findById(gameId);
            if(!game.isOpen && !game.isOver){
                let player = game.players.find(player => player.socketId == socket.id);
                let word = game.words[player.currentWordIndex];
                if(word === userInput){
                    player.currentWordIndex ++;
                    if(player.currentWordIndex !== game.words.length){
                        game=await game.save();
                        io.to(gameId).emit('update-game',game);
                    }
                    else{
                        let endTime = new Date().getTime();
                        let {startTime} = game;
                        player.WPM = calculateWPM(endTime,startTime,player);
                        game = await game.save();
                        socket.emit("done");
                        io.to(gameId).emit('update-game',game);
                    }
                }
            }
        }catch(err){
            console.log(err);
        }
    });
    socket.on('join-game', async ({ gameId: _id, nickName }) => {
        try {
            let game = await Game.findById(_id);
            if (game.isOpen) {
                const gameId = game._id.toString();
                socket.join(gameId);
                let player = {
                    socketId: socket.id,
                    isPartyLeader: false,
                    nickName,
                }
                game.players.push(player);
                game = await game.save();
                io.to(gameId).emit('update-game', game);

            }
        } catch (err) {
            console.log(err);
        }
    })
    socket.on('timer', async ({ playerId, gameId }) => {
        let countDown = 5;
        let game = await Game.findById(gameId);
        let player = game.players.id(playerId);

        if (player.isPartyLeader) {
            let TimerId = setInterval(async () => {
                if (countDown >= 0) {
                    io.to(gameId).emit('timer', { countDown, msg: "Starting Game in" });
                    countDown--;
                }
                else {
                    game.isOpen = false;
                    game = await game.save();
                    io.to(gameId).emit('update-game',game);
                    startGameClock(gameId);
                    clearInterval(TimerId);
                }
            }, 1000);
        }
    })
});

