import { useState } from "react";
import { decrypt } from "./crypto";

const DecyrptView = () => {
  const [encryptedText, setEncryptedText] = useState("");
  const [password, setPassword] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  return (
    <div className="decrypt-view flex-container">
      <label>
        {" "}
        Paste the Cryptmoji
        <textarea
          className="flex-item"
          placeholder="Paste the Crytmoji"
          onChange={(event) => setEncryptedText(event.target.value)}
          value={encryptedText}
        ></textarea>
      </label>{" "}
      <label placeholder="Enter the key">
        {" "}
        Enter the password
        <input
          className="flex-item"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        ></input>
      </label>
      <button
        className="flex-item"
        onClick={async () => {
          const dataInBytes = new Uint8Array(
            encryptedText.split(",").map(Number)
          );
          try {
            const data = await decrypt(dataInBytes, password);
            setDecryptedText(data);
          } catch (err) {
            console.error(err);
            setDecryptedText("");
          }
        }}
      >
        {" "}
        Decrypt
      </button>
      {decryptedText && <div className="flex-item">{decryptedText} </div>}
    </div>
  );
};

export default DecyrptView;
