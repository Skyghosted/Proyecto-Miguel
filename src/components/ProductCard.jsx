import React from 'react'

export default function ProductCard({ product, onOpen }) {
  return (
    <article className="card">
      <div className="card-media" style={{cursor:'pointer'}}>
        {product.image ? (
          <img src={product.image} alt={product.name} onClick={onOpen} />
        ) : (
          <div className="placeholder" onClick={onOpen}>Imagen pendiente</div>
        )}
      </div>
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <div className="card-meta">
          <span className="price">€{product.price.toFixed(2)}</span>
          <span className="stock">{product.stock} en stock</span>
        </div>
        <div className="card-actions">
          <button onClick={onOpen} className="btn">Ver</button>
        </div>
      </div>
    </article>
  )
}
