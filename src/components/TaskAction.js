import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const TaskAction = ({ children, positive, negative, className }) => {
  function handlePositiveClick (e) {
    if (positive.onSubmit && typeof positive.onSubmit === 'function') {
      positive.onSubmit(e);
    }
  }

  function handleNegativeClick (e) {
    if (negative.onSubmit && typeof negative.onSubmit === 'function') {
      negative.onSubmit(e);
    }
  }

  const positiveLabel =
    positive && positive.label ? positive.label : 'Submit Request';
  const negativeLabel =
    negative && negative.label ? negative.label : 'Cancel Request';

  return (
    <div className={`task-action ${className || ''}`}>
      <div className="task-action-wrapper">
        <div className="task-action-column">
          <div className="task-action-info">{children}</div>
        </div>
        <div className="task-action-column">
          <div className="task-action-buttons">
            {positive && (
              <Button type="postive" onClick={handlePositiveClick}>
                {positiveLabel}
              </Button>
            )}
            {negative && (
              <Button type="negative" onClick={handleNegativeClick}>
                {negativeLabel}
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
  positive: PropTypes.object,
  negative: PropTypes.object,
  className: PropTypes.string
};

export default TaskAction;
