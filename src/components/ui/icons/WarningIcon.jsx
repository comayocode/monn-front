import PropTypes from 'prop-types';

const WarningIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0"
      stroke={color}
      strokeWidth={1.333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 9v4"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 17h.011"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

WarningIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default WarningIcon;
