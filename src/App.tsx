import './App.css'
import MainScreen from "./components/MainScreen"
import SignIn from "./components/singInUp/SignIn.tsx"
import SignUp from "./components/singInUp/SignUp.tsx"
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
