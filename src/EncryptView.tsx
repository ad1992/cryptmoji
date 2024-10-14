import { useState } from "react";
import CopyToClipboard from "./copyToClipboard";
import { encrypt } from "./crypto";
import { convertToEmoji, convertToLatin, convertToMath } from "./transformData";
import { BG_THEME_TYPES, themes } from "./DynamicBackground";

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
    if (activeBgTheme === BG_THEME_TYPES.LATIN) {
      return convertToLatin(encryptedBuffer);
    } else if (activeBgTheme === BG_THEME_TYPES.MATH) {
      return convertToMath(encryptedBuffer);
    } else if (activeBgTheme === BG_THEME_TYPES.EMOJI) {
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
              className={`flex-item encrypted-text ${activeBgTheme}`}
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
