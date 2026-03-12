"use client";
import { useState } from "react";
import Link from "next/link";

const products = [
  {
    slug: "organic-turmeric-powder",
    name: "Organic Turmeric Powder",
    subtitle: "100g · Kerala Single Origin · Batch Lab Tested",
    price: 149,
    mrp: 199,
    tag: "Flagship · Launching Soon",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&q=90",
    highlights: ["4.5%+ Curcumin Verified", "NABL Lab Tested", "Zero Additives"],
  },
];

export default function ProductsPage() {
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

        .page-header {
          padding: 160px 72px 72px;
          background: var(--ink);
          border-bottom: 1px solid rgba(201,138,20,0.1);
        }
        .page-eyebrow { color: var(--gold); font-size: 9px; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 16px; display: block; font-weight: 600; }
        .page-title { font-family: 'Cormorant Garamond', serif; font-size: 56px; font-weight: 700; line-height: 1.05; }
        .page-title em { color: var(--gold); font-style: italic; }

        .products-section { padding: 72px; background: var(--ink); }
        .products-grid { max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }

        .product-card { background: rgba(250,246,238,0.02); border-top: 2px solid rgba(201,138,20,0.3); overflow: hidden; transition: background 0.3s; text-decoration: none; color: inherit; display: block; }
        .product-card:hover { background: rgba(250,246,238,0.04); }
        .product-card-img { width: 100%; height: 280px; object-fit: cover; display: block; }
        .product-card-body { padding: 28px 28px 32px; }
        .product-card-tag { color: var(--gold); font-size: 9px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600; margin-bottom: 12px; display: block; }
        .product-card-name { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 700; line-height: 1.15; margin-bottom: 6px; }
        .product-card-sub { color: rgba(250,246,238,0.35); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 20px; font-weight: 500; }
        .product-card-highlights { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
        .highlight { display: flex; align-items: center; gap: 10px; }
        .highlight-dot { width: 3px; height: 3px; background: var(--gold); border-radius: 50%; flex-shrink: 0; }
        .highlight-text { color: rgba(250,246,238,0.45); font-size: 12px; font-weight: 300; }
        .product-card-price { display: flex; align-items: baseline; gap: 10px; }
        .price-main { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 700; color: var(--gold); }
        .price-mrp { font-size: 13px; color: rgba(250,246,238,0.25); text-decoration: line-through; }
        .price-label { font-size: 10px; color: rgba(250,246,238,0.3); letter-spacing: 1px; }

        .footer {
          background: var(--ink); padding: 44px 72px;
          display: flex; justify-content: space-between; align-items: center;
          border-top: 1px solid rgba(201,138,20,0.1); flex-wrap: wrap; gap: 24px;
          margin-top: 96px;
        }
        .footer-logo { font-family: 'Cormorant Garamond', serif; color: var(--gold); font-size: 17px; letter-spacing: 4px; font-weight: 600; }
        .footer-meta p { color: rgba(250,246,238,0.22); font-size: 11px; line-height: 1.8; text-align: center; font-weight: 300; }

        @media (max-width: 768px) {
          .nav { padding: 18px 24px; }
          .page-header { padding: 120px 28px 48px; }
          .page-title { font-size: 36px; }
          .products-section { padding: 48px 28px; }
          .products-grid { grid-template-columns: 1fr; }
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

        <div className="page-header">
          <span className="page-eyebrow">Our Range</span>
          <h1 className="page-title">Spices that are<br /><em>proven pure.</em></h1>
        </div>

        <section className="products-section">
          <div className="products-grid">
            {products.map(p => (
              <Link href={`/products/${p.slug}`} className="product-card" key={p.slug}>
                <img src={p.image} alt={p.name} className="product-card-img" />
                <div className="product-card-body">
                  <span className="product-card-tag">{p.tag}</span>
                  <div className="product-card-name">{p.name}</div>
                  <div className="product-card-sub">{p.subtitle}</div>
                  <div className="product-card-highlights">
                    {p.highlights.map(h => (
                      <div className="highlight" key={h}>
                        <div className="highlight-dot" />
                        <span className="highlight-text">{h}</span>
                      </div>
                    ))}
                  </div>
                  <div className="product-card-price">
                    <span className="price-main">₹{p.price}</span>
                    <span className="price-mrp">₹{p.mrp}</span>
                    <span className="price-label">100g</span>
                  </div>
                </div>
              </Link>
            ))}
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