// prettier-ignore
const romajiToHiragana = {
  a: "あ",  i: "い",    u: "う",    e: "え",    o: "お",
  ka: "か", ki: "き",   ku: "く",   ke: "け",   ko: "こ",   kya: "きゃ",  kyu: "きゅ",  kyo: "きょ",
  sa: "さ", shi: "し",  su: "す",   se: "せ",   so: "そ",   sha: "しゃ",  shu: "しゅ",  sho: "しょ",
  ta: "た", chi: "ち",  tsu: "つ",  te: "て",   to: "と",   cha: "ちゃ",  chu: "ちゅ",  cho: "ちょ",
  na: "な", ni: "に",   nu: "ぬ",   ne: "ね",   no: "の",   nya: "にゃ",  nyu: "にゅ",  nyo: "にょ", n: "ん",
  ha: "は", hi: "ひ",   fu: "ふ",   he: "へ",   ho: "ほ",   hya: "ひゃ",  hyu: "ひゅ",  hyo: "ひょ",
  ma: "ま", mi: "み",   mu: "む",   me: "め",   mo: "も",   mya: "みゃ",  myu: "みゅ",  myo: "みょ",
  ya: "や",             yu: "ゆ",              yo: "よ",
  ra: "ら", ri: "り",   ru: "る",   re: "れ",   ro: "ろ",   rya: "りゃ",  ryu: "りゅ",  ryo: "りょ",
  wa: "わ",                                    wo: "を",
  ga: "が", gi: "ぎ",   gu: "ぐ",   ge: "げ",   go: "ご",   gya: "ぎゃ",  gyu: "ぎゅ",  gyo: "ぎょ",
  za: "ざ", ji: "じ",   zu: "ず",   ze: "ぜ",   zo: "ぞ",   ja: "じゃ",   ju: "じゅ",   jo: "じょ",
  da: "だ", di: "ぢ",   du: "づ",   de: "で",   do: "ど",
  ba: "ば", bi: "び",   bu: "ぶ",   be: "べ",   bo: "ぼ",   bya: "びゃ",  byu: "びゅ",  byo: "びょ",
  pa: "ぱ", pi: "ぴ",   pu: "ぷ",   pe: "ぺ",   po: "ぽ",   pya: "ぴゃ",  pyu: "ぴゅ",  pyo: "ぴょ",
};

function convertToHiragana(text) {
  let result = "";
  let i = 0;
  text = text.toLowerCase();

  while (i < text.length) {
    // Handling double consonants (っ - small tsu)
    if (
      i < text.length - 1 &&
      text[i] === text[i + 1] &&
      "kstpgzbdhjmyrw".includes(text[i])
    ) {
      result += "っ";
      i++;
      continue;
    }

    // Try 3 characters first
    let found = false;
    if (i <= text.length - 3) {
      let three = text.substr(i, 3);
      if (romajiToHiragana[three]) {
        result += romajiToHiragana[three];
        i += 3;
        found = true;
      }
    }

    // Then 2 characters
    if (!found && i <= text.length - 2) {
      let two = text.substr(i, 2);
      if (romajiToHiragana[two]) {
        result += romajiToHiragana[two];
        i += 2;
        found = true;
      }
    }

    // Finally with 1 character
    if (!found) {
      let one = text[i];
      if (romajiToHiragana[one]) {
        // Keep non-convertible characters (spaces, punctuation, etc.)
        result += romajiToHiragana[one];
      } else {
        result += text[i];
      }
      i++;
    }
  }

  return result;
}

class RomajiToHiragana extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.log("Component connected");
    this.init();
  }

  init() {
    this.log("Initializing...");

    const inputTextarea = this.querySelector("#input");
    if (!inputTextarea) throw '"inputTextarea" not provided';

    const outputTextarea = this.querySelector("#output");
    if (!outputTextarea) throw '"outputTextarea" not provided';

    inputTextarea.addEventListener("input", function () {
      const inputText = this.value;
      const hiraganaText = convertToHiragana(inputText);
      outputTextarea.value = hiraganaText;
    });
  }

  disconnectedCallback() {
    this.log("Component disconnected");
  }

  error(message) {
    this.log(message, "error");
  }

  log(message, type = "info") {
    if (!this.DEBUG) return;

    const styles = {
      info: "color: #2196F3",
      error: "color: #f44336",
      success: "color: #4CAF50",
    };

    console.log(`%c[RomajiToHiragana]`, styles[type] || styles.info, message);
  }
}

customElements.define("romaji-to-hiragana", RomajiToHiragana);
