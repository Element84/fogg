import React from 'react';
import PropTypes from 'prop-types';

const StatusIndicator = ({ activeId, statusList = [], errorList = [] }) => {
  let activeStatus = statusList.find(status => status.id === activeId);
  let activeError = errorList.find(status => status.id === activeId);

  let isError = null;
  if (activeError) {
    isError = true;
    activeStatus = { activeError };
  }

  if (!activeStatus) {
    activeStatus = {
      label: 'Unknown',
      id: 'unknown'
    };
  }

  const activeStatusIndex = statusList.indexOf(activeStatus);
  
  // function label() {
  //   if (activeError) {
  //     return <h2 className="status-indicator-status">{activeError.label}</h2>
  //   } 
  //   else {
  //     return <h2 className="status-indicator-status">{activeStatus.label}</h2>
  //   }
  // }
  return (
    <>
      {/* {label()} */}
      <h2 className="status-indicator-status">{activeStatus.label}</h2>
      <div className="status-indicator-circles-wrapper">
        <ul className="status-indicator-circles">
        
          {statusList.map(({ label, id }, index) => {
            const isActive = activeStatus.id === id;

            let className = 'status-indicator-circle';
            
            if (isError) {
              className = `${className} status-indicator-circle-error`;
              activeStatus.label = activeError.label
            }

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
