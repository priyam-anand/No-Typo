import React from 'react'
import { Redirect } from "react-router-dom"
import CountDown from "./CountDown";
import StartBtn from "./StartBtn"
import socket from "../socketConfig"
import DisplayWords from './DisplayWords';
import UserInput from './UserInput';
import ProgressBar from "./ProgressBar"
import ScoreBoard from "./ScoreBoard"

const TypeRacer = ({ game }) => {

    const findPlayer = (players) => {
        for (let i = 0; i < players.length; i++) {
            if (players[i].socketId === socket.id) {
                return players[i];
            }
        }
    }

    const _id = game._id;
    const players = game.players;
    const words = game.words;
    if (_id === "")
        return <Redirect to='/' />

    const player = findPlayer(players);

    return (
        <>
            <div className="text-center">
                <CountDown />
                <StartBtn player={player} gameId={_id} />
                <br />
                {
                    game.isOpen
                    ?<div className="game-code">Game code : {game._id}</div>
                    :null
                }
                
                {game.isOpen
                    ? <></>
                    : <DisplayWords words={words} player={player} />}
                <ProgressBar players={players} player={player} wordsLength={words.length}/>
                <UserInput isOpen={game.isOpen} isOver={game.isOver} gameId={_id}/>
                <ScoreBoard players={players}/>
            </div>
        </>
    )
}

export default TypeRacer
