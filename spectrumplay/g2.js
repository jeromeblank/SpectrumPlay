const words = [
    { word: "apple", description: "A round fruit with a red or green skin." },
    { word: "banana", description: "A long curved fruit with yellow skin." },
    { word: "orange", description: "A round citrus fruit with orange skin." },
    { word: "strawberry", description: "A small red fruit with seeds on the outside." },
    { word: "pineapple", description: "A tropical fruit with a spiky skin and sweet yellow flesh." },
    { word: "grape", description: "A small round fruit that grows in clusters." },
    { word: "watermelon", description: "A large fruit with green skin and red juicy flesh." },
    { word: "kiwi", description: "A small brown fruit with green flesh and black seeds." },
    { word: "pear", description: "A fruit with a narrow top and wider bottom, usually green or yellow." },
    { word: "cherry", description: "A small red round fruit that can be sweet or sour." }
];

// Function to shuffle the words array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let currentWordIndex;
let chosenWord;
let guessedWord;
let attempts;
let timer;
let username;
let totalScore = 0;

function askNameAndStartGame() {
    username = prompt("Welcome! Please enter your name:");
    if (username === null || username === "") {
        username = "Player";
    }
    document.getElementById("username").textContent = username;
    shuffleArray(words); // Shuffle the words array before starting the game
    chooseWord();
}

function chooseWord() {
    if (currentWordIndex === undefined) {
        currentWordIndex = 0;
        startTimer();
    } else {
        currentWordIndex++;
    }
    if (currentWordIndex >= words.length) {
        clearInterval(timer);
        alert("Congratulations! You have guessed all the words.");
        displayScore();
        return;
    }
    chosenWord = words[currentWordIndex].word;
    guessedWord = "_".repeat(chosenWord.length);
    document.getElementById("word-description").textContent = "Description: " + words[currentWordIndex].description;
    attempts = 5;
    updateDisplay();
}

function updateDisplay() {
    let wordLines = "";
    for (let i = 0; i < guessedWord.length; i++) {
        wordLines += guessedWord[i] + " ";
    }
    document.getElementById("word-display").textContent = wordLines;
    document.getElementById("message").textContent = "";
    document.getElementById("guess").value = "";
    document.getElementById("guess").focus();
}

function guessLetter() {
    const guess = document.getElementById("guess").value.toLowerCase();
    if (!guess.match(/[a-z]/)) {
        alert("Please enter a valid letter.");
        return;
    }
    if (chosenWord.includes(guess)) {
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === guess) {
                guessedWord = guessedWord.substring(0, i) + guess + guessedWord.substring(i + 1);
            }
        }
        if (guessedWord === chosenWord) {
            document.getElementById("message").textContent = "Congratulations! You guessed the word.";
            totalScore += Math.max(0, Math.floor(180 - (180 - timer) / 3)); // Adjusted score based on time left
            setTimeout(chooseWord, 2000); // Wait for 2 seconds before moving to the next word
        }
    } else {
        attempts--;
        if (attempts === 0) {
            document.getElementById("message").textContent = "Sorry, you're out of attempts. The word was: " + chosenWord;
            setTimeout(chooseWord, 2000); // Wait for 2 seconds before moving to the next word
        } else {
            document.getElementById("message").textContent = "Incorrect guess. You have " + attempts + " attempts left.";
        }
    }
    updateDisplay();
}

function startTimer() {
    let timeLeft = 180; // 3 minutes
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            alert("Time's up!");
            document.getElementById("guess-button").disabled = true;
        }
    }, 1000); // Update every second
}

function resetGame() {
    currentWordIndex = undefined;
    chosenWord = undefined;
    guessedWord = undefined;
    attempts = undefined;
    clearInterval(timer);
    document.getElementById("time").textContent = 180;
    document.getElementById("guess-button").disabled = false;
}

function displayScore() {
    alert("Congratulations, " + username + "! You've guessed all 10 words. Your total score is: " + totalScore);
    saveScore(username, totalScore); // Call the saveScore function to save the player's name and score
}

document.getElementById("guess-button").addEventListener("click", guessLetter);
document.getElementById("guess").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        guessLetter();
    }
});
document.getElementById("restart-button").addEventListener("click", function() {
    totalScore = 0; // Reset total score
    resetGame();
    chooseWord();
});

function saveScore(playerName, playerScore) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "save_wordscore.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.send("playerName=" + playerName + "&playerScore=" + playerScore);
}

askNameAndStartGame();
