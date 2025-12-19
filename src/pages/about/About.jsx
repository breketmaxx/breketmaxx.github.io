import './About.css'
import { motion } from 'motion/react'

function About() {
  return (
    <div className="about">
      <section className="about-hero">
        <div className="container">
          <motion.h1
            className="portfolio-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            О компании
          </motion.h1>
        </div>
      </section>


      <div className="container">
        <div className="about-content">
          <div className="about-section">
            <motion.h2
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Наша история
            </motion.h2>
            <motion.p
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              VS Мебель — это компания с многолетним опытом в производстве качественной мебели на заказ.
              Мы начали свою деятельность с небольшой мастерской и за годы работы выросли в надежного
              партнера для тысяч довольных клиентов.
            </motion.p>
            <motion.p
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Наша миссия — создавать мебель, которая не только функциональна и красива, но и отражает
              индивидуальность каждого клиента. Мы верим, что мебель должна быть не просто предметом интерьера,
              а частью вашего дома, создающей уют и комфорт.
            </motion.p>
          </div>

          <div className="about-section">
            <motion.h2
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Наши преимущества
            </motion.h2>
            <motion.div
              className="advantages-grid"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="advantage-item"
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="advantage-number">10+</div>
                <h3>Лет опыта</h3>
                <p>Более 10 лет успешной работы на рынке</p>
              </motion.div>
              <motion.div
                className="advantage-item"
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="advantage-number">500+</div>
                <h3>Проектов</h3>
                <p>Реализовано более 500 успешных проектов</p>
              </motion.div>
              <motion.div
                className="advantage-item"
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="advantage-number">100%</div>
                <h3>Гарантия</h3>
                <p>Гарантия качества на всю продукцию</p>
              </motion.div>
              {/* <motion.div
                className="advantage-item"
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="advantage-number">24/7</div>
                <h3>Поддержка</h3>
                <p>Круглосуточная поддержка клиентов</p>
              </motion.div> */}
            </motion.div>
          </div>

          <div className="about-section">
            <motion.h2
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Наша команда
            </motion.h2>
            <motion.p
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              В нашей команде работают опытные дизайнеры, мастера и менеджеры, которые любят свое дело
              и стремятся к совершенству в каждой детали. Мы постоянно обучаемся новым технологиям и
              следим за трендами в мебельной индустрии, чтобы предлагать вам только лучшее.
            </motion.p>
          </div>

          <div className="about-section">
            <motion.h2
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Производство
            </motion.h2>
            <motion.p
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Мы используем современное оборудование и качественные материалы от проверенных поставщиков.
              Каждое изделие проходит многоэтапный контроль качества, чтобы вы получили мебель, которая
              прослужит вам долгие годы.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

