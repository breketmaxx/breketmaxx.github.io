import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Скроллим к верху страницы при изменении маршрута
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
