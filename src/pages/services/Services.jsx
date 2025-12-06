import { Link } from 'react-router-dom'
import './Services.css'

function Services() {
  const services = [
    {
      title: 'Кухни на заказ',
      description: 'Изготовление кухонных гарнитуров любой сложности с учетом ваших пожеланий',
      price: 'от 50 000 ₽'
    },
    {
      title: 'Шкафы-купе',
      description: 'Встроенные и корпусные шкафы-купе для спальни, прихожей и гостиной',
      price: 'от 30 000 ₽'
    },
    {
      title: 'Мебель для гостиной',
      description: 'Тумбы, стенки, комоды и другая мебель для гостиной комнаты',
      price: 'от 25 000 ₽'
    },
    {
      title: 'Мебель для спальни',
      description: 'Кровати, прикроватные тумбы, комоды и гардеробные системы',
      price: 'от 35 000 ₽'
    },
    {
      title: 'Мебель для офиса',
      description: 'Офисные столы, шкафы, стеллажи и перегородки',
      price: 'от 40 000 ₽'
    },
    {
      title: 'Мебель для детской',
      description: 'Детские кровати, столы, стулья и системы хранения',
      price: 'от 20 000 ₽'
    }
  ]

  return (
    <div className="services">
      <div className="container">
        <h1 className="page-title">Наши услуги</h1>
        <p className="page-subtitle">
          Мы предлагаем полный спектр услуг по изготовлению мебели на заказ
        </p>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-price">{service.price}</div>
            </div>
          ))}
        </div>
        <div className="services-cta">
          <p>Хотите узнать точную стоимость? Воспользуйтесь нашим калькулятором!</p>
          <Link to="/calculator" className="btn btn-primary">
            Рассчитать стоимость
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Services

