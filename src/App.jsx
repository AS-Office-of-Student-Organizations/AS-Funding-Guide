import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin.jsx";
import RequireAuth from "./RequireAuth.jsx";
import NavBar from "./components/NavBar.jsx"
import Guide from "./components/Guide.jsx";
import AdminHome from "./components/AdminHome.jsx";
import Landing from "./components/Landing.jsx"

function App() {
  return (
    <Router>
      <div>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={
            <RequireAuth>
              <AdminHome />
            </RequireAuth>
            } />
          <Route path="/guide/*" element={<Guide/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FundingGuide from './FundingGuide.jsx'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <FundingGuide></FundingGuide>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}*/