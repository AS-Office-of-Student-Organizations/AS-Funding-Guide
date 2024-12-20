import React, { useEffect, useState } from "react";
import { Link, Route, Routes} from "react-router-dom";
import { collection, doc, getDoc, updateDoc, getFirestore} from "firebase/firestore";
import GuideSideBar from "./GuideSideBar";
import GuidePage from "./GuidePage.jsx";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../styles/Guide.css";



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
    
    
    const GuideSideBarEditor = ({ pages, onReorder, handleDeletePage, handleAddPage, handleSave }) => {
        const onDragEnd = (result) => {
          const { source, destination } = result;
      
          // If dropped outside the list or in the same position, do nothing
          if (!destination || source.index === destination.index) return;
      
          // Reorder the pages array
          const reorderedPages = Array.from(pages);
          const [removed] = reorderedPages.splice(source.index, 1);
          reorderedPages.splice(destination.index, 0, removed);
      
          // Update the pages state
          onReorder(reorderedPages);
        };
      
        return (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="sidebar">
              {(provided) => (
                <div
                  className="guide-sidebar"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>Pages</h2>
                  <ul>
                    {pages.map((page, index) => (
                      <Draggable key={page.pageName} draggableId={page.pageName} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Link
                              to={`/Admin/guide/${page.pageName
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                            >
                              {page.pageName}
                            </Link>
                            <button
                              className="delete-button"
                              onClick={() => handleDeletePage(index)}
                            >
                              🗑️
                            </button>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                  <div className="sidebar-buttons">
                    <button className="create-page" onClick={handleAddPage}>
                      Create
                    </button>
                    <button className="save-page" onClick={handleSave}>
                      Save
                    </button>
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
          <div className="guide-left-column">
            <GuideSideBarEditor
              pages={pages}
              onReorder={setPages}
              handleDeletePage={handleDeletePage}
              handleAddPage={handleAddPage}
              handleSave={handleSave}
            />
          </div>
          <Routes>
            {pages.map((page, index) => (
              <Route
                key={index}
                path={`/${page.pageName.toLowerCase().replace(/\s+/g, "-")}`}
                element={
                  <GuidePage
                    content={page.pageContent}
                    edit={true}
                    onContentChange={(newContent) =>
                      handleContentChange(index, newContent)
                    }
                  />
                }
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
  
  export default GuideEditor;