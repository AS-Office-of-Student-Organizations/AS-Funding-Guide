import { ClipboardList, Calendar } from 'lucide-react';
import PropTypes from 'prop-types';

const EventFeed = ({ stats }) => {
  if (!stats) {
    return <div className="event-feed">Loading...</div>;
  }

  const events = stats.todaysEvents;

  return (
    <div className="event-feed">
      <div className="section-header">
        <ClipboardList />
        <h2>Today&apos;s Events</h2>
      </div>
      <div className="events-list">
        {events.length === 0 ? (
          <div className="empty-state">
            <Calendar className="empty-icon" />
            <p>No events scheduled for today</p>
          </div>
        ) : (
          events.map((event, index) => (
            <div key={index} className="event-card">
              <h3 className="event-title" title={event.event}>
                {event.event}
              </h3>
              <p className="org-detail" title={event.org}>
                {event.org}
              </p>
              <p className="venue-text" title={event.venue}>
                {event.venue}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

EventFeed.propTypes = {
  stats: PropTypes.shape({
    todaysEvents: PropTypes.arrayOf(
      PropTypes.shape({
        event: PropTypes.string.isRequired,
        org: PropTypes.string.isRequired,
        venue: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
};

export default EventFeed;
