import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Routes.jsx";
import "./index.css";
import { Provider } from "./context/ProviderCenter.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider>
            <App />
        </Provider>
    </React.StrictMode>,
);
