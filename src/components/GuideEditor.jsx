import React, { useEffect, useState } from "react";
import { Link, Route, Routes} from "react-router-dom";
import { collection, doc, getDoc, updateDoc, getFirestore} from "firebase/firestore";
import GuideSideBar from "./GuideSideBar";
import GuidePage from "./GuidePage.jsx";



const GuideEditor = () => {
    const [pages, setPages] = useState([]);
    const db = getFirestore();

    

    const handleAddPage = () => {
        let name = prompt("Enter page name:");
        setPages([...pages, {pageName: name, pageContent: "" }]);
    };

    const handleDeletePage = (index) => {
        const newPages = pages.filter((_, i) => i !== index);
        setPages(newPages);
    };

    const handleSave = async () => {
        try {
            const docRef = doc(db, "guidePages", "pageArray");
            await updateDoc(docRef, { pages: pages });
            alert("Guide saved successfully!");
        } catch (error) {
            console.error("Error saving pages:", error);
        }
    };

    const handleContentChange = (index, newContent) => {
        const updatedPages = [...pages];
        updatedPages[index].pageContent = newContent;
        setPages(updatedPages);
    };
    
    
    const GuideSideBarEditor = ({pages}) => {
        return (
          <div className= "guide-sidebar">
            <h2>Pages</h2>
            <ul>
              {pages.map((page, index) => (
                <li key={page.id}>
                  <Link to={`/Admin/guide/${page.pageName.toLowerCase().replace(/\s+/g, "-")}`}>
                    {page.pageName}
                  </Link>
                  <button className="delete-page" onClick={() => handleDeletePage(index)}>delete</button>
                </li>
              ))}
            </ul>
            <button className="create-page" onClick={() => handleAddPage()}>create</button>
            <button className="save-page" onClick={() => handleSave()}>save</button>
          </div>
        );
    };
  
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
          <GuideSideBarEditor pages={pages} />
          <Routes>
            {pages.map((page, index) => (
              <Route
                key={index}
                path={`/${page.pageName.toLowerCase().replace(/\s+/g, "-")}`}
                element={<GuidePage content={page.pageContent} edit={true}
                onContentChange={(newContent) =>
                    handleContentChange(index, newContent)
                }
                />}
              />
            ))}
            <Route path="*" element={<p>Page not found</p>} />
          </Routes>
        </div>
    );
  };
  
  export default GuideEditor;