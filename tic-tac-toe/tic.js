let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isgameOver = false;

document.querySelectorAll('.cell').forEach((cell,index)=>{
 cell.addEventListener('click',()=>{
    if(isgameOver || board[index]){
        return;
    }
    board[index]=currentPlayer;
    cell.textContent=currentPlayer;

    if(checkWinner()){
        document.getElementById('status').textContent=`${currentPlayer} wins`;
        isgameOver=true;
    }else if(isDraw()){
        document.getElementById('status').textContent="Its Draw";
        isgameOver=true;
    }else{
        currentPlayer=currentPlayer=== 'X' ? 'O' : 'X';
    }
 });
});


function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function isDraw() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      return false;
    }
  }
  return true;
}

function restartGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  isgameOver = false;

  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
  });
  document.getElementById(status).textContent = "";
}

document.getElementById('restart').addEventListener('click',restartGame)
