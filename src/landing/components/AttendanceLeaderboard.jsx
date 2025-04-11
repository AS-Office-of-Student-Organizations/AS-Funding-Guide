import { PersonStanding } from 'lucide-react';

const AttendanceLeaderboard = ({ stats }) => {
  if (!stats) {
    return <div className="event-leaderboard">Loading...</div>;
  }

  const events = stats.attendanceLeaderboard;

  return (
    <div className="attendance-leaderboard">
      <div className="section-header">
        <PersonStanding />
        <h2>Event Attendance Leaderboard</h2>
      </div>
      <div className="attendance-list">
        {events.map((event, index) => (
          <div key={index} className="attendance-card">
            <h3>{event.event}</h3>
            <div className="attendance-details">
              <p className="org-detail">{event.org}</p>
              <p className="attendance-count">{event.attendance}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceLeaderboard;
