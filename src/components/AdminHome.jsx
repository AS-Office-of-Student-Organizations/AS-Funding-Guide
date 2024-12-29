import { Routes, Route, Link } from "react-router-dom"
import GuideEditor from "./GuideEditor";
import AnnouncementsEditor from "./AnnouncementsEditor";
import DeadlinesEditor from "./DeadlinesEditor";

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
                    <li>
                        <Link to="/admin/deadlines">Funding Deadlines</Link>
                    </li>
                    </ul>
                    } />
                <Route path="/guide/*" element={<GuideEditor/>} />
                <Route path="/announcements" element={<AnnouncementsEditor/>}/>
                <Route path="/deadlines" element={<DeadlinesEditor/>}/>
            </Routes>
        </div>
    )
}

export default AdminHome;