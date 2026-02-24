import Home from "./components/Home"
import Signup from "./components/Signup"
import Patient from "./components/Patient"
import Caretaker from "./components/Caretaker"
import Login from "./components/Login"
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
function App() {
  return (
    <div className=" bg-slate-400px-10  border rounded-md">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/caretaker" element={<Caretaker />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App