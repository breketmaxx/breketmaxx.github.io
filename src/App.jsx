import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/home/Home'
import Services from './pages/services/Services'
import Calculator from './pages/calculator/Calculator'
import Portfolio from './pages/portfolio/Portfolio'
import About from './pages/about/About'
import Contacts from './pages/contacts/Contacts'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </Layout>
  )
}

export default App

