const board = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");
const resetBtn = document.getElementById("reset");
let score = 0;
const Tile = document.querySelectorAll('.tile');
resetBtn.addEventListener("click", ()=>{
    resetBtn.style.display="none";
    start();});
let tiles = [];
function start() {
    score=0;
    resetBtn
    tiles = [];
    Tile.forEach(til => {
        til.dataset.value = "0";
        tiles.push(til);
    });
    const gameOverMessage = document.querySelector('p');
    if (gameOverMessage) {
        gameOverMessage.remove();
    }
    addTile();
    addTile();
    updateBoard();
}
function addTile() {
    let emptyTiles = tiles.filter(til => til.dataset.value == "0");
    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    randomTile.dataset.value = Math.random() < 0.8 ? "2" : "4";
}
function updateBoard() {
    tiles.forEach(til => {
        const value = parseInt(til.dataset.value);
        til.textContent = value > 0 ? value : "";
        til.className = 'tile';
        if (value > 0) til.classList.add(`tile-${value}`);
    });
    scoreDisplay.textContent = score;
}

function move(direction) {
    let moved = false;
    for(let i=0;i<4;i++){
        let line=[];
        for(let j=0;j<4;j++){
            const index=(direction=="up"||direction=="down")?i+j*4 : i*4+j;
            const value=parseInt(tiles[index].dataset.value);
            if(value!==0) line.push(value);
        }
    
   if(direction=="right"||direction=="down")
    line.reverse();
   let mergedLine=mergeLine(line);
    if(direction=="right"||direction=="down")
    mergedLine.reverse();
    
    for(let j=0;j<4;j++){
            const index=direction=="up"||direction=="down"?i+j*4 : i*4+j;
            const newValue=(mergedLine[j]||0).toString();
            if(tiles[index].dataset.value!==newValue){
                tiles[index].dataset.value=newValue;
                moved=true;
            }
        }
    }
    if(moved){
        addTile();
        updateBoard();
        if (checkGameOver()) {
            resetBtn.style.display="block";
            board.classList.add('game-over');
            const newBoard = document.createElement('p');
            newBoard.textContent = "Game Over! Press Start to start a new game.";
            newBoard.style.backgroundColor = 'red';
            newBoard.style.color = 'white';
            const game = document.getElementById("game");
            game.appendChild(newBoard);
            return;
        }
    }
}
document.addEventListener("keydown",(e)=>{
    switch(e.key){
        case "ArrowUp": move("up");
                        break;
        case "ArrowDown": move("down");
                        break;
        case "ArrowRight": move("right");
                        break;
        case "ArrowLeft": move("left");
                        break;
    }
})

function mergeLine(line){
    for(let i=0;i<line.length-1;i++){
        if(line[i]===line[i+1])
        {
            line[i]*=2;
            score+=line[i];
            line.splice(i+1,1);
        }
    }
    while(line.length<4){
        line.push(0);
    }
    return line;
}

function checkGameOver() {
    
    let emptyTiles = tiles.filter(til => til.dataset.value === "0");
    if (emptyTiles.length > 0) {
        return false; 
    }

    
    for (let i = 0; i < 16; i++) {
        const row = Math.floor(i / 4);
        const col = i % 4;


        if (col < 3 && tiles[i].dataset.value === tiles[i + 1].dataset.value) return false;
        if (row < 3 && tiles[i].dataset.value === tiles[i + 4].dataset.value) return false;
    }

    return true; 
}