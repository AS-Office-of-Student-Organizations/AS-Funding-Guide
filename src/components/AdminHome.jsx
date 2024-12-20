import { Routes, Route, Link } from "react-router-dom"
import GuideEditor from "./GuideEditor";

const AdminHome = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/Admin/guide">Guide</Link>
                </li>
            </ul>
            <Routes>
                <Route path="*" element={<p>hello</p>} />
                <Route path="/guide/*" element={<GuideEditor/>} />
            </Routes>
        </div>
    )
}

export default AdminHome;