"use client"

import { useState, useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"
import DropDownButton from "./DropDownButton"
import { ChevronDown, ExternalLink } from "lucide-react"
import Modal from "./Modal"

const NavBar = () => {
  const [activeLinkName, setActiveLinkName] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const links = [{ to: "/guide", name: "Guide" }]
    const activeLink = links.find((link) => location.pathname.includes(link.to))
    if (activeLink) {
      setActiveLinkName(activeLink.name)
    } else {
      setActiveLinkName("") // Optionally clear if no link matches
    }
  }, [location])

  const handleLoginClick = (e) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  const navLinks = [
    <NavLink to="/guide" key="0">
      Guide
    </NavLink>,
    <a href="#" onClick={handleLoginClick} key="1">
      Log In
    </a>,
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
            <a href="#" onClick={handleLoginClick}>
              Log In
            </a>
          </span>
          <span className="link">
            <a href="https://finance.ucsd.edu/" target="_blank" rel="noopener noreferrer">
              Funding Portal <ExternalLink />
            </a>
          </span>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Log In</h2>
        {/* Add your login form or content here */}
      </Modal>
    </>
  )
}

export default NavBar

