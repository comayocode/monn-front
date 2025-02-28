import PropTypes from 'prop-types';

const SuccessIcon = ({ size = 24, color = 'currenColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
      stroke={color}
      strokeWidth={1.333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 4 12 14.01l-3-3"
      stroke={color}
      strokeWidth={1.333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

SuccessIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default SuccessIcon;
