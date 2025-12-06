import './Portfolio.css'

function Portfolio() {
  const projects = [
    {
      id: 1,
      title: 'Кухня в современном стиле',
      category: 'Кухни',
      image: 'https://via.placeholder.com/400x300?text=Кухня+1',
      description: 'Белая кухня с островом и барной стойкой'
    },
    {
      id: 2,
      title: 'Шкаф-купе в спальню',
      category: 'Шкафы',
      image: 'https://via.placeholder.com/400x300?text=Шкаф+1',
      description: 'Встроенный шкаф-купе с зеркальными дверями'
    },
    {
      id: 3,
      title: 'Гостиная в классическом стиле',
      category: 'Гостиные',
      image: 'https://via.placeholder.com/400x300?text=Гостиная+1',
      description: 'Стенка с ТВ-зоной и открытыми полками'
    },
    {
      id: 4,
      title: 'Детская комната',
      category: 'Детские',
      image: 'https://via.placeholder.com/400x300?text=Детская+1',
      description: 'Комплект мебели для детской комнаты'
    },
    {
      id: 5,
      title: 'Офисный кабинет',
      category: 'Офис',
      image: 'https://via.placeholder.com/400x300?text=Офис+1',
      description: 'Мебель для рабочего кабинета'
    },
    {
      id: 6,
      title: 'Спальня с гардеробной',
      category: 'Спальни',
      image: 'https://via.placeholder.com/400x300?text=Спальня+1',
      description: 'Комплект мебели для спальни с гардеробной'
    }
  ]

  const categories = ['Все', 'Кухни', 'Шкафы', 'Гостиные', 'Детские', 'Офис', 'Спальни']

  return (
    <div className="portfolio">
      <div className="container">
        <h1 className="page-title">Наше портфолио</h1>
        <p className="page-subtitle">
          Примеры наших работ и реализованных проектов
        </p>

        <div className="portfolio-filters">
          {categories.map(category => (
            <button key={category} className="filter-btn">
              {category}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {projects.map(project => (
            <div key={project.id} className="portfolio-item">
              <div className="portfolio-image">
                <img src={project.image} alt={project.title} />
                <div className="portfolio-overlay">
                  <span className="portfolio-category">{project.category}</span>
                </div>
              </div>
              <div className="portfolio-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Portfolio

