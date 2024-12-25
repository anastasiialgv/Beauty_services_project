import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Home from "./pages/Home/Home.jsx";
import Opinie from "./pages/Opinie.jsx";
import Spotkanie from "./pages/Spotkanie.jsx";
import Logowanie from "./pages/Logowanie.jsx";
import LogowanieOp from "./pages/LogowanieOp.jsx";

function App() {

  return (
      <>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/opinie" element={<Opinie/>} />
              <Route path="/spotkanie" element={<Spotkanie/>} />
              <Route path="/logowanie" element={<Logowanie/>} />
              <Route path="/logowanieop" element={<LogowanieOp/>} />
          </Routes>
      </>
  )
}

export default App
