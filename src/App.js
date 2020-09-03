import React, { useState, useRef, useCallback } from "react";
import uuidV4 from "uuid/v4";

import "./styles/App.css";

function App() {
  return (
    <div className="screen">
      <input
        className="input"
        placeholder="Search books here"
        type="text"
      ></input>
      <div className="title">title</div>
      <div className="title">title</div>
      <div className="title">title</div>
      <div className="title">title</div>
      <div className="title">Loading...</div>
      <div className="title">---Error---</div>
    </div>
  );
}

export default App;
