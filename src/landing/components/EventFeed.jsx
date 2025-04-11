import { ClipboardList } from 'lucide-react';

const EventFeed = ({ stats }) => {
  if (!stats) {
    return <div className="event-feed">Loading...</div>;
  }

  const events = stats.todaysEvents;

  return (
    <div className="event-feed">
      <div className="section-header">
        <ClipboardList />
        <h2>Today's Events</h2>
      </div>
      <div className="events-list">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <h3>{event.event}</h3>
            <p>{event.org}</p>
            <p>{event.venue}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventFeed;
