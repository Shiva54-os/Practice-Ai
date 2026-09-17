// ==========================================
// SHIVA PRACTICE AI
// Class 10 CBSE Practice System
// ==========================================


// ------------------------------------------
// ELEMENTS
// ------------------------------------------

const subjectSelect = document.getElementById("subject");
const chapterSelect = document.getElementById("chapter");
const questionTypeSelect = document.getElementById("questionType");
const questionCountSelect = document.getElementById("questionCount");

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


// ------------------------------------------
// DIFFICULTY
// ------------------------------------------

let selectedDifficulty = "";

difficultyButtons.forEach(button => {

    button.addEventListener("click", () => {

        difficultyButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedDifficulty =
            button.textContent.trim();

    });

});


// ------------------------------------------
// CLASS 10 CBSE CHAPTERS
// ------------------------------------------

const chapters = {

    science: [
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

    maths: [
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

    "social-science": [
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

    english: [
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

    hindi: [
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


// ------------------------------------------
// UPDATE CHAPTERS
// ------------------------------------------

subjectSelect.addEventListener("change", () => {

    const subject = subjectSelect.value;

    chapterSelect.innerHTML =
        '<option value="">Choose Chapter</option>';

    if (!chapters[subject]) return;

    chapters[subject].forEach((chapter, index) => {

        const option =
            document.createElement("option");

        option.value = chapter;

        option.textContent =
            `${index + 1}. ${chapter}`;

        chapterSelect.appendChild(option);

    });

});


// ------------------------------------------
// QUESTION DATABASE
// ------------------------------------------
//
// Demo questions for testing.
// Later this database will be replaced/
// expanded with AI-generated questions.
// ------------------------------------------

const questionBank = {

    mcq: [

        {
            q: "What is the chemical formula of water?",
            options: ["CO₂", "H₂O", "O₂", "H₂"],
            answer: "H₂O"
        },

        {
            q: "Which organelle is known as the powerhouse of the cell?",
            options: [
                "Nucleus",
                "Ribosome",
                "Mitochondria",
                "Golgi apparatus"
            ],
            answer: "Mitochondria"
        },

        {
            q: "What is the SI unit of electric current?",
            options: [
                "Volt",
                "Ohm",
                "Ampere",
                "Watt"
            ],
            answer: "Ampere"
        },

        {
            q: "The pH of a neutral solution is:",
            options: [
                "0",
                "5",
                "7",
                "14"
            ],
            answer: "7"
        },

        {
            q: "Which gas is released during photosynthesis?",
            options: [
                "Carbon dioxide",
                "Oxygen",
                "Nitrogen",
                "Hydrogen"
            ],
            answer: "Oxygen"
        }

    ],


    fillups: [

        {
            q: "The basic unit of life is the ________.",
            answer: "cell"
        },

        {
            q: "The process by which green plants prepare food is called ________.",
            answer: "photosynthesis"
        },

        {
            q: "The SI unit of force is ________.",
            answer: "newton"
        },

        {
            q: "The control centre of the cell is the ________.",
            answer: "nucleus"
        },

        {
            q: "A substance having pH less than 7 is generally ________.",
            answer: "acidic"
        }

    ],


    truefalse: [

        {
            q: "The Sun is a star.",
            answer: "true"
        },

        {
            q: "Plants release carbon dioxide during photosynthesis.",
            answer: "false"
        },

        {
            q: "The SI unit of force is Newton.",
            answer: "true"
        },

        {
            q: "All acids are solid at room temperature.",
            answer: "false"
        },

        {
            q: "Mitochondria are present in cells.",
            answer: "true"
        }

    ],


    oneword: [

        {
            q: "What is the SI unit of force?",
            answer: "newton"
        },

        {
            q: "Which organelle controls the activities of a cell?",
            answer: "nucleus"
        },

        {
            q: "What is the process of making food in plants called?",
            answer: "photosynthesis"
        },

        {
            q: "What is the SI unit of electric current?",
            answer: "ampere"
        },

        {
            q: "Which gas is essential for respiration?",
            answer: "oxygen"
        }

    ],


    "very-short": [

        {
            q: "Define photosynthesis.",
            answer: "Photosynthesis is the process by which green plants prepare food using sunlight."
        },

        {
            q: "What is an acid?",
            answer: "An acid is a substance that produces hydrogen ions in aqueous solution."
        },

        {
            q: "What is force?",
            answer: "Force is a push or pull acting on an object."
        },

        {
            q: "What is a cell?",
            answer: "A cell is the basic structural and functional unit of life."
        },

        {
            q: "What is reflection of light?",
            answer: "Reflection is the bouncing back of light from a surface."
        }

    ],


    short: [

        {
            q: "Explain why photosynthesis is important for living organisms.",
            answer: "Photosynthesis produces food and releases oxygen, making it essential for life."
        },

        {
            q: "Differentiate between acids and bases.",
            answer: "Acids generally produce hydrogen ions in water, while bases produce hydroxide ions."
        },

        {
            q: "What are the main functions of the cell membrane?",
            answer: "It protects the cell and controls the movement of substances into and out of the cell."
        },

        {
            q: "Explain the difference between speed and velocity.",
            answer: "Speed is distance travelled per unit time, while velocity is displacement per unit time in a specified direction."
        },

        {
            q: "What is electric current?",
            answer: "Electric current is the rate of flow of electric charge through a conductor."
        }

    ],


    long: [

        {
            q: "Explain the process of photosynthesis in detail.",
            answer: "Green plants use sunlight, carbon dioxide and water to prepare glucose in the presence of chlorophyll and release oxygen."
        },

        {
            q: "Explain the different types of chemical reactions with examples.",
            answer: "Chemical reactions include combination, decomposition, displacement and double displacement reactions."
        },

        {
            q: "Explain the structure and functions of the human heart.",
            answer: "The human heart is a muscular organ with four chambers that pumps blood throughout the body."
        },

        {
            q: "Explain Ohm's law and its mathematical expression.",
            answer: "Ohm's law states that current through a conductor is directly proportional to potential difference when temperature remains constant. V = IR."
        },

        {
            q: "Explain the causes and effects of environmental pollution.",
            answer: "Pollution results from harmful substances entering the environment and can affect air, water, soil and living organisms."
        }

    ],


    assertion: [

        {
            q: "Assertion: Plants perform photosynthesis. Reason: Chlorophyll helps plants absorb sunlight.",
            answer: "Both Assertion and Reason are true, and the Reason explains the Assertion."
        },

        {
            q: "Assertion: Electric current produces a magnetic field. Reason: Moving charges can produce magnetic effects.",
            answer: "Both Assertion and Reason are true, and the Reason explains the Assertion."
        },

        {
            q: "Assertion: Acids turn blue litmus red. Reason: Acids have acidic properties.",
            answer: "Both Assertion and Reason are true."
        },

        {
            q: "Assertion: The nucleus controls cell activities. Reason: It contains genetic material.",
            answer: "Both Assertion and Reason are true, and the Reason explains the Assertion."
        },

        {
            q: "Assertion: Metals are generally good conductors of electricity. Reason: Metals contain free electrons.",
            answer: "Both Assertion and Reason are true, and the Reason explains the Assertion."
        }

    ],


    match: [

        {
            q: "Match: Cell → ?",
            options: [
                "Basic unit of life",
                "Powerhouse of ecosystem",
                "Unit of force",
                "Unit of current"
            ],
            answer: "Basic unit of life"
        },

        {
            q: "Match: Newton → ?",
            options: [
                "Force",
                "Current",
                "Power",
                "Resistance"
            ],
            answer: "Force"
        },

        {
            q: "Match: Ampere → ?",
            options: [
                "Electric current",
                "Force",
                "Energy",
                "Pressure"
            ],
            answer: "Electric current"
        },

        {
            q: "Match: Chlorophyll → ?",
            options: [
                "Absorbs sunlight",
                "Controls heartbeat",
                "Produces sound",
                "Stores minerals"
            ],
            answer: "Absorbs sunlight"
        },

        {
            q: "Match: Nucleus → ?",
            options: [
                "Controls cell activities",
                "Produces light",
                "Moves blood",
                "Digests food"
            ],
            answer: "Controls cell activities"
        }

    ],


    "case-based": [

        {
            q: "A student places a green plant in sunlight. The plant uses carbon dioxide and water to prepare food. Which process is taking place?",
            options: [
                "Respiration",
                "Photosynthesis",
                "Digestion",
                "Transpiration"
            ],
            answer: "Photosynthesis"
        },

        {
            q: "A circuit contains a battery, switch and bulb. When the switch is closed, the bulb glows. What is flowing through the circuit?",
            options: [
                "Electric current",
                "Sound",
                "Light only",
                "Heat only"
            ],
            answer: "Electric current"
        },

        {
            q: "A student adds an acid to a base and observes a reaction. Which type of reaction is this?",
            options: [
                "Neutralisation",
                "Combustion",
                "Decomposition",
                "Displacement"
            ],
            answer: "Neutralisation"
        },

        {
            q: "A ray of light falls on a plane mirror and bounces back. What phenomenon is observed?",
            options: [
                "Refraction",
                "Reflection",
                "Dispersion",
                "Absorption"
            ],
            answer: "Reflection"
        },

        {
            q: "A plant kept without sufficient sunlight grows poorly. Which factor is mainly responsible?",
            options: [
                "Lack of sunlight",
                "Excess oxygen",
                "Excess nitrogen",
                "Lack of sound"
            ],
            answer: "Lack of sunlight"
        }

    ]

};


// ------------------------------------------
// PRACTICE VARIABLES
// ------------------------------------------

let currentQuestions = [];

let currentQuestionIndex = 0;

let score = 0;

let currentQuestionType = "";

let answered = false;


// ------------------------------------------
// START PRACTICE
// ------------------------------------------

startButton.addEventListener("click", () => {

    const subject = subjectSelect.value;

    const chapter = chapterSelect.value;

    const type = questionTypeSelect.value;

    const count =
        Number(questionCountSelect.value);


    if (!subject) {
        alert("Please select a subject.");
        return;
    }


    if (!chapter) {
        alert("Please select a chapter.");
        return;
    }


    if (!type) {
        alert("Please select a practice type.");
        return;
    }


    if (!selectedDifficulty) {
        alert("Please select a difficulty level.");
        return;
    }


    currentQuestionType = type;

    score = 0;

    currentQuestionIndex = 0;

    answered = false;


    // --------------------------------------
    // MIXED PRACTICE
    // --------------------------------------

    if (type === "mixed") {

        const allQuestions = [];

        Object.keys(questionBank).forEach(key => {

            questionBank[key].forEach(question => {

                allQuestions.push({
                    ...question,
                    type: key
                });

            });

        });


        currentQuestions =
            shuffleArray(allQuestions)
                .slice(0, count);

    }


    // --------------------------------------
    // NORMAL PRACTICE TYPE
    // --------------------------------------

    else {

        const bank =
            questionBank[type];

        if (!bank || bank.length === 0) {

            alert("Questions are not available yet.");

            return;
        }


        currentQuestions =
            shuffleArray([...bank])
                .slice(
                    0,
                    Math.min(count, bank.length)
                );

    }


    // --------------------------------------
    // SHOW PRACTICE
    // --------------------------------------

    document.querySelector(".hero").style.display =
        "none";

    document.querySelector(".practice-box").style.display =
        "none";

    resultArea.style.display =
        "none";

    practiceArea.style.display =
        "block";


    scoreDisplay.textContent =
        score;


    showQuestion();

});


// ------------------------------------------
// SHOW QUESTION
// ------------------------------------------

function showQuestion() {

    const question =
        currentQuestions[currentQuestionIndex];


    if (!question) return;


    answered = false;


    questionNumber.textContent =
        `Question ${currentQuestionIndex + 1} / ${currentQuestions.length}`;


    let type =
        currentQuestionType;


    if (type === "mixed") {
        type = question.type;
    }


    // --------------------------------------
    // MCQ / MATCH / CASE BASED
    // --------------------------------------

    if (
        type === "mcq" ||
        type === "match" ||
        type === "case-based"
    ) {

        questionContainer.innerHTML = `

            <div class="question">
                ${question.q}
            </div>

            <div class="options">

                ${question.options.map(option => `

                    <button
                        class="option"
                        data-answer="${escapeHTML(option)}">

                        ${option}

                    </button>

                `).join("")}

            </div>

        `;


        document
            .querySelectorAll(".option")
            .forEach(button => {

                button.addEventListener("click", () => {

                    checkOption(
                        button.dataset.answer
                    );

                });

            });

    }


    // --------------------------------------
    // FILL UPS
    // --------------------------------------

    else if (type === "fillups") {

        questionContainer.innerHTML = `

            <div class="question">
                ${question.q}
            </div>

            <input
                id="answerInput"
                type="text"
                placeholder="Type your answer..."
                style="
                    width:1
