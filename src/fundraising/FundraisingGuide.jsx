"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"
import "./FundraisingGuide.css"

const FundraisingGuide = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true)

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible)
  }

  return (
    <div className="fundraising-guide">
      <div className={`fundraising-left-column scroll-when-hover ${isSidebarVisible ? "" : "hidden"}`}>
        <div className="fundraising-sidebar">
          <h3>Table of Contents</h3>
          <ul>
            <li>
              <a href="#introduction">Introduction</a>
            </li>
            <li>
              <a href="#planning">Planning Your Fundraiser</a>
            </li>
            <li>
              <a href="#types">Types of Fundraisers</a>
            </li>
            <li>
              <a href="#regulations">Campus Regulations</a>
            </li>
            <li>
              <a href="#resources">Resources</a>
            </li>
          </ul>
          <div className="sidebar-help">
            <h4>Questions?</h4>
            <p>Visit our Discord for help</p>
            <div className="discord-container">
              <button className="discord-button">
                <a href="https://discord.gg/Wv4Et7w7Qy" target="_blank" rel="noopener noreferrer">
                  <img src="/discord-mark-black.png" alt="Discord" className="discord-logo" />
                  <span>Join our server</span>
                </a>
              </button>
            </div>
          </div>
        </div>
        <button className={`sidebar-toggle ${isSidebarVisible ? "extended" : "contracted"}`} onClick={toggleSidebar}>
          {isSidebarVisible ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      <div className="fundraising-content">
        <h1>Fundraising Guide</h1>

        <section id="introduction">
          <h2>Introduction</h2>
          <div className="content-with-image">
            <div>
              <p>
                Fundraising is an essential activity for student organizations at UC San Diego. This guide provides
                information on how to plan and execute successful fundraisers while complying with university policies.
              </p>
              <p>
                Whether you're raising funds for events, equipment, or charitable causes, proper planning and execution
                are key to your success.
              </p>
            </div>
            <div className="image-container">
              <img src="/blue_logo.png" alt="Students fundraising" />
            </div>
          </div>
        </section>

        <section id="planning">
          <h2>Planning Your Fundraiser</h2>
          <h3>Subcategories</h3>
          <ul>
            <li>
              <strong>Set Clear Goals</strong> - Define how much money you need to raise and what it will be used for.
            </li>
            <li>
              <strong>Create a Timeline</strong> - Plan your fundraiser well in advance to allow for proper preparation.
            </li>
            <li>
              <strong>Form a Committee</strong> - Assign specific roles to team members to ensure all tasks are covered.
            </li>
            <li>
              <strong>Budget Carefully</strong> - Consider all expenses associated with your fundraiser to ensure
              profitability.
            </li>
          </ul>
        </section>

        <section id="types">
          <h2>Types of Fundraisers</h2>
          <h3>Subcategories</h3>
          <div className="content-with-image">
            <div>
              <ul>
                <li>
                  <strong>Product Sales</strong> - Selling items like baked goods, merchandise, or crafts.
                </li>
                <li>
                  <strong>Events</strong> - Hosting performances, competitions, or social gatherings with an entry fee.
                </li>
                <li>
                  <strong>Services</strong> - Offering services like tutoring, workshops, or skill-sharing sessions.
                </li>
                <li>
                  <strong>Partnerships</strong> - Collaborating with local businesses for percentage nights or
                  sponsorships.
                </li>
                <li>
                  <strong>Crowdfunding</strong> - Using online platforms to reach a wider audience for donations.
                </li>
              </ul>
            </div>
            <div className="image-container">
              <img src="/campus-bake-sale.png" alt="Student organization bake sale" />
            </div>
          </div>
        </section>

        <section id="regulations">
          <h2>Campus Regulations</h2>
          <h3>Subcategories</h3>
          <ul>
            <li>
              <strong>Food Sales</strong> - All food sales must comply with UC San Diego food safety guidelines and may
              require permits.
            </li>
            <li>
              <strong>Space Reservations</strong> - Reserve spaces through the appropriate campus departments well in
              advance.
            </li>
            <li>
              <strong>Financial Handling</strong> - Follow proper procedures for collecting, storing, and depositing
              funds.
            </li>
            <li>
              <strong>Advertising</strong> - Adhere to campus posting policies when promoting your fundraiser.
            </li>
          </ul>
        </section>

        <section id="resources">
          <h2>Resources</h2>
          <h3>Subcategories</h3>
          <ul>
            <li>
              <strong>Center for Student Involvement (CSI)</strong> - Provides guidance on fundraising policies and
              procedures.
            </li>
            <li>
              <strong>Associated Students</strong> - Offers funding opportunities that can supplement your fundraising
              efforts.
            </li>
            <li>
              <strong>Student Life Business Office</strong> - Assists with financial management and compliance.
            </li>
            <li>
              <strong>University Centers</strong> - Provides spaces and resources for fundraising events.
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default FundraisingGuide
