const btn = document.getElementById("speakBtn");
const questionEl = document.getElementById("question");

btn.addEventListener("click", () => {

  const textToSpeak = questionEl.dataset.word || questionEl.innerText;
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  speechSynthesis.speak(utterance);
  
});
