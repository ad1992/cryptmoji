import { useState } from "react";
import { encrypt } from "./crypto";
import { convertToEmoji, convertToLatin, convertToMath } from "./transformData";

const THEME = {
  RAW: "raw",
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
  const [theme, setTheme] = useState("latin");

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
  };
  return (
    <div className="encrypt-view flex-container">
      <label>
        {" "}
        Enter the message
        <textarea
          className="flex-item"
          placeholder="Enter the message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        ></textarea>
      </label>
      <label>
        {" "}
        Enter the password
        <input
          className="flex-item"
          placeholder="Enter the password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
      </label>
      <p> Select theme</p>{" "}
      <div className="flex align-items-center">
        <input
          type="radio"
          id="latin"
          value="latin"
          onChange={updateTheme}
          checked={theme === "latin"}
        />
          <label htmlFor="html">Latin</label>
        <input
          type="radio"
          id="math"
          value="math"
          onChange={updateTheme}
          checked={theme === "math"}
        />
          <label htmlFor="math">Math</label>
        <input
          type="radio"
          id="emoji"
          value="emoji"
          onChange={updateTheme}
          checked={theme === "emoji"}
        />
          <label htmlFor="emoji">Emoji</label>
      </div>
      <button
        className="flex-item"
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
        <div className="flex-item">
          {renderEncryptedContent(encryptedBuffer)}{" "}
        </div>
      )}
    </div>
  );
};

export default EncryptView;
