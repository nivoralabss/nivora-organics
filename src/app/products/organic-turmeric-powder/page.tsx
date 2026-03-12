"use client";
import { useState } from "react";
import Link from "next/link";

export default function TurmericPage() {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
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
        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          color: var(--gold); font-size: 19px; letter-spacing: 4px; font-weight: 600;
          text-decoration: none;
        }
        .nav-right { display: flex; align-items: center; gap: 36px; }
        .nav-link {
          color: rgba(250,246,238,0.6); font-size: 11px; letter-spacing: 2px;
          text-transform: uppercase; text-decoration: none; font-weight: 500; transition: color 0.2s;
        }
        .nav-link:hover { color: var(--gold); }

        .product-layout {
          display: grid; grid-template-columns: 1fr 1fr;
          min-height: 100vh; padding-top: 72px;
        }

        .product-gallery {
          position: sticky; top: 72px; height: calc(100vh - 72px);
          overflow: hidden;
        }
        .product-gallery img {
          width: 100%; height: 100%; object-fit: cover;
        }

        .product-info {
          padding: 72px 64px; background: var(--ink);
          overflow-y: auto;
        }

        .breadcrumb { display: flex; gap: 8px; align-items: center; margin-bottom: 40px; }
        .breadcrumb a { color: rgba(250,246,238,0.3); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; text-decoration: none; font-weight: 500; }
        .breadcrumb a:hover { color: var(--gold); }
        .breadcrumb-sep { color: rgba(250,246,238,0.15); font-size: 11px; }

        .product-tag { display: inline-block; border: 1px solid rgba(201,138,20,0.35); color: var(--gold); font-size: 9px; letter-spacing: 3px; text-transform: uppercase; padding: 7px 14px; margin-bottom: 24px; font-weight: 600; }
        .product-name { font-family: 'Cormorant Garamond', serif; font-size: 52px; font-weight: 700; line-height: 1.05; margin-bottom: 10px; }
        .product-sub { color: rgba(201,138,20,0.85); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 32px; font-weight: 600; }

        .price-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 36px; padding-bottom: 36px; border-bottom: 1px solid rgba(201,138,20,0.1); }
        .price-main { font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 700; color: var(--gold); }
        .price-mrp { font-size: 16px; color: rgba(250,246,238,0.25); text-decoration: line-through; }
        .price-save { font-size: 11px; color: #6db87a; letter-spacing: 1px; font-weight: 600; background: rgba(109,184,122,0.1); padding: 4px 10px; }

        .section-title { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(250,246,238,0.3); margin-bottom: 16px; font-weight: 600; }

        .specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-bottom: 36px; }
        .spec-item { background: rgba(250,246,238,0.03); padding: 20px; border-top: 1px solid rgba(201,138,20,0.15); }
        .spec-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: rgba(250,246,238,0.25); margin-bottom: 6px; font-weight: 600; }
        .spec-value { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700; color: var(--cream); }

        .qty-row { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
        .qty-label { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(250,246,238,0.3); font-weight: 600; }
        .qty-controls { display: flex; align-items: center; gap: 0; border: 1px solid rgba(250,246,238,0.1); }
        .qty-btn { width: 40px; height: 40px; background: transparent; color: var(--cream); font-size: 18px; border: none; cursor: pointer; transition: background 0.2s; }
        .qty-btn:hover { background: rgba(250,246,238,0.05); }
        .qty-num { width: 48px; text-align: center; font-size: 15px; font-weight: 500; color: var(--cream); border-left: 1px solid rgba(250,246,238,0.1); border-right: 1px solid rgba(250,246,238,0.1); line-height: 40px; }

        .add-btn {
          width: 100%; padding: 18px; background: var(--gold); color: var(--ink);
          font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase; border: none; cursor: pointer;
          transition: background 0.2s; margin-bottom: 12px;
        }
        .add-btn:hover { background: #d99a24; }
        .add-btn.success { background: #4a7c59; color: #fff; }

        .trust-row { display: flex; gap: 24px; margin-top: 32px; padding-top: 32px; border-top: 1px solid rgba(201,138,20,0.1); }
        .trust-item { display: flex; flex-direction: column; gap: 4px; }
        .trust-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); font-weight: 600; }
        .trust-value { font-size: 12px; color: rgba(250,246,238,0.4); font-weight: 300; }

        .description { margin-top: 48px; padding-top: 48px; border-top: 1px solid rgba(201,138,20,0.1); }
        .desc-text { color: rgba(250,246,238,0.5); font-size: 14.5px; line-height: 1.95; font-weight: 300; margin-bottom: 20px; }
        .desc-text strong { color: var(--cream); font-weight: 500; }

        .footer {
          background: var(--ink); padding: 44px 72px;
          display: flex; justify-content: space-between; align-items: center;
          border-top: 1px solid rgba(201,138,20,0.1); flex-wrap: wrap; gap: 24px;
        }
        .footer-logo { font-family: 'Cormorant Garamond', serif; color: var(--gold); font-size: 17px; letter-spacing: 4px; font-weight: 600; }
        .footer-meta p { color: rgba(250,246,238,0.22); font-size: 11px; line-height: 1.8; text-align: center; font-weight: 300; }

        @media (max-width: 768px) {
          .nav { padding: 18px 24px; }
          .product-layout { grid-template-columns: 1fr; }
          .product-gallery { position: static; height: 360px; }
          .product-info { padding: 40px 28px; }
          .product-name { font-size: 36px; }
          .specs-grid { grid-template-columns: 1fr 1fr; }
          .footer { padding: 36px 28px; flex-direction: column; text-align: center; }
        }
      `}</style>

      <div className="site">
        <nav className="nav">
          <Link href="/" className="nav-logo">Nivora Organics&#8482;</Link>
          <div className="nav-right">
            <Link href="/products" className="nav-link">Products</Link>
            <a href="https://instagram.com/nivoraorganics" className="nav-link">@nivoraorganics</a>
          </div>
        </nav>

        <div className="product-layout">
          <div className="product-gallery">
            <img
              src="https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=1200&q=90"
              alt="Organic Turmeric Powder"
            />
          </div>

          <div className="product-info">
            <div className="breadcrumb">
              <Link href="/products" className="breadcrumb a">Products</Link>
              <span className="breadcrumb-sep">·</span>
              <span style={{color: "rgba(250,246,238,0.5)", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase"}}>Turmeric</span>
            </div>

            <span className="product-tag">Flagship · Launching Soon</span>
            <h1 className="product-name">Organic Turmeric<br />Powder</h1>
            <p className="product-sub">100g · Kerala Single Origin · Batch Lab Tested</p>

            <div className="price-row">
              <span className="price-main">₹149</span>
              <span className="price-mrp">₹199</span>
              <span className="price-save">SAVE 25%</span>
            </div>

            <p className="section-title">Product Specs</p>
            <div className="specs-grid">
              {[
                { label: "Curcumin", value: "4.5%+" },
                { label: "Weight", value: "100g" },
                { label: "Origin", value: "Kerala" },
                { label: "Lab", value: "NABL" },
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

            <button
              className={`add-btn ${added ? "success" : ""}`}
              onClick={handleAddToCart}
            >
              {added ? "✓ Added to Cart" : `Add to Cart — ₹${149 * qty}`}
            </button>

            <div className="trust-row">
              {[
                { label: "Lab Verified", value: "NABL Accredited" },
                { label: "Shipping", value: "Amazon Prime · Day 1" },
                { label: "Returns", value: "Easy 7-day returns" },
              ].map(t => (
                <div className="trust-item" key={t.label}>
                  <span className="trust-label">{t.label}</span>
                  <span className="trust-value">{t.value}</span>
                </div>
              ))}
            </div>

            <div className="description">
              <p className="section-title">About This Product</p>
              <p className="desc-text">
                Grown in Kerala's red laterite soil where turmeric has been cultivated for centuries. Harvested at peak curcumin density. Processed without additives. <strong>Tested by a third-party NABL lab before it reaches your kitchen.</strong>
              </p>
              <p className="desc-text">
                Most organic turmeric carries 1–2% curcumin. Ours is verified at a minimum of 4.5%. The lab report reference number is printed on every pack — ask us for the full document anytime.
              </p>
              <p className="desc-text">
                <strong>One ingredient. Organic turmeric. Nothing else.</strong> No anti-caking agents, no flow additives, no synthetic colour, no starch fillers.
              </p>
            </div>
          </div>
        </div>

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