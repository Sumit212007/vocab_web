import { vocabulary } from "./vocab.js";
import { playCorrectSound, playWrongSound } from "./sound.js";


//-----------------------
// Points SYSTEM
//-----------------------

let correctCount = 0;
let wrongCount = 0;

const correctCountEl = document.getElementById("correctCount");
const wrongCountEl = document.getElementById("wrongCount");
const resetBtn = document.getElementById("resetBtn");
const resetCountEl = document.getElementById("resetCount");


// Get HTML elements
const questionEl = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option-btn");

let currentQuestion;
let resetCount = 0;

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Load random question
function loadQuestion() {

    optionButtons.forEach(btn => {
        btn.classList.remove("correct", "wrong");
        btn.disabled = false;
    });

    const popupEl = document.getElementById("popup");
    popupEl.classList.remove("show");

    currentQuestion = vocabulary[Math.floor(Math.random() * vocabulary.length)];

    questionEl.textContent = `What is the synonym of "${currentQuestion.word}"?`;

    const shuffledOptions = shuffle([...currentQuestion.options]);

    optionButtons.forEach((btn, index) => {
        btn.textContent = shuffledOptions[index];
        btn.onclick = () => checkAnswer(btn);
    });
}

// reset score
    
function resetScore() {
    correctCount = 0;
    wrongCount = 0;
    correctCountEl.textContent = correctCount;
    wrongCountEl.textContent = wrongCount;
}

resetScore();

if (resetBtn) {
    resetBtn.addEventListener("click", () => {
        resetCount += 1;
        resetScore();
        loadQuestion();
    });
}

// -----------------------
// CHECK ANSWER
// -----------------------
function checkAnswer(btn) {
    const selected = btn.textContent;

    optionButtons.forEach(b => (b.disabled = true));

    if (selected === currentQuestion.correct) {
        btn.classList.add("correct");

        correctCount++;
        correctCountEl.textContent = correctCount;
        playCorrectSound();

        showPopup("Correct! 🎉", "#3ccf4e", () => {
            optionButtons.forEach(b => (b.disabled = false));
            loadQuestion();
        });
    } else {
        btn.classList.add("wrong");

        wrongCount++;
        wrongCountEl.textContent = wrongCount;
        playWrongSound();

        optionButtons.forEach(b => {
            if (b.innerText === currentQuestion.correct) b.classList.add("correct");
        });

        showPopup("Wrong ❌", "#ff5252", () => {
            optionButtons.forEach(b => (b.disabled = false));
            loadQuestion();
        });
    }
}

// -----------------------
// SHOW POPUP FUNCTION
// -----------------------
function showPopup(text, color, onClose) {
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");
    const nextBtn = document.getElementById("nextBtn");

    popupText.innerText = text;
    popup.style.background = color;
    popup.classList.add("show");

    // remove old listeners and add new clean one
    const newNext = nextBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(newNext, nextBtn);

    newNext.addEventListener("click", () => {
        popup.classList.remove("show");
        if (typeof onClose === "function") onClose();
    });
}

// Start game
loadQuestion();
