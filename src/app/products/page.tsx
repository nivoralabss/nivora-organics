"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { useCart } from "../context/CartContext";

type Product = {
id: string;
slug: string;
name: string;
price: number;
mrp: number;
description: string;
image: string;
};

export default function ProductsPage() {

const { cart, count, addItem } = useCart();

const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {

```
const fetchProducts = async () => {

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name");

  if (error) {
    console.error(error);
  }

  if (data) {
    setProducts(data);
  }

  setLoading(false);
};

fetchProducts();
```

}, []);

return (
<> <style>{`
*{margin:0;padding:0;box-sizing:border-box}

```
    :root{
      --ink:#0E1410;
      --gold:#C98A14;
      --cream:#FAF6EE;
    }

    body{
      background:var(--ink);
      color:var(--cream);
      font-family:system-ui;
    }

    .nav{
      position:fixed;
      top:0;
      left:0;
      right:0;
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:22px 48px;
      background:#0E1410;
      border-bottom:1px solid rgba(255,255,255,0.05);
      z-index:100;
    }

    .nav-logo{
      color:var(--gold);
      font-size:18px;
      letter-spacing:3px;
      text-decoration:none;
    }

    .nav-right{
      display:flex;
      gap:32px;
      align-items:center;
    }

    .nav-link{
      color:#ccc;
      text-decoration:none;
      font-size:13px;
      letter-spacing:1px;
    }

    .nav-cart{
      color:var(--gold);
      font-weight:600;
      text-decoration:none;
    }

    .header{
      padding-top:140px;
      padding-left:60px;
      padding-right:60px;
      padding-bottom:60px;
    }

    .header h1{
      font-size:48px;
      margin-bottom:10px;
    }

    .header p{
      opacity:.5;
      font-size:14px;
    }

    .grid{
      max-width:1200px;
      margin:auto;
      display:grid;
      grid-template-columns:repeat(3,1fr);
      gap:24px;
      padding:40px;
    }

    .card{
      background:#111;
      border:1px solid rgba(255,255,255,0.05);
      overflow:hidden;
    }

    .img{
      width:100%;
      height:240px;
      object-fit:cover;
    }

    .placeholder{
      width:100%;
      height:240px;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:48px;
      color:#444;
      background:#0b0b0b;
    }

    .body{
      padding:22px;
    }

    .name{
      font-size:20px;
      margin-bottom:6px;
    }

    .desc{
      font-size:13px;
      opacity:.6;
      margin-bottom:14px;
    }

    .price{
      font-size:22px;
      color:var(--gold);
      margin-bottom:16px;
    }

    .mrp{
      font-size:13px;
      opacity:.5;
      text-decoration:line-through;
      margin-left:6px;
    }

    .btn{
      width:100%;
      padding:12px;
      border:1px solid var(--gold);
      background:transparent;
      color:var(--gold);
      cursor:pointer;
      letter-spacing:1px;
    }

    .btn:hover{
      background:var(--gold);
      color:#000;
    }

    .loading{
      padding:120px;
      text-align:center;
      opacity:.5;
    }

    @media(max-width:900px){
      .grid{
        grid-template-columns:repeat(2,1fr);
      }
    }

    @media(max-width:600px){
      .grid{
        grid-template-columns:1fr;
      }
    }
  `}</style>

  <nav className="nav">

    <Link href="/" className="nav-logo">
      Nivora Organics™
    </Link>

    <div className="nav-right">

      <Link href="/products" className="nav-link">
        Products
      </Link>

      <Link href="/cart" className="nav-cart">
        Cart {count > 0 && `(${count})`}
      </Link>

    </div>

  </nav>

  <div className="header">

    <h1>Our Spices</h1>

    {!loading && (
      <p>{products.length} products · Kerala Single Origin · Lab Tested</p>
    )}

  </div>

  {loading ? (

    <div className="loading">Loading products...</div>

  ) : (

    <div className="grid">

      {products.map((p) => {

        const item = cart.find(i => i.slug === p.slug)

        return (

          <div className="card" key={p.id}>

            <Link href={`/products/${p.slug}`}>

              {p.image ? (
                <img src={p.image} alt={p.name} className="img"/>
              ) : (
                <div className="placeholder">
                  {p.name.charAt(0)}
                </div>
              )}

            </Link>

            <div className="body">

              <div className="name">{p.name}</div>

              <div className="desc">{p.description}</div>

              <div className="price">
                ₹{p.price}
                <span className="mrp">₹{p.mrp}</span>
              </div>

              <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault()
                  addItem(p)
                }}
              >
                {item ? `ADDED (${item.qty})` : "ADD TO CART"}
              </button>

            </div>

          </div>

        )

      })}

    </div>

  )}

</>
```

);

}
