"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function ProductQuantity({ product }) {

const { addItem } = useCart();

const [qty, setQty] = useState(1);

const increase = () => {
setQty(qty + 1);
};

const decrease = () => {
if (qty > 1) {
setQty(qty - 1);
}
};

const subtotal = product.price * qty;

const addToCart = () => {
for (let i = 0; i < qty; i++) {
addItem(product);
}
};

return ( <div style={{marginTop:40}}>

```
  <h2 style={{fontSize:28, marginBottom:20}}>
    ₹{product.price}
  </h2>

  <div style={{marginBottom:20}}>

    <p style={{marginBottom:8}}>Quantity</p>

    <div style={{
      display:"flex",
      border:"1px solid #ccc",
      width:160,
      alignItems:"center"
    }}>

      <button
        onClick={decrease}
        style={{
          width:40,
          height:40,
          fontSize:20
        }}
      >
        –
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
          fontSize:20
        }}
      >
        +
      </button>

    </div>

  </div>

  <p style={{marginBottom:20}}>
    Subtotal: ₹{subtotal}
  </p>

  <button
    onClick={addToCart}
    style={{
      padding:"14px 28px",
      background:"#000",
      color:"#fff",
      border:"none",
      cursor:"pointer"
    }}
  >
    ADD TO CART
  </button>

</div>
```

);
}
