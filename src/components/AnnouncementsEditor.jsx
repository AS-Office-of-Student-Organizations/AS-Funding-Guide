import React, {useState,useEffect} from "react";
import { db } from "../firebase.js"; // Import your Firebase config
import { getDoc, doc, updateDoc} from "firebase/firestore";
import { DragDropContext, Droppable} from "react-beautiful-dnd";
import "../styles/Landing.css"
import Announcements from "./Announcements.jsx";

const AnnouncementsEditor = () => {

    const [announcements, setAnnouncements] = useState([]); 
        
    useEffect(() => {
        const fetchAnnouncements = async () => {
        try {
            const docRef = doc(db, "landingContent", "userFeed"); // hard code for now
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setAnnouncements(docSnap.data().announcements);
            } else {
                console.error("no such document!");
            }
        } catch (error) {
            console.error("Error fetching pages:", error);
        }
        };
    
        fetchAnnouncements();
    }, []);

    const handleAddAnnouncement = () => {
        let name = prompt("Enter title:");
        if (!name) return;
        setAnnouncements([...announcements, {title: name, content: "" }]);
    };

    const handleDeleteAnnouncement = (index) => {
        const newAnnouncements = announcements.filter((_, i) => i !== index);
        setAnnouncements(newAnnouncements);
    };

    const handleSave = async () => {
        try {
            const docRef = doc(db, "landingContent", "userFeed");
            await updateDoc(docRef, { announcements: announcements });
            alert("Announcements saved successfully!");
        } catch (error) {
            console.error("Error saving announcements:", error);
        }
    };

    const handleEditTitle = (index) => {
        const newTitle = prompt("Enter new title:");
        if (newTitle) {
        const updatedAnnouncements = [...announcements];
        updatedAnnouncements[index].title = newTitle;
        setAnnouncements(updatedAnnouncements);
        }
    };

    const handleContentChange = (index, newContent) => {
        const updatedAnnouncements = [...announcements];
        updatedAnnouncements[index].content = newContent;
        setAnnouncements(updatedAnnouncements);
    };


    const onDragEnd = (result) => {
        const { source, destination } = result;
    
        // If dropped outside the list or in the same position, do nothing
        if (!destination || source.index === destination.index) return;
    
        // Reorder the pages array
        const reorderedAnnouncements = Array.from(announcements);
        const [removed] = reorderedAnnouncements.splice(source.index, 1);
        reorderedAnnouncements.splice(destination.index, 0, removed);
    
        // Update the pages state
        setAnnouncements(reorderedAnnouncements);
    };

    return (
        <div className='announcements-editor'>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="announcements">
                {(provided) => (
                <Announcements
                    editMode={true}
                    announcements={announcements}
                    handleDeleteAnnouncement={handleDeleteAnnouncement}
                    handleAddAnnouncement={handleAddAnnouncement}
                    handleSave={handleSave}
                    handleEditTitle={handleEditTitle}
                    handleContentChange={handleContentChange}
                    provided={provided}
                />
                )} 
                </Droppable>
            </DragDropContext>
            <div className='edit-buttons'>
                <button onClick={handleAddAnnouncement}>
                    + Announcement
                </button>
                <button onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default AnnouncementsEditor;