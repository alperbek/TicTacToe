//State
const GAME_STATE = {
    player: 1,
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
};

function switchPlayer(GAME_STATE, player) {
    GAME_STATE.player = player;
    return GAME_STATE;
}

function nextPlayer(GAME_STATE) {
    return switchPlayer(GAME_STATE, GAME_STATE.player === 1 ? 0 : 1);
}

function play(GAME_STATE, x, y) {
    const { player } = GAME_STATE;
    if(GAME_STATE.board[y][x] !== null) {
        return GAME_STATE;
    }
    GAME_STATE.board[y][x] = player === 1 ? 'X' : 'O';
    return nextPlayer(GAME_STATE);
}

function checkWinner(GAME_STATE) {
    const { board } = GAME_STATE; 
    const allSame = (line) => {
        line.every(cell => cell === 'X') || 
        line.every(cell => cell === 'O')
    } 
    const lineCheck = (board) => board.some(allSome);

    const crossCheck = (board) => {
        allSame([board[0][2], board[1][1], board[2][0]]) ||
        allSame([board[0][0], board[1][1], board[2][2]]);
    }
    
    const transposeBoard = board[0].map((col, i) => board.map(row => row[i]));
    return lineCheck(board) || lineCheck(transposeBoard) || crossCheck(board);
}

function isGameOver(GAME_STATE) {
    if(checkWinner(GAME_STATE)) {
        return true;
    }
    return GAME_STATE.board.every(line => line.every(cell => cell !== null))
}

function checkDraw(GAME_STATE) {
    if(!isGameOver(GAME_STATE) || checkWinner(GAME_STATE)) {
        return false;
    }
    return true;
}

function whoWin(GAME_STATE) {
    if(checkDraw(GAME_STATE)) {
        return -1;
    }
    if(!checkWinner(GAME_STATE)) {
        return false;
    }
    return GAME_STATE.player;
}

// Kurallar
// ------------
// | | |X| 
// ------------
// | |O| |
// ------------
// |X| | |
// ------------
