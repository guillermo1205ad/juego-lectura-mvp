export const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Spanish
    utterance.rate = 0.8; // Slightly slower for kids
    utterance.pitch = 1.2; // Slightly higher pitch
    window.speechSynthesis.speak(utterance);
  }
};

export const playSuccessSound = () => {
  speak('¡Muy bien!');
};

export const playEncourageSound = () => {
  speak('¡Casi! Probemos otra vez.');
};
