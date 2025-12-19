import { useState } from 'react'
import { motion } from 'motion/react'
import './Contacts.css'

function Contacts() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.')
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: ''
    })
  }

  return (
    <div className="contacts">
      {/* Hero секция */}
      <section className="contacts-hero">
        <div className="container">
          <motion.h1
            className="contacts-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Контакты
          </motion.h1>
          <motion.p
            className="contacts-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Свяжитесь с нами любым удобным способом
          </motion.p>
        </div>
      </section>

      <div className="container">

        <div className="contacts-content">
          <div className="contacts-info">
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <h3>Адрес</h3>
                <p>г. Москва, ул. Примерная, д. 123</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <h3>Телефон</h3>
                <p>
                  <a href="tel:+79991234567">+7 (999) 123-45-67</a>
                </p>
                <p>
                  <a href="tel:+79991234568">+7 (999) 123-45-68</a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div>
                <h3>Email</h3>
                <p>
                  <a href="mailto:info@vsmebel.ru">info@vsmebel.ru</a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">🕒</div>
              <div>
                <h3>Режим работы</h3>
                <p>Пн-Пт: 9:00 - 20:00</p>
                <p>Сб-Вс: 10:00 - 18:00</p>
              </div>
            </div>
          </div>

          <div className="contacts-form-wrapper">
            <h2>Напишите нам</h2>
            <form className="contacts-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Ваше имя *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Иван Иванов"
                />
              </div>
              <div className="form-group">
                <label>Телефон *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@mail.ru"
                />
              </div>
              <div className="form-group">
                <label>Сообщение *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Опишите ваш вопрос или заказ..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts

