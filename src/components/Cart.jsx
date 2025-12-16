import React from 'react'

export default function Cart({ products, cart, onClose, onRemove, onClear }) {
  const lines = cart.map((item, idx) => {
    const p = products.find(x => x.id === item.productId) || {}
    return {
      ...item,
      name: p.name || 'Producto eliminado',
      price: p.price || 0,
      image: p.image || ''
    }
  })

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0)

  function handleCheckout() {
    alert('Checkout. Gracias por la compra.')
    onClear()
    onClose()
  }

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <aside className="cart" onClick={e => e.stopPropagation()}>
        <header className="cart-header">
          <h3>Carrito</h3>
          <button className="btn close" onClick={onClose}>✕</button>
        </header>

        <div className="cart-body">
          {lines.length === 0 && <p>El carrito está vacío.</p>}

          {lines.map((line, i) => (
            <div key={i} className="cart-item">
              <img src={line.image} alt={line.name} />
              <div className="item-info">
                <div className="item-name">{line.name} {line.size ? `(${line.size})` : ''}</div>
                <div className="item-meta">{line.qty} × €{line.price.toFixed(2)}</div>
              </div>
              <div className="item-actions">
                <button className="btn" onClick={() => onRemove(i)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>

        <footer className="cart-footer">
          <div className="subtotal">Subtotal: <strong>€{subtotal.toFixed(2)}</strong></div>
          <div className="cart-actions">
            <button className="btn" onClick={onClear} disabled={lines.length === 0}>Vaciar</button>
            <button className="btn primary" onClick={handleCheckout} disabled={lines.length === 0}>Pagar (simulado)</button>
          </div>
        </footer>
      </aside>
    </div>
  )
}