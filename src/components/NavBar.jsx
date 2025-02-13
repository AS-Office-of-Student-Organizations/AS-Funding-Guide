"use client"

import { useState, useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"
import DropDownButton from "./DropDownButton"
import { ChevronDown, ExternalLink } from "lucide-react"
import Modal from "./Modal"
import LoginForm from "./LoginForm"
import { auth } from "./firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"

const NavBar = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
  const [activeLinkName, setActiveLinkName] = useState("")
  const [user, setUser] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const links = [{ to: "/guide", name: "Guide" }]
    const activeLink = links.find((link) => location.pathname.includes(link.to))
    if (activeLink) {
      setActiveLinkName(activeLink.name)
    } else {
      setActiveLinkName("")
    }
  }, [location])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  const handleLoginClick = (e) => {
    e.preventDefault()
    setIsLoginModalOpen(true)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  const navLinks = [
    <NavLink to="/guide" key="0">
      Guide
    </NavLink>,
    user ? (
      <a href="#" onClick={handleLogout} key="1">
        Log Out
      </a>
    ) : (
      <a href="#" onClick={handleLoginClick} key="1">
        Log In
      </a>
    ),
    <a href="https://finance.ucsd.edu/" key="2" target="_blank" rel="noopener noreferrer">
      Funding Portal <ExternalLink />
    </a>,
  ]

  return (
    <>
      <div className="nav-bar">
        <NavLink to="/" className="title-link">
          <header>
            <img className="title-logo" alt="Associated Students Logo" src="/logo_simplified.png" />
            <div className="title-text">
              <h1 className="title">Associated Students</h1>
              <p className="subtitle">Office of Student Organizations</p>
            </div>
            <div className="title-text-mobile">
              <h1 className="title">ASUCSD</h1>
              <p className="subtitle">Student Orgs</p>
            </div>
          </header>
        </NavLink>
        <DropDownButton
          label={
            <div className="nav-dropdown-content">
              {activeLinkName}
              <ChevronDown />
            </div>
          }
          data={navLinks}
        />
        <div className="nav-list">
          <span className="link">
            <NavLink to="/guide">Guide</NavLink>
          </span>
          <span className="link">
            {user ? (
              <a href="#" onClick={handleLogout}>
                Log Out
              </a>
            ) : (
              <a href="#" onClick={handleLoginClick}>
                Log In
              </a>
            )}
          </span>
          <span className="link">
            <a href="https://finance.ucsd.edu/" target="_blank" rel="noopener noreferrer">
              Funding Portal <ExternalLink />
            </a>
          </span>
        </div>
      </div>
      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4"></h2>
        <LoginForm onClose={() => setIsLoginModalOpen(false)} />
      </Modal>
    </>
  )
}

export default NavBar

