"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQty, total, count } = useCart();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Jost:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root { --ink: #0E1410; --gold: #C98A14; --cream: #FAF6EE; --forest: #152B1E; --warm-gray: #4a4438; }
        body { background: var(--ink); -webkit-font-smoothing: antialiased; }
        .site { font-family: 'Jost', sans-serif; color: var(--cream); min-height: 100vh; }

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; justify-content: space-between; align-items: center;
          padding: 22px 52px;
          background: rgba(14,20,16,0.97);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(201,138,20,0.12);
        }
        .nav-logo { font-family: 'Cormorant Garamond', serif; color: var(--gold); font-size: 19px; letter-spacing: 4px; font-weight: 600; text-decoration: none; }
        .nav-right { display: flex; align-items: center; gap: 36px; }
        .nav-link { color: rgba(250,246,238,0.6); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: var(--gold); }

        .cart-wrap { max-width: 1080px; margin: 0 auto; padding: 140px 72px 96px; display: grid; grid-template-columns: 1fr 360px; gap: 64px; align-items: start; }

        .cart-title { font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 700; margin-bottom: 48px; }
        .cart-title em { color: var(--gold); font-style: italic; }

        .empty-state { text-align: center; padding: 96px 0; grid-column: 1 / -1; }
        .empty-title { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 700; margin-bottom: 16px; }
        .empty-sub { color: rgba(250,246,238,0.35); font-size: 14px; margin-bottom: 36px; }
        .btn-continue { display: inline-block; padding: 14px 32px; background: var(--gold); color: var(--ink); font-size: 10px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; text-decoration: none; }

        .cart-items { display: flex; flex-direction: column; gap: 2px; }
        .cart-item { display: grid; grid-template-columns: 100px 1fr auto; gap: 24px; align-items: center; padding: 24px; background: rgba(250,246,238,0.02); border-top: 1px solid rgba(201,138,20,0.12); }
        .cart-item-img { width: 100px; height: 100px; object-fit: cover; }
        .cart-item-name { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700; margin-bottom: 4px; }
        .cart-item-sub { color: rgba(250,246,238,0.35); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 16px; }
        .qty-controls { display: flex; align-items: center; border: 1px solid rgba(201,138,20,0.2); width: fit-content; }
        .qty-btn { width: 36px; height: 36px; background: none; border: none; color: var(--cream); font-size: 16px; cursor: pointer; transition: background 0.2s; }
        .qty-btn:hover { background: rgba(201,138,20,0.1); }
        .qty-num { width: 40px; text-align: center; font-size: 14px; color: var(--cream); }
        .cart-item-right { text-align: right; }
        .cart-item-price { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 700; color: var(--gold); margin-bottom: 12px; }
        .remove-btn { background: none; border: none; color: rgba(250,246,238,0.2); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; transition: color 0.2s; }
        .remove-btn:hover { color: #e57373; }

        .cart-summary { background: rgba(250,246,238,0.02); border: 1px solid rgba(201,138,20,0.12); padding: 36px; position: sticky; top: 120px; }
        .summary-title { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 700; margin-bottom: 28px; }
        .summary-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(250,246,238,0.06); }
        .summary-row:last-of-type { border-bottom: none; }
        .summary-key { color: rgba(250,246,238,0.4); font-size: 12px; font-weight: 300; }
        .summary-val { font-size: 14px; font-weight: 500; }
        .summary-total { display: flex; justify-content: space-between; align-items: baseline; margin: 24px 0; padding-top: 20px; border-top: 1px solid rgba(201,138,20,0.2); }
        .total-label { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: rgba(250,246,238,0.5); font-weight: 600; }
        .total-val { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 700; color: var(--gold); }
        .btn-checkout { display: block; width: 100%; padding: 18px; background: var(--gold); color: var(--ink); font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; border: none; cursor: pointer; text-align: center; text-decoration: none; transition: background 0.2s; margin-bottom: 12px; }
        .btn-checkout:hover { background: #d99a24; }
        .btn-back { display: block; width: 100%; padding: 14px; background: transparent; color: rgba(250,246,238,0.4); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; border: 1px solid rgba(250,246,238,0.1); text-align: center; text-decoration: none; transition: all 0.2s; }
        .btn-back:hover { border-color: var(--gold); color: var(--gold); }

        @media (max-width: 768px) {
          .nav { padding: 18px 24px; }
          .cart-wrap { grid-template-columns: 1fr; padding: 120px 28px 72px; gap: 40px; }
          .cart-item { grid-template-columns: 80px 1fr; }
          .cart-item-right { grid-column: 2; }
        }
      `}</style>

      <div className="site">
        <nav className="nav">
          <Link href="/" className="nav-logo">Nivora Organics&#8482;</Link>
          <div className="nav-right">
            <Link href="/products" className="nav-link">Products</Link>
            <Link href="/cart" className="nav-link" style={{color: "var(--gold)"}}>
              Cart {count > 0 && `(${count})`}
            </Link>
          </div>
        </nav>

        <div className="cart-wrap">
          {items.length === 0 ? (
            <div className="empty-state">
              <div className="empty-title">Your cart is empty</div>
              <p className="empty-sub">Add some spices to get started.</p>
              <Link href="/products" className="btn-continue">Browse Products</Link>
            </div>
          ) : (
            <>
              <div>
                <h1 className="cart-title">Your <em>Cart</em></h1>
                <div className="cart-items">
                  {items.map(item => (
                    <div className="cart-item" key={item.slug}>
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                      <div>
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-sub">100g · Kerala Single Origin</div>
                        <div className="qty-controls">
                          <button className="qty-btn" onClick={() => updateQty(item.slug, item.qty - 1)}>−</button>
                          <span className="qty-num">{item.qty}</span>
                          <button className="qty-btn" onClick={() => updateQty(item.slug, item.qty + 1)}>+</button>
                        </div>
                      </div>
                      <div className="cart-item-right">
                        <div className="cart-item-price">₹{item.price * item.qty}</div>
                        <button className="remove-btn" onClick={() => removeItem(item.slug)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cart-summary">
                <div className="summary-title">Order Summary</div>
                {items.map(item => (
                  <div className="summary-row" key={item.slug}>
                    <span className="summary-key">{item.name} × {item.qty}</span>
                    <span className="summary-val">₹{item.price * item.qty}</span>
                  </div>
                ))}
                <div className="summary-row">
                  <span className="summary-key">Shipping</span>
                  <span className="summary-val" style={{color: "#4caf7d"}}>Free</span>
                </div>
                <div className="summary-total">
                  <span className="total-label">Total</span>
                  <span className="total-val">₹{total}</span>
                </div>
                <Link href="/checkout" className="btn-checkout">Proceed to Checkout</Link>
                <Link href="/products" className="btn-back">Continue Shopping</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}