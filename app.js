let h2 = document.querySelector("h2");
let allBtn = document.querySelectorAll("button")
let gameSeq = []
let userSeq = []
let col = ["red","blue","green","pink"]

let started = false;
let level = 0;

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game started")
        started = true;
        levelUp();
    }
})

function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(function () {
        btn.classList.remove("gameFlash")
    }, 300)
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash")
    }, 300)
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4)
    let randcol = col[randIdx]
    let randBtn = document.querySelector(`.${randcol}`)
    gameSeq.push(randBtn);
    console.log(gameSeq)
    gameFlash(randBtn);
}
function checkAns(idx) {
    if (gameSeq[idx].classList.contains(userSeq[idx])) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>.<br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "rgb(220, 235, 248)";
        }, 500);
        resetGame();
    }
}


function resetGame() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

for (let btn of allBtn) {
    btn.addEventListener("click", btnPress)
}
