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
            console.log(dayGameLogs[0][0].player.first_name)
        }
        getDayGames('2023-03-16')
    }, [])


    return (
        <div>
          {gameData.length > 0 && <p>{gameData[0][0].player.first_name + ' ' + gameData[0][0].player.last_name}</p>}
        </div>
      )
      
  }  

export default table