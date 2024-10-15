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
};
export const themes: {
  emoji: Array<string>;
  latin: Array<string>;
  math: Array<string>;
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

const DynamicBackground = ({
  theme = "emoji",
}: {
  theme: keyof typeof themes;
}) => {
  const [elements, setElements] = useState<Array<Element>>([]);
  const placedElements = useRef<Array<{ x: number; y: number; size: number }>>(
    [],
  );

  const isOverlapping = (newPos: { x: number; y: number }, size: number) => {
    return placedElements.current.some((pos) => {
      const distance = Math.sqrt(
        Math.pow(newPos.x - pos.x, 2) + Math.pow(newPos.y - pos.y, 2),
      );
      return distance < size; // Ensure there's space between elements
    });
  };

  const createElement = useCallback((content: Array<string>) => {
    const size = randomInRange(20, 80); // Random size for elements
    let newPos;

    // Loop to find a valid position that doesn't overlap
    do {
      newPos = {
        x: randomInRange(0, window.innerWidth - size),
        y: randomInRange(0, window.innerHeight - size),
      };
    } while (isOverlapping(newPos, size + 20));

    placedElements.current.push({ x: newPos.x, y: newPos.y, size });

    // Return the element object
    return {
      content: content[randomInRange(0, content.length - 1)],
      size,
      x: newPos.x,
      y: newPos.y,
      color: getRandomColor(),
    };
  }, []);

  useEffect(() => {
    placedElements.current = [];

    const content = themes[theme] || themes.emoji;
    const elementsArray: Array<Element> = [];

    for (let i = 0; i < 50; i++) {
      elementsArray.push(createElement(content));
    }
    setElements(elementsArray);
  }, [createElement, theme]);

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
            opacity: "0.15",
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
};

export default DynamicBackground;
