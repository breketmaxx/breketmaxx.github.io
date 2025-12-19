import { useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ParallaxBanner, ParallaxBannerLayer, ParallaxProvider } from 'react-scroll-parallax'
import portfolioData from '../../data/portfolio.json'
import Button from '../../components/Button'
import './Portfolio.css'

function Portfolio() {
  const [expandedProjects, setExpandedProjects] = useState(new Set())

  const toggleProjectExpansion = (projectId) => {
    const newExpanded = new Set(expandedProjects)
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId)
    } else {
      newExpanded.add(projectId)
    }
    setExpandedProjects(newExpanded)
  }

  return (
    <ParallaxProvider>
      <div className="portfolio">
      {/* Hero секция */}
      <section className="portfolio-hero">
        <div className="container">
          <motion.h1
            className="portfolio-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Наши работы
          </motion.h1>
          <motion.p
            className="portfolio-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Посмотрите примеры наших реализованных проектов
          </motion.p>
        </div>
      </section>

      {/* Список проектов */}
      <section className="portfolio-projects">
        <div className="container">
          <motion.div
            className="projects-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {portfolioData.projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.1, delay: index % 2 * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="project-image">
                  <ParallaxBanner
                    style={{ aspectRatio: '4 / 3', height: '100%' }}
                    layers={[
                      {
                        image: project.images[0],
                        speed: 12,
                        easing: 'easeOut'
                      }
                    ]}
                  />
                  <div className="project-overlay">
                      <div className="overlay-text-block">
                        <h3 className="overlay-title">{project.title}</h3>
                          <Button variant="secondary" className='overlay-button'>
                            Подробнее
                          </Button>
                    </div>
                    <div className="overlay-meta">
                      <span className="overlay-price">{project.price}</span>
                      <span className="overlay-duration">{project.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      </div>
    </ParallaxProvider>
  )
}

export default Portfolio

