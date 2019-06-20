import React from 'react';
import PropTypes from 'prop-types';
import { FaTimesCircle } from 'react-icons/fa';

const Notice = ({ children, ...rest }) => {
  if (typeof children === 'string') {
    return (
      <NoticeWrapper {...rest}>
        <p>{children}</p>
      </NoticeWrapper>
    );
  }

  return <NoticeWrapper {...rest}>{children}</NoticeWrapper>;
};

Notice.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ])
};

const NoticeWrapper = ({
  children,
  type = 'info',
  weight = 'light',
  align = 'left',
  onClose
}) => {
  let noticeClassName = `notice notice-${type} notice-${weight} notice-${align}`;

  return (
    <div className={noticeClassName}>
      <div className="notice-content">{children}</div>
      {typeof onClose === 'function' && (
        <div className="notice-close" onClick={onClose}>
          <FaTimesCircle />
        </div>
      )}
    </div>
  );
};

NoticeWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]),
  type: PropTypes.string,
  weight: PropTypes.string,
  align: PropTypes.string,
  onClose: PropTypes.func
};

export default Notice;
