// =====================================
// SHIVA PRACTICE AI
// Main JavaScript
// =====================================

const startButton = document.getElementById("startPractice");

const practiceArea = document.getElementById("practiceArea");
const resultArea = document.getElementById("resultArea");

const questionContainer =
    document.getElementById("questionContainer");

const questionNumber =
    document.getElementById("questionNumber");

const scoreDisplay =
    document.getElementById("score");

const finalScore =
    document.getElementById("finalScore");

const resultMessage =
    document.getElementById("resultMessage");

const newPractice =
    document.getElementById("newPractice");

const difficultyButtons =
    document.querySelectorAll(".difficulty");


// =====================================
// DIFFICULTY SELECTION
// =====================================

let selectedDifficulty = "";

difficultyButtons.forEach(button => {

    button.addEventListener("click", () => {

        difficultyButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedDifficulty = button.textContent.trim();

    });

});


// =====================================
// DEMO QUESTION BANK
// =====================================

const questionBank = {

    mcq: [

        {
            question: "What is the chemical formula of water?",
            options: ["CO₂", "H₂O", "O₂", "H₂"],
            answer: "H₂O"
        },

        {
            question: "Which organelle is known as the powerhouse of the cell?",
            options: [
                "Nucleus",
                "Ribosome",
                "Mitochondria",
                "Golgi apparatus"
            ],
            answer: "Mitochondria"
        },

        {
            question: "What is the SI unit of electric current?",
            options: [
                "Volt",
                "Ohm",
                "Ampere",
                "Watt"
            ],
            answer: "Ampere"
        },

        {
            question: "Which gas is released during photosynthesis?",
            options: [
                "Carbon dioxide",
                "Oxygen",
                "Nitrogen",
                "Hydrogen"
            ],
            answer: "Oxygen"
        },

        {
            question: "The pH of a neutral solution is:",
            options: [
                "0",
                "5",
                "7",
                "14"
            ],
            answer: "7"
        }

    ],

    fillups: [

        {
            question: "The basic unit of life is the ________.",
            answer: "cell"
        },

        {
            question: "The process by which green plants prepare food is called ________.",
            answer: "photosynthesis"
        },

        {
            question: "The SI unit of force is ________.",
            answer: "newton"
        },

        {
            question: "A substance with pH less than 7 is generally ________.",
            answer: "acidic"
        },

        {
            question: "The control centre of the cell is the ________.",
            answer: "nucleus"
        }

    ],

    truefalse: [

        {
            question: "The Sun is a star.",
            answer: "true"
        },

        {
            question: "Plants release carbon dioxide during photosynthesis.",
            answer: "false"
        },

        {
            question: "The SI unit of force is Newton.",
            answer: "true"
        },

        {
            question: "All acids are solid at room temperature.",
            answer: "false"
        },

        {
            question: "Mitochondria are present in cells.",
            answer: "true"
        }

    ]

};


// =====================================
// PRACTICE VARIABLES
// =====================================

let currentQuestions = [];

let currentQuestionIndex = 0;

let score = 0;

let questionCount = 5;


// =====================================
// START PRACTICE
// =====================================

startButton.addEventListener("click", () => {

    const subject =
        document.getElementById("subject").value;

    const chapter =
        document.getElementById("chapter").value;

    const questionType =
        document.getElementById("questionType").value;

    questionCount =
        Number(
            document.getElementById("questionCount").value
        );


    // Validation

    if (!subject) {
        alert("Please select a subject.");
        return;
    }

    if (!chapter) {
        alert("Please select a chapter.");
        return;
    }

    if (!questionType) {
        alert("Please select a practice type.");
        return;
    }

    if (!selectedDifficulty) {
        alert("Please select a difficulty level.");
        return;
    }


    // Get questions

    let selectedQuestions =
        questionBank[questionType];


    // If question type is not available yet

    if (!selectedQuestions) {

        alert(
            "This practice type will be added in the next update."
        );

        return;
    }


    // Shuffle questions

    selectedQuestions =
        [...selectedQuestions].sort(
            () => Math.random() - 0.5
        );


    // Select required number

    currentQuestions =
        selectedQuestions.slice(
            0,
            Math.min(questionCount, selectedQuestions.length)
        );


    currentQuestionIndex = 0;

    score = 0;

    scoreDisplay.textContent = score;


    // Hide setup

    document.querySelector(".hero").style.display = "none";

    document.querySelector(".practice-box").style.display = "none";

    resultArea.style.display = "none";

    practiceArea.style.display = "block";


    showQuestion();

});


