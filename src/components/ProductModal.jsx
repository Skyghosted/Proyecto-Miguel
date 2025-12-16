import React, { useState } from 'react'

export default function ProductModal({ product, onClose, onAdd }) {
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState(product.sizes?.[0] || '')

  function handleAdd() {
    const q = Math.max(1, Math.min(qty, product.stock))
    onAdd(product.id, q, size)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <header className="modal-header">
          <h2>{product.name}</h2>
          <button className="btn close" onClick={onClose}>✕</button>
        </header>
        <div className="modal-body">
          <div className="modal-image">
            {product.image ? (
              <img src={product.image} alt={product.name} />
            ) : (
              <div className="placeholder large">Imagen pendiente</div>
            )}
          </div>
          <div className="modal-info">
            <p className="price">€{product.price.toFixed(2)}</p>
            <p className="stock">{product.stock} en stock</p>

            {product.sizes && product.sizes.length > 0 && (
              <div className="field">
                <label>Talla</label>
                <select value={size} onChange={e => setSize(e.target.value)}>
                  {product.sizes.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="field">
              <label>Cantidad</label>
              <input type="number" min="1" max={product.stock} value={qty} onChange={e => setQty(Number(e.target.value))} />
            </div>

            <div className="modal-actions">
              <button className="btn primary" onClick={handleAdd} disabled={product.stock === 0}>Añadir al carrito</button>
              <button className="btn" onClick={onClose}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
