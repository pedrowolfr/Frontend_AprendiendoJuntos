import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import { Subjects } from "./Subjects/Subjects";
import { About } from "./About/About";
import { Profile } from "./Profile/Profile";
import { Contact } from "./Contact/Contact";
import { Activities } from "./Activities/Activities";
import { Users } from "./Users/Users";
import { AllSubjectsPage } from "./AllSubjectsPage/AllSubjectsPage";
import { MySubjects } from "./MySubjects/MySubjects";
import { Enrollment } from "./Enrollment/Enrollment";

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
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Enrollment" element={<Enrollment />} />
        <Route path="/MySubjects" element={<MySubjects />} />
        <Route path="/Activities" element={<Activities />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/AllSubjectsPage" element={<AllSubjectsPage />} />
      </Routes>
    </>
  );
};
