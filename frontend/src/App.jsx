import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signUp";
// import { useAuthContext } from "../Context/AuthContext";
import useAuthStore from "../src/zustand/useAuth.js";

const App = ()=>{
  const {authUser} = useAuthStore()
  return (
    <div>
    <Routes>
      <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
      <Route path='/login' element={authUser? <Navigate to='/' /> :<Login />} />
      <Route path='/signup' element={authUser? <Navigate to='/login' /> :<SignUp />} />
    </Routes>
    </div>
  );
  }
export default App;