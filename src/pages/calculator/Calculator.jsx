import { useState } from 'react'
import './Calculator.css'

function Calculator() {
  const [formData, setFormData] = useState({
    type: '',
    material: '',
    width: '',
    height: '',
    depth: '',
    extras: []
  })

  const [result, setResult] = useState(null)

  const furnitureTypes = {
    kitchen: { base: 50000, name: 'Кухня' },
    wardrobe: { base: 30000, name: 'Шкаф-купе' },
    living: { base: 25000, name: 'Мебель для гостиной' },
    bedroom: { base: 35000, name: 'Мебель для спальни' },
    office: { base: 40000, name: 'Офисная мебель' },
    children: { base: 20000, name: 'Детская мебель' }
  }

  const materials = {
    mdf: { multiplier: 1, name: 'МДФ' },
    chipboard: { multiplier: 0.8, name: 'ДСП' },
    solid: { multiplier: 1.5, name: 'Массив дерева' },
    metal: { multiplier: 1.2, name: 'Металл' }
  }

  const extras = [
    { id: 'lighting', name: 'Подсветка', price: 5000 },
    { id: 'mirror', name: 'Зеркало', price: 3000 },
    { id: 'glass', name: 'Стеклянные фасады', price: 8000 },
    { id: 'soft', name: 'Мягкая обивка', price: 10000 }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setResult(null)
  }

  const handleExtraChange = (extraId) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter(id => id !== extraId)
        : [...prev.extras, extraId]
    }))
    setResult(null)
  }

  const calculate = () => {
    if (!formData.type || !formData.material || !formData.width || !formData.height || !formData.depth) {
      alert('Пожалуйста, заполните все обязательные поля')
      return
    }

    const type = furnitureTypes[formData.type]
    const material = materials[formData.material]
    const volume = (parseFloat(formData.width) * parseFloat(formData.height) * parseFloat(formData.depth)) / 1000000 // м³
    
    let basePrice = type.base * material.multiplier
    let volumePrice = volume * 10000
    let extrasPrice = formData.extras.reduce((sum, id) => {
      const extra = extras.find(e => e.id === id)
      return sum + (extra ? extra.price : 0)
    }, 0)

    const total = Math.round(basePrice + volumePrice + extrasPrice)
    setResult({
      base: basePrice,
      volume: volumePrice,
      extras: extrasPrice,
      total: total
    })
  }

  return (
    <div className="calculator">
      <div className="container">
        <h1 className="page-title">Калькулятор стоимости</h1>
        <p className="page-subtitle">
          Рассчитайте примерную стоимость вашей мебели
        </p>

        <div className="calculator-content">
          <div className="calculator-form">
            <div className="form-group">
              <label>Тип мебели *</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="">Выберите тип</option>
                {Object.entries(furnitureTypes).map(([key, value]) => (
                  <option key={key} value={key}>{value.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Материал *</label>
              <select name="material" value={formData.material} onChange={handleChange}>
                <option value="">Выберите материал</option>
                {Object.entries(materials).map(([key, value]) => (
                  <option key={key} value={key}>{value.name}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Ширина (см) *</label>
                <input 
                  type="number" 
                  name="width" 
                  value={formData.width} 
                  onChange={handleChange}
                  placeholder="100"
                />
              </div>
              <div className="form-group">
                <label>Высота (см) *</label>
                <input 
                  type="number" 
                  name="height" 
                  value={formData.height} 
                  onChange={handleChange}
                  placeholder="200"
                />
              </div>
              <div className="form-group">
                <label>Глубина (см) *</label>
                <input 
                  type="number" 
                  name="depth" 
                  value={formData.depth} 
                  onChange={handleChange}
                  placeholder="60"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Дополнительные опции</label>
              <div className="extras-list">
                {extras.map(extra => (
                  <label key={extra.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.extras.includes(extra.id)}
                      onChange={() => handleExtraChange(extra.id)}
                    />
                    <span>{extra.name} (+{extra.price.toLocaleString()} ₽)</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="btn btn-primary btn-calculate" onClick={calculate}>
              Рассчитать стоимость
            </button>
          </div>

          {result && (
            <div className="calculator-result">
              <h3>Результат расчета</h3>
              <div className="result-details">
                <div className="result-item">
                  <span>Базовая стоимость:</span>
                  <span>{Math.round(result.base).toLocaleString()} ₽</span>
                </div>
                <div className="result-item">
                  <span>По объему:</span>
                  <span>{Math.round(result.volume).toLocaleString()} ₽</span>
                </div>
                {result.extras > 0 && (
                  <div className="result-item">
                    <span>Дополнительные опции:</span>
                    <span>{Math.round(result.extras).toLocaleString()} ₽</span>
                  </div>
                )}
                <div className="result-total">
                  <span>Итого:</span>
                  <span>{result.total.toLocaleString()} ₽</span>
                </div>
              </div>
              <p className="result-note">
                * Это предварительный расчет. Точная стоимость будет рассчитана после консультации с нашим специалистом.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Calculator

