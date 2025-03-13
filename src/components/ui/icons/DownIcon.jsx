import PropTypes from 'prop-types';

const SvgIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='m6 9 6 6 6-6'
    ></path>
  </svg>
);

SvgIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default SvgIcon;
