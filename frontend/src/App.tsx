import "./App.css";
import MainMenuBar from "./components/navigation/MainMenuBar";
import FrontPage from "./components/FrontPage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Notification from "./components/notification/Notification";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <MainMenuBar />
      <Notification />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
