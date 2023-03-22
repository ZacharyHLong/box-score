import React, {useState, useEffect} from 'react'

const table = () => {
    const [gameData, setGameData] = useState([])

    async function getDayGames(date) {
        const response = await fetch(`https://www.balldontlie.io/api/v1/games/?start_date=${date}&end_date=${date}`);
        const data = await response.json()
        const ids = data.data.map(game => game.id)
        console.log(ids)

        const dayGameLogs = []
        for (let i = 0; i < ids.length; i++) {
            const test = await fetch(`https://www.balldontlie.io/api/v1/stats/?game_ids[]=${ids[i]}&per_page=100`)
            const data1 = await test.json()
            const newData1 = data1.data.filter(player => player.min !== '00')
            dayGameLogs.push(newData1)
        }
        console.dir(dayGameLogs, {depth: null})
        // console.log(dayGameLogs)
    }

    getDayGames('2023-03-16')



  return (
    <p></p>
  )
}

export default table