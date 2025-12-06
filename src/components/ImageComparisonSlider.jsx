import { useState, useRef } from 'react'
import arrowSvg from '../assets/arrow.svg'
import './ImageComparisonSlider.css'

function ImageComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel = "До",
  afterLabel = "После",
  projectTitle,
  beforeDesc,
  afterDesc,
  duration,
  budget
}) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100

    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const handleTouchMove = (e) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = (x / rect.width) * 100

    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  return (
    <div
      className="image-comparison-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Изображение "После" (фон) */}
      <div className="after-image">
        <img src={afterImage} alt={afterLabel} />
      </div>

      {/* Изображение "До" (поверх слайдера с обрезкой) */}
      <div
        className="before-image"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img src={beforeImage} alt={beforeLabel} />
      </div>

      {/* Плашки с подписями */}
      <div
        className="image-label before-label"
        style={{ opacity: sliderPosition > 5 ? 1 : 0 }}
      >
        {beforeLabel}
      </div>
      <div
        className="image-label after-label"
        style={{ opacity: sliderPosition < 95 ? 1 : 0 }}
      >
        {afterLabel}
      </div>

      {/* Слайдер */}
      <div
        className="slider"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="slider-handle">
          <div className="slider-line"></div>
          <img src={arrowSvg} alt="left arrow" className="slider-arrow slider-arrow-left" />
          <img src={arrowSvg} alt="right arrow" className="slider-arrow slider-arrow-right" />
        </div>
      </div>

      {/* Детали проекта (overlay) */}
      <div className="project-overlay">
        <div className="project-details-overlay">
          <h4>{projectTitle}</h4>
          <div className="project-details-list">
            <div className="detail-item">
              <span className="detail-label">Что было:</span>
              <span className="detail-value">{beforeDesc}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Что сделали:</span>
              <span className="detail-value">{afterDesc}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Срок:</span>
              <span className="detail-value">{duration}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Бюджет:</span>
              <span className="detail-value">{budget}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageComparisonSlider
