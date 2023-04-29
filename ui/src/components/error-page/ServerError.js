import { Link } from "react-router-dom";

import "./ServerError.css";

export default function NotFound() {
  return (
    <div id="error">
      <div className="error">
        <div className="error-500">
          <div></div>
          <h1>500</h1>
        </div>
        <h2>
          Уупс... Нещо се обърка <span>😭</span>
        </h2>
        <p>
          Не знаем, какво се е объркало. Предлагаме да се върнеш обратно към
          сайта или да пробваш по-късно отново.
        </p>
        <button>
          <Link to={"/"}>Начало</Link>
        </button>
      </div>
    </div>
  );
}
