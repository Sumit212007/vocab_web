export function showPopup(text, color, onNext) {
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");
    const nextBtn = document.getElementById("nextBtn");

    if (!popup || !popupText || !nextBtn) {
        console.error("Popup elements not found in HTML!");
        return;
    }

    popupText.textContent = text;
    popup.style.background = color;

    popup.classList.add("show");

    // Remove old listeners
    const newNext = nextBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(newNext, nextBtn);

    // Add new listener
    newNext.addEventListener("click", () => {
        popup.classList.remove("show");
        onNext();
    });
}
