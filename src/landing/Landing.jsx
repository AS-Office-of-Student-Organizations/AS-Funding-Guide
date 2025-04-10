import Announcements from './components/Announcements.jsx';
import Deadlines from './components/Deadlines.jsx';
import Stats from './components/Stats.jsx';
import { db } from '@/components/firebase.jsx';
import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import './Landing.css';

const Landing = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [stats, setStats] = useState(undefined);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const docRef = doc(db, 'public', 'landing'); // hard code for now
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAnnouncements(docSnap.data().announcements);
          setDeadlines(docSnap.data().deadlines);
        } else {
          console.error('no such document!');
        }
        const docRef2 = doc(db, 'public', 'stats-2024-2025');
        const docSnap2 = await getDoc(docRef2);
        if (docSnap2.exists()) {
          setStats(docSnap2.data());
        } else {
          console.error('no such document!');
        }
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    };

    fetchFeed();
  }, []);

  return (
    <div className="landing">
      <div className="header">
        <h1>A.S Office of Student Organizations</h1>
        <p>A resource for student organization funding at UC San Diego</p>
      </div>
      <div className="landing-body">
        <div className="landing-section">
          <Announcements announcements={announcements} />
        </div>
        <div className="landing-section">
          <Deadlines deadlines={deadlines} />
        </div>
        <Stats stats={stats} />
      </div>
    </div>
  );
};

export default Landing;
