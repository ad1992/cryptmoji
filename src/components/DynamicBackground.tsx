import React, { useCallback, useEffect, useRef, useState } from "react";
import "./DynamicBackground.scss";

interface Element {
  content: string;
  size: number;
  x: number;
  y: number;
  color: string;
}
export const BG_THEME_TYPES = {
  EMOJI: "emoji",
  LATIN: "latin",
  MATH: "math",
  KANJI: "kanji",
};
export const themes: {
  emoji: Array<string>;
  latin: Array<string>;
  math: Array<string>;
  kanji: Array<string>;
} = {
  emoji: [
    "😍",
    "😊",
    "😙",
    " 🧜",
    "🙌",
    "😦",
    "😛",
    "🙀",
    "🤩",
    "🤯",
    "🏂",
    "😀",
    "🎉",
    "🔥",
    "🚀",
    "😎",
    "💻",
    "✨",
  ],
  latin: [
    "Ā",
    "ā",
    "Ć",
    "Ď",
    "Ɗ",
    "ƌ",
    "ƍ",
    "Ĕ",
    "Ĳ",
    "Ķ",
    "Ƙ",
    "Ĺ",
    "Œ",
    "Ŕ",
    "Ŝ",
    "Ţ",
    "Ɨ",
    "Ũ",
    "Ů",
    "Ŵ",
    "ų",
    "Ŷ",
    "Ź",
  ],
  math: [
    "≱",
    "⊥",
    "∞",
    "⊕",
    "∆",
    "≑",
    "∭",
    "⋔",
    "√",
    "∏",
    "∌",
    "⋿",
    "⊭",
    "⋩",
    "∀",
    "∃",
    "∌",
    "∑",
    "∓",
  ],
  kanji: [
    "愛",
    "夢",
    "力",
    "光",
    "友",
    "和",
    "風",
    "桜",
    "火",
    "水",
    "木",
    "土",
    "山",
    "海",
    "空",
    "星",
    "森",
    "道",
    "心",
    "花",
  ],
};

const randomInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const calculateGridDimensions = (
  eleCount: number,
  screenWidth: number,
  screenHeight: number,
) => {
  const MULTIPLIER = 10;
  const aspectRatio = screenWidth / screenHeight;
  const cols = Math.ceil(Math.sqrt(aspectRatio) * MULTIPLIER);
  const rows = Math.ceil(cols / aspectRatio);
  return { cols, rows };
};

const { rows, cols } = calculateGridDimensions(
  100,
  window.innerWidth,
  window.innerHeight,
);

const gridCellWidth = Math.floor(window.innerWidth / cols);
const gridCellHeight = Math.floor(window.innerHeight / rows);
const DynamicBackground = React.memo(
  ({ theme = "emoji" }: { theme: keyof typeof themes }) => {
    const [elements, setElements] = useState<Array<Element>>([]);
    const placedElements = useRef<
      Array<{ x: number; y: number; size: number }>
    >([]);

    useEffect(() => {
      placedElements.current = [];

      const content = themes[theme] || themes.emoji;
      const elementsArray: Array<Element> = [];

      for (let i = 0; i < cols * rows; i++) {
        const minwidth = Math.min(20, gridCellWidth);
        const maxWidth = Math.min(80, gridCellWidth);
        const size = randomInRange(minwidth, maxWidth); // Random size for elements
        const col = i % cols;
        const row = Math.floor(i / cols);

        // Calculate position for each emoji
        const x = col * gridCellWidth;
        const y = row * gridCellHeight;

        placedElements.current.push({ x, y, size });
        elementsArray.push({
          content: content[randomInRange(0, content.length - 1)],
          size,
          x,
          y,
          color: getRandomColor(),
        });
      }
      setElements(elementsArray);
    }, [theme]);

    return (
      <div className="dynamic-bg">
        {elements.map((el, index) => (
          <span
            key={index}
            className="bg-element"
            style={{
              fontSize: `${el.size}px`,
              position: "absolute",
              top: `${el.y}px`,
              left: `${el.x}px`,
              opacity: "0.1",
              userSelect: "none",
              transform: `rotate(${randomInRange(0, 360)}deg)`,
              color: el.color,
            }}
          >
            {el.content}
          </span>
        ))}
      </div>
    );
  },
);

export default DynamicBackground;
