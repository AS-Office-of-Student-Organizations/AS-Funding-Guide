import { Routes, Route, Link } from "react-router-dom"
import GuideEditor from "./GuideEditor";
import AnnouncementsEditor from "./AnnouncementsEditor";

const AdminHome = () => {
    return (
        <div>
            <Routes>
                <Route path="*" element={
                    <ul>
                    <li>
                        <Link to="/admin/guide">Guide</Link>
                    </li>
                    <li>
                        <Link to="/admin/announcements">Announcements</Link>
                    </li>
                    </ul>
                    } />
                <Route path="/guide/*" element={<GuideEditor/>} />
                <Route path="/announcements" element={<AnnouncementsEditor/>}/>
            </Routes>
        </div>
    )
}

export default AdminHome;