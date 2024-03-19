import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import V1 from "./V1";
// import StartRating from "./StartRating";
// import Add from "./Add";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <V1 /> */}
    <App />
    {/* <StartRating maxRating={5} />
    <StartRating maxRating={10} />
    <StartRating /> */}

    {/* <Add /> */}
  </React.StrictMode>
);
