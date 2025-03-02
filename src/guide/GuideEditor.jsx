import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { doc, getDoc, updateDoc, getFirestore } from 'firebase/firestore';
import GuideSideBar from '@/guide/components/GuideSideBar.jsx';
import GuidePage from '@/guide/components/GuidePage.jsx';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './Guide.css';

const GuideEditor = () => {
  const GuideEditorLanding = () => {
    return (
      <div>
        <h1>Funding Guide Editor Rules</h1>
        <ul>
          <li>All pages must start with an h1, and only include one h1</li>
          <li>Introduction page cannot be deleted. If it is, make it again.</li>
          <li>
            <b>PRESS SAVE AFTER MAKING CHANGES</b>
          </li>
        </ul>
      </div>
    );
  };

  const [pages, setPages] = useState([]);
  const db = getFirestore();

  const handleAddPage = () => {
    const name = prompt('Enter page name:');
    if (!name) return;
    setPages([...pages, { pageName: name, pageContent: '' }]);
  };

  const handleAddHeader = () => {
    const name = prompt('Enter header name:');
    if (!name) return;
    setPages([...pages, { pageName: name, pageContent: '', header: true }]);
  };

  const handleDeletePage = index => {
    const newPages = pages.filter((_, i) => i !== index);
    setPages(newPages);
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'public', 'guide');
      await updateDoc(docRef, { pages: pages });
      alert('Guide saved successfully!');
    } catch (error) {
      console.error('Error saving pages:', error);
    }
  };

  const handleEditPageName = index => {
    const newName = prompt('Enter new page name:');
    if (newName) {
      const updatedPages = [...pages];
      updatedPages[index].pageName = newName;
      setPages(updatedPages);
    }
  };

  const handleContentChange = (index, newContent) => {
    const updatedPages = [...pages];
    updatedPages[index].pageContent = newContent;
    setPages(updatedPages);
  };

  // This gets verified later - no need now.
  // eslint-disable-next-line react/prop-types
  const GuideSideBarEditor = ({ pages }) => {
    const onDragEnd = result => {
      const { source, destination } = result;

      // If dropped outside the list or in the same position, do nothing
      if (!destination || source.index === destination.index) return;

      // Reorder the pages array
      const reorderedPages = Array.from(pages);
      const [removed] = reorderedPages.splice(source.index, 1);
      reorderedPages.splice(destination.index, 0, removed);

      // Update the pages state
      setPages(reorderedPages);
    };

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sidebar">
          {provided => (
            <GuideSideBar
              editMode={true}
              pages={pages}
              handleDeletePage={handleDeletePage}
              handleAddPage={handleAddPage}
              handleSave={handleSave}
              handleEditPageName={handleEditPageName}
              handleAddHeader={handleAddHeader}
              provided={provided}
            />
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const docRef = doc(db, 'public', 'guide'); // hard code for now
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPages(docSnap.data().pages);
        } else {
          console.error('no such document!');
        }
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    };
    fetchPages();
  }, [db]);

  return (
    <div className="guide">
      <GuideSideBarEditor pages={pages} />
      <Routes>
        {pages.map(
          (page, index) =>
            !page.header && (
              <Route
                key={index}
                path={`/${page.pageName.toLowerCase().replace(/\s+/g, '-')}`}
                element={
                  <GuidePage
                    content={page.pageContent}
                    edit={true}
                    onContentChange={newContent => handleContentChange(index, newContent)}
                  />
                }
              />
            )
        )}
        <Route path="*" element={<GuideEditorLanding />} />
      </Routes>
    </div>
  );
};

export default GuideEditor;
