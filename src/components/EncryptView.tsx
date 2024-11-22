import { useState } from "react";
import CopyToClipboard from "./copyToClipboard";
import { encrypt } from "../crypto";
import {
  convertToEmoji,
  convertToKanji,
  convertToLatin,
  convertToMath,
} from "../transformData";
import { BG_THEME_TYPES, themes } from "./DynamicBackground";

import "./EncryptView.scss";

const EncryptView = ({
  activeBgTheme,
}: {
  activeBgTheme: keyof typeof themes;
}) => {
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [encryptedBuffer, setEncryptedBuffer] = useState<ArrayBuffer | null>(
    null,
  );

  const renderEncryptedContent = (encryptedBuffer: ArrayBuffer) => {
    let result = "";
    switch (activeBgTheme) {
      case "latin":
        result = convertToLatin(encryptedBuffer);
        break;
      case "math":
        result = convertToMath(encryptedBuffer);
        break;
      case "emoji":
        result = convertToEmoji(encryptedBuffer);
        break;
      case "kanji":
        result = convertToKanji(encryptedBuffer);
        break;
      default:
        result = "";
    }
    return result;
  };
  return (
    <div className="encrypt-view flex flex-col align-items-center justify-content-center">
      <div className="flex flex-col">
        <label htmlFor="message"> Enter the message</label>
        <textarea
          className="flex-item input-field"
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={5}
        ></textarea>
        <label htmlFor="password"> Enter the password </label>
        <input
          type="password"
          className="flex-item input-field"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
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
          <div className="flex flex-col">
            <div className="flex justify-content-between">
              <label htmlFor="encrypted-text">Cryptmoji</label>
              <CopyToClipboard text={renderEncryptedContent(encryptedBuffer)} />
            </div>
            <textarea
              readOnly
              className="flex-item encrypted-text input-field"
              id="encrypted-text"
              value={renderEncryptedContent(encryptedBuffer)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EncryptView;
