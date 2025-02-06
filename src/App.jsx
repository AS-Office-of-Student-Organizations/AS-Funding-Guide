"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AdminLogin from "@/admin/AdminLogin.jsx"
import RequireAuth from "@/components/RequireAuth.jsx"
import NavBar from "@/components/NavBar.jsx"
import Guide from "@/guide/Guide.jsx"
import AdminHome from "@/admin/AdminHome.jsx"
import Landing from "@/landing/Landing.jsx"
import { useState } from "react"
import Chatbot from "react-chatbot-kit"
import { MessageCircle } from "lucide-react"

import config from "./chatbot/config"
import MessageParser from "./chatbot/MessageParser"
import ActionProvider from "./chatbot/ActionProvider"

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <RequireAuth>
                <AdminHome />
              </RequireAuth>
            }
          />
          <Route path="/guide/*" element={<Guide />} />
        </Routes>
      </div>
      <div className={`chat-popup ${isChatOpen ? "open" : ""}`}>
        {isChatOpen && <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />}
      </div>
      <button className="chat-toggle-button" onClick={toggleChat} aria-label="Toggle chat">
        <MessageCircle className="h-4 w-4" />
      </button>
    </Router>
  )
}

export default App

