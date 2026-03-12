"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { supabase } from "../../../lib/supabase";

type Product = {
  slug: string;
  name: string;
  price: number;
  mrp: number;
  description: string;
  image: string;
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { addItem, count } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", params.slug)
        .single();

      if (data) setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [params.slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      qty,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <div style={{background:"#0E1410",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <p style={{color:"rgba(250,246,238,0.4)",fontFamily:"Jost,sans-serif",letterSpacing:"3px",fontSize:"11px",textTransform:"uppercase"}}>Loading...</p>
    </div>
  );

  if (!product) return (
    <div style={{background:"#0E1410",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <p style={{color:"rgba(250,246,238,0.4)",fontFamily:"Jost,sans-serif"}}>Product not found.</p>
    </div>
  );

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

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
        .product-gallery-placeholder { width: 100%; height: 100%; background: linear-gradient(135deg, #152B1E 0%, #0E1410 100%); display: flex; align-items: center; justify-content: center; }
        .placeholder-text { font-family: 'Cormorant Garamond', serif; color: rgba(201,138,20,0.3); font-size: 48px; font-weight: 700; text-align: center; padding: 40px; }

        .product-detail { padding: 72px 64px; background: var(--ink); }
        .breadcrumb { display: flex; align-items: center; gap: 8px; margin-bottom: 40px; flex-wrap: wrap; }
        .breadcrumb a { color: rgba(250,246,238,0.3); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; text-decoration: none; transition: color 0.2s; }
        .breadcrumb a:hover { color: var(--gold); }
        .breadcrumb-sep { color: rgba(250,246,238,0.15); font-size: 11px; }
        .breadcrumb-current { color: rgba(250,246,238,0.6); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; }

        .product-tag { display: inline-block; border: 1px solid rgba(201,138,20,0.35); color: var(--gold); font-size: 9px; letter-spacing: 3px; text-transform: uppercase; padding: 7px 14px; margin-bottom: 24px; font-weight: 600; }
        .product-title { font-family: 'Cormorant Garamond', serif; color: #fff; font-size: 52px; line-height: 1.05; margin-bottom: 8px; font-weight: 700; }
        .product-subtitle { color: rgba(201,138,20,0.85); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px; font-weight: 600; }
        .product-desc { color: rgba(250,246,238,0.5); font-size: 14px; line-height: 1.9; font-weight: 300; margin-bottom: 32px; }

        .price-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 8px; }
        .price-main { font-family: 'Cormorant Garamond', serif; font-size: 44px; font-weight: 700; color: var(--gold); }
        .price-mrp { font-size: 16px; color: rgba(250,246,238,0.25); text-decoration: line-through; }
        .price-save { font-size: 11px; color: #4caf7d; letter-spacing: 1px; font-weight: 600; }
        .price-note { color: rgba(250,246,238,0.3); font-size: 12px; margin-bottom: 36px; }

        .divider { height: 1px; background: rgba(201,138,20,0.12); margin: 32px 0; }

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

        .footer { background: var(--ink); padding: 44px 72px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(201,138,20,0.1); flex-wrap: wrap; gap: 24px; }
        .footer-logo { font-family: 'Cormorant Garamond', serif; color: var(--gold); font-size: 17px; letter-spacing: 4px; font-weight: 600; }
        .footer-meta p { color: rgba(250,246,238,0.22); font-size: 11px; line-height: 1.8; text-align: center; font-weight: 300; }

        @media (max-width: 768px) {
          .nav { padding: 18px 24px; }
          .product-wrap { grid-template-columns: 1fr; }
          .product-gallery { position: relative; height: 380px; top: 0; }
          .product-detail { padding: 48px 28px; }
          .product-title { font-size: 36px; }
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
            {product.image ? (
              <img src={product.image} alt={product.name} />
            ) : (
              <div className="product-gallery-placeholder">
                <div className="placeholder-text">{product.name}</div>
              </div>
            )}
          </div>

          <div className="product-detail">
            <div className="breadcrumb">
              <Link href="/" className="breadcrumb a">Home</Link>
              <span className="breadcrumb-sep">›</span>
              <Link href="/products" className="breadcrumb a">Products</Link>
              <span className="breadcrumb-sep">›</span>
              <span className="breadcrumb-current">{product.name}</span>
            </div>

            <span className="product-tag">Kerala Origin · Lab Verified</span>
            <h1 className="product-title">{product.name}</h1>
            <p className="product-subtitle">100g · Single Origin · Batch Tested</p>
            <p className="product-desc">{product.description}</p>

            <div className="price-row">
              <span className="price-main">₹{product.price}</span>
              <span className="price-mrp">₹{product.mrp}</span>
              <span className="price-save">{discount}% OFF</span>
            </div>
            <p className="price-note">Inclusive of all taxes · Free shipping above ₹499</p>

            <div className="divider" />

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