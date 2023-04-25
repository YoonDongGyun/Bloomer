import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./index.css";
import googleLogo from "../src/assets/imgs/googlePlayLogo.png";
import QR from "../src/assets/imgs/QR.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="wrapper">
        <span className="text__wrapper">
          <span id="main-title">Bloomer</span>
          <span id="sub-title">감정을 꽃 피우다 </span>
        </span>
        <div className="google__wrapper">
          <a
            href="https://play.google.com/store/apps/details?id=com.erscindy.floryapp"
            target="_blank"
          >
            <img id="google-logo" src={googleLogo} />
          </a>
          <div className="search__container">
            <div className="search__wrapper">
              <FontAwesomeIcon icon={faMagnifyingGlass} id="search-icon" />
              <span id="search-text">Bloomer 블루머</span>
            </div>
          </div>
        </div>
        <div id="radial1"></div>
        <div id="radial2"></div>
        <div id="radial3"></div>
        <div id="radial4"></div>
        <img id="qr-img" src={QR} />
        <App />
      </div>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
