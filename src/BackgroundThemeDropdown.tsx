import "./BackgroundThemeDropdown.scss";
import { themes } from "./DynamicBackground";

const OPTIONS = ["emoji", "latin", "math"];
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
      style={{ padding: "8px", fontSize: "16px", margin: "10px" }}
      className="bg-theme-dropdown"
    >
      {OPTIONS.map((option, index) => (
        <option key={index} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default BackgroundThemeDropdown;
