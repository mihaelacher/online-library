import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Footer = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <>
      <footer id="footer">
        <div className="container">
          <div className="row">
            <div class="col-md-4">
              <div class="footer-item">
                <div class="company-brand">
                  <img
                    src="/images/logo_transparent.png"
                    alt="logo"
                    class="footer-logo"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="footer-menu">
                <h5>Открий</h5>
                <ul className="menu-list">
                  <li className="menu-item">
                    <Link to="/">Начало </Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/books">Търси книги </Link>
                  </li>
                  <li className="menu-item">
                    {isAuthenticated && <a href="/mybooks">Моите книги</a>}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="footer-menu">
                <h5>Акаунт</h5>
                <ul className="menu-list">
                  {isAuthenticated ? (
                    <>
                      <li className="menu-item">
                        <Link to="/profile">Моят профил</Link>
                      </li>
                      <li className="menu-item">
                        <Link onClick={logout}>Изход</Link>
                      </li>
                    </>
                  ) : (
                    <li className="menu-item">
                      <Link onClick={loginWithRedirect}>Вход</Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div id="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="copyright">
                <div className="row">
                  <div className="col-md-6">
                    <p>© 2023 Всички права запазени. Книжен Шеринг</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
