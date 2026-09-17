// SHIVA Practice AI
// Class 10 CBSE Practice Website

const subjectSelect = document.getElementById("subject");
const chapterSelect = document.getElementById("chapter");
const questionTypeSelect = document.getElementById("questionType");
const questionCountSelect = document.getElementById("questionCount");
const startButton = document.getElementById("startPractice");

const practiceArea = document.getElementById("practiceArea");
const resultArea = document.getElementById("resultArea");

const questionContainer = document.getElementById("questionContainer");
const questionNumber = document.getElementById("questionNumber");
const scoreDisplay = document.getElementById("scoreDisplay");

const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");
const newPractice = document.getElementById("newPractice");

const difficultyButtons = document.querySelectorAll(".difficulty-btn");

let selectedDifficulty = "medium";
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;


// ===============================
// CLASS 10 CBSE CHAPTERS
// ===============================

const chapters = {

    Science: [
        "Chemical Reactions and Equations",
        "Acids, Bases and Salts",
        "Metals and Non-metals",
        "Carbon and Its Compounds",
        "Life Processes",
        "Control and Coordination",
        "How do Organisms Reproduce?",
        "Heredity",
        "Light – Reflection and Refraction",
        "The Human Eye and the Colourful World",
        "Electricity",
        "Magnetic Effects of Electric Current",
        "Our Environment"
    ],

    Maths: [
        "Real Numbers",
        "Polynomials",
        "Pair of Linear Equations in Two Variables",
        "Quadratic Equations",
        "Arithmetic Progressions",
        "Triangles",
        "Coordinate Geometry",
        "Introduction to Trigonometry",
        "Some Applications of Trigonometry",
        "Circles",
        "Areas Related to Circles",
        "Surface Areas and Volumes",
        "Statistics",
        "Probability"
    ],

    "Social Science": [
        "The Rise of Nationalism in Europe",
        "Nationalism in India",
        "The Making of a Global World",
        "The Age of Industrialisation",
        "Print Culture and the Modern World",
        "Resources and Development",
        "Forest and Wildlife Resources",
        "Water Resources",
        "Agriculture",
        "Minerals and Energy Resources",
        "Manufacturing Industries",
        "Lifelines of National Economy",
        "Power Sharing",
        "Federalism",
        "Gender, Religion and Caste",
        "Political Parties",
        "Outcomes of Democracy",
        "Development",
        "Sectors of the Indian Economy",
        "Money and Credit",
        "Globalisation and the Indian Economy",
        "Consumer Rights"
    ],

    English: [
        "A Letter to God",
        "Nelson Mandela: Long Walk to Freedom",
        "Two Stories About Flying",
        "From the Diary of Anne Frank",
        "Glimpses of India",
        "Mijbil the Otter",
        "Madam Rides the Bus",
        "The Sermon at Benares",
        "The Proposal",
        "Dust of Snow",
        "Fire and Ice",
        "A Tiger in the Zoo",
        "How to Tell Wild Animals",
        "The Ball Poem",
        "Amanda!",
        "The Trees",
        "Fog",
        "The Tale of Custard the Dragon",
        "For Anne Gregory"
    ],

    Hindi: [
        "सूरदास",
        "राम-लक्ष्मण-परशुराम संवाद",
        "आत्मकथ्य",
        "उत्साह और अट नहीं रही",
        "यह दंतुरित मुस्कान और फसल",
        "संगतकार",
        "नेताजी का चश्मा",
        "बालगोबिन भगत",
        "लखनवी अंदाज़",
        "मानवीय करुणा की दिव्य चमक",
        "एक कहानी यह भी",
        "नौबतखाने में इबादत",
        "संस्कृति"
    ]
};


// ===============================
// LOAD CHAPTERS
// ===============================

subjectSelect.addEventListener("change", () => {

    const subject = subjectSelect.value;

    chapterSelect.innerHTML =
        '<option value="">Choose Chapter</option>';

    if (!chapters[subject]) {
        return;
    }

    chapters[subject].forEach((chapter) => {

        const option = document.createElement("option");

        option.value = chapter;

        // IMPORTANT:
        // Only chapter name will be shown.
        // No chapter number.
        option.textContent = chapter;

        chapterSelect.appendChild(option);
    });
});


// ===============================
// DIFFICULTY
// ===============================

difficultyButtons.forEach(button => {

    button.addEventListener("click", () => {

        difficultyButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedDifficulty = button.dataset.difficulty;
    });

});


// ===============================
// DEMO QUESTION BANK
// ===============================