// =====================================
// SHOW QUESTION
// =====================================

function showQuestion() {

    const question =
        currentQuestions[currentQuestionIndex];


    questionNumber.textContent =
        `Question ${currentQuestionIndex + 1} / ${currentQuestions.length}`;


    // MCQ

    if (
        document.getElementById("questionType").value === "mcq"
    ) {

        questionContainer.innerHTML = `

            <div class="question">
                ${question.question}
            </div>

            <div class="options">

                ${question.options.map(option => `
                    
                    <button class="option"
                        onclick="checkMCQ('${escapeText(option)}')">

                        ${option}

                    </button>

                `).join("")}

            </div>

        `;

    }


    // Fill in the blanks

    else if (
        document.getElementById("questionType").value === "fillups"
    ) {

        questionContainer.innerHTML = `

            <div class="question">
                ${question.question}
            </div>

            <input
                id="answerInput"
                type="text"
                placeholder="Type your answer..."
                style="
                    width:100%;
                    padding:14px;
                    border-radius:10px;
                    border:1px solid #353b68;
                    background:#080b18;
                    color:white;
                    font-size:16px;
                    outline:none;
                "
            >

            <button
                class="start-btn"
                onclick="checkFillup()">

                Check Answer

            </button>

        `;

    }


    // True / False

    else if (
        document.getElementById("questionType").value === "truefalse"
    ) {

        questionContainer.innerHTML = `

            <div class="question">
                ${question.question}
            </div>

            <button
                class="option"
                onclick="checkTrueFalse('true')">

                True

            </button>

            <button
                class="option"
                onclick="checkTrueFalse('false')">

                False

            </button>

        `;

    }

}


// =====================================
// MCQ CHECK
// =====================================

function checkMCQ(answer) {

    const correctAnswer =
        currentQuestions[currentQuestionIndex].answer;

    if (answer === correctAnswer) {

        score++;

        scoreDisplay.textContent = score;

        alert("Correct! ✅");

    } else {

        alert(
            `Wrong ❌\nCorrect answer: ${correctAnswer}`
        );

    }

    nextQuestion();

}


// =====================================
// FILL UP CHECK
// =====================================

function checkFillup() {

    const input =
        document.getElementById("answerInput");

    const userAnswer =
        input.value.trim().toLowerCase();

    const correctAnswer =
        currentQuestions[currentQuestionIndex]
            .answer
            .toLowerCase();


    if (userAnswer === correctAnswer) {

        score++;

        scoreDisplay.textContent = score;

        alert("Correct! ✅");

    } else {

        alert(
            `Wrong ❌\nCorrect answer: ${correctAnswer}`
        );

    }

    nextQuestion();

}


// =====================================
// TRUE / FALSE CHECK
// =====================================

function checkTrueFalse(answer) {

    const correctAnswer =
        currentQuestions[currentQuestionIndex].answer;

    if (answer === correctAnswer) {

        score++;

        scoreDisplay.textContent = score;

        alert("Correct! ✅");

    } else {

        alert(
            `Wrong ❌\nCorrect answer: ${correctAnswer}`
        );

    }

    nextQuestion();

}


// =====================================
// NEXT QUESTION
// =====================================

function nextQuestion() {

    currentQuestionIndex++;


    if (
        currentQuestionIndex >=
        currentQuestions.length
    ) {

        finishPractice();

        return;
    }


    setTimeout(() => {

        showQuestion();

    }, 300);

}


// =====================================
// FINISH PRACTICE
// =====================================

function finishPractice() {

    practiceArea.style.display = "none";

    resultArea.style.display = "block";

    finalScore.textContent =
        `${score} / ${currentQuestions.length}`;


    const percentage =
        (score / currentQuestions.length) * 100;


    if (percentage === 100) {

        resultMessage.textContent =
            "Perfect Score! 🔥 Excellent work!";

    }

    else if (percentage >= 70) {

        resultMessage.textContent =
            "Great job! Keep practicing. 💪";

    }

    else if (percentage >= 40) {

        resultMessage.textContent =
            "Good attempt! Practice more to improve. 📚";

    }

    else {

        resultMessage.textContent =
            "Keep learning and try again! 🚀";

    }

}


// =====================================
// NEW PRACTICE
// =====================================

newPractice.addEventListener("click", () => {

    resultArea.style.display = "none";

    practiceArea.style.display = "none";

    document.querySelector(".hero").style.display = "block";

    document.querySelector(".practice-box").style.display = "block";

});


// =====================================
// TEXT SAFETY
// =====================================

function escapeText(text) {

    return text
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"');

    }
