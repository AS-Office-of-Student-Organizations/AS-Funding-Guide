import { Routes, Route, Link } from "react-router-dom"
import GuideEditor from "@/guide/GuideEditor"
import AnnouncementsEditor from "@/landing/components/AnnouncementsEditor"
import DeadlinesEditor from "@/landing/components/DeadlinesEditor"
import HiddenGuide from "@/guide/HiddenGuide"
import FundraisingEditor from "@/fundraising/FundraisingEditor"

const AdminHome = () => {
  return (
    <div>
      <Routes>
        <Route
          path="*"
          element={
            <ul>
              <li>
                <Link to="/admin/guide">Guide</Link>
              </li>
              <li>
                <Link to="/admin/fundraising">Fundraising Guide</Link>
              </li>
              <li>
                <Link to="/admin/announcements">Announcements</Link>
              </li>
              <li>
                <Link to="/admin/deadlines">Funding Deadlines</Link>
              </li>
              <li>
                <Link to="/admin/faq">FAQ</Link>
              </li>
            </ul>
          }
        />
        <Route path="/guide/*" element={<GuideEditor />} />
        <Route path="/fundraising" element={<FundraisingEditor />} />
        <Route path="/announcements" element={<AnnouncementsEditor />} />
        <Route path="/deadlines" element={<DeadlinesEditor />} />
        <Route path="/faq/*" element={<HiddenGuide />} />
      </Routes>
    </div>
  )
}

export default AdminHome
