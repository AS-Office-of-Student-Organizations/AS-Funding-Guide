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
          <div key={index} className="attendance-card-container">
            <div className="attendance-rank" data-rank={index + 1}>
              {index + 1}
            </div>
            <div className="attendance-card">
              <div className="event-attendance-container">
                <h3 title={event.event}>{event.event}</h3>
                <p className="attendance-count">{event.attendance}</p>
              </div>
              <p title={event.org} className="org-detail">
                {event.org}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceLeaderboard;
