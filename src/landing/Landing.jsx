import Announcements from './components/Announcements.jsx';
import Deadlines from './components/Deadlines.jsx';
import Stats from './components/Stats.jsx';
import { useDoc } from '@/data/useDocs.jsx';
import './Landing.css';
import EventFeed from './components/EventFeed.jsx';
import AttendanceLeaderboard from './components/AttendanceLeaderboard.jsx';

const Landing = () => {
  const landingDoc = useDoc('landing');
  const stats = useDoc('stats-2024-2025');

  const announcements = landingDoc?.announcements || [];
  const deadlines = landingDoc?.deadlines || [];

  return (
    <div className="landing">
      <div className="header">
        <h1>A.S Office of Student Organizations</h1>
        <p>A resource for student organization funding at UC San Diego</p>
      </div>
      <div className="landing-container">
        <Stats stats={stats} />
      </div>
      <div className="landing-container">
        <div className="landing-section">
          <Announcements announcements={announcements} />
        </div>
      </div>
      <div className="landing-container">
        <div className="landing-section">
          <Deadlines deadlines={deadlines} />
        </div>
        <div className="landing-section">
          <EventFeed stats={stats} />
        </div>
        <div className="landing-section">
          <AttendanceLeaderboard stats={stats} />
        </div>
      </div>
    </div>
  );
};

export default Landing;
