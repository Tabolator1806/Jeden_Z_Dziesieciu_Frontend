function showPlayers(data){
    const player = `
        <div class="player">
            <img src="http://localhost:3000/upload/${data.name}.png" class="playerImage" width="20px" height="20px"/>
            <p class="playerName">${data.name}</p>
        </div>
    `
    return player
}
let playerList = []
async function getPlayersLong(){
    let response = await fetch("http://localhost:3000/playerList")
    if (response.status == 502){
        await getPlayersLong()
    }
    else if (response.status != 200){
        console.log(response.statusText)
        setTimeout(() => {
            getPlayersLong()
        }, 1000);
    }
    else{
        let message = await response.text()
        if (playerList!=message){
            playerList=message
            playerListNormalised = JSON.parse(playerList)
            players.innerHTML=""
            playerListNormalised.forEach(player=>{
                players.innerHTML+=showPlayers(player)
                console.log(player)
            })
        }
        getPlayersLong()
        
    }
}
getPlayersLong()