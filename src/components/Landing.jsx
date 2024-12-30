import Announcements from "./Announcements";
import Deadlines from "./Deadlines";
import React, {useState, useEffect} from "react";
import { db } from "../firebase.js"; // Import your Firebase config
import { getDoc, doc} from "firebase/firestore";
import "../styles/Landing.css"

const Landing = () => {
    const [announcements, setAnnouncements] = useState([]); 
    const [deadlines, setDeadlines] = useState([])
      
    useEffect(() => {
        const fetchFeed = async () => {
        try {
            const docRef = doc(db, "public", "landing"); // hard code for now
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setAnnouncements(docSnap.data().announcements);
                setDeadlines(docSnap.data().deadlines)
            } else {
                console.error("no such document!");
            }
        } catch (error) {
            console.error("Error fetching pages:", error);
        }
        };
    
        fetchFeed();
    }, []);


    return (
        <div className='landing'>
            <div className='header'>
                <h1>A.S Office of Student Organizations</h1>
                <p>A resource for student organization funding at UC San Diego</p>
            </div>
            <div className='landing-body'>
                <div className='landing-section'>
                    <Announcements announcements={announcements}/>
                </div>
                <div className='landing-section'>
                    <Deadlines deadlines={deadlines}/>
                </div>
            </div>
        </div>
    )
}

export default Landing;