"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { useCart } from "../context/CartContext";

type Product = {
  slug: string;
  name: string;
  price: number;
  mrp: number;
  description: string;
  image: string;
};

export default function ProductsPage() {
  const { count } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .order("name");
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

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

        .page-header { padding: 160px 72px 72px; background: var(--ink); border-bottom: 1px solid rgba(201,138,20,0.1); }
        .page-eyebrow { color: var(--gold); font-size: 9px; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 16px; display: block; font-weight: 600; }
        .page-title { font-family: 'Cormorant Garamond', serif; font-size: 56px; font-weight: 700; line-height: 1.05; }
        .page-title em { color: var(--gold); font-style: italic; }
        .page-count { color: rgba(250,246,238,0.3); font-size: 12px; margin-top: 12px; font-weight: 300; }

        .products-section { padding: 72px; background: var(--ink); }
        .products-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }

        .loading-state { text-align: center; padding: 96px; color: rgba(250,246,238,0.3); font-size: 11px; letter-spacing: 3px; text-transform: uppercase; }

        .product-card { background: rgba(250,246,238,0.02); border-top: 2px solid rgba(201,138,20,0.3); overflow: hidden; transition: background 0.3s; text-decoration: none; color: inherit; display: block; }
        .product-card:hover { background: rgba(250,246,238,0.05); }
        .product-card-img { width: 100%; height: 240px; object-fit: cover; display: block; }
        .product-card-placeholder { width: 100%; height: 240px; background: linear-gradient(135deg, #152B1E 0%, #0E1410 100%); display: flex; align-items: center; justify-content: center; }
        .placeholder-icon { font-family: 'Cormorant Garamond', serif; color: rgba(201,138,20,0.2); font-size: 36px; font-weight: 700; text-align: center; padding: 20px; }
        .product-card-body { padding: 24px 24px 28px; }
        .product-card-name { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; line-height: 1.2; margin-bottom: 8px; }
        .product-card-desc { color: rgba(250,246,238,0.35); font-size: 12px; line-height: 1.7; font-weight: 300; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .product-card-price { display: flex; align-items: baseline; gap: 8px; }
        .price-main { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 700; color: var(--gold); }
        .price-mrp { font-size: 12px; color: rgba(250,246,238,0.25); text-decoration: line-through; }
        .price-save { font-size: 10px; color: #4caf7d; letter-spacing: 1px; font-weight: 600; }

        .footer { background: var(--ink); padding: 44px 72px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(201,138,20,0.1); flex-wrap: wrap; gap: 24px; margin-top: 48px; }
        .footer-logo { font-family: 'Cormorant Garamond', serif; color: var(--gold); font-size: 17px; letter-spacing: 4px; font-weight: 600; }
        .footer-meta p { color: rgba(250,246,238,0.22); font-size: 11px; line-height: 1.8; text-align: center; font-weight: 300; }

        @media (max-width: 768px) {
          .nav { padding: 18px 24px; }
          .page-header { padding: 120px 28px 48px; }
          .page-title { font-size: 36px; }
          .products-section { padding: 40px 16px; }
          .products-grid { grid-template-columns: repeat(2, 1fr); }
          .footer { padding: 36px 28px; flex-direction: column; text-align: center; }
        }

        @media (max-width: 480px) {
          .products-grid { grid-template-columns: 1fr; }
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

        <div className="page-header">
          <span className="page-eyebrow">Our Range</span>
          <h1 className="page-title">Spices that are<br /><em>proven pure.</em></h1>
          {!loading && <p className="page-count">{products.length} products · Kerala Single Origin · NABL Lab Verified</p>}
        </div>

        <section className="products-section">
          {loading ? (
            <div className="loading-state">Loading products...</div>
          ) : (
            <div className="products-grid">
              {products.map(p => {
                const discount = Math.round(((p.mrp - p.price) / p.mrp) * 100);
                return (
                  <Link href={`/products/${p.slug}`} className="product-card" key={p.slug}>
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="product-card-img" />
                    ) : (
                      <div className="product-card-placeholder">
                        <div className="placeholder-icon">{p.name.charAt(0)}</div>
                      </div>
                    )}
                    <div className="product-card-body">
                      <div className="product-card-name">{p.name}</div>
                      <div className="product-card-desc">{p.description}</div>
                      <div className="product-card-price">
                        <span className="price-main">₹{p.price}</span>
                        <span className="price-mrp">₹{p.mrp}</span>
                        <span className="price-save">{discount}% off</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
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