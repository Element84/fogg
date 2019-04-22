import React from 'react';
import PropTypes from 'prop-types';

const StatusIndicator = ({ activeId, statusList = [], errorList = [] }) => {
  let activeStatus = statusList.find(status => status.id === activeId);
  let activeError = errorList.find(status => status.id === activeId);
  // TODO: handle this betteR??
  // if (!activeStatus) return null;

  let isError = null; // probably don't need this

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
  
  function label() {
    if (activeError) {
      return <h2 className="status-indicator-status">{activeError.label}</h2>
    } 
    else {
      return <h2 className="status-indicator-status">{activeStatus.label}</h2>
    }
  }
  return (
    <>
      {label()}
      <div className="status-indicator-circles-wrapper">
        <ul className="status-indicator-circles">
          {statusList.map(({ label, id }, index) => {
            const isActive = activeStatus.id === id;

            let className = 'status-indicator-circle';

            if (activeError) {
              // if isActive and error make circles red...also still needs to be 4 circles
              errorList.map(({ label, id }, index) => {
                const isErrorCircle = activeError.id === id;
                console.log(activeError.id, id, isErrorCircle)
                className = `${className} status-indicator-circle-error`;
              });
              return (
                <>
                  <li key={`StatusIndicator-${index}`} className={className}>
                    <span>{label}</span>
                  </li>
                </>
              );
            }

            if (isActive) {
              className = `${className} status-indicator-circle-active`;
            }

            // if (!isActive) {

            // }

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
