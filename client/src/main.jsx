import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Routes.jsx";
import "./index.css";
import { Provider } from "./context/Provider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
);
