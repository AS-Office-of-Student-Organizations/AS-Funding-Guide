"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./components/firebase"
import AdminLogin from "@/admin/AdminLogin.jsx"
import RequireAuth from "@/components/RequireAuth.jsx"
import NavBar from "@/components/NavBar.jsx"
import Guide from "@/guide/Guide.jsx"
import AdminHome from "@/admin/AdminHome.jsx"
import Landing from "@/landing/Landing.jsx"
import Chatbot from "react-chatbot-kit"
import config from "./chatbot/config"
import MessageParser from "./chatbot/MessageParser"
import ActionProvider from "./chatbot/ActionProvider"
import Footer from "./components/Footer";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  const toggleChat = () => {
    if (user) {
      setIsChatOpen(!isChatOpen)
    } else {
      setIsLoginModalOpen(true)
    }
  }

  return (
    <Router>
      <div>
        <NavBar isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
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
        {isChatOpen && user && (
          <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
        )}
      </div>
      <button className="chat-toggle-button" onClick={toggleChat} aria-label="Toggle chat">
        <MessageCircle className="h-4 w-4" />
      </button>
      <Footer/>
    </Router>
  )
}

export default App

