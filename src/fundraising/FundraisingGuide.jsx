"use client"

import { useState, useEffect } from "react"
import { ArrowRight, DollarSign, Calendar, Users, Megaphone, Target, CheckCircle } from "lucide-react"
import "./FundraisingGuide.css"

const FundraisingGuide = () => {
  const [activeTab, setActiveTab] = useState("basics")
  const [activeSection, setActiveSection] = useState("introduction")

  const tabs = [
    { id: "basics", label: "Fundraising Basics" },
    { id: "planning", label: "Planning Your Fundraiser" },
    { id: "ideas", label: "Fundraising Ideas" },
    { id: "regulations", label: "Campus Regulations" },
    { id: "resources", label: "Resources" },
    { id: "faq", label: "FAQ" },
  ]

  const sidebarLinks = [
    { id: "introduction", label: "Introduction" },
    { id: "getting-started", label: "Getting Started" },
    { id: "best-practices", label: "Best Practices" },
    { id: "timeline", label: "Timeline & Planning" },
    { id: "budgeting", label: "Budgeting" },
    { id: "promotion", label: "Promotion" },
  ]

  const fundraisingIdeas = [
    {
      title: "Bake Sale",
      description: "A classic fundraiser where students sell homemade baked goods on campus.",
      image: "/bake-sale.png",
    },
    {
      title: "Trivia Night",
      description: "Host a fun trivia competition with an entry fee and prizes for winners.",
      image: "/trivia-night.png",
    },
    {
      title: "Percentage Night",
      description: "Partner with local restaurants that donate a percentage of sales.",
      image: "/restaurant-fundraiser.png",
    },
    {
      title: "T-Shirt Sales",
      description: "Design and sell custom t-shirts featuring your organization's logo.",
      image: "/custom-tshirts.png",
    },
    {
      title: "Talent Show",
      description: "Showcase student talents with ticket sales going to your cause.",
      image: "/talent-show.png",
    },
    {
      title: "Online Crowdfunding",
      description: "Use platforms like GoFundMe to reach a wider audience of donors.",
      image: "/online-crowdfunding-blue.png",
    },
  ]

  // Add a mobile-friendly touch handler for tabs
  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    // On mobile, scroll to the top of the content area
    if (window.innerWidth < 768) {
      window.scrollTo({
        top: document.querySelector(".fundraising-tabs").offsetTop + 50,
        behavior: "smooth",
      })
    }
  }

  // Add swipe detection for mobile tab navigation (simplified version)
  useEffect(() => {
    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX
    }

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].clientX
      handleSwipe()
    }

    const handleSwipe = () => {
      // Minimum swipe distance
      if (Math.abs(touchEndX - touchStartX) < 50) return

      const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)

      if (touchEndX < touchStartX && currentIndex < tabs.length - 1) {
        // Swipe left - next tab
        setActiveTab(tabs[currentIndex + 1].id)
      } else if (touchEndX > touchStartX && currentIndex > 0) {
        // Swipe right - previous tab
        setActiveTab(tabs[currentIndex - 1].id)
      }
    }

    const tabsElement = document.querySelector(".fundraising-tabs")
    if (tabsElement) {
      tabsElement.addEventListener("touchstart", handleTouchStart, false)
      tabsElement.addEventListener("touchend", handleTouchEnd, false)

      return () => {
        tabsElement.removeEventListener("touchstart", handleTouchStart)
        tabsElement.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [activeTab, tabs])

  return (
    <div className="fundraising-guide-page">
      {/* Hero Section */}
      <section className="fundraising-hero">
        <div className="hero-content">
          <h1 className="hero-title">The Ultimate Student Organization Fundraising Guide</h1>
          <p className="hero-subtitle">
            Everything you need to know about planning, executing, and succeeding with your fundraising efforts at UC
            San Diego.
          </p>
          <a
            href="#fundraising-ideas"
            className="hero-cta"
            onClick={() => {
              setActiveTab("ideas")
              window.scrollTo({ top: document.getElementById("fundraising-ideas").offsetTop - 100, behavior: "smooth" })
            }}
          >
            Explore Fundraising Ideas
          </a>
        </div>
        <img src="/fundraising-piggy-bank.png" alt="Fundraising illustration" className="hero-image" />
      </section>

      {/* Navigation Tabs */}
      <div className="fundraising-tabs" role="tablist" aria-label="Fundraising Guide Sections">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`fundraising-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => handleTabClick(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Main Content */}
      {activeTab === "basics" && (
        <div className="fundraising-content" role="tabpanel" id="panel-basics" aria-labelledby="tab-basics">
          <div className="section-header">
            <h2>Fundraising Basics</h2>
            <p>Learn the fundamentals of successful fundraising for your student organization</p>
          </div>

          <div className="content-with-sidebar">
            <div className="main-content">
              <section id="introduction">
                <h2>Introduction to Fundraising</h2>
                <p>
                  Fundraising is an essential activity for student organizations at UC San Diego. Whether you're raising
                  funds for events, equipment, or charitable causes, proper planning and execution are key to your
                  success.
                </p>
                <p>
                  This guide provides comprehensive information on how to plan and execute successful fundraisers while
                  complying with university policies. We'll cover everything from basic concepts to advanced strategies.
                </p>

                <h3>Why Fundraise?</h3>
                <p>Student organizations fundraise for various reasons:</p>
                <ul>
                  <li>
                    <strong>Event Funding</strong> - Raising money to host events, workshops, or conferences
                  </li>
                  <li>
                    <strong>Equipment & Supplies</strong> - Purchasing necessary materials for your organization
                  </li>
                  <li>
                    <strong>Travel</strong> - Funding trips to competitions, conferences, or service projects
                  </li>
                  <li>
                    <strong>Charitable Causes</strong> - Supporting causes aligned with your organization's mission
                  </li>
                </ul>

                <h3>Key Fundraising Principles</h3>
                <p>Successful fundraising is built on these core principles:</p>
                <ul>
                  <li>
                    <strong>Clear Purpose</strong> - Define exactly what you're raising money for
                  </li>
                  <li>
                    <strong>Value Proposition</strong> - Offer something of value in exchange for donations
                  </li>
                  <li>
                    <strong>Effective Communication</strong> - Clearly articulate why people should support your cause
                  </li>
                  <li>
                    <strong>Proper Planning</strong> - Develop detailed timelines and assign responsibilities
                  </li>
                  <li>
                    <strong>Follow-up</strong> - Thank donors and report on the impact of their contributions
                  </li>
                </ul>
              </section>

              <section id="getting-started">
                <h2>Getting Started</h2>
                <p>Before launching your fundraiser, take these important first steps:</p>

                <h3>Define Your Goals</h3>
                <p>
                  Start by establishing clear, specific fundraising goals. How much money do you need to raise? What
                  will the funds be used for? Setting concrete targets helps focus your efforts and provides a benchmark
                  for measuring success.
                </p>

                <h3>Form a Committee</h3>
                <p>Create a dedicated fundraising committee with clearly defined roles. Typical positions include:</p>
                <ul>
                  <li>
                    <strong>Fundraising Chair</strong> - Oversees the entire fundraising effort
                  </li>
                  <li>
                    <strong>Treasurer</strong> - Manages financial aspects and tracks progress
                  </li>
                  <li>
                    <strong>Marketing Coordinator</strong> - Handles promotion and communication
                  </li>
                  <li>
                    <strong>Logistics Coordinator</strong> - Manages event details and resources
                  </li>
                  <li>
                    <strong>Volunteer Coordinator</strong> - Recruits and manages volunteers
                  </li>
                </ul>

                <h3>Research Regulations</h3>
                <p>
                  Familiarize yourself with UC San Diego's policies regarding fundraising. Different types of
                  fundraisers may require specific approvals or permits. Check with the Center for Student Involvement
                  (CSI) and Student Life Business Office for guidance.
                </p>
              </section>

              <section id="best-practices">
                <h2>Best Practices</h2>
                <p>Follow these proven strategies to maximize your fundraising success:</p>

                <h3>Diversify Your Approach</h3>
                <p>
                  Don't rely on a single fundraising method. Combine different strategies such as events, merchandise
                  sales, and online campaigns to reach more potential donors and increase your chances of success.
                </p>

                <h3>Leverage Social Media</h3>
                <p>
                  Use platforms like Instagram, Facebook, and Twitter to promote your fundraiser. Create engaging
                  content, use relevant hashtags, and encourage sharing to expand your reach beyond your immediate
                  network.
                </p>

                <h3>Tell Your Story</h3>
                <p>
                  People donate to causes they connect with emotionally. Craft a compelling narrative about your
                  organization and the impact of your work. Use photos, videos, and testimonials to bring your story to
                  life.
                </p>

                <h3>Make Donating Easy</h3>
                <p>
                  Remove barriers to giving by offering multiple payment options. Consider using mobile payment apps,
                  online platforms, and traditional methods to accommodate different donor preferences.
                </p>

                <h3>Express Gratitude</h3>
                <p>
                  Always thank your donors promptly and sincerely. Consider sending personalized thank-you notes, public
                  acknowledgments, or small tokens of appreciation depending on the donation size.
                </p>
              </section>
            </div>

            <div className="sidebar">
              <h3>In This Section</h3>
              <ul>
                {sidebarLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className={activeSection === link.id ? "active" : ""}
                      onClick={(e) => {
                        e.preventDefault()
                        setActiveSection(link.id)
                        const element = document.getElementById(link.id)
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="discord-help-sidebar">
                <h3>Need Help?</h3>
                <hr />
                <p>Join our Discord for assistance</p>
                <a
                  href="https://discord.gg/Wv4Et7w7Qy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="discord-button-sidebar"
                >
                  <img src="/discord-mark-black.png" alt="Discord" className="discord-logo-sidebar" />
                  <span>Join Server</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "ideas" && (
        <div className="fundraising-content" id="fundraising-ideas">
          <div className="section-header">
            <h2>Fundraising Ideas</h2>
            <p>Explore these proven fundraising strategies for your student organization</p>
          </div>

          <div className="content-grid">
            {fundraisingIdeas.map((idea, index) => (
              <div className="content-card" key={index}>
                <div className="card-image" style={{ backgroundImage: `url(${idea.image})` }}></div>
                <div className="card-content">
                  <h3>{idea.title}</h3>
                  <p>{idea.description}</p>
                  <a href="#" className="card-link">
                    Learn more <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="cta-section">
            <h2>Need More Fundraising Ideas?</h2>
            <p>
              We have additional resources and personalized guidance available to help you find the perfect fundraising
              strategy for your organization.
            </p>
            <div className="cta-buttons">
              <a href="https://discord.gg/Wv4Et7w7Qy" target="_blank" rel="noopener noreferrer" className="cta-primary">
                Join Our Discord
              </a>
              <a
                href="http://calendly.com/avpstudentorgs"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary"
              >
                Schedule a Consultation
              </a>
            </div>
          </div>
        </div>
      )}

      {activeTab === "planning" && (
        <div className="fundraising-content">
          <div className="section-header">
            <h2>Planning Your Fundraiser</h2>
            <p>A step-by-step approach to organizing successful fundraising events</p>
          </div>

          <div className="feature-section">
            <div className="feature-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <Target />
                </div>
                <h3>Set Clear Goals</h3>
                <p>Define specific, measurable objectives for your fundraising campaign.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <Calendar />
                </div>
                <h3>Create a Timeline</h3>
                <p>Develop a detailed schedule with key milestones and deadlines.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <Users />
                </div>
                <h3>Assign Roles</h3>
                <p>Delegate specific responsibilities to team members based on their strengths.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <DollarSign />
                </div>
                <h3>Budget Carefully</h3>
                <p>Track all expenses and projected income to ensure profitability.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <Megaphone />
                </div>
                <h3>Promote Effectively</h3>
                <p>Use multiple channels to spread the word about your fundraiser.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <CheckCircle />
                </div>
                <h3>Evaluate Results</h3>
                <p>Assess your outcomes and document lessons for future fundraisers.</p>
              </div>
            </div>
          </div>

          <div className="content-with-sidebar">
            <div className="main-content">
              <h2>Fundraising Timeline</h2>
              <p>
                A well-planned timeline is crucial for fundraising success. Here's a recommended schedule to follow:
              </p>

              <h3>8-12 Weeks Before</h3>
              <ul>
                <li>Form your fundraising committee</li>
                <li>Set specific fundraising goals</li>
                <li>Research and select fundraising methods</li>
                <li>Begin securing necessary approvals</li>
                <li>Create a detailed budget</li>
              </ul>

              <h3>4-8 Weeks Before</h3>
              <ul>
                <li>Secure venue and necessary equipment</li>
                <li>Develop marketing materials</li>
                <li>Begin promotion on social media</li>
                <li>Recruit and train volunteers</li>
                <li>Reach out to potential sponsors</li>
              </ul>

              <h3>2-4 Weeks Before</h3>
              <ul>
                <li>Intensify promotional efforts</li>
                <li>Confirm all logistics and reservations</li>
                <li>Prepare all necessary materials</li>
                <li>Hold final committee meetings</li>
                <li>Create day-of-event schedule</li>
              </ul>

              <h3>1 Week Before</h3>
              <ul>
                <li>Send reminders to all participants</li>
                <li>Confirm volunteer assignments</li>
                <li>Prepare cash boxes or payment systems</li>
                <li>Final check of all equipment and supplies</li>
                <li>Create contingency plans</li>
              </ul>

              <h3>Day of Fundraiser</h3>
              <ul>
                <li>Arrive early for setup</li>
                <li>Brief all volunteers on their roles</li>
                <li>Document the event with photos and videos</li>
                <li>Track all donations and expenses</li>
                <li>Thank participants and volunteers</li>
              </ul>

              <h3>After the Fundraiser</h3>
              <ul>
                <li>Send thank-you messages to donors and volunteers</li>
                <li>Reconcile all finances</li>
                <li>Evaluate the success of the fundraiser</li>
                <li>Document lessons learned</li>
                <li>Plan follow-up communications about impact</li>
              </ul>
            </div>

            <div className="sidebar">
              <h3>Planning Resources</h3>
              <ul>
                <li>
                  <a href="#">Fundraising Checklist</a>
                </li>
                <li>
                  <a href="#">Budget Template</a>
                </li>
                <li>
                  <a href="#">Volunteer Sign-up Form</a>
                </li>
                <li>
                  <a href="#">Marketing Timeline</a>
                </li>
                <li>
                  <a href="#">Event Planning Guide</a>
                </li>
                <li>
                  <a href="#">Post-Event Evaluation Form</a>
                </li>
              </ul>

              <div className="discord-help-sidebar">
                <h3>Need Help?</h3>
                <hr />
                <p>Join our Discord for assistance</p>
                <a
                  href="https://discord.gg/Wv4Et7w7Qy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="discord-button-sidebar"
                >
                  <img src="/discord-mark-black.png" alt="Discord" className="discord-logo-sidebar" />
                  <span>Join Server</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional tabs content would go here */}
      {activeTab === "regulations" && (
        <div className="fundraising-content">
          <div className="section-header">
            <h2>Campus Regulations</h2>
            <p>Important policies and guidelines for fundraising at UC San Diego</p>
          </div>

          <div className="content-with-sidebar">
            <div className="main-content">
              <h2>University Policies</h2>
              <p>
                All fundraising activities must comply with UC San Diego policies. Understanding these regulations is
                essential to avoid complications and ensure your fundraiser's success.
              </p>

              <h3>Food Sales</h3>
              <ul>
                <li>All food sales must comply with UC San Diego food safety guidelines</li>
                <li>A temporary food permit may be required from Environmental Health & Safety</li>
                <li>At least one person with a Food Handler's Certificate must be present</li>
                <li>Pre-packaged foods are subject to fewer restrictions than prepared foods</li>
                <li>Certain locations on campus have specific rules about food sales</li>
              </ul>

              <h3>Space Reservations</h3>
              <ul>
                <li>Reserve spaces through the appropriate campus departments well in advance</li>
                <li>Library Walk reservations must be made through the Center for Student Involvement</li>
                <li>Price Center and Student Center reservations are managed by University Centers</li>
                <li>Outdoor spaces may require additional approvals</li>
                <li>Some spaces have restrictions on sales activities</li>
              </ul>

              <h3>Financial Handling</h3>
              <ul>
                <li>All funds must be properly documented and accounted for</li>
                <li>Deposits should be made promptly following your fundraiser</li>
                <li>Student organizations must follow specific cash handling procedures</li>
                <li>Keep detailed records of all transactions</li>
                <li>Consult with your Student Life Business Office Fund Manager for guidance</li>
              </ul>

              <h3>Advertising</h3>
              <ul>
                <li>Adhere to campus posting policies when promoting your fundraiser</li>
                <li>Flyers may only be posted on designated bulletin boards</li>
                <li>All promotional materials must clearly identify the sponsoring organization</li>
                <li>Chalking is only permitted in specific areas with prior approval</li>
                <li>Digital signage requests must be submitted through proper channels</li>
              </ul>

              <h3>Raffles and Games of Chance</h3>
              <ul>
                <li>Raffles are considered gambling and are subject to strict regulations</li>
                <li>California law requires specific registration for charitable raffles</li>
                <li>Alternatives like opportunity drawings may be more appropriate</li>
                <li>Consult with the Center for Student Involvement before planning any raffle</li>
                <li>Games of skill are generally permitted with proper approvals</li>
              </ul>
            </div>

            <div className="sidebar">
              <h3>Important Resources</h3>
              <ul>
                <li>
                  <a href="https://studentlife.ucsd.edu/student-org/" target="_blank" rel="noopener noreferrer">
                    Student Organization Handbook
                  </a>
                </li>
                <li>
                  <a href="https://ehs.ucsd.edu/food-safety" target="_blank" rel="noopener noreferrer">
                    Food Safety Guidelines
                  </a>
                </li>
                <li>
                  <a
                    href="https://universitycenters.ucsd.edu/event-services/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Space Reservation Policies
                  </a>
                </li>
                <li>
                  <a href="https://slbo.ucsd.edu/fund-management/" target="_blank" rel="noopener noreferrer">
                    Financial Policies
                  </a>
                </li>
                <li>
                  <a href="https://getinvolved.ucsd.edu/" target="_blank" rel="noopener noreferrer">
                    Center for Student Involvement
                  </a>
                </li>
              </ul>

              <div className="discord-help-sidebar">
                <h3>Need Help?</h3>
                <hr />
                <p>Join our Discord for assistance</p>
                <a
                  href="https://discord.gg/Wv4Et7w7Qy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="discord-button-sidebar"
                >
                  <img src="/discord-mark-black.png" alt="Discord" className="discord-logo-sidebar" />
                  <span>Join Server</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discord Help Section */}
      <section className="discord-help" style={{ backgroundColor: "#5865f2", marginTop: "3rem" }}>
        <div className="discord-content">
          <h3>Have Questions About Fundraising?</h3>
          <p>
            Our team is ready to help you plan and execute successful fundraisers for your student organization. Join
            our Discord server for real-time assistance and connect with other student leaders.
          </p>
          <a href="https://discord.gg/Wv4Et7w7Qy" target="_blank" rel="noopener noreferrer" className="discord-button">
            <img src="/discord-mark-black.png" alt="Discord" className="discord-logo" />
            <span>Join Our Discord Community</span>
          </a>
        </div>
        <img src="/discord-mascot.png" alt="Discord mascot" className="discord-image" />
      </section>
    </div>
  )
}

export default FundraisingGuide
