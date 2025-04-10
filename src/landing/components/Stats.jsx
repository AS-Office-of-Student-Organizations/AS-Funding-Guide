import PropTypes from 'prop-types';

const Stats = ({ stats }) => {
  if (!stats) {
    return <div className="stats">Loading...</div>;
  }

  const renderValue = value => {
    if (value === null || value === undefined) {
      return 'N/A';
    }

    if (typeof value === 'object') {
      return (
        <div className="nested-stats">
          {Object.entries(value).map(([nestedKey, nestedValue]) => (
            <div key={nestedKey} className="nested-stat-item">
              <h4>{nestedKey}</h4>
              <div>
                {typeof nestedValue === 'object' ? JSON.stringify(nestedValue) : nestedValue}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return <p>{value}</p>;
  };

  return (
    <div className="stats">
      <h2>Stats</h2>
      <div className="stats-grid">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="stat-item">
            <h3>{key}</h3>
            {renderValue(value)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;

Stats.propTypes = {
  stats: PropTypes.object,
};
