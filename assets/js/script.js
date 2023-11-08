// Define quiz questions
const quizData = [
    {
        question: "What does the 'localStorage' object in JavaScript do?",
        choices: ["Stores HTTP requests", "Stores all inventory", "Stores only health potions", "Stores data in the browser"],
        correctAnswer: "Stores data in the browser",
    },
    {
        question: "What will the brackets in 'function()' do?",
        choices: ["Multiply", "Nothing", "Call", "Cast void spell"],
        correctAnswer: "Call",
    },
    {
        question: "How is commenting done for JavaScript?",
        choices: ["//comment", "!--comment", "@comment", "{comment}"],
        correctAnswer: "//comment",
    },
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Marketing Lookup", "Hyper Tool Magic Language", "Hyper Text Transfer Protocol", "Hyper Text Markup Language"],
        correctAnswer: "Hyper Text Markup Language",
    },
    {
        question: "What is CSS used for?",
        choices: ["Adds structure", "Adds Styling", "Adds point to house Slytherin", "Adds waterfall"],
        correctAnswer: "Adds Styling",
    },
];

// DOM elements
const startButton = document.getElementById("start");
const timerDisplay = document.getElementById("timer");
const questionDisplay = document.getElementById("question");
const choicesDisplay = document.getElementById("choices");
const initialsForm = document.getElementById("initials-form");
const initialsInput = document.getElementById("initials");
const scoreboardDisplay = document.getElementById("scoreboard");

// Quiz variables
let currentQuestionIndex = 0;
let timer;
let score = 0;
let timeLeft = 60;

// Event listeners
startButton.addEventListener("click", startQuiz);
initialsForm.addEventListener("submit", saveScore);

// Start quiz function
function startQuiz() {
    startButton.disabled = true;
    timer = setInterval(updateTimer, 1000);
    displayQuestion(currentQuestionIndex);
}

// Update timer function
function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = timeLeft + " seconds";
  
    if (timeLeft <= 0) {
        clearInterval(timer);
        endQuiz();
    }
}

// Display question function
function displayQuestion(index) {
    if (index >= quizData.length) {
        endQuiz();
        return;
    }
  
    questionDisplay.textContent = quizData[index].question;
    choicesDisplay.innerHTML = "";
  
    quizData[index].choices.forEach((choice) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.addEventListener("click", checkAnswer);
        choicesDisplay.appendChild(choiceButton);
    });
}

// Check answer function
function checkAnswer(event) {
    const selectedAnswer = event.target.textContent;
    const correctAnswer = quizData[currentQuestionIndex].correctAnswer;
  
    if (selectedAnswer === correctAnswer) {
        score += 10;
    } else {
        timeLeft -= 10;
        if (timeLeft < 0) timeLeft = 0;
    }
  
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
}

// End the quiz function
function endQuiz() {
    clearInterval(timer);
    questionDisplay.textContent = "Quiz Over!";
    choicesDisplay.innerHTML = "";
    initialsForm.style.display = "block";
}

// Save player score function
function saveScore(event) {
    event.preventDefault();
  
    const initials = initialsInput.value;
  
    if (initials) {
        const scoreData = {
            initials: initials,
            score: score,
      };
  
        const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
        highScores.push(scoreData);
  
        highScores.sort((a, b) => b.score - a.score);
        const topScores = highScores.slice(0, 5);
        localStorage.setItem("highScores", JSON.stringify(topScores));
  
        displayHighScores();
    }
}

// Display high score function
function displayHighScores() {
    scoreboardDisplay.innerHTML = "<h2>High Scores</h2>";
  
    const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
  
    highScores.forEach((score, index) => {
        const scoreEntry = document.createElement("p");
        scoreEntry.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
        scoreboardDisplay.appendChild(scoreEntry);
    });
}