import React from "react";
import "./App.css";
import Converter from "./components/Converter";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App() {
  return (
    <div className="container mx-auto">
      <Converter />
    </div>
  );
}

export default App;
