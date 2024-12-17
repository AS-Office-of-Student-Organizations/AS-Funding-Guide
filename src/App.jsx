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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FundingGuide from "./FundingGuide";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";
import RequireAuth from "./RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FundingGuide />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <RequireAuth>
            <AdminPanel />
          </RequireAuth>
          } />
      </Routes>
    </Router>
  );
}

export default App;
