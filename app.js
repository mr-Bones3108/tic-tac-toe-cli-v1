const gameBoard = (() => {
    const board = ["","","","","","","","",""];
    
    const getBoard = () => board;

    const updateBoard = (index, sign) => {
        board[index] = sign;
        screenController.createBoard()
    };
 
    // const printBoard = () => {
    //     console.log(board.slice(0, 3).join(' '));
    //     console.log(board.slice(3, 6).join(' '));
    //     console.log(board.slice(6, 9).join(' '));
    // };

    return {
        getBoard,
        updateBoard,
        // printBoard,
    };
})();


const players = (name,sign)=>{
    return{
        name,
        sign
    }
}

const checkForWin = (board) => {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
};

const checkForTie = (board) => {
    return board.every((cell) => cell !== "");
};

const startGame = (()=>{
    let player = []
    let currPlayer;
    let gameOver;
    
    const start = ()=>{
        player = [players("Player 1","X"),players("Player 2","O")]
        currPlayer=0
        gameOver=false
        gameBoard.getBoard()
        displayPlayerInfo.displayPlayerTurn(player[currPlayer].name)
    }

    const playerTurn = (event) => {
        if(gameOver){
            console.log("game is already over !!")
            return
        }

        const index = parseInt(event.target.id.split("-")[1])
        const valuePresent = gameBoard.getBoard()[index]
        if(valuePresent !==""){
            return;
        }
        gameBoard.updateBoard(index, player[currPlayer].sign);
    
        if (checkForWin(gameBoard.getBoard())) {
            gameOver=true
            displayPlayerInfo.displayPlayerWin(player[currPlayer].name)
        } else if (checkForTie(gameBoard.getBoard())) {
            gameOver=true
            displayPlayerInfo.displayPlayerTie()
        } else{
            currPlayer = currPlayer === 0 ? 1 : 0;
            displayPlayerInfo.displayPlayerTurn(player[currPlayer].name)
        }
    };

    const resetGame = ()=>{
        for(let i=0; i<9;i++){
            gameBoard.updateBoard(i,"");
        }
        gameOver=false
        start()
    }
    return{
        start,
        playerTurn,
        resetGame
    }
})()

const displayPlayerInfo =(()=>{
    let playerT = document.querySelector('.turn');
    const displayPlayerTurn = (turn)=>{
        playerT.textContent=""
        playerT.textContent = `${turn}'s Turn`
    }

    const displayPlayerWin = (turn)=>{
        playerT.textContent=""
        playerT.textContent=`${turn} win's play again`
    }
    const displayPlayerTie = ()=>{
        playerT.textContent=""
        playerT.textContent=`Its a tie play Again`
    }
    return{
        displayPlayerTurn,
        displayPlayerWin,
        displayPlayerTie
    }
})();

const screenController = (()=>{
    const gameStart =()=>{
        startGame.start()
    }
    let boardDiv = document.querySelector("#board")
    const createBoard =()=>{
        
        boardDiv.innerHTML=""
        gameBoard.getBoard().forEach((square,index)=>{
            boardDiv.innerHTML +=`<div class="square" id="square-${index}">${square}</div>`;
        });

        const squares = document.querySelectorAll(".square");
        squares.forEach((square)=>{
            square.addEventListener('click',startGame.playerTurn)
        })
    }

    return{
        createBoard,
        gameStart
    }
})();





// function startTic(){
   
//     startGame.resetGame()
// }
screenController.gameStart()
screenController.createBoard()
function reGame(){
    startGame.resetGame()
}







