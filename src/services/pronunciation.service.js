class PronunciationService {
  play(word) {
    let msg = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(msg);
  }
}

export default PronunciationService;
