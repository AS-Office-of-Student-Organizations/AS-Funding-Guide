import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "@/admin/AdminLogin.jsx";
import RequireAuth from "@/components/RequireAuth.jsx";
import NavBar from "@/components/NavBar.jsx"
import Guide from "@/guide/Guide.jsx";
import AdminHome from "@/admin/AdminHome.jsx";
import Landing from "@/landing/Landing.jsx"

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