const questionBank = {

    mcq: [
        {
            question: "Which gas is evolved when a metal reacts with an acid?",
            options: [
                "Oxygen",
                "Hydrogen",
                "Nitrogen",
                "Carbon dioxide"
            ],
            answer: "Hydrogen"
        },

        {
            question: "What is the value of sin 90°?",
            options: [
                "0",
                "1",
                "1/2",
                "√3/2"
            ],
            answer: "1"
        },

        {
            question: "Who wrote 'A Letter to God'?",
            options: [
                "G.L. Fuentes",
                "Nelson Mandela",
                "Anne Frank",
                "Robert Frost"
            ],
            answer: "G.L. Fuentes"
        },

        {
            question: "Which type of government has power divided between different levels?",
            options: [
                "Federal government",
                "Monarchy",
                "Dictatorship",
                "Military government"
            ],
            answer: "Federal government"
        }
    ],


    fillups: [
        {
            question: "The chemical formula of water is ______.",
            answer: "H2O"
        },

        {
            question: "The value of π is approximately ______.",
            answer: "3.14"
        },

        {
            question: "The process by which green plants prepare food is called ______.",
            answer: "photosynthesis"
        }
    ],


    truefalse: [
        {
            question: "The sun is a source of light.",
            answer: "True"
        },

        {
            question: "Every prime number is an even number.",
            answer: "False"
        },

        {
            question: "Plants perform photosynthesis.",
            answer: "True"
        },

        {
            question: "The Earth is a perfect sphere.",
            answer: "False"
        }
    ],


    oneword: [
        {
            question: "What is the basic unit of life?",
            answer: "Cell"
        },

        {
            question: "What is the SI unit of electric current?",
            answer: "Ampere"
        },

        {
            question: "What is the smallest prime number?",
            answer: "2"
        }
    ],


    "very-short": [
        {
            question: "What is an acid?",
            answer: "A substance that produces H+ ions in aqueous solution."
        },

        {
            question: "What is a polynomial?",
            answer: "An algebraic expression containing variables and coefficients."
        }
    ],


    short: [
        {
            question: "Explain the difference between acids and bases.",
            answer: "Acids produce H+ ions in aqueous solution, while bases produce OH- ions."
        },

        {
            question: "What is federalism?",
            answer: "Federalism is a system in which power is divided between different levels of government."
        }
    ],


    long: [
        {
            question: "Explain the process of photosynthesis and write its importance.",
            answer: "Photosynthesis is the process by which green plants prepare food using carbon dioxide, water and sunlight in the presence of chlorophyll."
        },

        {
            question: "Explain the main features of democracy.",
            answer: "Democracy is a system of government in which rulers are elected by the people. It is based on free and fair elections, political equality and citizen participation."
        }
    ],


    assertion: [
        {
            question: "Assertion: Metals generally conduct electricity.\nReason: Metals contain free electrons.",
            options: [
                "Both Assertion and Reason are true, and Reason correctly explains Assertion.",
                "Both Assertion and Reason are true, but Reason does not explain Assertion.",
                "Assertion is true but Reason is false.",
                "Assertion is false but Reason is true."
            ],
            answer: "Both Assertion and Reason are true, and Reason correctly explains Assertion."
        }
    ],


    match: [
        {
            question: "Match the following:",
            pairs: [
                ["Hydrogen", "H₂"],
                ["Oxygen", "O₂"],
                ["Nitrogen", "N₂"],
                ["Carbon dioxide", "CO₂"]
            ],
            answer: "Hydrogen-H₂, Oxygen-O₂, Nitrogen-N₂, Carbon dioxide-CO₂"
        }
    ],


    "case-based": [
        {
            question:
                "A student places a metal strip in a solution of copper sulphate. After some time, a change is observed. Answer the following question based on this situation.",

            options: [
                "A displacement reaction may occur.",
                "No reaction can occur.",
                "Only a physical change occurs.",
                "The solution becomes pure water."
            ],

            answer: "A displacement reaction may occur."
        }
    ]

};


// ===============================
// SHUFFLE FUNCTION
// ===============================

function shuffleArray(array) {

    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [newArray[i], newArray[j]] =
            [newArray[j], newArray[i]];
    }

    return newArray;
}


// ===============================
// START PRACTICE
// ===============================

startButton.addEventListener("click", () => {

    const subject = subjectSelect.value;
    const chapter = chapterSelect.value;
    const type = questionTypeSelect.value;
    const count = Number(questionCountSelect.value);

    if (!subject) {
        alert("Please select a subject.");
        return;
    }

    if (!chapter) {
        alert("Please select a chapter.");
        return;
    }

    if (!type) {
        alert("Please select a question type.");
        return;
    }

    if (!selectedDifficulty) {
        alert("Please select difficulty.");
        return;
    }

    let questions = [];

    if (type === "mixed") {

        Object.keys(questionBank).forEach(key => {
            questions.push(...questionBank[key]);
        });

    } else {

        questions = questionBank[type] || [];
    }


    if (questions.length === 0) {

        alert("Practice questions will be added soon.");

        return;
    }


    currentQuestions =
        shuffleArray(questions).slice(0, count);

    currentQuestionIndex = 0;

    score = 0;

    scoreDisplay.textContent = "Score: 0";

    resultArea.style.display = "none";

    practiceArea.style.display = "block";

    renderQuestion();
});


