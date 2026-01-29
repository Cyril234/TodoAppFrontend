import './App.css'
import MainScreen from "./components/mainScreen"
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route path="/" element={<MainScreen/>} />
      </Routes>
  )
}

export default App
