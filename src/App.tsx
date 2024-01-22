import { useState } from "react";
import "./App.scss";
import DecyrptView from "./DecryptView";
import EncryptView from "./EncryptView";
import clsx from "clsx";
import GitHubCorner from "./GithubCorner";
import Footer from "./Footer";
import DarkModeToggle from './DarkModeToggle';
const VIEW = {
  ENCRYPT: 0,
  DECRYPT: 1,
};
const App: React.FC = () => {
  const [activeView, setActiveView] = useState(VIEW.ENCRYPT);
  return (
    <div className="App">
      <div className="darkwave" style={{  position: "absolute" , left: 0}}>
      <DarkModeToggle  /></div>
      <GitHubCorner />
      <h1 style={{ color: "#0b7285" }}>Cryptmoji</h1>
      <h3>Encrypt your messages into Emojis, Latin and Math Symbols</h3>
      <div style={{ margin: "1rem" }}>
        <button
          className={clsx("encrypt", { active: activeView === VIEW.ENCRYPT })}
          onClick={() => setActiveView(VIEW.ENCRYPT)}
        >
          Encrypt
        </button>
        <button
          className={clsx("decrypt", { active: activeView === VIEW.DECRYPT })}
          onClick={() => setActiveView(VIEW.DECRYPT)}
        >
          Decrypt
        </button>
      </div>
      {activeView === VIEW.ENCRYPT ? <EncryptView /> : <DecyrptView />}
      <Footer />
    </div>
  );
}

export default App;
