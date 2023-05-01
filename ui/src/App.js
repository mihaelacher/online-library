import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-toastify/dist/ReactToastify.css";

import AuthProvider from "./providers/AuthProvider";
import HomeRoutes from "./routes/HomeRoutes";
import ProfileRoutes from "./routes/ProfileRoutes";
import OrderRoutes from "./routes/OrderRoutes";
import ErrorBoundary from "./components/common/ErrorBoundary";
import NotFound from "./components/error-page/NotFound";
import initFontAwesome from "./libs/initFontAwesome";
import { store } from "./store/index";
import { history } from "./store/history";
import "./App.css";

export default function App() {
  initFontAwesome();

  return (
    <CartProvider>
      <React.StrictMode>
        <BrowserRouter location={history.location} navigator={history}>
          <ErrorBoundary>
            <Provider store={store}>
              <AuthProvider>
                <Routes>
                  {HomeRoutes}
                  {ProfileRoutes}
                  {OrderRoutes}
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <ToastContainer autoClose={3000} hideProgressBar />
              </AuthProvider>
            </Provider>
          </ErrorBoundary>
        </BrowserRouter>
      </React.StrictMode>
    </CartProvider>
  );
}
