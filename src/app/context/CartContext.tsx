"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Product = {
id?: string;
slug: string;
name: string;
price: number;
image: string;
};

type CartItem = Product & {
qty: number;
};

type CartContextType = {
cart: CartItem[];
addItem: (product: Product) => void;
increaseQty: (slug: string) => void;
decreaseQty: (slug: string) => void;
removeItem: (slug: string) => void;
clearCart: () => void;
count: number;
total: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
const [cart, setCart] = useState<CartItem[]>([]);

const addItem = (product: Product) => {
setCart((prev) => {
const existing = prev.find((item) => item.slug === product.slug);

```
  if (existing) {
    return prev.map((item) =>
      item.slug === product.slug
        ? { ...item, qty: item.qty + 1 }
        : item
    );
  }

  return [...prev, { ...product, qty: 1 }];
});
```

};

const increaseQty = (slug: string) => {
setCart((prev) =>
prev.map((item) =>
item.slug === slug
? { ...item, qty: item.qty + 1 }
: item
)
);
};

const decreaseQty = (slug: string) => {
setCart((prev) =>
prev
.map((item) =>
item.slug === slug
? { ...item, qty: item.qty - 1 }
: item
)
.filter((item) => item.qty > 0)
);
};

const removeItem = (slug: string) => {
setCart((prev) => prev.filter((item) => item.slug !== slug));
};

const clearCart = () => {
setCart([]);
};

const count = cart.reduce((sum, item) => sum + item.qty, 0);

const total = cart.reduce(
(sum, item) => sum + item.price * item.qty,
0
);

return (
<CartContext.Provider
value={{
cart,
addItem,
increaseQty,
decreaseQty,
removeItem,
clearCart,
count,
total,
}}
>
{children}
</CartContext.Provider>
);
}

export function useCart() {
const context = useContext(CartContext);

if (!context) {
throw new Error("useCart must be used inside CartProvider");
}

return context;
}
