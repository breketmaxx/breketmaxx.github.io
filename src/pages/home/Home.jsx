import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import kitchenImage from '../../assets/home-kitchen.jpg'
import serviceImage1 from '../../assets/1-service.jpg'
import serviceImage2 from '../../assets/2-service.jpg'
import serviceImage3 from '../../assets/3-service.jpg'
import backImg from '../../assets/333.png'
import closetHandleImg from '../../assets/closet_handle.png'
import dasImg from '../../assets/das.png'

import starIcon from '../../assets/star.svg'
import Button from '../../components/Button'
import ImageComparisonSlider from '../../components/ImageComparisonSlider'
import reviewsData from '../../data/reviews.json'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import './Home.css'

function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  })

  const [expandedReviews, setExpandedReviews] = useState(new Set())

  // Состояние для модального окна изображений
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxSlides, setLightboxSlides] = useState([])

  const toggleReviewExpansion = (reviewId) => {
    const newExpanded = new Set(expandedReviews)
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId)
    } else {
      newExpanded.add(reviewId)
    }
    setExpandedReviews(newExpanded)
  }

  // Функция для открытия модального окна с изображениями
  const openLightbox = (reviewImages, startIndex = 0) => {
    const slides = reviewImages.map(image => ({
      src: image['1280x960'] || image['640x480'] || image['256x192'],
      alt: `Работа ${startIndex + 1}`
    }))
    setLightboxSlides(slides)
    setLightboxIndex(startIndex)
    setLightboxOpen(true)
  }

  const renderReview = (review, showFullText = false) => {
    const isExpanded = expandedReviews.has(review.id)
    const shouldTruncate = !showFullText && review.text.length > 200

    return (
      <div key={review.id} className="review-card">
        <div className="review-content">
          <p className={`review-text ${isExpanded || showFullText ? 'expanded' : ''}`}>
            {review.text}
          </p>
          {shouldTruncate && (
            <button
              className="review-toggle-btn"
              onClick={() => toggleReviewExpansion(review.id)}
            >
              {isExpanded ? 'Свернуть' : 'Показать целиком'}
            </button>
          )}
        </div>

        {review.images.length > 0 && (
          <div className="review-images-swiper-container">
            <Swiper
              modules={[Navigation]}
              slidesPerView={'auto'}
              spaceBetween={4}
              allowTouchMove={false}
              navigation={true}
              className="review-images-swiper"
            > 
              {review.images.map((image, index) => (
                <SwiperSlide key={index} className="review-image-slide">
                  <img
                    src={image['180x135'] || image['256x192']}
                    alt={`Работа ${index + 1}`}
                    onClick={() => openLightbox(review.images, index)}
                    style={{ cursor: 'pointer' }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <div className="review-footer">
          <div className="review-avatar">
            <img src={review.avatar} alt={review.name} />
          </div>
          <div className="review-user-info">
          <div className="review-rating">
              {Array.from({ length: review.rating }, (_, i) => (
                <img key={i} src={starIcon} alt="star" className="star-icon" />
              ))}
            </div>
            <p className="review-author">{review.name}</p>
            <p className="review-date">{review.date}</p>
            
          </div>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.')
    setFormData({ name: '', phone: '', message: '' })
  }

  const services = [
    {
      title: 'Замена фасадов',
      description: 'Обновим внешний вид вашей кухни без замены всей мебели. Широкий выбор материалов и цветов.',
      image: serviceImage1
    },
    {
      title: 'Замена столешниц',
      description: 'Установим новую столешницу из качественных материалов: кварц, акрил, МДФ, массив дерева.',
      image: serviceImage2
    },
    {
      title: 'Кухни и шкафы',
      description: 'Изготовим мебель по вашим размерам и пожеланиям. Индивидуальный дизайн и качественная сборка.',
      image: serviceImage3
    }
  ]

  const beforeAfter = [
    {
      id: 1,
      before: serviceImage1,
      after: serviceImage2,
      title: 'Кухня в классическом стиле',
      beforeDesc: 'Старая кухня с пожелтевшими фасадами и изношенной столешницей',
      afterDesc: 'Замена фасадов МДФ под дерево, установка новой кварцевой столешницы',
      duration: '14 дней',
      budget: '85 000 ₽'
    },
    {
      id: 2,
      before: serviceImage3,
      after: serviceImage1,
      title: 'Современная кухня с островом',
      beforeDesc: 'Узкая кухня без возможности готовки для всей семьи',
      afterDesc: 'Полная перепланировка с установкой кухонного острова и новой мебели',
      duration: '21 день',
      budget: '150 000 ₽'
    },
  ]

  const allReviews = reviewsData.entries.map(entry => ({
    id: entry.value.id,
    name: entry.value.title,
    text: entry.value.textSections[0]?.text || '',
    avatar: entry.value.avatar?.['64x64'] || entry.value.avatar?.['48x48'] || '',
    images: entry.value.images || [],
    date: entry.value.rated,
    rating: entry.value.score
  }))

  // Разделяем отзывы на две группы
  const reviewsWithImages = allReviews.filter(review => review.images.length > 0)
  const reviewsWithoutImages = allReviews.filter(review => review.images.length === 0)

  const steps = [
    {
      number: 1,
      title: 'Замер',
      description: 'Наш специалист приедет к вам и проведет точные замеры'
    },
    {
      number: 2,
      title: 'Дизайн',
      description: 'Создадим 3D-визуализацию и согласуем все детали'
    },
    {
      number: 3,
      title: 'Изготовление',
      description: 'Произведем мебель на собственном производстве'
    },
    {
      number: 4,
      title: 'Установка',
      description: 'Доставим и установим мебель в удобное для вас время'
    }
  ]

  const telegramLink = 'https://t.me/vsmebel' // Замените на реальную ссылку

  return (
    <div className="home">
      {/* Hero блок */}
      <section className="hero">
        <div className="hero-image">
          <img src={kitchenImage} alt="Кухня" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="container">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Новая жизнь <motion.b
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >вашей кухни</motion.b>
              </motion.h1>
              <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Обновляем фасады и столешницы, создаём мебель, которая вдохновляет
              </motion.p>
              <motion.div
                className="hero-buttons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <Button to="/calculator" variant="primary">
                  Рассчитать стоимость
                </Button>
                <Button href="#consultation" variant="secondary">
                  Получить консультацию
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Услуги */}
      <motion.section
        className="services-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Наши услуги
          </motion.h2>
          <motion.div
            className="services-grid"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="service-image">
                  <img src={service.image} alt={service.title} />
                  <div className="service-overlay"></div>
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Галерея до/после */}
      <motion.section
        className="before-after-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Наши работы
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Посмотрите, как мы преображаем кухни
          </motion.p>
        </div>
        <motion.div
          className="before-after-grid"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {beforeAfter.map((item, index) => (
            <motion.div
              key={item.id}
              className="before-after-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
            >
              <ImageComparisonSlider
                beforeImage={item.before}
                afterImage={item.after}
                beforeLabel="До"
                afterLabel="После"
                projectTitle={item.title}
                beforeDesc={item.beforeDesc}
                afterDesc={item.afterDesc}
                duration={item.duration}
                budget={item.budget}
              />
            </motion.div>
          ))}
        </motion.div>
        <div className="container">
          <motion.div
            className="cta-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button to="/portfolio" variant="primary">
              Посмотреть больше работ
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Отзывы */}
      <motion.section
        className="reviews-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="reviews-background-text">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.3, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            VS
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.3, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Mebel
          </motion.span>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Отзывы наших клиентов
          </motion.h2>

          {/* Первая полоска - отзывы с картинками */}
          <div className="reviews-row">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                }
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: true,
                reverseDirection: true,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              className="reviews-swiper"
            >
                {reviewsWithImages.map(review => (
                  <SwiperSlide key={review.id}>
                    {renderReview(review, false)}
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          {/* Вторая полоска - отзывы без картинок */}
          <div className="reviews-row">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                }
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
                reverseDirection: true,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              className="reviews-swiper"
            >
                {reviewsWithoutImages.map(review => (
                  <SwiperSlide key={review.id}>
                    {renderReview(review, true)}
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </motion.section>

      {/* Как мы работаем */}
      <motion.section
        className="how-we-work-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Как мы работаем
          </motion.h2>
          <motion.div
            className="steps-grid"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="step-card"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  className="step-number"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 * index + 0.3, type: "spring" }}
                >
                  {step.number}
                </motion.div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Декоративное изображение ручки шкафа */}
      <motion.div
        className="closet-handle-decorative"
        initial={{ opacity: 0, x: 100, rotate: 0 }}
        whileInView={{ opacity: 0.7, x: 0, rotate: 10 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <img src={closetHandleImg} alt="closet handle decorative" />
      </motion.div>

      {/* Декоративное изображение DAS */}
      <motion.div
        className="das-decorative"
        initial={{ opacity: 0, x: -100, rotate: 0 }}
        whileInView={{ opacity: 0.7, x: 0, rotate: -10 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <img src={dasImg} alt="das decorative" />
      </motion.div>

      {/* Контактная форма */}
      <motion.section
        id="consultation"
        className="consultation-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="consultation-content">
            <motion.div
              className="consultation-info"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Оставьте заявку
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Мы свяжемся с вами в течение 30 минут<br/> и ответим на все вопросы
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Button
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                >
                  Написать в Telegram
                </Button>
              </motion.div>
            </motion.div>
            <motion.form
              className="consultation-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="form-group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Ваше имя"
                />
              </motion.div>
              <motion.div
                className="form-group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Телефон"
                />
              </motion.div>
              <motion.div
                className="form-group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Опишите, что вас интересует..."
                ></textarea>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Button type="submit" variant="secondary">
                  Отправить заявку
                </Button>
              </motion.div>
              <motion.p
                className="consent-text"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Нажимая на кнопку, я даю согласие на обработку персональных данных
              </motion.p>
            </motion.form>
          </div>
        </div>
      </motion.section>

      {/* Декоративное изображение внизу */}
      <motion.div
        className="bottom-decorative-image"
        initial={{ opacity: 0, y: 100, scale: 0.8}}
        whileInView={{ opacity: 0.9, y: 0, scale: 1, rotate: 10  }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
      >
        <img src={backImg} alt="decorative" />
      </motion.div>

      {/* Модальное окно для просмотра изображений */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
      />
    </div>
  )
}

export default Home
