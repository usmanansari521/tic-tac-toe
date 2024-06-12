let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector(".reset-button");
let newGameButton = document.querySelector(".new-game");
let messageContainer = document.querySelector(".message-container");
let winnerMessage = document.querySelector("#message");

let turnO = true; //playerX, playerO
let clickCount = 0; //to track draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () =>{
    turnO = true;
    clickCount = 0;
    enableBoxes();
    messageContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.style.color = "#f2e9e4";
            box.innerText = "O";
            turnO = false;
        } else{
            box.style.color = "red";
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        clickCount++;

        let isWinner = checkWinner();

        if(clickCount === 9 && !isWinner){
            gameDraw();
        }
    });
});

const disableBoxes = () => {
    for(box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const gameDraw = () => {
        winnerMessage.innerText = "Game draw. Play a new game!";
        messageContainer.classList.remove("hide");
        disableBoxes();
}

const showWinner = (winner) => {
    winnerMessage.innerText = `Congratulations!, Winner is ${winner}.`;
    messageContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winPatterns){
       let position1Value = boxes[pattern[0]].innerText;
       let position2Value = boxes[pattern[1]].innerText;
       let position3Value = boxes[pattern[2]].innerText;

       if(position1Value != "" && position2Value != "" && position3Value != ""){
        if(position1Value === position2Value && position2Value === position3Value){
            showWinner(position1Value);
            return true;
        }
       }
    }
}

newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);