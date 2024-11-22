import kanjiChars from "./kanji";

const emojiMap: { [key: string]: string } = {};
const kanjiMap: { [key: string]: string } = {};

export const emojiToBytes = (data: Array<string>) => {
  if (!Object.keys(emojiMap).length) {
    getEmojis();
  }
  console.log(emojiMap);
  const res: number[] = [];
  data.forEach((ch) => {
    res.push(Number(emojiMap[ch]));
  });
  return new Uint8Array(res);
};

export const mathToBytes = (data: Array<string>) => {
  const res: number[] = [];
  data.forEach((ch) => {
    const charCode = (ch.charCodeAt(0) - 8704) % 256;
    res.push(charCode);
  });

  return new Uint8Array(res);
};

export const latinToBytes = (data: Array<string>) => {
  const res: number[] = [];
  data.forEach((ch) => {
    const charCode = (ch.charCodeAt(0) - 256) % 256;
    res.push(charCode);
  });

  return new Uint8Array(res);
};

export const kanjiToBytes = (data: Array<string>) => {
  if (!Object.keys(kanjiMap).length) {
    getKanji();
  }
  const res: number[] = [];
  data.forEach((ch) => {
    res.push(Number(kanjiMap[ch]));
  });
  return new Uint8Array(res);
};

export const dataToBytes = (data: string) => {
  const dataArray = Array.from(data);
  const code = dataArray[0].codePointAt(0);
  if (!code) {
    return new Uint8Array([]);
  }
  if (code > 127849) {
    return emojiToBytes(dataArray);
  } else if (code >= 19968) {
    return kanjiToBytes(dataArray);
  } else if (code > 8704) {
    return mathToBytes(dataArray);
  } else if (code > 256) {
    return latinToBytes(dataArray);
  }
  return new Uint8Array([]);
};

export const convertToEmoji = (dataInBytes: ArrayBuffer) => {
  const dataArray = Array.from(new Uint8Array(dataInBytes));
  const emojis = getEmojis();
  console.log(emojis);
  let res = "";
  dataArray.forEach((data) => {
    if (!emojis[data]) {
      console.log(data, "ERROR");
    }
    res += emojis[data];
  });
  return res;
};

export const convertToLatin = (dataInBytes: ArrayBuffer) => {
  const dataArray = Array.from(new Uint8Array(dataInBytes));
  let res = "";
  dataArray.forEach((data) => {
    const shapeCode = (Number(data) % 256) + 256;
    res += String.fromCharCode(shapeCode);
  });
  return res;
};

export const convertToMath = (dataInBytes: ArrayBuffer) => {
  const dataArray = Array.from(new Uint8Array(dataInBytes));
  let res = "";
  dataArray.forEach((data) => {
    const shapeCode = (Number(data) % 256) + 8704;
    res += String.fromCharCode(shapeCode);
  });
  return res;
};

export const convertToKanji = (dataInBytes: ArrayBuffer) => {
  const dataArray = Array.from(new Uint8Array(dataInBytes));
  const kanjiChars = getKanji();
  console.log(dataInBytes, "ENCRYPT");
  let res = "";
  dataArray.forEach((data) => {
    if (!kanjiChars[data]) {
      console.log(data, "ERROR");
    }
    res += kanjiChars[data];
  });
  return res;
};

const getEmojis = () => {
  const startIndex = [
    127849, 127917, 128045, 128070, 128112, 128512, 129296, 129488,
  ];
  const endIndex = [
    127891, 127948, 128063, 128080, 128120, 128591, 129338, 129506,
  ];
  let index = 0;
  const emojis: String[] = [];
  startIndex.forEach((start, i) => {
    const end = endIndex[i];
    for (let j = start; j <= end; j++) {
      emojis[index] = String.fromCodePoint(j);
      emojiMap[String.fromCodePoint(j)] = index.toString();
      index++;
    }
  });
  return emojis;
};

const getKanji = () => {
  for (let i = 0; i < kanjiChars.length; i++) {
    kanjiMap[kanjiChars[i]] = i.toString();
  }
  return kanjiChars;
};
