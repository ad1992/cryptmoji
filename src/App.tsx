import { useState } from "react";
import "./App.scss";
import DecyrptView from "./DecryptView";
import EncryptView from "./EncryptView";

const VIEW = {
  ENCRYPT: 0,
  DECRYPT: 1,
};
function App() {
  const [activeView, setActiveView] = useState(VIEW.ENCRYPT);
  return (
    <div className="App">
      <h1>Encrypt your message to Emoji</h1>
      <div>
        <button onClick={() => setActiveView(VIEW.ENCRYPT)}>Encyrpt</button>
        <button onClick={() => setActiveView(VIEW.DECRYPT)}>Decrypt</button>
      </div>
      {activeView === VIEW.ENCRYPT ? <EncryptView /> : <DecyrptView />}
    </div>
  );
}

export default App;
