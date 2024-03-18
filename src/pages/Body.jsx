import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import { Subjects } from "./Subjects/Subjects";
import { About } from "./About/About";

export const Body = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Subjects" element={<Subjects />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </>
  );
};
