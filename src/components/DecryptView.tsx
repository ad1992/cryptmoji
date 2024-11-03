import { useState } from "react";
import CopyToClipboard from "./copyToClipboard";
import { decrypt } from "../crypto";
import Error from "./Error";
import { dataToBytes } from "../transformData";

import "./DecryptView.scss";
const DecyrptView = () => {
  const [encryptedText, setEncryptedText] = useState("");
  const [password, setPassword] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="decrypt-view flex flex-col align-items-center justify-content-center">
      {" "}
      <div className="flex flex-col">
        <label htmlFor="encrypted-text"> Paste the Cryptmoji</label>
        <textarea
          className="flex-item input-field"
          id="encrypted-text"
          onChange={(event) => setEncryptedText(event.target.value)}
          value={encryptedText}
          rows={5}
        ></textarea>{" "}
        <label htmlFor="password"> Enter the password </label>
        <input
          type="password"
          className="flex-item input-field"
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
              setError("");
            } catch (err) {
              console.error(err);
              setError("Oops sorry the Cryptmoji couldn't be decrypted :(");
              setDecryptedText("");
            }
          }}
        >
          {" "}
          Decrypt
        </button>
        {decryptedText && (
          <div className="flex flex-col">
            <div className="flex justify-content-between">
              <label htmlFor="decrypt-text">Secret Message</label>
              <CopyToClipboard text={decryptedText} />
            </div>
            <textarea
              readOnly
              className="flex-item decrypt-text input-field"
              id="encrypted-text"
              value={decryptedText}
            />
          </div>
        )}
        {error && <Error error={error} />}
      </div>
    </div>
  );
};

export default DecyrptView;
