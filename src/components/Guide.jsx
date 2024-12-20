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
          <GuideSideBar pages={pages} />
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
        </div>
    );
  };
  
  export default Guide;