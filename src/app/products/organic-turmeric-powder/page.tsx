"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function TurmericPage() {
  const { addItem, count } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      slug: "organic-turmeric-powder",
      name: "Organic Turmeric Powder",
      price: 149,
      qty,
      image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&q=90",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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
        .nav-cart { color: var(--gold); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; font-weight: 600; }

        .product-wrap { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; padding-top: 72px; }
        .product-gallery { position: sticky; top: 72px; height: calc(100vh - 72px); overflow: hidden; }
        .product-gallery img { width: 100%; height: 100%; object-fit: cover; }

        .product-detail { padding: 72px 64px; background: var(--ink); }
        .breadcrumb { display: flex; align-items: center; gap: 8px; margin-bottom: 40px; }
        .breadcrumb a { color: rgba(250,246,238,0.3); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; text-decoration: none; transition: color 0.2s; }
        .breadcrumb a:hover { color: var(--gold); }
        .breadcrumb-sep { color: rgba(250,246,238,0.15); font-size: 11px; }

        .product-tag { display: inline-block; border: 1px solid rgba(201,138,20,0.35); color: var(--gold); font-size: 9px; letter-spacing: 3px; text-transform: uppercase; padding: 7px 14px; margin-bottom: 24px; font-weight: 600; }
        .product-title { font-family: 'Cormorant Garamond', serif; color: #fff; font-size: 52px; line-height: 1.05; margin-bottom: 8px; font-weight: 700; }
        .product-subtitle { color: rgba(201,138,20,0.85); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 32px; font-weight: 600; }

        .price-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 8px; }
        .price-main { font-family: 'Cormorant Garamond', serif; font-size: 44px; font-weight: 700; color: var(--gold); }
        .price-mrp { font-size: 16px; color: rgba(250,246,238,0.25); text-decoration: line-through; }
        .price-save { font-size: 11px; color: #4caf7d; letter-spacing: 1px; font-weight: 600; }
        .price-note { color: rgba(250,246,238,0.3); font-size: 12px; margin-bottom: 36px; }

        .divider { height: 1px; background: rgba(201,138,20,0.12); margin: 32px 0; }

        .specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 36px; }
        .spec-item { padding: 16px; background: rgba(250,246,238,0.03); border: 1px solid rgba(201,138,20,0.12); }
        .spec-label { color: rgba(250,246,238,0.3); font-size: 9px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px; font-weight: 600; }
        .spec-value { color: var(--cream); font-size: 14px; font-weight: 500; }

        .qty-row { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
        .qty-label { color: rgba(250,246,238,0.4); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; }
        .qty-controls { display: flex; align-items: center; border: 1px solid rgba(201,138,20,0.2); }
        .qty-btn { width: 40px; height: 40px; background: none; border: none; color: var(--cream); font-size: 18px; cursor: pointer; transition: background 0.2s; }
        .qty-btn:hover { background: rgba(201,138,20,0.1); }
        .qty-num { width: 48px; text-align: center; font-size: 15px; font-weight: 500; color: var(--cream); }

        .btn-cart { width: 100%; padding: 18px; background: var(--gold); color: var(--ink); font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.2s; margin-bottom: 12px; }
        .btn-cart:hover { background: #d99a24; }
        .btn-cart.added { background: #152B1E; color: var(--gold); border: 1px solid var(--gold); }
        .btn-view-cart { width: 100%; padding: 18px; background: transparent; color: var(--cream); font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; border: 1px solid rgba(250,246,238,0.15); cursor: pointer; transition: all 0.2s; margin-bottom: 32px; text-align: center; text-decoration: none; display: block; }
        .btn-view-cart:hover { border-color: var(--gold); color: var(--gold); }

        .trust-row { display: flex; gap: 24px; flex-wrap: wrap; }
        .trust-item { display: flex; align-items: center; gap: 8px; }
        .trust-dot { width: 3px; height: 3px; background: var(--gold); border-radius: 50%; }
        .trust-text { color: rgba(250,246,238,0.35); font-size: 11px; font-weight: 300; }

        .product-desc-section { padding: 96px 72px; background: var(--cream); }
        .desc-inner { max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 96px; }
        .desc-title { font-family: 'Cormorant Garamond', serif; color: var(--ink); font-size: 40px; font-weight: 700; line-height: 1.1; margin-bottom: 28px; }
        .desc-title em { color: var(--gold); font-style: italic; }
        .desc-body { color: var(--warm-gray); font-size: 15px; line-height: 1.95; font-weight: 300; margin-bottom: 20px; }
        .desc-body strong { color: var(--ink); font-weight: 600; }

        .lab-box { background: var(--ink); padding: 36px; border-left: 3px solid var(--gold); }
        .lab-title { font-family: 'Cormorant Garamond', serif; color: var(--cream); font-size: 22px; font-weight: 700; margin-bottom: 20px; }
        .lab-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(250,246,238,0.06); }
        .lab-row:last-child { border-bottom: none; }
        .lab-key { color: rgba(250,246,238,0.4); font-size: 12px; font-weight: 300; }
        .lab-val { color: var(--gold); font-size: 13px; font-weight: 600; }

        .footer { background: var(--ink); padding: 44px 72px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(201,138,20,0.1); flex-wrap: wrap; gap: 24px; }
        .footer-logo { font-family: 'Cormorant Garamond', serif; color: var(--gold); font-size: 17px; letter-spacing: 4px; font-weight: 600; }
        .footer-meta p { color: rgba(250,246,238,0.22); font-size: 11px; line-height: 1.8; text-align: center; font-weight: 300; }

        @media (max-width: 768px) {
          .nav { padding: 18px 24px; }
          .product-wrap { grid-template-columns: 1fr; }
          .product-gallery { position: relative; height: 380px; top: 0; }
          .product-detail { padding: 48px 28px; }
          .specs-grid { grid-template-columns: 1fr; }
          .product-desc-section { padding: 72px 28px; }
          .desc-inner { grid-template-columns: 1fr; gap: 48px; }
          .footer { padding: 36px 28px; flex-direction: column; text-align: center; }
        }
      `}</style>

      <div className="site">
        <nav className="nav">
          <Link href="/" className="nav-logo">Nivora Organics&#8482;</Link>
          <div className="nav-right">
            <Link href="/products" className="nav-link">Products</Link>
            <Link href="/cart" className="nav-cart">
              Cart {count > 0 && `(${count})`}
            </Link>
          </div>
        </nav>

        <div className="product-wrap">
          <div className="product-gallery">
            <img src="https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=1200&q=90" alt="Organic Turmeric Powder" />
          </div>

          <div className="product-detail">
            <div className="breadcrumb">
              <Link href="/" className="breadcrumb a">Home</Link>
              <span className="breadcrumb-sep">›</span>
              <Link href="/products" className="breadcrumb a">Products</Link>
              <span className="breadcrumb-sep">›</span>
              <span style={{color: "rgba(250,246,238,0.6)", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase"}}>Turmeric</span>
            </div>

            <span className="product-tag">Flagship · Launching Soon</span>
            <h1 className="product-title">Organic Turmeric<br />Powder</h1>
            <p className="product-subtitle">100g · Kerala Single Origin · Batch Lab Tested</p>

            <div className="price-row">
              <span className="price-main">₹149</span>
              <span className="price-mrp">₹199</span>
              <span className="price-save">25% OFF</span>
            </div>
            <p className="price-note">Inclusive of all taxes · Free shipping on orders above ₹499</p>

            <div className="divider" />

            <div className="specs-grid">
              {[
                { label: "Curcumin Content", value: "4.5%+ Verified" },
                { label: "Lab Certification", value: "NABL Accredited" },
                { label: "Origin", value: "Thrissur, Kerala" },
                { label: "Packaging", value: "Kraft Ziplock 100g" },
                { label: "Additives", value: "None · Zero" },
                { label: "Certification", value: "PGS-India Organic" },
              ].map(s => (
                <div className="spec-item" key={s.label}>
                  <div className="spec-label">{s.label}</div>
                  <div className="spec-value">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="qty-row">
              <span className="qty-label">Qty</span>
              <div className="qty-controls">
                <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span className="qty-num">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
              </div>
            </div>

            <button className={`btn-cart ${added ? "added" : ""}`} onClick={handleAddToCart}>
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>
            <Link href="/cart" className="btn-view-cart">View Cart</Link>

            <div className="trust-row">
              {["NABL Lab Verified", "Zero Additives", "Single Origin Kerala", "Secure Checkout"].map(t => (
                <div className="trust-item" key={t}>
                  <div className="trust-dot" />
                  <span className="trust-text">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="product-desc-section">
          <div className="desc-inner">
            <div>
              <h2 className="desc-title">Why this turmeric<br />is <em>different.</em></h2>
              <p className="desc-body">Most turmeric on the market contains between 1–2% curcumin. Ours is lab-verified at a minimum of 4.5% — more than double the commodity standard. This is not a marketing claim. It is a number on a lab report, referenced on every pack.</p>
              <p className="desc-body"><strong>Grown in Kerala's red laterite soil</strong> where turmeric has been cultivated for centuries. Harvested at peak curcumin density. Stone-ground without heat treatment. Packed in kraft paper ziplock pouches with zero plastic contact.</p>
              <p className="desc-body">One ingredient. The spice itself. Nothing else.</p>
            </div>
            <div>
              <div className="lab-box">
                <div className="lab-title">Lab Report Summary</div>
                {[
                  { key: "Curcumin Content", val: "4.5%+ (Min)" },
                  { key: "Pesticide Residue", val: "Not Detected" },
                  { key: "Heavy Metals", val: "Within FSSAI Limits" },
                  { key: "Moisture Content", val: "≤ 10%" },
                  { key: "Microbiology", val: "Pass" },
                  { key: "Lab Accreditation", val: "NABL Certified" },
                ].map(r => (
                  <div className="lab-row" key={r.key}>
                    <span className="lab-key">{r.key}</span>
                    <span className="lab-val">{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-logo">Nivora Organics&#8482;</div>
          <div className="footer-meta">
            <p>Manufactured by Nivora Labs&#8482; · UDYAM-KL-13-0106481</p>
            <p>Thrissur, Kerala · Proven Pure.</p>
          </div>
        </footer>
      </div>
    </>
  );
}