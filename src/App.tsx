import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "./components/Common/Header/Header";
import Home from "./components/Home/Home";

function App() {
  return (
    <BrowserRouter basename="/nishiumi-app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
