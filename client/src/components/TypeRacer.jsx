import React from 'react'
import { Redirect } from "react-router-dom"
import CountDown from "./CountDown";
import StartBtn from "./StartBtn"
import socket from "../socketConfig"
import DisplayWords from './DisplayWords';
import UserInput from './UserInput';
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
                {game.isOpen
                    ? <></>
                    : <DisplayWords words={words} player={player} />}
                <UserInput isOpen={game.isOpen} isOver={game.isOver} gameId={_id}/>
            </div>
        </>
    )
}

export default TypeRacer
