import React from 'react'
import { Link } from 'react-router-dom';

const GameMenu = () => {
    return (
        <>
            <div className="text-center">
                <h1 className="my-3">Welcome To Typeracer</h1>
                <div className="btns mt-4">
                    <Link to={"/game/join"} className="btn btn-primary btn-primary-lg mx-3">
                        Join Game
                    </Link>
                    <Link to={"/game/create"} className="btn btn-primary btn-primary-lg mx-3">
                        Create Game
                    </Link>
                </div>
            </div>
        </>
    )
}

export default GameMenu
