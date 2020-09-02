import LangService from "./lang.service";
import config from "../config";

class PronunciationService {
  async play(word) {
    if (!word) return;
    let msg = new SpeechSynthesisUtterance(word.text);
    if (!word.langId) word.langId = config.DEFAULT_LANG_ID;
    const lang = await LangService.getLangById(word.langId);
    msg.lang = lang.code;
    window.speechSynthesis.speak(msg);
  }
}

export default PronunciationService;
