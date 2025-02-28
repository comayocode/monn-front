import PropTypes from 'prop-types';

const ErrorIcon = ({ size = 24, color = 'currentcolor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10m3-13-6 6m0-6 6 6'
      stroke={color}
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

ErrorIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default ErrorIcon;
