import React, {useState, useEffect} from 'react'
import './table.css'

const table = () => {
    const [gameData, setGameData] = useState([])

    useEffect(() => {
        async function getDayGames(date) {
            const response = await fetch(`https://www.balldontlie.io/api/v1/games/?start_date=${date}&end_date=${date}`);
            const data = await response.json()
            const ids = data.data.map(game => game.id)

            const dayGameLogs = []
            for (let i = 0; i < ids.length; i++) {
                const test = await fetch(`https://www.balldontlie.io/api/v1/stats/?game_ids[]=${ids[i]}&per_page=100`)
                const data1 = await test.json()
                const newData1 = data1.data.filter(player => player.min !== '00' && player.min !== '00:00' && player.min !== '0' && player.min !== '0:00' && player.min !== '')
                dayGameLogs.push(newData1)
            }
            setGameData(dayGameLogs)
            console.dir(dayGameLogs, {depth: null})
        }
        getDayGames('2019-03-21')
    }, [])

    const sortedGameData = gameData.flat().sort((a, b) => {
        const aScore = a.pts + a.reb * 1.2 + a.ast * 1.5 + a.stl * 3 + a.blk * 3 - a.turnover;
        const bScore = b.pts + b.reb * 1.2 + b.ast * 1.5 + b.stl * 3 + b.blk * 3 - b.turnover;
        return bScore - aScore;
      });
      

    
    
    return (
        <div className="table-container">
          {gameData.length > 0 && 
          <table className="data-table">
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Minutes</th>
                    <th>Points</th>
                    <th>Rebounds</th>
                    <th>Assists</th>
                    <th>Steals</th>
                    <th>Blocks</th>
                    <th>Turnovers</th>
                    <th>Fantasy Score</th>
                </tr>
            </thead>
                <tbody>
                    {/* {gameData.flat().map((player, index) => ( */}
                    {sortedGameData.map((player, index) => (
                        <tr key={index}>
                            <td>{player.player.first_name} {player.player.last_name}</td>
                            <td>{player.min}</td>
                            <td>{player.pts}</td>
                            <td>{player.reb}</td>
                            <td>{player.ast}</td>
                            <td>{player.stl}</td>
                            <td>{player.blk}</td>
                            <td>{player.turnover}</td>
                            <td>
                                {(player.pts + player.reb * 1.2 + player.ast * 1.5 + player.stl * 3 + player.blk * 3 - player.turnover).toFixed(1)}
                            </td>
                        </tr>
                        ))}
                </tbody>
            </table>
            }
        </div>
      )
  }  

export default table