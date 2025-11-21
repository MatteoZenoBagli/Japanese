class Script {
  constructor(english_name, japanese_name, smallTsu, map) {
    this.englishName = english_name;
    this.japaneseName = japanese_name;
    this.smallTsu = smallTsu;
    this.map = map;
  }

  convert(text) {
    let result = "";
    let i = 0;
    text = text.toLowerCase();

    while (i < text.length) {
      // Handling double consonants
      if (
        i < text.length - 1 &&
        text[i] === text[i + 1] &&
        "kstpgzbdhjmyrw".includes(text[i])
      ) {
        result += this.smallTsu;
        i++;
        continue;
      }

      // Try 3 characters first
      let found = false;
      if (i <= text.length - 3) {
        let three = text.substr(i, 3);
        if (this.map[three]) {
          result += this.map[three];
          i += 3;
          found = true;
        }
      }

      // Then 2 characters
      if (!found && i <= text.length - 2) {
        let two = text.substr(i, 2);
        if (this.map[two]) {
          result += this.map[two];
          i += 2;
          found = true;
        }
      }

      // Finally with 1 character
      if (!found) {
        let one = text[i];
        if (this.map[one]) {
          result += this.map[one];
        } else {
          result += text[i];
        }
        i++;
      }
    }

    return result;
  }

  toString() {
    return this.englishName;
  }
}

// prettier-ignore
const romajiToHiraganaMap = {
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

// prettier-ignore
const romajiToKatakanaMap = {
  a: "ア",  i: "イ",    u: "ウ",    e: "エ",    o: "オ",
  ka: "カ", ki: "キ",   ku: "ク",   ke: "ケ",   ko: "コ",   kya: "キャ",  kyu: "キュ",  kyo: "キョ",
  sa: "サ", shi: "シ",  su: "ス",   se: "セ",   so: "ソ",   sha: "シャ",  shu: "シュ",  sho: "ショ",
  ta: "タ", chi: "チ",  tsu: "ツ",  te: "テ",   to: "ト",   cha: "チャ",  chu: "チュ",  cho: "チョ",
  na: "ナ", ni: "ニ",   nu: "ヌ",   ne: "ネ",   no: "ノ",   nya: "ニャ",  nyu: "ニュ",  nyo: "ニョ", n: "ン",
  ha: "ハ", hi: "ヒ",   fu: "フ",   he: "ヘ",   ho: "ホ",   hya: "ヒャ",  hyu: "ヒュ",  hyo: "ヒョ",
  ma: "マ", mi: "ミ",   mu: "ム",   me: "メ",   mo: "モ",   mya: "ミャ",  myu: "ミュ",  myo: "ミョ",
  ya: "ヤ",             yu: "ユ",              yo: "ヨ",
  ra: "ラ", ri: "リ",   ru: "ル",   re: "レ",   ro: "ロ",   rya: "リャ",  ryu: "リュ",  ryo: "リョ",
  wa: "ワ",                                    wo: "ヲ",
  ga: "ガ", gi: "ギ",   gu: "グ",   ge: "ゲ",   go: "ゴ",   gya: "ギャ",  gyu: "ギュ",  gyo: "ギョ",
  za: "ザ", ji: "ジ",   zu: "ズ",   ze: "ゼ",   zo: "ゾ",   ja: "ジャ",   ju: "ジュ",   jo: "ジョ",
  da: "ダ", di: "ヂ",   du: "ヅ",   de: "デ",   do: "ド",
  ba: "バ", bi: "ビ",   bu: "ブ",   be: "ベ",   bo: "ボ",   bya: "ビャ",  byu: "ビュ",  byo: "ビョ",
  pa: "パ", pi: "ピ",   pu: "プ",   pe: "ペ",   po: "ポ",   pya: "ピャ",  pyu: "ピュ",  pyo: "ピョ",
};

const Hiragana = new Script(
  "Hiragana",
  "あいうえお",
  "っ",
  romajiToHiraganaMap
);

const Katakana = new Script(
  "Katakana",
  "アイウエオ",
  "ッ",
  romajiToKatakanaMap
);

const SCRIPTS = [Hiragana, Katakana];

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

class RomajiConverter extends HTMLElement {
  constructor() {
    super();
    this.DEBUG = true;
    this.currentScript = Hiragana; // Default script
  }

  connectedCallback() {
    this.log("Component connected");
    this.init();
  }

  init() {
    this.log("Initializing...");

    const scriptSelector = this.querySelectorAll('input[name="script"]');
    if (!scriptSelector) throw '"scriptSelector" not provided';

    const scriptLabelsEnglish = this.querySelectorAll(
      'span[name="script"][lang="en"]'
    );
    if (!scriptLabelsEnglish) throw '"scriptLabelsEnglish" not provided';

    const scriptLabelsJapanese = this.querySelectorAll(
      'span[name="script"][lang="ja"]'
    );
    if (!scriptLabelsJapanese) throw '"scriptLabelsJapanese" not provided';

    const inputTextarea = this.querySelector("#input");
    if (!inputTextarea) throw '"inputTextarea" not provided';

    const outputTextarea = this.querySelector("#output");
    if (!outputTextarea) throw '"outputTextarea" not provided';

    inputTextarea.addEventListener("input", () => {
      this.convert(inputTextarea, outputTextarea);
    });

    for (const radio of scriptSelector)
      radio.addEventListener("change", (e) => {
        this.currentScript = SCRIPTS.find(
          (s) => s.englishName.toLowerCase() === e.target.value
        );
        this.log(
          `Script changed to: ${this.currentScript.englishName} (${this.currentScript.japaneseName})`
        );
        for (const label of scriptLabelsEnglish)
          label.textContent = capitalize(this.currentScript.englishName);
        for (const label of scriptLabelsJapanese)
          label.textContent = capitalize(this.currentScript.japaneseName);
        this.convert(inputTextarea, outputTextarea);
      });
  }

  convert(inputTextarea, outputTextarea) {
    const inputText = inputTextarea.value;
    const convertedText = this.currentScript.convert(inputText);
    outputTextarea.value = convertedText;
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

    console.log(`%c[RomajiConverter]`, styles[type] || styles.info, message);
  }
}

customElements.define("romaji-converter", RomajiConverter);
