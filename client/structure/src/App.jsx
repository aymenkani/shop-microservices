import React from "react";
import StructureOne from "./components/structures/StructureOne";

import "./index.scss";

const Header = () => (
  <div className="text-lg bg-pink-600">
    Header yeah k
  </div>
)

const App = () => (
  <StructureOne header={<Header />} sidebar={<div className="bg-fuchsia-600">SIdebar</div>} content={<div className="bg-blue-500">Content</div>} />
);

export default App

// ReactDOM.render(<App />, document.getElementById("app"));
