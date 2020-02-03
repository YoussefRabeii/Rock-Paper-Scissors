const choices = document.querySelectorAll(".choice");
const score = document.getElementById("score");
const result = document.getElementById("result");
const restart = document.getElementById("restart");
const modal = document.querySelector(".modal");

const scoreBoard = {
    player: 0,
    computer: 0
}

// Play Game
const play = (e) => {
    restart.style.display = "inline-block";

    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();

    const winner = getWinner(playerChoice, computerChoice);

    showWinner(winner, computerChoice);
}

// Get the Computer Choice
const getComputerChoice = () => {
    const random = Math.floor(Math.random() * 100) + 1;

    if (random <= 33) {
        return "rock";
    } else if (random <= 66) {
        return "paper";
    } else {
        return "scissors"
    }
}

// Decide Who Wins
const getWinner = (p, c) => {
    if (p === c) {
        return "Draw";    
    } else {
        if (p === "rock") {
            if (c === "paper") {
                return "computer"
            } else {
                return "player";
            }
        } else if (p === "paper") {
            if (c === "rock") {
            return "player";
            } else {
            return "computer";
            }
        } else if (p === "scissors") {
            if (c === "rock") {
            return "computer";
            } else {
            return "player";
            }
        }
    }
}

// Show who wins
const showWinner = (winner, computerChoice) => {
    if(winner === "player") {
        // Inc player score
        scoreBoard.player++;
        
        // Show Modal result
        result.innerHTML = `
        <h1 class="text-win">You Win</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    } else if (winner === "computer") {
        // Inc Computer score
        scoreBoard.computer++;
        
        // Show Modal result
        result.innerHTML = `
        <h1 class="text-lose">You Lose</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    } else {
        // Show Modal result
        result.innerHTML = `
        <h1>It's a Draw</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    }

    // Show the Score
    score.innerHTML = `
    <p>Player: ${scoreBoard.player}</p>
    <p>Computer: ${scoreBoard.computer}</p>
    `;

    // Show the Modal
    modal.style.display = "block"; 
}

// Restart the Game
const restartGame = () => {
    scoreBoard.player = 0;
    scoreBoard.computer = 0;
    score.innerHTML = `
        <p>Player: 0</p>
        <p>Computer: 0</p>
    `
    restart.style.display = "none"
}

// Clear Modal 
const clearModal = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}

// Event Listeners
choices.forEach(choice => choice.addEventListener("click", play));
window.addEventListener("click", clearModal);
restart.addEventListener("click", restartGame)