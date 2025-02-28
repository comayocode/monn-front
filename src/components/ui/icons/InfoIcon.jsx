import PropTypes from 'prop-types';

const InfoIcon = ({ size=24, color='currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10"
      stroke={color}
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 16v-4"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 8h.01"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

InfoIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default InfoIcon;
