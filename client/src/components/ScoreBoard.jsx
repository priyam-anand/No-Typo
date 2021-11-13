import React from 'react'

const ScoreBoard = ({players}) => {
    
    const getScoreBoard = (players) => {
        const scoreBoard = players.filter(player => player.WPM !== -1);
        return scoreBoard.sort((a,b) => a.WPM > b.WPM ? -1 : 1);
    }

    const scoreBoard = getScoreBoard(players);
    if(scoreBoard.length === 0)
        return null;
    return (
        <>
            <table className="table table-striped my-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">user</th>
                        <th scope="col">WPM</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        scoreBoard.map((player,index)=>{
                            return(
                                <tr>
                                    <th scope="row">{index+1}</th>
                                    <td>{player.nickName}</td>
                                    <td>{player.WPM}</td>
                                </tr>
                            ) 
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ScoreBoard
