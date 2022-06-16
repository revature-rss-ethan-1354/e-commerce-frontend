import "./DarkTheme.css";
import { ChangeEventHandler, useState } from "react";

const setDark = () => {
  localStorage.setItem("theme", "dark");
  document.documentElement.setAttribute("data-theme", "dark");
};

const setLight = () => {
  localStorage.setItem("theme", "light");
  document.documentElement.setAttribute("data-theme", "light");
};

const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

const defaultDark = storedTheme === "dark" || (storedTheme === null && prefersDark);

if (defaultDark) {
  setDark();
}

const DarkTheme = () => {
  const [theme, setTheme] = useState<String>("Light");
  const toggleTheme: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.checked) {
      setDark();
      setTheme("Dark");
    } else {
      setLight();
      setTheme("Light");
    }
  };
  return (
    <>
      <h4 className="dark-label">{theme}</h4>
      <div className="dark-mode">
        <label className="switch" style={{ top: 100, right: 0}}>
          <input type="checkbox" id="checkbox" onChange={toggleTheme} defaultChecked={defaultDark}/>
          <div className="slider round"></div>
        </label>
      </div>
    </>
  );
};

export default DarkTheme;