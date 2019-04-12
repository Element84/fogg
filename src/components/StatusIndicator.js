import React from 'react';
import PropTypes from 'prop-types';

const statusList = [
  'Pending', 
  'Accepted', 
  'Partially Completed', 
  'Completed'
]

const StatusIndicator = ({ task }) => {
  const status = task.map(({status}) => {
    return status
  })

  const activeIndex = statusList.map(i => {
    if (i.toLowerCase() === status.toString().toLowerCase()) {
      return statusList.indexOf(i)
    }
  })

  // if div id === activeIndex set that div to active
    // turn that div blue
    // turn all divs before that to black
  
  return (
    <>
      <section className="status-indicator-circles">
        <div className="status-indicator-circle" id="1" />
        <div className="status-indicator-circle" id="2" />
        <div className="status-indicator-circle active" id="3" />
        <div className="status-indicator-circle" id="4" />
      </section>
    </>
  );
  // make 4 circles 0 - 3
  // make circle active based on number returned
  // if circle also returns another var change color based on var
};

export default StatusIndicator;