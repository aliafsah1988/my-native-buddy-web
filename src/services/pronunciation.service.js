import LangService from "./lang.service";

class PronunciationService {
  async play(word) {
    if (!word) return;
    let msg = new SpeechSynthesisUtterance(word.text);
    const lang = await LangService.getLangById(word.langId);
    msg.lang = lang.code;
    window.speechSynthesis.speak(msg);
  }
}

export default PronunciationService;
