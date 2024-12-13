
const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { Text: "Shark", correct: false },
            { Text: "Blue Whale", correct: true },
            { Text: "Elephant", correct: false },
            { Text: "Giraffe", correct: false },
        ],
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { Text: "Asia", correct: false },
            { Text: "Australia", correct: true },
            { Text: "Arctic", correct: false },
            { Text: "Africa", correct: false },
        ],
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { Text: "Vatican City", correct: true },
            { Text: "Bhutan", correct: false },
            { Text: "Nepal", correct: false },
            { Text: "Sri Lanka", correct: false },
        ],
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { Text: "Kalahari", correct: false },
            { Text: "Gobi", correct: false },
            { Text: "Sahara", correct: false },
            { Text: "Antarctica", correct: true },
        ],
    },
    {
        question: "Who is known as the father of the Indian Constitution?",
        answers: [
            { Text: "Mahatma Gandhi", correct: false },
            { Text: "Jawaharlal Nehru", correct: false },
            { Text: "Dr. B.R. Ambedkar", correct: true },
            { Text: "Sardar Vallabhbhai Patel", correct: false },
        ],
    },
    {
        question: "What is the largest planet in our Solar System?",
        answers: [
            { Text: "Earth", correct: false },
            { Text: "Mars", correct: false },
            { Text: "Jupiter", correct: true },
            { Text: "Saturn", correct: false },
        ],
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: [
            { Text: "Iron", correct: false },
            { Text: "Graphite", correct: false },
            { Text: "Diamond", correct: true },
            { Text: "Quartz", correct: false },
        ],
    },
    {
        question: "What is the name of the longest river in the world?",
        answers: [
            { Text: "Nile", correct: true },
            { Text: "Amazon", correct: false },
            { Text: "Yangtze", correct: false },
            { Text: "Mississipp", correct: false },
        ],
    },
    {
        question: "In which year did India gain independence?",
        answers: [
            { Text: "1952", correct: false },
            { Text: "1945", correct: false },
            { Text: "1950", correct: false },
            { Text: "1947", correct: true },
        ],
    },

    {
        question: "What is the national currency of Japan?",
        answers: [
            { Text: "Yuan", correct: false },
            { Text: "Yen", correct: true },
            { Text: "Won", correct: false },
            { Text: "Rupee", correct: false },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Play Again") {
        startQuiz();
    } else {
        handleNextButton();
    }
});

// Start the quiz
startQuiz();

