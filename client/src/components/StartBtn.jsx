import React, { useState } from 'react'
import socket from '../socketConfig'
const StartBtn = ({ player, gameId }) => {

    const [show, setShow] = useState(true);
    const { isPartyLeader } = player;

    const handleClick = (e) => {
        socket.emit('timer',{playerId:player._id,gameId});
        setShow(false);
    }

    return (
        <>
            {(isPartyLeader && show)
                ? <button type="button" onClick={handleClick} className="btn btn-primary">
                    Start Game
                </button>
                :<></>
            }
        </>
    )
}

export default StartBtn
