"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Target, FileText, Store, ShoppingBag, CreditCard, MapPin } from "lucide-react"
import "./FundraisingGuide.css"

const FundraisingGuide = () => {
  const [activeTab, setActiveTab] = useState("basics")
  const [activeSection, setActiveSection] = useState("introduction")

  const tabs = [
    { id: "basics", label: "Fundraising Basics" },
    { id: "ideas", label: "Fundraising Ideas" },
    { id: "regulations", label: "Campus Regulations" },
    { id: "resources", label: "Resources" },
    { id: "faq", label: "FAQ" },
  ]

  const sidebarLinks = [
    { id: "introduction", label: "Introduction" },
    { id: "getting-started", label: "Getting Started" },
  ]

  const fundraisingIdeas = [
    {
      title: "Business Partnerships",
      description: "Partner with local restaurants and businesses for percentage nights.",
      image: "/handshake.jpg",
    },
    {
      title: "Merchandise Sales",
      description: "Design and sell custom apparel, stickers, and other branded items.",
      image: "/merch.webp",
    },
    {
      title: "Membership Dues",
      description: "Collect dues in exchange for special benefits and discounts.",
      image: "/membership.jpg",
    },
    {
      title: "Library Walk Sales",
      description: "Set up a table on Library Walk to sell food, merchandise, or services.",
      image: "/tabling.jpg",
    },
    {
      title: "Sponsorships & Grants",
      description: "Apply for funding from university departments or external organizations.",
      image: "/sponsor.jpg",
    },
    {
      title: "Charity Fundraisers",
      description: "Organize events to raise money for charitable causes.",
      image: "/charity.jpg",
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
        <img src="public\AS_Logo_BW.png" alt="Fundraising illustration" className="hero-image" />
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
                  Fundraising is a valuable skill for student organizations at UC San Diego. Whether you're raising
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
                    <strong>Start Early</strong> - Begin planning your fundraising activities well in advance
                  </li>
                  <li>
                    <strong>Stay Organized</strong> - Keep detailed records and assign clear responsibilities
                  </li>
                  <li>
                    <strong>Fundraise with a Goal in Mind</strong> - Define exactly what you're raising money for
                  </li>
                  <li>
                    <strong>Create a Detailed Plan</strong> - Develop comprehensive timelines and strategies
                  </li>
                  <li>
                    <strong>Manage Your Risk</strong> - Don't overinvest in fundraising activities
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
                <p>Important requirements include:</p>
                <ul>
                  <li>Obtaining a TAP (Triton Activities Planner) for on-campus sales</li>
                  <li>Consulting with SLBO (Student Life Business Office) fund managers</li>
                  <li>Having a bank account (off-campus or on-campus) with a tax ID number</li>
                  <li>Understanding UCSD legal services requirements</li>
                </ul>
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
                  <a
                    href="#"
                    className="card-link"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveTab("ideas")
                      const element = document.getElementById(idea.title.toLowerCase().replace(/\s+/g, "-"))
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                  >
                    Learn more <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div id="business-partnerships" className="idea-detail-section">
            <h2>
              <Store /> Business Partnerships
            </h2>
            <p>
              Collaborating with local businesses is an effective way to raise funds while building community
              connections.
            </p>

            <h3>Finding a Partner</h3>
            <p>Look for businesses that are:</p>
            <ul>
              <li>Located on or near campus for students without cars</li>
              <li>Popular among your organization's demographic</li>
            </ul>

            <div className="two-column-list">
              <div>
                <h4>Popular On-Campus Partners</h4>
                <ul>
                  <li>Fan Fan</li>
                  <li>Blue Bowl</li>
                  <li>Blue Pepper</li>
                  <li>Panda Express</li>
                  <li>Yogurt World</li>
                  <li>Dirty Birds</li>
                  <li>Jamba Juice</li>
                </ul>
              </div>
              <div>
                <h4>Popular Off-Campus Partners</h4>
                <ul>
                  <li>Tapioca Express</li>
                  <li>Marugame</li>
                  <li>Arteazen</li>
                  <li>SomiSomi</li>
                  <li>Chipotle</li>
                  <li>BJ's</li>
                  <li>The Melt</li>
                  <li>The Taco Stand</li>
                  <li>Cava</li>
                </ul>
              </div>
            </div>

            <h3>Setting Realistic Goals</h3>
            <p className="compact-text">
              When planning your fundraiser, calculate your potential earnings. For example, if your organization
              receives 15% of proceeds, each person spends $7 on average, and 25 people attend: ($7 × 25) × 15% =
              $26.25. Or if your organization receives 30% of proceeds, each person spends $15 on average, and 15 people
              attend: ($15 × 15) × 30% = $67.50.
            </p>
            <p className="compact-text">
              Consider these factors when choosing a partner: <strong>Average price of products</strong>,{" "}
              <strong>Percentage you'll receive</strong> from proceeds, and <strong>Expected attendance</strong>.
            </p>

            <h3>Contacting Businesses</h3>
            <p className="compact-text">
              You can reach out to potential partners by calling the business, sending an email, or visiting in person.
              Each approach has its advantages depending on the business type and your relationship with them.
            </p>

            <div className="template-box">
              <h4>Phone Call Template</h4>
              <p>
                <strong>You:</strong> "Hi, my name is [Your Name], and I'm with [Your Organization Name] at UC San
                Diego. I was wondering if your organization offers fundraising opportunities for student organizations?"
              </p>
              <p>
                <strong>If they say yes:</strong> "That's great! We'd love to partner with [Shop Name] to host a
                fundraiser where our supporters would come in on a specific day, and a percentage of sales would go
                toward our organization. Would you be open to discussing available dates and how the process works?"
              </p>
              <p>Then discuss:</p>
              <ul>
                <li>Date and time</li>
                <li>Percentage your organization would receive</li>
                <li>Any event details if hosting in collaboration</li>
              </ul>
            </div>

            <div className="template-box">
              <h4>Email Template</h4>
              <p>
                <strong>Subject:</strong> Fundraising Partnership Inquiry – [Your Organization Name]
              </p>
              <p>Dear [Manager's Name],</p>
              <p>
                I hope you're doing well! My name is [Your Name], and I am reaching out on behalf of [Your Organization
                Name] at UC San Diego. We are looking to host a fundraiser and wanted to see if [Business Name] would be
                interested in partnering with us for a fundraising event.
              </p>
              <p>
                Our idea is to invite our members and the campus community to support your business on a designated day,
                and in return, a portion of the sales from our supporters would go toward our organization. We believe
                this would be a great way to promote your shop while helping us raise funds for [brief purpose of
                fundraising].
              </p>
              <p>
                Would you be open to discussing this opportunity? We'd love to work with you to set a date and discuss
                the details.
              </p>
              <p>Thank you for your time! I look forward to hearing your thoughts.</p>
              <p>
                Best,
                <br />
                [Your Name]
                <br />
                [Your Position in Organization]
                <br />
                [Your Contact Information]
              </p>
            </div>

            <h3>Promoting Your Event</h3>
            <div className="promotion-section">
              <div className="promotion-content">
                <ul>
                  <li>Create eye-catching flyers</li>
                  <li>Post on social media and messaging apps</li>
                  <li>Advertise transportation if offering it for off-campus events</li>
                  <li>Clearly note if participants need to mention the fundraiser when ordering</li>
                </ul>
              </div>
              <div className="promotion-image">
                <img src="/Red_and_Cream_Illustrative_Weekend_Market_Flyer.png" alt="Promotional flyer example" />
              </div>
            </div>

            <h3>Running the Event</h3>
            <ul>
              <li>Have members arrive early to set up and coordinate with the business</li>
              <li>Consider printing small flyers for participants to present when ordering</li>
              <li>Follow up about when and how you'll receive the proceeds</li>
              <li>Thank the business for their partnership</li>
            </ul>
          </div>

          <div id="merchandise-sales" className="idea-detail-section">
            <h2>
              <ShoppingBag /> Merchandise Sales
            </h2>
            <p>
              Selling branded merchandise is a great way to raise funds while increasing visibility for your
              organization.
            </p>

            <h3>Choosing Products</h3>
            <p>
              Survey your members to determine what items would be most popular. Consider products that align with your
              organization's focus.
            </p>
            <p>Popular merchandise options include:</p>
            <ul>
              <li>T-shirts and hoodies</li>
              <li>Hats and beanies</li>
              <li>Stickers and pins</li>
              <li>Tote bags</li>
              <li>Water bottles and mugs</li>
              <li>Keychains and lanyards</li>
            </ul>

            <h3>Selecting a Supplier</h3>
            <p>There are three main approaches to producing merchandise:</p>

            <div className="comparison-table">
              <div className="comparison-column">
                <h4>Bulk Order</h4>
                <ul>
                  <li>✅ Cheaper per unit</li>
                  <li>✅ Higher profit margins</li>
                  <li>❌ Requires upfront payment</li>
                  <li>❌ Risk of unsold inventory</li>
                </ul>
              </div>
              <div className="comparison-column">
                <h4>Print On Demand</h4>
                <ul>
                  <li>✅ No inventory risk</li>
                  <li>✅ Can order small quantities</li>
                  <li>❌ Lower profit margins</li>
                  <li>❌ Less control over quality</li>
                </ul>
              </div>
              <div className="comparison-column">
                <h4>Do It Yourself</h4>
                <ul>
                  <li>✅ Potentially higher profits</li>
                  <li>✅ Complete creative control</li>
                  <li>❌ Labor intensive</li>
                  <li>❌ May require equipment</li>
                </ul>
              </div>
            </div>

            <h3>Setting Prices</h3>
            <p>When determining prices, consider:</p>
            <ul>
              <li>Production costs per item</li>
              <li>Market demand for your merchandise</li>
              <li>Competitor pricing (what other organizations charge)</li>
              <li>Perceived value of your brand</li>
            </ul>

            <h3>Maximizing Profits</h3>
            <p>To increase your profit margins:</p>
            <ul>
              <li>Source blank items yourself and pay only for printing/customization</li>
              <li>Use equipment your organization already has access to (e.g., Cricut machines)</li>
              <li>Buy supplies in bulk when possible</li>
              <li>Consider offering bundle deals</li>
            </ul>

            <h3>Tracking Sales and Distribution</h3>
            <p>Establish a system for managing orders:</p>
            <ul>
              <li>
                Create a Google Form for orders with fields for name, item selection, size, delivery preference, and
                payment confirmation
              </li>
              <li>Use a dedicated organization account for collecting payments</li>
              <li>Keep detailed records of all transactions</li>
              <li>Send confirmation messages to buyers with pickup/delivery information</li>
            </ul>
          </div>

          <div id="membership-dues" className="idea-detail-section">
            <h2>
              <CreditCard /> Membership Dues
            </h2>
            <p>
              Collecting membership dues can provide a steady source of income for your organization, though it's
              important to consider accessibility.
            </p>

            <div className="note-box">
              <strong>Note:</strong> Membership dues may create barriers to participation. Consider offering fee waivers
              or alternative ways to contribute for students with financial constraints.
            </div>

            <h3>Determining Purpose and Amount</h3>
            <p>Before implementing membership dues:</p>
            <ul>
              <li>Identify specific needs the dues will fund (events, supplies, transportation)</li>
              <li>Set reasonable fees that members will be willing to pay</li>
              <li>Consider different membership structures:</li>
            </ul>

            <div className="two-column-list">
              <div>
                <h4>Flat Rate System</h4>
                <p>Everyone pays the same amount (e.g., $20 per quarter)</p>
              </div>
              <div>
                <h4>Tiered System</h4>
                <p>Different levels with varying benefits:</p>
                <ul>
                  <li>Tier 1: $10 - Basic membership</li>
                  <li>Tier 2: $20 - Additional perks</li>
                </ul>
              </div>
            </div>

            <h3>Membership Benefits</h3>
            <p>Offer compelling incentives for members, such as:</p>
            <ul>
              <li>Discounts on organization merchandise</li>
              <li>Access to exclusive events</li>
              <li>Priority registration for popular activities</li>
              <li>Special partnerships with local businesses</li>
              <li>Networking opportunities</li>
              <li>Leadership development</li>
            </ul>

            <h3>Collection and Management</h3>
            <p>Establish clear processes for:</p>
            <ul>
              <li>Collecting and tracking payments</li>
              <li>Issuing membership cards or digital verification</li>
              <li>Checking membership status at events</li>
              <li>Renewing memberships</li>
              <li>Managing membership records</li>
            </ul>
          </div>

          <div id="library-walk-sales" className="idea-detail-section">
            <h2>
              <MapPin /> Library Walk Sales
            </h2>
            <p>
              Setting up a table on Library Walk is a highly visible way to sell merchandise, food, or services to the
              campus community.
            </p>

            <h3>Reserving Space and Getting Approval</h3>
            <p>Complete these steps at least 3 weeks before your event:</p>
            <ul>
              <li>Reserve a space on Library Walk through EMS (Event Management System)</li>
              <li>Submit a TAP (Triton Activities Planner) form for your event</li>
              <li>
                If selling food, review EH&S (Environment, Health & Safety) guidelines and obtain necessary approvals
              </li>
            </ul>

            <h3>Planning Your Inventory and Pricing</h3>
            <ul>
              <li>Determine what items you'll sell and how to display them effectively</li>
              <li>Set appropriate prices and consider offering special deals</li>
              <li>Prepare a system for collecting and tracking payments</li>
              <li>Bring enough change if accepting cash</li>
            </ul>

            <h3>Setting Up Your Table</h3>
            <p>Prepare for a successful tabling experience:</p>
            <ul>
              <li>Create eye-catching signage and displays</li>
              <li>Bring or borrow a table, chairs, and possibly a canopy</li>
              <li>Schedule members to staff the table throughout the day</li>
              <li>Assign specific roles (cashier, promoter, etc.)</li>
              <li>Bring all necessary supplies (payment system, inventory, promotional materials)</li>
            </ul>

            <h3>Promotion Strategies</h3>
            <ul>
              <li>Advertise your sale in advance through social media and campus channels</li>
              <li>Have members actively engage passersby</li>
              <li>Create visually appealing displays</li>
              <li>Offer samples or demonstrations when appropriate</li>
              <li>Collect contact information for future events</li>
            </ul>
          </div>

          <div id="sponsorships-&-grants" className="idea-detail-section">
            <h2>
              <FileText /> Sponsorships & Grants
            </h2>
            <p>
              Securing sponsorships and grants can provide substantial funding for your organization's activities and
              long-term sustainability.
            </p>

            <h3>Potential Funding Sources</h3>
            <div className="three-column-list">
              <div>
                <h4>University Sources</h4>
                <ul>
                  <li>College departments</li>
                  <li>EDI (Equity, Diversity & Inclusion) grants</li>
                  <li>Triton Community Fund</li>
                </ul>
              </div>
              <div>
                <h4>External Sponsorships</h4>
                <ul>
                  <li>Local businesses</li>
                  <li>Tech companies</li>
                  <li>Banks</li>
                  <li>Industry-related companies</li>
                </ul>
              </div>
              <div>
                <h4>Nonprofit Organizations</h4>
                <ul>
                  <li>National student organizations</li>
                  <li>Community foundations</li>
                  <li>The San Diego Foundation</li>
                </ul>
              </div>
            </div>

            <h3>Application Timeline</h3>
            <ol>
              <li>Compile a list of potential sponsors and grants</li>
              <li>Determine your funding target</li>
              <li>Research application deadlines</li>
              <li>Prepare and submit applications</li>
              <li>Follow up after 2 weeks if you haven't received a response</li>
              <li>Finalize sponsorship agreements</li>
              <li>Budget the funds appropriately</li>
              <li>Include sponsors in event marketing</li>
              <li>Thank sponsors and provide post-event updates</li>
              <li>Maintain ongoing relationships</li>
            </ol>

            <div className="template-box">
              <h4>Sponsorship Proposal Template</h4>
              <p>Include these key elements in your sponsorship requests:</p>
              <ul>
                <li>
                  <strong>Organization Information:</strong> Name, contact details, and mission
                </li>
                <li>
                  <strong>Introduction:</strong> Brief overview of your organization, its goals, and past achievements
                </li>
                <li>
                  <strong>Event/Project Details:</strong> Name, date, location, expected attendance, and purpose
                </li>
                <li>
                  <strong>Value Proposition:</strong> Why the sponsor should support you (brand exposure, community
                  engagement, etc.)
                </li>
                <li>
                  <strong>Sponsorship Levels:</strong> Different tiers with etc.)
                </li>
                <li>
                  <strong>Sponsorship Levels:</strong> Different tiers with corresponding benefits and recognition
                </li>
                <li>
                  <strong>Contact Information:</strong> Designated point person for sponsorship inquiries
                </li>
              </ul>
            </div>

            <h3>Building Lasting Relationships</h3>
            <p>Successful sponsorships extend beyond a single event:</p>
            <ul>
              <li>Deliver on all promised benefits</li>
              <li>Document the impact of sponsorships with photos and metrics</li>
              <li>Send personalized thank-you notes</li>
              <li>Maintain regular communication throughout the year</li>
              <li>Invite sponsors to relevant events</li>
              <li>Acknowledge continuing support publicly</li>
            </ul>
          </div>

          <div id="charity-fundraisers" className="idea-detail-section">
            <h2>
              <Target /> Charity Fundraisers
            </h2>
            <p>
              Raising funds for charitable causes can align with your organization's mission while making a positive
              impact in the community.
            </p>

            <h3>University Guidelines</h3>
            <p>When fundraising for external charities, follow these rules:</p>
            <ul>
              <li>
                Student organizations may conduct one on-campus fundraising campaign annually for an external charitable
                organization
              </li>
              <li>The charitable organization must provide service to one or more communities in San Diego County</li>
              <li>
                Obtain an official letter with the charity's taxpayer ID and confirmation of your organization's intent
                to raise money
              </li>
              <li>Submit a fundraising income report to your advisor/SLBO within 14 days of the event</li>
            </ul>

            <h3>Effective Charity Fundraiser Ideas</h3>
            <ul>
              <li>Benefit concerts or performances</li>
              <li>Charity auctions (silent or live)</li>
              <li>Sports tournaments with entry fees</li>
              <li>Themed dinner events</li>
              <li>Service-based fundraisers (car washes, cleaning services)</li>
              <li>Donation drives with specific goals</li>
            </ul>

            <h3>Transparency and Accountability</h3>
            <p>Build trust with donors by:</p>
            <ul>
              <li>Clearly communicating how funds will be used</li>
              <li>Providing information about the charitable organization</li>
              <li>Tracking and reporting all donations accurately</li>
              <li>Sharing the impact of contributions after the fundraiser</li>
              <li>Following all university guidelines for charitable fundraising</li>
            </ul>
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

              <h3>General Fundraising Rules</h3>
              <ul>
                <li>
                  <strong>No Individual Profit:</strong> Individuals may not profit from student organization
                  fundraisers. The purpose of fundraising is to support organization goals and activities.
                </li>
                <li>
                  <strong>Solicitation Restrictions:</strong> Direct, personal solicitations of gifts and donations are
                  not allowed. Registered campus organizations may solicit voluntary donations from attendees at their
                  own programs and meetings.
                </li>
                <li>
                  <strong>Admission Charges:</strong> Admission charges may be required for events on campus only if
                  such events are sponsored by official University units or registered campus organizations (or with the
                  Chancellor's approval, by charitable organizations).
                </li>
                <li>
                  <strong>A.S. Funded Events:</strong> You cannot charge admission for events receiving A.S. funding.
                </li>
                <li>
                  <strong>Voluntary Donations:</strong> Donations cannot be strongly implied as a condition for
                  admission to any campus event or meeting.
                </li>
                <li>
                  <strong>Prohibited Activities:</strong> No unlawful activities are permitted, including gambling, sale
                  of alcohol, games of chance, lotteries, etc.
                </li>
                <li>
                  <strong>Raffles:</strong> Raffles are considered gambling and are subject to strict regulations.
                  Alternatives like opportunity drawings may be more appropriate.
                </li>
              </ul>

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
                <li>Organizations must have a bank account (off-campus or on-campus) with a tax ID number</li>
              </ul>

              <h3>Advertising</h3>
              <ul>
                <li>Adhere to campus posting policies when promoting your fundraiser</li>
                <li>Flyers may only be posted on designated bulletin boards</li>
                <li>All promotional materials must clearly identify the sponsoring organization</li>
                <li>Chalking is only permitted in specific areas with prior approval</li>
                <li>Digital signage requests must be submitted through proper channels</li>
              </ul>

              <h3>Fundraising for Charity</h3>
              <ul>
                <li>
                  Student organizations may conduct one on-campus fundraising campaign annually for an external
                  charitable organization
                </li>
                <li>The charitable organization must provide service to one or more communities in San Diego County</li>
                <li>
                  Obtain an official letter with the charity's taxpayer ID and confirmation of your organization's
                  intent to raise money
                </li>
                <li>Submit a fundraising income report to your advisor/SLBO within 14 days of the event</li>
              </ul>
            </div>

            <div className="sidebar">
              <h3>Important Resources</h3>
              <ul>
                <li>
                  <a href="https://be.ucsd.edu/student-organization-handbook" target="_blank" rel="noopener noreferrer">
                    Student Organization Handbook
                  </a>
                </li>
                <li>
                  <a href="https://saltaire.ucsd.edu/planning/guidelines.html" target="_blank" rel="noopener noreferrer">
                    Food Safety Guidelines
                  </a>
                </li>
                <li>
                  <a
                    href="https://universitycenters.ucsd.edu/events-and-reservations/make-a-reservation.html#:~:text=Reservations%20must%20be%20requested%20at,to%20review%20event%20space%20requests"
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

      {activeTab === "resources" && (
        <div className="fundraising-content">
          <div className="section-header">
            <h2>Resources</h2>
            <p>Helpful contacts and tools for your fundraising efforts</p>
          </div>

          <div className="content-with-sidebar">
            <div className="main-content">
              <h2>Campus Resources</h2>

              <h3>Center for Student Involvement (CSI)</h3>
              <p>The CSI provides guidance and support for student organizations, including:</p>
              <ul>
                <li>Assistance with event planning and approvals</li>
                <li>Information on financial processes for student organizations</li>
                <li>Help with obtaining a TAP (Triton Activities Planner) for on-campus sales</li>
                <li>Guidance on university policies and procedures</li>
              </ul>
              <p>
                <strong>Location:</strong> Price Center East, Level 3
              </p>
              <p>
                <strong>Website:</strong>
                <a href="https://getinvolved.ucsd.edu/" target="_blank" rel="noopener noreferrer">
                  getinvolved.ucsd.edu
                </a>
              </p>
              <h3>Student Life Business Office (SLBO)</h3>
              <p>SLBO provides financial services and guidance for student organizations:</p>
              <ul>
                <li>Consultation with fund managers for hosting fundraisers</li>
                <li>Assistance with financial transactions and record-keeping</li>
                <li>Guidance on establishing bank accounts with tax ID numbers</li>
                <li>Support for financial reporting requirements</li>
              </ul>
              <p>
                <strong>Website:</strong>{" "}
                <a href="https://slbo.ucsd.edu/fund-management/" target="_blank" rel="noopener noreferrer">
                  slbo.ucsd.edu/fund-management
                </a>
              </p>

              <h3>UCSD Legal Services</h3>
              <p>Legal Services can provide guidance on:</p>
              <ul>
                <li>Contracts with external vendors or sponsors</li>
                <li>Compliance with university policies and state laws</li>
                <li>Legal considerations for fundraising activities</li>
              </ul>

              <h3>Associated Students (A.S.)</h3>
              <p>A.S. offers various resources for student organizations:</p>
              <ul>
                <li>Funding opportunities for events and activities</li>
                <li>Marketing and promotional support</li>
                <li>Networking with other student organizations</li>
              </ul>
              <p>
                <strong>Website:</strong>{" "}
                <a href="https://as.ucsd.edu/" target="_blank" rel="noopener noreferrer">
                  as.ucsd.edu
                </a>
              </p>

              <h2>External Resources</h2>

              <h3>Local Businesses</h3>
              <p>Many local businesses are open to partnerships with student organizations:</p>
              <ul>
                <li>Restaurants for percentage nights</li>
                <li>Retail stores for promotional events</li>
                <li>Service providers for in-kind donations</li>
              </ul>

              <h3>Community Foundations</h3>
              <p>Organizations that may provide grants or support:</p>
              <ul>
                <li>The San Diego Foundation</li>
                <li>Community-specific foundations</li>
                <li>Industry-related foundations</li>
              </ul>

              <h3>Online Platforms</h3>
              <p>Digital tools to support your fundraising efforts:</p>
              <ul>
                <li>Payment processing platforms (Venmo, PayPal, Square)</li>
                <li>Event management systems (Eventbrite, Ticketleap)</li>
                <li>Merchandise design and sales platforms (CustomInk, Redbubble, TeeSpring)</li>
                <li>Social media management tools</li>
              </ul>
            </div>

            <div className="sidebar">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <a href="https://getinvolved.ucsd.edu/" target="_blank" rel="noopener noreferrer">
                    Center for Student Involvement
                  </a>
                </li>
                <li>
                  <a
                    href="https://slbo.ucsd.edu/fund-management/team/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Find Your SLBO Fund Manager
                  </a>
                </li>
                <li>
                  <a href="https://universitycenters.ucsd.edu/" target="_blank" rel="noopener noreferrer">
                    University Centers
                  </a>
                </li>
                <li>
                  <a href="https://asfunding.org/guide/introduction" target="_blank" rel="noopener noreferrer">
                    A.S. Funding
                  </a>
                </li>
                <li>
                  <a href="https://saltaire.ucsd.edu/planning/guidelines.html" target="_blank" rel="noopener noreferrer">
                    Food Safety Guidelines
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

      {activeTab === "faq" && (
        <div className="fundraising-content">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Answers to common questions about fundraising at UC San Diego</p>
          </div>

          <div className="faq-container">
            <div className="faq-item">
              <h3>Do I need special permission to hold a fundraiser on campus?</h3>
              <p>
                Yes, you need to complete a TAP (Triton Activities Planner) form for any on-campus fundraising event.
                For food sales, you may also need approval from Environmental Health & Safety. Space reservations must
                be made through the appropriate campus departments.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can my organization charge admission to events?</h3>
              <p>
                Registered student organizations can charge admission for events, but not if the event is receiving A.S.
                funding. Admission charges must be clearly communicated and cannot be disguised as "mandatory
                donations."
              </p>
            </div>

            <div className="faq-item">
              <h3>Are raffles allowed for fundraising?</h3>
              <p>
                Raffles are considered gambling and are subject to strict regulations under California law. While they
                can be conducted, they're not generally recommended. Consider alternatives like opportunity drawings or
                silent auctions instead. Consult with CSI before planning any raffle.
              </p>
            </div>

            <div className="faq-item">
              <h3>How do I set up a percentage night with a restaurant?</h3>
              <p>
                Contact the restaurant directly (by phone, email, or in person) to inquire about their fundraising
                programs. Many restaurants have established processes for these events. Negotiate the date, time, and
                percentage your organization will receive, then promote the event to ensure good attendance.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can we fundraise for an external charity?</h3>
              <p>
                Yes, student organizations may conduct one on-campus fundraising campaign annually for an external
                charitable organization. The charity must serve San Diego County, and you'll need documentation
                including the charity's taxpayer ID. Submit a fundraising income report to your advisor/SLBO within 14
                days of the event.
              </p>
            </div>

            <div className="faq-item">
              <h3>How should we handle money collected during fundraisers?</h3>
              <p>
                All funds must be properly documented and accounted for. Your organization should have a bank account
                with a tax ID number. Deposits should be made promptly after your fundraiser, and detailed records of
                all transactions should be maintained. Consult with your SLBO Fund Manager for specific guidance.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can individuals profit from organization fundraisers?</h3>
              <p>
                No, individuals may not profit from student organization fundraisers. The purpose of fundraising is to
                support organization goals and activities, not personal gain.
              </p>
            </div>

            <div className="faq-item">
              <h3>What's the best way to promote our fundraiser?</h3>
              <p>
                Use a multi-channel approach including social media, campus flyers (on approved bulletin boards), class
                announcements, email lists, and word of mouth. Create eye-catching promotional materials that clearly
                communicate the purpose, date, time, and location of your fundraiser.
              </p>
            </div>

            <div className="faq-item">
              <h3>Are there restrictions on what we can sell?</h3>
              <p>
                Yes, there are restrictions on certain items, particularly food (which requires EH&S approval), alcohol
                (prohibited), and items that violate university policies or copyright laws. Check with CSI if you're
                unsure about a particular item.
              </p>
            </div>

            <div className="faq-item">
              <h3>Where can we get funding to start our fundraiser?</h3>
              <p>
                Consider applying for A.S. funding, department grants, or using a portion of your existing organization
                funds as seed money. Keep initial costs low by choosing fundraisers with minimal upfront investment, and
                consider pre-sales for merchandise to reduce financial risk.
              </p>
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
