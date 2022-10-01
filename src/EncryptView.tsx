import { useState } from "react";
import { encrypt } from "./crypto";

const EncryptView = () => {
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [encryptedBuffer, setEncryptedBuffer] = useState<ArrayBuffer | null>(
    null
  );
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
      <button
        className="flex-item"
        onClick={async () => {
          try {
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
          {Array.from(new Uint8Array(encryptedBuffer)).join(",")}{" "}
        </div>
      )}
    </div>
  );
};

export default EncryptView;
