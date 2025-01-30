import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "@/admin/AdminLogin.jsx";
import RequireAuth from "@/components/RequireAuth.jsx";
import NavBar from "@/components/NavBar.jsx"
import Guide from "@/guide/Guide.jsx";
import AdminHome from "@/admin/AdminHome.jsx";
import Landing from "@/landing/Landing.jsx"
import React from "react";
import Chatbot from "react-chatbot-kit";

import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";

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
      <div className="App">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
    </Router>
  );
}

export default App;