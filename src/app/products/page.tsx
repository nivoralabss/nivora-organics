"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
const { count, addItem } = useCart();
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchProducts = async () => {
const { data, error } = await supabase
.from("products")
.select("*")
.order("name");

```
  if (error) console.error(error);
  if (data) setProducts(data);
  setLoading(false);
};

fetchProducts();
```

}, []);

return (
<> <style>{`
*{margin:0;padding:0;box-sizing:border-box}
:root{
--ink:#0E1410;
--gold:#C98A14;
--cream:#FAF6EE;
}
body{background:var(--ink)}

```
    .nav{
      position:fixed;top:0;left:0;right:0;
      display:flex;justify-content:space-between;
      padding:20px 40px;
      background:#0E1410;
      z-index:100;
    }

    .nav-logo{
      color:var(--gold);
      text-decoration:none;
      font-weight:600;
    }

    .nav-right{display:flex;gap:20px}

    .nav-link{color:var(--cream);text-decoration:none}

    .nav-cart{color:var(--gold)}

    .header{
      padding:140px 60px 60px;
    }

    .title{
      font-size:48px;
      color:var(--cream);
    }

    .grid{
      max-width:1200px;
      margin:auto;
      display:grid;
      grid-template-columns:repeat(3,1fr);
      gap:20px;
      padding:40px;
    }

    .card{
      background:#111;
      border:1px solid rgba(255,255,255,0.05);
      transition:all .3s;
    }

    .card:hover{
      transform:translateY(-4px);
    }

    .img{
      width:100%;
      height:240px;
      object-fit:cover;
    }

    .body{
      padding:20px;
    }

    .name{
      font-size:20px;
      color:white;
      margin-bottom:6px;
    }

    .desc{
      font-size:12px;
      color:#aaa;
      margin-bottom:14px;
    }

    .price{
      color:var(--gold);
      font-size:22px;
      margin-bottom:14px;
    }

    .mrp{
      color:#777;
      text-decoration:line-through;
      font-size:12px;
      margin-left:6px;
    }

    .cart-btn{
      background:var(--gold);
      border:none;
      padding:10px 14px;
      cursor:pointer;
      font-weight:600;
    }

    .cart-btn:hover{
      opacity:.9;
    }

    .loading{
      text-align:center;
      padding:100px;
      color:#999;
    }

    @media(max-width:900px){
      .grid{grid-template-columns:repeat(2,1fr)}
    }

    @media(max-width:600px){
      .grid{grid-template-columns:1fr}
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
    <h1 className="title">Our Spices</h1>
  </div>

  {loading ? (
    <div className="loading">Loading products...</div>
  ) : (
    <div className="grid">
      {products.map((p) => {
        const discount =
          p.mrp > p.price
            ? Math.round(((p.mrp - p.price) / p.mrp) * 100)
            : 0;

        return (
          <div className="card" key={p.id}>
            <Link href={`/products/${p.slug}`}>
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.name}
                  width={400}
                  height={240}
                  className="img"
                />
              ) : (
                <div className="img" />
              )}
            </Link>

            <div className="body">
              <div className="name">{p.name}</div>

              <div className="desc">{p.description}</div>

              <div className="price">
                ₹{p.price}
                <span className="mrp">₹{p.mrp}</span>
                {discount > 0 && ` (${discount}% off)`}
              </div>

              <button
                className="cart-btn"
                onClick={() => addItem(p)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  )}
</>
```

);
}
