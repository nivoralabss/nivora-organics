"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { useCart } from "../../context/CartContext";

type Product = {
id: string;
slug: string;
name: string;
price: number;
mrp: number;
description: string;
image: string;
};

export default function ProductPage() {

const params = useParams();
const slug = params.slug as string;

const { addItem } = useCart();

const [product, setProduct] = useState<Product | null>(null);
const [qty, setQty] = useState(1);

useEffect(() => {

```
const fetchProduct = async () => {

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) console.error(error);

  if (data) setProduct(data);
};

fetchProduct();
```

}, [slug]);

if (!product) {
return (
<div style={{padding:80,color:"#fff"}}>
Loading product... </div>
);
}

const increase = () => setQty(qty + 1);

const decrease = () => {
if (qty > 1) setQty(qty - 1);
};

const subtotal = product.price * qty;

const addToCart = () => {

```
for (let i = 0; i < qty; i++) {
  addItem(product);
}
```

};

return (
<div style={{
paddingTop:120,
paddingLeft:60,
paddingRight:60,
color:"#fff"
}}>

```
  <div style={{
    display:"grid",
    gridTemplateColumns:"1fr 1fr",
    gap:60
  }}>

    <div>

      {product.image ? (
        <img
          src={product.image}
          style={{
            width:"100%",
            borderRadius:8
          }}
        />
      ) : (
        <div style={{
          height:400,
          background:"#111",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          fontSize:80
        }}>
          {product.name.charAt(0)}
        </div>
      )}

    </div>

    <div>

      <h1 style={{
        fontSize:38,
        marginBottom:10
      }}>
        {product.name}
      </h1>

      <p style={{
        opacity:.6,
        marginBottom:30
      }}>
        {product.description}
      </p>

      <h2 style={{
        fontSize:30,
        color:"#C98A14",
        marginBottom:20
      }}>
        ₹{product.price}
        <span style={{
          textDecoration:"line-through",
          marginLeft:10,
          fontSize:16,
          opacity:.4
        }}>
          ₹{product.mrp}
        </span>
      </h2>

      <p style={{marginBottom:10}}>Quantity</p>

      <div style={{
        display:"flex",
        alignItems:"center",
        border:"1px solid #333",
        width:160,
        marginBottom:20
      }}>

        <button
          onClick={decrease}
          style={{
            width:40,
            height:40,
            fontSize:20,
            background:"none",
            color:"#fff",
            border:"none",
            cursor:"pointer"
          }}
        >
          −
        </button>

        <div style={{
          flex:1,
          textAlign:"center"
        }}>
          {qty}
        </div>

        <button
          onClick={increase}
          style={{
            width:40,
            height:40,
            fontSize:20,
            background:"none",
            color:"#fff",
            border:"none",
            cursor:"pointer"
          }}
        >
          +
        </button>

      </div>

      <p style={{
        marginBottom:20,
        fontSize:18
      }}>
        Subtotal: ₹{subtotal}
      </p>

      <button
        onClick={addToCart}
        style={{
          padding:"14px 28px",
          background:"#C98A14",
          color:"#000",
          border:"none",
          cursor:"pointer",
          fontWeight:600
        }}
      >
        ADD TO CART
      </button>

    </div>

  </div>

</div>
```

);
}
