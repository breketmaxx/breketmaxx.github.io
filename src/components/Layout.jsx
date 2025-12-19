import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import ScrollToTop from './ScrollToTop'
import './Layout.css'

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <div className="layout">
      <ScrollToTop />
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo" onClick={closeMenu}>
              <h1>VS Mebel</h1>
            </Link>
            <button 
              className={`menu-toggle ${menuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Меню"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
              {/* <Link 
                to="/services" 
                className={isActive('/services') ? 'active' : ''}
                onClick={closeMenu}
              >
                Услуги
              </Link> */}
              {/* <Link 
                to="/calculator" 
                className={isActive('/calculator') ? 'active' : ''}
                onClick={closeMenu}
              >
                Калькулятор
              </Link> */}
              <Link 
                to="/portfolio" 
                className={isActive('/portfolio') ? 'active' : ''}
                onClick={closeMenu}
              >
                Портфолио
              </Link>
              <Link 
                to="/about" 
                className={isActive('/about') ? 'active' : ''}
                onClick={closeMenu}
              >
                О компании
              </Link>
              <Link 
                to="/contacts" 
                className={isActive('/contacts') ? 'active' : ''}
                onClick={closeMenu}
              >
                Контакты
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="main">
        {children}
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-links">
              {/* <Link to="/services" onClick={closeMenu}>Услуги</Link>
              <Link to="/calculator" onClick={closeMenu}>Калькулятор</Link> */}
              <Link to="/portfolio" onClick={closeMenu}>Портфолио</Link>
              <Link to="/about" onClick={closeMenu}>О компании</Link>
              <Link to="/contacts" onClick={closeMenu}>Контакты</Link>
            </div>
            <div className="footer-info">
              <p>&copy; 2025 VS Мебель. Все права защищены.</p>
              <p>Разработано breketmax</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout

