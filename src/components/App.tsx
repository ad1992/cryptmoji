import { useState } from "react";
import "./App.scss";
import DecyrptView from "./DecryptView";
import EncryptView from "./EncryptView";
import clsx from "clsx";
import GitHubCorner from "./GithubCorner";
import Footer from "./Footer";
import DynamicBackground, { themes } from "./DynamicBackground";
import BackgroundThemeDropdown from "./BackgroundThemeDropdown";

const VIEW = {
  ENCRYPT: 0,
  DECRYPT: 1,
};
function App() {
  const [activeView, setActiveView] = useState(VIEW.ENCRYPT);
  const [activeBgTheme, setActiveBgTheme] =
    useState<keyof typeof themes>("emoji");
  return (
    <>
      <DynamicBackground theme={activeBgTheme} />
      <div className="App">
        <GitHubCorner />
        <h1 style={{ color: "#1971c2" }}>
          CRYPTM<span>😎</span>JI
        </h1>
        <p className="subtext">
          Encrypt with flair — transform your messages into vibrant Emojis,
          classic Latin, infinite Math and more!
        </p>
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
        {activeView === VIEW.ENCRYPT ? (
          <EncryptView activeBgTheme={activeBgTheme} />
        ) : (
          <DecyrptView />
        )}
        <Footer />
        <BackgroundThemeDropdown
          activeTheme={activeBgTheme}
          onChange={(theme) => setActiveBgTheme(theme)}
        />
      </div>
    </>
  );
}

export default App;
