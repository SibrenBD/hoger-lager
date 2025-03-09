
// start van de site

let gameStarted = false;
let currentNumber;
let prevNumber;

// spelregels

const gameRules = document.querySelector(".spelregels-button")
gameRules.addEventListener("click", function() {
    window.open("spelregels.html")
})

// score

let playerSc = 20;
let computerSc = 20;

const playerScore = document.querySelector(".player-score");
const computerScore = document.querySelector(".computer-score");

function displayScore() {
    playerScore.textContent = "player score" + " " + playerSc;
    computerScore.textContent = "computer score" + " " + computerSc;
}

playerScore.textContent = "player score: " + playerSc
computerScore.textContent = "computer score: " + computerSc;

// random number

function randomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}

// input systeem

const pointInputOverlay = document.querySelector(".point-input-overlay");
const pointInput = document.querySelector(".point-input");
const pointSubmit = document.querySelector(".input-submit");

pointInputOverlay.style.display = "none";
pointSubmit.addEventListener("click", submitPoints);

function askInputPoints() {
    pointInputOverlay.style.display = "block";
    showSkillAmount();
}

function submitPoints() {
    switch (Number(pointInput.value)) {
        case 2:
            pointInputOverlay.style.display = "none";
            submit();
            break;
        case 6:
            pointInputOverlay.style.display = "none";
            submit();
            break;
        case 10:
            pointInputOverlay.style.display = "none";
            submit();
            break;
    }
    if (pointInput.value == "") {
        alert("er zijn geen punten aangegeven!");
    }
    if (Number(pointInput.value) != 2 && Number(pointInput.value) != 6 && Number(pointInput.value) != 10) {
        alert("kies uit 2, 6 of 10!");
    }
}


// skill systeem

const balanceSkill = document.querySelector(".balance-skill");
const boostSkill = document.querySelector(".boost-skill");

const balanceCount = document.querySelector(".balance-count");
const boostCount = document.querySelector(".boost-count");

let playerBalanceOn = false;
let playerBoostOn = false;

let playerBalanceCount = 1;
let playerBoostCount = 4;

let computerBalanceCount = 1;

function showSkillAmount() {
    balanceCount.textContent = playerBalanceCount;
    boostCount.textContent = playerBoostCount + " " + "rondes";
}


balanceSkill.addEventListener("click", function () {
    if (playerBalanceCount > 0 && playerSc <= 15) {
        playerBalanceOn = true;
        playerBoostOn = false;
        balanceSkill.style.backgroundColor = "rgb(70, 4, 4)";
        boostSkill.removeAttribute("style", "backgroundColor");
    }
})

boostSkill.addEventListener("click", function () {
    if (playerBoostCount == 0) {
        playerBoostOn = true;
        playerBalanceOn = false;
        boostSkill.style.backgroundColor = "rgb(70, 4, 4)";
        balanceSkill.removeAttribute("style", "backgroundColor");
    }
})



// controlleer systeem

let playerBet = "nothing";
let playerWon;

function winCheck() {
    switch (playerBet) {
        case "higher":
            if (currentNumber > prevNumber) {
                playerWon = true;
                playerSc += Number(pointInput.value);
                computerSc -= Number(pointInput.value) / 2;
                if (playerBoostOn == true) {
                    playerSc += Number(pointInput.value);
                    computerSc -= Number(pointInput.value) / 2;
                }
                displayScore();
            }
            if (currentNumber < prevNumber) {
                playerWon = false;
                playerSc -= Number(pointInput.value) / 2;
                computerSc += Number(pointInput.value);
                if (playerBoostOn == true) {
                    playerSc -= Number(pointInput.value) / 2;
                    computerSc += Number(pointInput.value);
                }
                displayScore();
            }
            break;
        case "lower":
            if (currentNumber < prevNumber) {
                playerWon = true;
                playerSc += Number(pointInput.value);
                computerSc -= Number(pointInput.value) / 2;
                if (playerBoostOn == true) {
                    playerSc += Number(pointInput.value);
                    computerSc -= Number(pointInput.value) / 2;
                }
                displayScore();
            }
            if (currentNumber > prevNumber) {
                playerWon = false;
                playerSc -= Number(pointInput.value) / 2;
                computerSc += Number(pointInput.value);
                if (playerBoostOn == true) {
                    playerSc -= Number(pointInput.value) / 2;
                    computerSc += Number(pointInput.value);
                }
                displayScore();
            }
            break;
    }
    if (playerSc <= 0 || computerSc <= 0) {
        window.open("end.html", "_self");
    }
}

// buttons

const btnSubmit = document.querySelector(".submit");
btnSubmit.addEventListener("click", startGame);

const btnHigher = document.querySelector(".higher");
btnHigher.addEventListener("click", higher);

const btnLower = document.querySelector(".lower");
btnLower.addEventListener("click", lower);

function startGame() {
    if (gameStarted == false) {
        gameStarted = true;
        btnSubmit.textContent = "submit";
        btnSubmit.setAttribute("disabled", "disabled");
        currentNumber = randomNumber(6);
        changeDice();
        if (playerBet != "nothing") {
            askInputPoints();
        }
    }
    else {
        if (playerBet != "nothing" && processing == false) {
            askInputPoints();
        }
    }
}

function submit() {
    btnSubmit.setAttribute("disabled", "disabled");
    btnHigher.setAttribute("disabled", "disabled");
    btnLower.setAttribute("disabled", "disabled");
    prevNumber = currentNumber;
    currentNumber = randomNumber(6);
    processing = true;

    // skills

    if (playerBalanceOn == true) {
        balanceSkill.removeAttribute("style", "backgroundColor");
        playerBalanceCount -= 1;
        playerSc += Math.floor(computerSc / 2);
        displayScore();
        playerBalanceOn = false;
    }
    if (playerBoostOn == true) {
        boostSkill.removeAttribute("style", "backgroundColor");
        playerBoostOn = false;
        playerBoostCount = 5;
        displayScore();
    }

    // computer skills

    if (computerSc <= 15 && computerBalanceCount > 0) {
        computerSc += Math.floor(playerSc / 2);
        computerBalanceCount -= 1;
    }

    setTimeout(nextRound, 2000);
}

// ronde verwerking

let processing = false;

function nextRound() {
    processing = false
    winCheck();
    changeDice();
    playerBet = "nothing";
    playerBoostCount -= 1;
    if (playerBoostCount < 0) {
        playerBoostCount = 0;
    }
    btnHigher.removeAttribute("disabled", "disabled");
    btnLower.removeAttribute("disabled", "disabled");
}

function higher() {
    if (gameStarted == true) {
        btnHigher.setAttribute("disabled", "disabled");
        btnLower.removeAttribute("disabled", "disabled");
        btnSubmit.removeAttribute("disabled", "disabled");
        playerBet = "higher";
    }
}

function lower() {
    if (gameStarted == true) {
        btnLower.setAttribute("disabled", "disabled");
        btnHigher.removeAttribute("disabled", "disabled");
        btnSubmit.removeAttribute("disabled", "disabled");
        playerBet = "lower";
    }
}

// dobbelsteen

const dice = document.querySelector(".dice");

function changeDice() {
    switch (currentNumber) {
        case 1:
            dice.src = "./images/1.png";
            break;
        case 2:
            dice.src = "./images/2.png";
            break;
        case 3:
            dice.src = "./images/3.png";
            break;
        case 4:
            dice.src = "./images/4.png";
            break;
        case 5:
            dice.src = "./images/5.png";
            break;
        case 6:
            dice.src = "./images/6.png";
            break;
    }
}