import { useState } from "react";
import CopyToClipboard from "./copyToClipboard";
import { encrypt } from "./crypto";
import { convertToEmoji, convertToLatin, convertToMath } from "./transformData";

const THEME = {
  LATIN: "latin",
  MATH: "math",
  EMOJI: "emoji",
};
const EncryptView = () => {
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [encryptedBuffer, setEncryptedBuffer] = useState<ArrayBuffer | null>(
    null
  );
  const [theme, setTheme] = useState(THEME.EMOJI);

  const updateTheme = (event: { target: HTMLInputElement }) => {
    setTheme(event.target.value);
  };

  const renderEncryptedContent = (encryptedBuffer: ArrayBuffer) => {
    if (theme === THEME.LATIN) {
      return convertToLatin(encryptedBuffer);
    } else if (theme === THEME.MATH) {
      return convertToMath(encryptedBuffer);
    } else if (theme === THEME.EMOJI) {
      return convertToEmoji(encryptedBuffer);
    }
    return "";
  };
  return (
    <div className="flex flex-col align-items-center justify-content-center">
      <div className="flex flex-col" style={{ width: "50%" }}>
        <label htmlFor="message"> Enter the message</label>
        <textarea
          className="flex-item"
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={5}
        ></textarea>
        <label htmlFor="password"> Enter the password </label>
        <input
          type="password"
          className="flex-item"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <p className="flex-item theme"> Select theme</p>
        <div className="flex align-items-center justify-content-center theme-options">
          <div className="flex">
            <input
              type="radio"
              id="emoji"
              value="emoji"
              onChange={updateTheme}
              checked={theme === "emoji"}
            />
              <label htmlFor="emoji">😍 😙 🧜 🙌 😦 😛 🙀 🤒 🤩 🤯 🏂 😁</label>
          </div>
          <div className="flex ">
            <input
              type="radio"
              id="latin"
              value="latin"
              onChange={updateTheme}
              checked={theme === "latin"}
            />
             {" "}
            <label htmlFor="latin">
              <span>Ā ā Ć Ď Ɗ ƌ ƍ Ĕ Ĳ Ķ Ƙ Ĺ Œ Ŕ Ŝ Ţ Ɨ Ũ Ů Ŵ ų Ŷ Ź </span>
            </label>
          </div>
          <div className="flex">
            <input
              type="radio"
              id="math"
              value="math"
              onChange={updateTheme}
              checked={theme === "math"}
            />
             {" "}
            <label htmlFor="math">
              {" "}
              ≱ ⊥ ∞ ⊕ ∆ ≑ ∭ ⋔ √ ∏ ∌ ⋿ ⊭ ⋩ ∀ ∃ ∌ ∑ ∓{" "}
            </label>
          </div>
        </div>
        <button
          className="encrypt-btn flex-item"
          onClick={async () => {
            try {
              if (!message || !password) {
                return;
              }
              const data = await encrypt(message, password);
              setEncryptedBuffer(data);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {" "}
          Encrypt
        </button>
        {encryptedBuffer && (
          <div className="flex">
            <div className={`flex-item encrypted-text ${theme}`}>
              {renderEncryptedContent(encryptedBuffer)}{" "}
            </div>{" "}
            <CopyToClipboard text={renderEncryptedContent(encryptedBuffer)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EncryptView;
