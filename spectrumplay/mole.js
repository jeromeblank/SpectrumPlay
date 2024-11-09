let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let playerName;
let musicPlayed = false;

window.onload = function() {
    getPlayerName();
}

function getPlayerName() {
    playerName = prompt("Enter your name:");
    if (playerName === null || playerName === "") {
        playerName = "Player";
    }
    setGame();
}

function setGame() {
    // Set up the grid in html
    for (let i = 0; i < 9; i++) { //i goes from 0 to 8, stops at 9
        //<div id="0-8"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    document.getElementById("restart").addEventListener("click", resetGame);
    setInterval(setMole, 1000); // 1000 miliseconds = 1 second, every 1 second call setMole
    setInterval(setPlant, 2000); // 2000 miliseconds = 2 seconds, every 2 second call setPlant
}

function playMusic() {
    if (!musicPlayed) {
        let audio = new Audio('s4.mp3');
        audio.play();
        musicPlayed = true;
    }
}

function resetGame() {
    score = 0;
    gameOver = false;
    musicPlayed = false; // Reset music flag
    document.getElementById("score").innerText = score.toString();
    currMoleTile = null;
    currPlantTile = null;
    // Remove all child elements from the board
    document.getElementById("board").innerHTML = "";
    setGame();
}

function getRandomTile() {
    // Math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./the-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString(); // Update score html
        playMusic(); // Call the function to play music when the mole is clicked
    } else if (this == currPlantTile) {
        gameOver = true;
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); // Update score html
        alert(`Game Over, ${playerName}! Your score is ${score}`);
        congratulatePlayer(playerName, score);
    }
}

function congratulatePlayer(playerName, score) {
    // You can customize your congratulations message here
    console.log(`Congratulations ${playerName}! Your final score is ${score}. Well done!`);
}
function submitScore() {
    document.getElementById('playerName').value = playerName;
    document.getElementById('playerScore').value = score;

    // Send AJAX request to save the score
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_molescore.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.responseText); // Debugging: Log server response
            // You can add further handling here if needed
        }
    };
    xhr.send('playerName=' + playerName + '&playerScore=' + score);
}
