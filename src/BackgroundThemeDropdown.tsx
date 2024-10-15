import { themes } from "./DynamicBackground";
import "./BackgroundThemeDropdown.scss";

const OPTIONS = {
  emoji: "Emoji Vibes",
  latin: "Classical Latin",
  math: "Math Galaxy",
};

const BackgroundThemeDropdown = ({
  activeTheme,
  onChange,
}: {
  activeTheme: keyof typeof themes;
  onChange: (theme: keyof typeof themes) => void;
}) => {
  return (
    <select
      value={activeTheme}
      onChange={(e) => {
        // @ts-ignore
        onChange(e.target.value);
      }}
      className="bg-theme-dropdown"
    >
      {Object.entries(OPTIONS).map(([key, val], index) => (
        <option key={index} value={key}>
          {val}
        </option>
      ))}
    </select>
  );
};

export default BackgroundThemeDropdown;
