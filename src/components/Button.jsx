import { Link } from 'react-router-dom'
import './Button.css'

function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  to, 
  href,
  type = 'button',
  className = '',
  ...props 
}) {
  const baseClass = `btn btn-${variant} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={baseClass} onClick={onClick} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={baseClass} onClick={onClick} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={baseClass} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default Button