// ===============================
// RENDER QUESTION
// ===============================

function renderQuestion() {

    const question =
        currentQuestions[currentQuestionIndex];

    if (!question) {

        showResult();

        return;
    }


    questionNumber.textContent =
        `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;


    let html = `
        <div class="question-box">

            <h3>${escapeHTML(question.question)}</h3>
    `;


    // MCQ / CASE BASED / ASSERTION

    if (question.options) {

        question.options.forEach((option, index) => {

            html += `
                <button
                    class="answer-option"
                    onclick="selectAnswer(${index})"
                >
                    ${escapeHTML(option)}
                </button>
            `;

        });

    }


    // TRUE / FALSE

    else if (
        questionBank.truefalse.includes(question)
    ) {

        html += `
            <button
                class="answer-option"
                onclick="checkTextAnswer('True')"
            >
                True
            </button>

            <button
                class="answer-option"
                onclick="checkTextAnswer('False')"
            >
                False
            </button>
        `;

    }


    // FILL UPS / ONE WORD

    else if (
        questionBank.fillups.includes(question) ||
        questionBank.oneword.includes(question)
    ) {

        html += `
            <input
                type="text"
                id="textAnswer"
                class="answer-input"
                placeholder="Type your answer..."
            >

            <button
                class="submit-answer"
                onclick="submitTextAnswer()"
            >
                Submit Answer
            </button>
        `;

    }


    // VERY SHORT / SHORT / LONG

    else {

        html += `
            <textarea
                id="textAnswer"
                class="answer-textarea"
                placeholder="Write your answer..."
            ></textarea>

            <button
                class="submit-answer"
                onclick="submitTextAnswer()"
            >
                Submit Answer
            </button>
        `;

    }


    html += `
        </div>
    `;


    questionContainer.innerHTML = html;
}


// ===============================
// MCQ ANSWER
// ===============================

function selectAnswer(index) {

    const question =
        currentQuestions[currentQuestionIndex];

    const selected =
        question.options[index];


    if (
        selected.toLowerCase().trim() ===
        question.answer.toLowerCase().trim()
    ) {

        score++;

        scoreDisplay.textContent =
            `Score: ${score}`;

    }


    nextQuestion();
}


// ===============================
// TRUE / FALSE
// ===============================

function checkTextAnswer(answer) {

    const question =
        currentQuestions[currentQuestionIndex];

    if (
        answer.toLowerCase() ===
        question.answer.toLowerCase()
    ) {

        score++;

        scoreDisplay.textContent =
            `Score: ${score}`;
    }


    nextQuestion();
}


// ===============================
// TEXT ANSWER
// ===============================

function submitTextAnswer() {

    const input =
        document.getElementById("textAnswer");

    if (!input) return;

    const userAnswer =
        input.value.trim().toLowerCase();

    if (!userAnswer) {

        alert("Please write an answer.");

        return;
    }


    const question =
        currentQuestions[currentQuestionIndex];

    const correctAnswer =
        question.answer.toLowerCase();


    if (
        userAnswer === correctAnswer ||
        userAnswer.includes(correctAnswer) ||
        correctAnswer.includes(userAnswer)
    ) {

        score++;

        scoreDisplay.textContent =
            `Score: ${score}`;
    }


    nextQuestion();
}


// ===============================
// NEXT QUESTION
// ===============================

function nextQuestion() {

    currentQuestionIndex++;

    setTimeout(() => {

        renderQuestion();

    }, 200);
}


// ===============================
// SHOW RESULT
// ===============================

function showResult() {

    practiceArea.style.display = "none";

    resultArea.style.display = "block";


    finalScore.textContent =
        `${score} / ${currentQuestions.length}`;


    const percentage =
        (score / currentQuestions.length) * 100;


    if (percentage >= 80) {

        resultMessage.textContent =
            "Excellent! Keep practicing. 🔥";

    }

    else if (percentage >= 50) {

        resultMessage.textContent =
            "Good job! You can improve further. 💪";

    }

    else {

        resultMessage.textContent =
            "Keep practicing and try again. 📚";
    }

}


// ===============================
// NEW PRACTICE
// ===============================

newPractice.addEventListener("click", () => {

    resultArea.style.display = "none";

    practiceArea.style.display = "none";

    questionContainer.innerHTML = "";

    score = 0;

    currentQuestionIndex = 0;

});


// ===============================
// HTML SECURITY
// ===============================

function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
