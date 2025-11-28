let audioCtx;

function getAudioContext() {
    if (typeof window === "undefined") return null;
    if (!audioCtx) {
        const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextConstructor) return null;
        audioCtx = new AudioContextConstructor();
    }

    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }

    return audioCtx;
}

function playTone({ frequency, duration, type = "sine", gain = 0.2 }) {
    const ctx = getAudioContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    gainNode.gain.setValueAtTime(gain, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
}

export function playCorrectSound() {
    // Slightly upbeat arpeggio for correct answers
    playTone({ frequency: 660, duration: 0.12, type: "triangle" });
    setTimeout(() => playTone({ frequency: 880, duration: 0.12, type: "triangle" }), 120);
}

export function playWrongSound() {
    // Quick lower chirp for wrong answers
    playTone({ frequency: 220, duration: 0.18, type: "sawtooth", gain: 0.15 });
    setTimeout(() => playTone({ frequency: 160, duration: 0.22, type: "sawtooth", gain: 0.12 }), 120);
}
