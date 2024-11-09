const operators = ["+", "-"];
const startBtn = document.getElementById("start-btn");
const question = document.getElementById("question");
const controls = document.querySelector(".controls-container");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-msg");
let answerValue;
let operatorQuestion;
let questionCounter = 0; // Counter for limiting questions
let correctAnswers = 0; // Counter for tracking correct answers
let timerInterval; // Variable to store the timer interval
let totalScore = 0; // Variable to store total score
let gameMusic = new Audio("s3.mp3"); // Path to your game music file

// Random Value Generator
const randomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const questionGenerator = () => {
    if (questionCounter >= 10) {
        // If the question counter reaches 10, stop generating questions
        stopGame("You've completed 10 questions. Your total score is " + totalScore);
        return;
    }
    questionCounter++; // Increment question counter

    // Two random values between 1 and 10 for simplicity
    let [num1, num2] = [randomValue(1, 10), randomValue(1, 10)];

    // For getting a random operator
    let randomOperator = operators[Math.floor(Math.random() * operators.length)];

    // Solve equation
    let solution;
    if (randomOperator === "+") {
        solution = num1 + num2;
    } else if (randomOperator === "-") {
        // Ensure the result is non-negative
        if (num2 > num1) {
            [num1, num2] = [num2, num1];
        }
        solution = num1 - num2;
    }

    // For placing the input at a random position
    // (1 for num1, 2 for num2, 3 for operator, anything (4) for solution)
    let randomVar = randomValue(1, 4);

    if (randomVar === 1) {
        answerValue = num1;
        question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator}${num2}=${solution}`;
    } else if (randomVar === 2) {
        answerValue = num2;
        question.innerHTML = `${num1}${randomOperator} <input type="number" id="inputValue" placeholder="?"\> =${solution}`;
    } else if (randomVar === 3) {
        answerValue = randomOperator;
        operatorQuestion = true;
        question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"\>${num2}=${solution}`;
    } else {
        answerValue = solution;
        question.innerHTML = `${num1}${randomOperator}${num2} = <input type="number" id="inputValue" placeholder="?"\>`;
    }

    // Play game music
    gameMusic.play();

    // User Input Check
    submitBtn.addEventListener("click", () => {
        errorMessage.classList.add("hide");
        let userInput = document.getElementById("inputValue").value;
        // If user input is not empty
        if (userInput) {
            // If the user guessed the correct answer
            if (userInput === answerValue.toString()) {
                correctAnswers++; // Increment correct answers counter
                totalScore += Math.max(0, 60 - (60 - timeLeft)); // Calculate score based on time left
                if (correctAnswers >= 10) {
                    // If user has answered 10 questions, send data to server
                    sendScoreToServer();
                    stopGame(`Congratulations! You've answered 10 questions. Your total score is ${totalScore}`);
                } else {
                    stopGame(`Yippie!! <span>Correct</span> Answer😍`);
                }
            }
            // If user input operator other than +, -
            else if (operatorQuestion && !operators.includes(userInput)) {
                errorMessage.classList.remove("hide");
                errorMessage.innerHTML = "Please enter a valid operator";
            }
            // If user guessed the wrong answer
            else {
                stopGame(`Opps!! <span>Wrong</span> Answer🥺`);
            }
        }
        // If user input is empty    
        else {
            errorMessage.classList.remove("hide");
            errorMessage.innerHTML = "Input Cannot Be Empty";
        }
    });

    // Start the timer
    startTimer();
};

// Timer function
let timeLeft = 60; // 60 seconds
const startTimer = () => {
    timeLeft = 60; // Reset time left
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            stopGame("Time's up!");
        }
        // Update the timer display
        document.getElementById("timer").innerText = `Time left: ${timeLeft} seconds`;
    }, 1000); // Update every second
};

// Define a variable to store the user's name
let userName = "";

// Start Game
startBtn.addEventListener("click", () => {
    operatorQuestion = false;
    answerValue = "";
    errorMessage.innerHTML = "";
    errorMessage.classList.add("hide");
    totalScore = 0; // Reset total score
    
    // Ask user for their name if it's not already stored
    if (!userName) {
        userName = prompt("Please enter your name:");
        if (!userName) {
            userName = "Player"; // Default name if the user doesn't enter one
        }
    }

    // Controls and buttons visibility
    controls.classList.add("hide");
    startBtn.classList.add("hide");
    questionCounter = 0; // Reset question counter
    correctAnswers = 0; // Reset correct answers counter
    questionGenerator();
});

const stopGame = (resultText) => {
    // Display congratulatory message with the user's name
    if (correctAnswers >= 10) {
        resultText = `Congratulations, ${userName}! You've answered 10 questions. Your total score is ${totalScore}`;
    }
    result.innerHTML = resultText;
    startBtn.innerText = "Restart";
    controls.classList.remove("hide");
    startBtn.classList.remove("hide");
    clearInterval(timerInterval); // Stop the timer
};

// Function to send user score to server
const sendScoreToServer = () => {
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    
    // Define the request URL and method
    const url = "save_mathscore.php"; // Change this to the URL of your server-side script
    const method = "POST";
    
    // Define the data to send to the server
    const data = {
        userName: userName,
        totalScore: totalScore
    };
    
    // Convert the data to JSON format
    const jsonData = JSON.stringify(data);
    
    // Set up the request
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    // Send the request with the JSON data
    xhr.send(jsonData);
};
