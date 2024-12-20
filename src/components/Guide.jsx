import React, { useEffect, useState } from "react";
import { Link, Route, Routes} from "react-router-dom";
import { db } from "../firebase.js"; // Import your Firebase config
import { collection, getDoc, doc, updateDoc } from "firebase/firestore";
import GuideSideBar from "./GuideSideBar";
import GuidePage from "./GuidePage.jsx";
import "../styles/Guide.css";


const Guide = () => {
    const [pages, setPages] = useState([]);
  
    useEffect(() => {
      const fetchPages = async () => {
        try {
            const docRef = doc(db, "guidePages", "pageArray"); // hard code for now
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPages(docSnap.data().pages);
            } else {
                console.error("no such document!");
            }
        } catch (error) {
            console.error("Error fetching pages:", error);
        }
      };
  
      fetchPages();
    }, []);
  
    return (
        <div className="guide">
            <div className="guide-left-column">
                <GuideSideBar pages={pages} />
            </div>
            <Routes>
                {pages.map((page, index) => (
                <Route
                    key={index}
                    path={`/${page.pageName.toLowerCase().replace(/\s+/g, "-")}`}
                    element={<GuidePage content={page.pageContent} edit={false} />}
                />
                ))}
                <Route path="*" element={<p>Page not found</p>} />
            </Routes>
            <div className="guide-right-column">
                <h2>Filler</h2>
                <ul>
                    <li>filler 1</li>
                    <li>filler 2</li>
                    <li>filler 3</li>
                    <li>filler 4</li>
                    <li>filler 5</li>
                </ul>
            </div>
        </div>
    );
  };
  
  export default Guide;