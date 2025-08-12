let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let confettiContainer = document.querySelector("#confetti");
let turnO = true; //playerX, playerO
const winPatterns=[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]

];
const resetGame = () => {
    turnO =true;
    enableBoxes();
    msgContainer.classList.remove("show");
    msgContainer.classList.add("hide");
    clearWinningBoxes();
    stopConfetti();
};
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }else{
            box.innerText="X"
            turnO = true;
        }
        box.disabled = true;
        checkwinner();
    });
});
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
}
const clearWinningBoxes = () => {
    boxes.forEach(box => box.classList.remove("winning-box"));
}
const showWinner = (winner, winningPattern) => {
    msg.innerText = `Congratulations, ${winner}!`;
    msgContainer.classList.remove("hide");
    msgContainer.classList.add("show");
    disableBoxes();
    highlightWinningBoxes(winningPattern);
    startConfetti();
};
const highlightWinningBoxes = (pattern) => {
    pattern.forEach(index => {
        boxes[index].classList.add("winning-box");
    });
};
const checkwinner = () => {
    for (pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                showWinner(pos1Val, pattern);
                return;
            }
        }
    }
}
newGamebtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

// Confetti animation logic
let confettiElements = [];
const colors = ['#FFC107', '#FF5722', '#4CAF50', '#2196F3', '#E91E63'];

const createConfetti = () => {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.top = '0px';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.opacity = 1;
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = 1100;
    confettiContainer.appendChild(confetti);
    confettiElements.push({
        element: confetti,
        velocityX: (Math.random() - 0.5) * 5,
        velocityY: Math.random() * 5 + 2,
        opacity: 1
    });
};

const startConfetti = () => {
    for(let i=0; i<100; i++){
        createConfetti();
    }
    requestAnimationFrame(updateConfetti);
};

const updateConfetti = () => {
    confettiElements.forEach((confetti, index) => {
        confetti.velocityY -= 0.1; // gravity effect
        let top = parseFloat(confetti.element.style.top);
        let left = parseFloat(confetti.element.style.left);
        top += confetti.velocityY;
        left += confetti.velocityX;
        confetti.element.style.top = top + 'px';
        confetti.element.style.left = left + 'px';
        confetti.opacity -= 0.02;
        confetti.element.style.opacity = confetti.opacity;
        if(confetti.opacity <= 0){
            confettiContainer.removeChild(confetti.element);
            confettiElements.splice(index, 1);
        }
    });
    if(confettiElements.length > 0){
        requestAnimationFrame(updateConfetti);
    }
};

const stopConfetti = () => {
    confettiElements.forEach(confetti => {
        if(confetti.element.parentNode === confettiContainer){
            confettiContainer.removeChild(confetti.element);
        }
    });
