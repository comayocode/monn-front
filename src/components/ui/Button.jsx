import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'right',
  disabled = false,
  fullWidth = false,
  isLink = false,
  to = '#',
  onClick,
}) => {
  const classNames = `btn btn--${variant} btn--${size} ${
    fullWidth ? 'btn--full' : ''
  } ${disabled ? 'btn--disabled' : ''}`;

  if (isLink) {
    return (
      <Link to={to} className={classNames}>
        {icon && iconPosition === 'left' && <img src={icon} alt='icon' />}
        {children}
        {icon && iconPosition === 'right' && <img src={icon} alt='icon' />}
      </Link>
    );
  }

  return (
    <button className={classNames} disabled={disabled} onClick={onClick}>
      {icon && iconPosition === 'left' && <img src={icon} alt='icon' />}
      {children}
      {icon && iconPosition === 'right' && <img src={icon} alt='icon' />}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  isLink: PropTypes.bool,
  to: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
