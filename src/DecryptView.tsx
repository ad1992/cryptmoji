import { useState } from "react";
import { decrypt } from "./crypto";
import { dataToBytes } from "./transformData";

const DecyrptView = () => {
  const [encryptedText, setEncryptedText] = useState("");
  const [password, setPassword] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  return (
    <div className="flex flex-col align-items-center justify-content-center">
      {" "}
      <div className="flex flex-col" style={{ width: "50%" }}>
        <label htmlFor="encrypted-text"> Paste the Cryptmoji</label>
        <textarea
          className="flex-item"
          id="encrypted-text"
          onChange={(event) => setEncryptedText(event.target.value)}
          value={encryptedText}
          rows={5}
        ></textarea>{" "}
        <label htmlFor="password"> Enter the password </label>
        <input
          type="password"
          className="flex-item"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        ></input>
        <button
          className="decrypt-btn flex-item"
          onClick={async () => {
            try {
              const dataInBytes = dataToBytes(encryptedText);
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
    </div>
  );
};

export default DecyrptView;
