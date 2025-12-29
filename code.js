function showPlayers(data){
    
    const player = `
        <div class="player" style="transform: rotateY(${kurwiszon[0]}deg) rotate(${kurwiszon[3]}deg) scale(${kurwiszon[4]}) ; left:${kurwiszon[1]}px; top:${kurwiszon[2]}px">
            <img src="./img/ta_taka_stojakczykichuj.png" class="stojak"/>
            <img src="http://83.27.64.116:3000/upload/${data.name}.png" class="playerImage"/>
            <p class="playerName">${data.name}</p>
        </div>
    `
    if(data.button == true){
         przycisk(data)
       
    }

    return player
}
function przycisk(data){
    console.log(data)
    sigmaa.style.display="block"
    sigmaa2.style.display="block"
    sigmaa3.style.display="block"
    sigmaa4.style.display="block"
    sigmaa6.style.display="block"
    sigmaa.style.backgroundImage=`url("http://83.27.64.116:3000/upload/${data.name}.png")`
    sigmaa.style.backgroundSize='1%'
    sigmaa2.style.backgroundSize='100%'
    sigmaa3.style.backgroundSize='50%'
    sigmaa4.style.backgroundSize='10%'
    sigmaa4.style.backgroundRepeat = "no-repeat"
    sigmaa6.style.backgroundRepeat = "no-repeat"
    sigmaa.style.transition = '2s'
    sigmaa.style.backgroundPosition = '0px 0px'
    sigmaa6.style.backgroundPosition = '0px 200px'
        setTimeout(() => {
        sigmaa.style.backgroundSize='50%'
    }, "100");

    setTimeout(() => {
    sigmaa.style.display="none"
    sigmaa2.style.display="none"
    sigmaa3.style.display="none"
    sigmaa4.style.display="none"
    sigmaa6.style.display="none"
    }, "2000");

}
let playerList = []
let playeramount = 0
let serokosc = 0
let kurwiszon = [-70,0,250,-20,3]
async function getPlayersLong(){
    let response = await fetch("http://83.27.64.116:3000/playerList")
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
            kurwiszon = [-70,0,serokosc/2,-40,4]
            playerList=message
            playerListNormalised = JSON.parse(playerList)
            players.innerHTML=""
            playeramount = playerListNormalised.length-1
            serokosc = players.offsetWidth -500
            gura = 0
            
            playerListNormalised.forEach(player=>{
                promien = serokosc/2
                if(promien-kurwiszon[1]>0){zabijesie = promien-kurwiszon[1]}
                else{zabijesie = kurwiszon[1]-promien}
                if(kurwiszon[0]+90<=90 && zabijesie!=0 ){
                kurwiszon[2] = serokosc/2 -Math.tan(((kurwiszon[0]+90)*Math.PI)/180)*zabijesie
                kurwiszon[4] -= 3/(playeramount/2)}
                else if((-2.0>kurwiszon[0]&&kurwiszon[0]<2.0)|| kurwiszon[0]==0){
                    console.log("what the helly")
                    kurwiszon[2] = 190
                    kurwiszon[4] = 1
                }
                else{
                   kurwiszon[2] = serokosc/2 -Math.tan(((90-kurwiszon[0])*Math.PI)/180)*zabijesie 
                   kurwiszon[4] += 3/(playeramount/2)
                }
                console.log(promien,zabijesie,kurwiszon[0],kurwiszon[2],kurwiszon[4])
                players.innerHTML+=showPlayers(player)
                kurwiszon[0]+=140/playeramount
                kurwiszon[1]+=serokosc/(playeramount)
                kurwiszon[3]+=80/playeramount
                
                console.log(player)
            })
        }
        getPlayersLong()
    }
}
getPlayersLong()