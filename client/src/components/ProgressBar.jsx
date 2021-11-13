import React from 'react'

const calculatePercentage = (player, wordsLength) => {
    if (player.currentWordIndex !== 0) {
        return ((player.currentWordIndex / wordsLength) * 100).toFixed(2) + "%";
    }
    return 0;
}

const ProgressBar = ({ players, player, wordsLength }) => {

    const percentage = calculatePercentage(player, wordsLength);

    return (
        <div>
            <div className="container">
                <h5 className="text-left">
                    {player.nickName}
                </h5>
                <div className="progress my-1" key={player._id}>
                    <div className="progress-bar" role="progressbar" style={{ "width": percentage }}>
                        {percentage}
                    </div>
                </div>
            </div>
            {
                players.map((playerObj) => {
                    const percentage = calculatePercentage(playerObj, wordsLength);
                    return (
                        playerObj._id !== player._id
                            ? (<div className="container">
                                <h5 className="text-left">
                                    {playerObj.nickName}
                                </h5>
                                <div className="progress my-1" key={playerObj._id}>
                                    <div className="progress-bar" role="progressbar" style={{ "width": percentage }}>
                                        {percentage}
                                    </div>
                                </div>
                            </div>)
                            : null
                    )
                })
            }
        </div>
    )
}

export default ProgressBar
