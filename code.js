async function getPlayers(){
    fetch("http://localhost:3000/playerList")
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        data.forEach(player=>{
            
        })
    })
}
function showPlayers(data){
    const player = `
        <div>
            <img src="http:
        </div>
    `
}
getPlayers()