const gameBoard = (() => {
    const board = ["","","","","","","","",""];
    
    const getBoard = () => board;

    const updateBoard = (index, sign) => {
        board[index] = sign;
        
    };
 
    const printBoard = () => {
        console.log(board.slice(0, 3).join(' '));
        console.log(board.slice(3, 6).join(' '));
        console.log(board.slice(6, 9).join(' '));
    };

    return {
        getBoard,
        updateBoard,
        printBoard,
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
        player = [players("player1","X"),players("player2","O")]
        currPlayer=0
        gameOver=false
        gameBoard.getBoard()
        console.log(player[currPlayer].name,"'s turn ")
    }

    const playerTurn = (index) => {
        if(gameOver){
            console.log("game is already over !!")
            return
        }
        if(gameBoard.getBoard()[index]===""){
            gameBoard.updateBoard(index, player[currPlayer].sign);
            gameBoard.printBoard();
    
            if (checkForWin(gameBoard.getBoard())) {
                gameOver=true
                console.log(player[currPlayer].name, " wins!");
            } else if (checkForTie(gameBoard.getBoard())) {
                gameOver=true
                console.log("It's a tie!");
            } else {
                currPlayer = currPlayer === 0 ? 1 : 0;
                console.log(player[currPlayer].name, "'s turn ");
            }
        }
        else{
            console.log("already Marked")
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

// startGame.start()
// startGame.playerTurn(4);
// startGame.playerTurn(0);
// startGame.playerTurn(8);
// startGame.playerTurn(1);
// startGame.playerTurn(7);
// startGame.playerTurn(2);
// startGame.resetGame()
// startGame.playerTurn(4);
// startGame.playerTurn(0);
// startGame.playerTurn(8);
// startGame.playerTurn(1);
// startGame.playerTurn(7);
// startGame.playerTurn(3);
// startGame.playerTurn(6);
// startGame.resetGame()






