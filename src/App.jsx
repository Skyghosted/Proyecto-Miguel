import React, { useEffect, useState } from 'react'
import PRODUCTS from './data/products'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal'
import Cart from './components/Cart'

const LS_PRODUCTS_KEY = 'tienda_demo_products_v1'
const LS_CART_KEY = 'tienda_demo_cart_v1'

export default function App() {
  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState(null)
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(LS_PRODUCTS_KEY)
    if (saved) {
      setProducts(JSON.parse(saved))
    } else {
      setProducts(PRODUCTS)
    }
    const savedCart = localStorage.getItem(LS_CART_KEY)
    if (savedCart) setCart(JSON.parse(savedCart))
  }, [])

  useEffect(() => localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(products)), [products])
  useEffect(() => localStorage.setItem(LS_CART_KEY, JSON.stringify(cart)), [cart])

  function openProduct(p) { setSelected(p) }
  function closeModal() { setSelected(null) }

  function addToCart(productId, qty, size) {
    const product = products.find(p => p.id === productId)
    if (!product) return
    if (product.stock < qty) {
      alert('No hay suficiente stock')
      return
    }
    // reduce stock locally
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: p.stock - qty } : p))

    setCart(prev => {
      const existing = prev.find(i => i.productId === productId && i.size === size)
      if (existing) {
        return prev.map(i => i === existing ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { productId, qty, size }]
    })
    closeModal()
  }

  function removeFromCart(index) {
    const item = cart[index]
    if (!item) return
    // restock product
    setProducts(prev => prev.map(p => p.id === item.productId ? { ...p, stock: p.stock + item.qty } : p))
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  function clearCart() {
    // restock everything
    cart.forEach(item => {
      setProducts(prev => prev.map(p => p.id === item.productId ? { ...p, stock: p.stock + item.qty } : p))
    })
    setCart([])
  }

  function handleUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const newProduct = {
        id: 'p_' + Date.now(),
        name: 'Nuevo producto',
        price: 29.99,
        stock: 5,
        image: reader.result,
        sizes: ['S','M','L']
      }
      setProducts(prev => [newProduct, ...prev])
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Tienda demo — Miguel</h1>
        <div className="header-actions">
          <label className="upload-btn">
            Subir imagen (crear producto)
            <input type="file" accept="image/*" onChange={handleUpload} />
          </label>
          <button className="cart-btn" onClick={() => setShowCart(true)}>Carrito ({cart.reduce((s,i)=>s+i.qty,0)})</button>
        </div>
      </header>

      <main className="container">
        <section className="grid">
          {products.map(p => (
            <ProductCard key={p.id} product={p} onOpen={() => openProduct(p)} />
          ))}
        </section>
      </main>

      {selected && (
        <ProductModal product={selected} onClose={closeModal} onAdd={addToCart} />
      )}

      {showCart && (
        <Cart
          products={products}
          cart={cart}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
          onClear={clearCart}
        />
      )}

      <footer className="footer">Proyecto de clase — versión demo, sin pasarela real</footer>
    </div>
  )
}
