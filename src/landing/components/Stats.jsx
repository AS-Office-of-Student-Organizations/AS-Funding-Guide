import PropTypes from 'prop-types';
import { ChartNoAxesColumn } from 'lucide-react';

const Stats = ({ stats }) => {
  if (!stats) {
    return <div className="stats">Loading...</div>;
  }

  const statsUpperList = [
    { key: 'numAttendees', label: 'Total Student Attendees', prefix: '', postfix: '+' },
    { key: 'numUniqueAttendees', label: 'Unique Students Served', prefix: '', postfix: '+' },
  ];

  const statsLowerList = [
    { key: 'numEvents', label: 'Events Funded', prefix: '', postfix: '+' },
    { key: 'numOrgs', label: 'Organizations Funded', prefix: '', postfix: '+' },
    { key: 'numAllocated', label: 'Total Funds Allocated', prefix: '$', postfix: '+' },
  ];

  return (
    <div className="stats">
      <div className="stats-container">
        {statsUpperList.map(item => (
          <div className="statistic" key={item.key}>
            <h3>
              {item.prefix}
              {Math.round(stats[item.key]).toLocaleString()}
              {item.postfix}
            </h3>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
      <div className="stats-container">
        {statsLowerList.map(item => (
          <div className="statistic" key={item.key}>
            <h3>
              {item.prefix}
              {Math.round(stats[item.key]).toLocaleString()}
              {item.postfix}
            </h3>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
      <i className="stats-caption">
        Numbers are from 2024-2025 academic year and only take into account events that have already
        occurred
      </i>
    </div>
  );
};

export default Stats;

Stats.propTypes = {
  stats: PropTypes.object,
};
