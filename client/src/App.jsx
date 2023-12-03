import { Route, Routes, useLocation } from "react-router-dom";

import Detail from "./views/detail/Detail";
import Form from "./views/form/form";
import Home from "./views/home/home";
import LandingPage from "./views/landingPage/LandingPage";
import NavBar from "./components/NavBar/navBar";

import "./App.css";

function App() {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
