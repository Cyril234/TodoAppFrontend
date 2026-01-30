import './App.css'
import MainScreen from "./components/MainScreen"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route path="/" element={<MainScreen/>} />
        <Route path="/singIn" element={<SignIn/>} />
        <Route path="/singUp" element={<SignUp/>} />
      </Routes>
  )
}

export default App
