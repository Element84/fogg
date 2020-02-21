import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const TaskAction = ({
  children,
  onPositiveSubmit,
  onNegativeSubmit,
  className
}) => {
  function handlePositiveClick (e) {
    if (typeof onPositiveSubmit === 'function') {
      onPositiveSubmit(e);
    }
  }

  function handleNegativeClick (e) {
    if (typeof onNegativeSubmit === 'function') {
      onNegativeSubmit(e);
    }
  }

  return (
    <div className={`task-action ${className || ''}`}>
      <div className="task-action-wrapper">
        <div className="task-action-column">
          <div className="task-action-info">{children}</div>
        </div>
        <div className="task-action-column">
          <div className="task-action-buttons">
            {onPositiveSubmit && (
              <Button type="postive" onClick={handlePositiveClick}>
                Submit Request
              </Button>
            )}
            {onNegativeSubmit && (
              <Button type="negative" onClick={handleNegativeClick}>
                Cancel Request
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

TaskAction.propTypes = {
  children: PropTypes.node,
  onPositiveSubmit: PropTypes.func,
  onNegativeSubmit: PropTypes.func,
  className: PropTypes.string
};

export default TaskAction;
