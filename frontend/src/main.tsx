import { Route, HashRouter, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";
import "./globals.css";

// translation
import global_en from "./translation/en/global.json";
import global_fr from "./translation/fr/global.json";
import global_zh from "./translation/zh/global.json";
import global_de from "./translation/de/global.json";
import pages_de from "./translation/de/pages.json";
import pages_en from "./translation/en/pages.json";
import pages_fr from "./translation/fr/pages.json";
import pages_zh from "./translation/zh/pages.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

i18next.init({
  interpolation: { escapeValue: true },
  lng: "en",
  resources: {
    en: { global: global_en, pages: pages_en },
    fr: { global: global_fr, pages: pages_fr },
    zh: { global: global_zh, pages: pages_zh },
    de: { global: global_de, pages: pages_de },
  },
});

// state management
import { Provider } from "react-redux";
import Sidebar from "./components/Sidebar";
import Setting from "./pages/Setting";
import { store } from "./state/store";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
// render everything
const container = document.getElementById("root");
ReactDOM.createRoot(container as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <main className=" min-h-screen max-h-screen flex overflow-hidden">
          <HashRouter basename="/">
            <Sidebar />
            <div className="overflow-y-auto h-screen w-full bg-bg-light-1 dark:bg-bg-dark-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/history" element={<History />} />
              </Routes>
            </div>
          </HashRouter>
        </main>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);
