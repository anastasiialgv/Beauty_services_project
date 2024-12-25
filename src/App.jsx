import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Home from "./pages/Home/Home.jsx";
import Reviews from "./pages/Reviews/Reviews.jsx"
function App() {

  return (
      <>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/reviews" element={<Reviews/>} />
          </Routes>
      </>
  )
}

export default App
