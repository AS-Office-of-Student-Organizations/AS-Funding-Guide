"use client"

import { useState, useEffect, useRef } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { ChevronDown, ExternalLink } from "lucide-react"
import Modal from "./Modal"
import LoginForm from "./LoginForm"
import { auth } from "../data/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import "./NavBar.css"

const NavBar = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
  const [activeLinkName, setActiveLinkName] = useState("")
  const [user, setUser] = useState(null)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const resourcesRef = useRef(null)
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target)) {
        setResourcesOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [resourcesRef])

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

  const toggleResourcesDropdown = (e) => {
    e.preventDefault()
    setResourcesOpen(!resourcesOpen)
  }

  // Mobile dropdown menu items
  const mobileNavLinks = [
    <NavLink to="/guide" key="0">
      Guide
    </NavLink>,
    <NavLink to="/fundraising" key="1">
      Fundraising Guide
    </NavLink>,
    <a href="https://finance.ucsd.edu/" key="2" target="_blank" rel="noopener noreferrer">
      Funding Portal <ExternalLink />
    </a>,
    user ? (
      <a href="#" onClick={handleLogout} key="3">
        Log Out
      </a>
    ) : (
      <a href="#" onClick={handleLoginClick} key="3">
        Log In
      </a>
    ),
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

        {/* Mobile dropdown */}
        <div className="dropdown mobile-dropdown">
          <button onClick={(e) => e.preventDefault()}>
            <div className="nav-dropdown-content">
              {activeLinkName}
              <ChevronDown />
            </div>
          </button>
          <div className="dropdown-card">
            <ul>
              {mobileNavLinks.map((link, index) => (
                <li key={index}>{link}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop navigation */}
        <div className="nav-list">
          <span className="link">
            <NavLink to="/guide">Guide</NavLink>
          </span>

          {/* Resources dropdown */}
          <span className="link resources-dropdown" ref={resourcesRef}>
            <a href="#" onClick={toggleResourcesDropdown} className={resourcesOpen ? "active" : ""}>
              Resources <ChevronDown className="dropdown-icon" />
            </a>
            {resourcesOpen && (
              <div className="resources-menu">
                <NavLink to="/fundraising" onClick={() => setResourcesOpen(false)}>
                  Fundraising Guide
                </NavLink>
                <a
                  href="https://finance.ucsd.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setResourcesOpen(false)}
                >
                  Funding Portal <ExternalLink />
                </a>
              </div>
            )}
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
