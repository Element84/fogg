import React from 'react';
import PropTypes from 'prop-types';

const StatusIndicator = ({ activeId, statusList = [] }) => {
  // const status = task.map(({status}) => {
  //   return status
  // })

  // const activeIndex = statusList.map(i => {
  //   if (i.toLowerCase() === status.toString().toLowerCase()) {
  //     return statusList.indexOf(i)
  //   }
  // })

  // if div id === activeIndex set that div to active
  // turn that div blue
  // turn all divs before that to black

  const activeStatus = statusList.find(status => status.id === activeId);

  // TODO: handle this betteR??
  if (!activeStatus) return null;

  const activeStatusIndex = statusList.indexOf(activeStatus);

  return (
    <>
      <h2>{activeStatus.label}</h2>
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
              <span>{status}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
  // make 4 circles 0 - 3
  // make circle active based on number returned
  // if circle also returns another var change color based on var
};

export default StatusIndicator;
