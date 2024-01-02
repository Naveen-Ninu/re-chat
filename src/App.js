import logo from "./logo.svg";
import "./App.css";
import LogIn from "./components/login/LogIn";
import ResetPass from "./components/login/ResetPass";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/login/SignUp";

function App() {
  return (
    <div className="App">
      {/* <LogIn /> */}
      {/* <ResetPass /> */}
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/forgot-password" element={<ResetPass />} />
      </Routes>
    </div>
  );
}

export default App;
