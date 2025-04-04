import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Button.css';
import '@/pages/Login/Login.css'

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
  className = '',
  type,
  marginTop
}) => {
  const marginClass = marginTop ? `margin-top-${marginTop}` : '';

  const classNames = `btn btn--${variant} btn--${size} ${
    fullWidth ? 'btn--full' : ''
  } ${disabled ? 'btn--disabled' : ''} ${marginClass ? marginClass : ''.trim()} ${className}`.trim();

  if (isLink) {
    return (
      <Link onClick={onclick} to={to} className={classNames}>
        {icon && iconPosition === 'left' && <img src={icon} alt='icon' />}
        {children}
        {icon && iconPosition === 'right' && <img src={icon} alt='icon' />}
      </Link>
    );
  }

  return (
    <button className={classNames} disabled={disabled} onClick={onClick} type={type}>
      {icon && iconPosition === 'left' && <img src={icon} alt='icon' />}
      {children}
      {icon && iconPosition === 'right' && <img src={icon} alt='icon' />}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger', 'link']),
  size: PropTypes.oneOf(['small', 'normal', 'medium', 'large']),
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  isLink: PropTypes.bool,
  to: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset', null]),
  marginTop: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['15', '20', '25', 'none'])
  ]),
};

export default Button;
