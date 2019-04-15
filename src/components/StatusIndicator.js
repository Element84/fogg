import React from 'react';
import PropTypes from 'prop-types';

const StatusIndicator = ({ activeId, statusList = [] }) => {
  const activeStatus = statusList.find(status => status.id === activeId);
  // TODO: handle this betteR??
  if (!activeStatus) return null;

  const activeStatusIndex = statusList.indexOf(activeStatus);

  return (
    <>
      <h2>{activeStatus.label}</h2>
      <div className="status-indicator-circles-wrapper">
        <ul className="status-indicator-circles">
          {statusList.map(({ label, id }, index) => {
            const isActive = activeStatus.id === id;

            let className = 'status-indicator-circle';

            if (isActive) {
              className = `${className} status-indicator-circle-active`;
            }

            if (index < activeStatusIndex) {
              className = `${className} status-indicator-circle-past`;
            }

            return (
              <li key={`StatusIndicator-${index}`} className={className}>
                <span>{label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

StatusIndicator.propTypes = {
  activeId: PropTypes.string,
  statusList: PropTypes.array
};

export default StatusIndicator;
