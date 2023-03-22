import React, {useState, useEffect} from 'react'

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
                const newData1 = data1.data.filter(player => player.min !== '00')
                dayGameLogs.push(newData1)
            }
            setGameData(dayGameLogs)
            console.dir(dayGameLogs, {depth: null})
        }
        getDayGames('2023-03-16')
    }, [])

    return (
        <div>
          {gameData.length > 0 && 
          <table>
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
                    {gameData.map((game, index) => (
                    <tr key={index}>
                        {game.map((player, index) => (
                        <React.Fragment key={index}>
                            <td>{player.player.first_name} {player.player.last_name}</td>
                            <td>{player.min}</td>
                            <td>{player.pts}</td>
                            <td>{player.reb}</td>
                            <td>{player.ast}</td>
                            <td>{player.stl}</td>
                            <td>{player.blk}</td>
                            <td>{player.turnover}</td>
                            <td>
                                {player.pts + player.reb * 1.2 + player.ast * 1.5 + player.stl * 3 + player.blk * 3 - player.turnover}
                            </td>
                        </React.Fragment>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
            }
        </div>
      )
      
  }  

export default table