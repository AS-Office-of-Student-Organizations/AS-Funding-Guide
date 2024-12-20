import { Routes, Route, Link } from "react-router-dom"
import GuideEditor from "./GuideEditor";

const AdminHome = () => {
    return (
        <div>
            <Routes>
                <Route path="*" element={
                    <ul>
                    <li>
                        <Link to="/Admin/guide">Guide</Link>
                    </li>
                    </ul>
                    } />
                <Route path="/guide/*" element={<GuideEditor/>} />
            </Routes>
        </div>
    )
}

export default AdminHome;