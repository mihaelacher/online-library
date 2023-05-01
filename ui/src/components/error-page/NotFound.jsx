import { Link } from "react-router-dom";

import "./NotFound.css";

export default function NotFound() {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <div></div>
          <h1>404</h1>
        </div>
        <h2>Страницата не е намерена</h2>
        <p>
          Страницата, която се опитвате да достъпите, вероятно е била
          премахната, сменено е името или е временно недостъпна.
        </p>
        <button>
          <Link to={"/"}>Начало</Link>
        </button>
      </div>
    </div>
  );
}
