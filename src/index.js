import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ExpenseTrackerProvider } from "./context/context";

import { SpeechProvider } from "@speechly/react-client";

ReactDOM.render(
    <SpeechProvider
        appId="31d9dbd0-1a4e-4a78-b643-a53e67893d4c"
        language="en-US"
    >
        {" "}
        <ExpenseTrackerProvider>
            <App />
        </ExpenseTrackerProvider>
    </SpeechProvider>,
    document.getElementById("root")
);
