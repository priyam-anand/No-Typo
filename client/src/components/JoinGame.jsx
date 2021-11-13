import React, { useState } from 'react'
import socket from "../socketConfig";

const JoinGame = () => {

    const [nickName, setNickName] = useState("");
    const [gameId, setGameId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(nickName);
        console.log(gameId);
        socket.emit('join-game', { nickName: nickName, gameId: gameId });

    }

    return (
        <>
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm-8">
                    <h1 className="text-center">
                        Join Game
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nickname">Your Nickname</label>
                            <input type="text" name="nickname" value={nickName} onChange={e => setNickName(e.target.value)} placeholder="Enter your NickName" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gameId">Game Id</label>
                            <input type="text" name="gameId" value={gameId} onChange={e => setGameId(e.target.value)} placeholder="Enter GameId" className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
                <div className="col-sm"></div>
            </div>
        </>
    )
}

export default JoinGame
