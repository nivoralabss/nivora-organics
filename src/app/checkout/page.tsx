"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "", pincode: "", state: "Kerala",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (!form.name || !form.email || !form.phone || !form.address || !form.pincode) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    });

    const data = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      name: "Nivora Organics",
      description: "Proven Pure Spices",
      order_id: data.id,
      handler: async (response: any) => {
        // Save order to Supabase after successful payment
        await fetch("/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: total,
            payment_id: response.razorpay_payment_id,
            customer: form,
            items: items,
          }),
        });
        clearCart();
        router.push("/order-confirmed");
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      theme: { color: "#C98A14" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
    setLoading(false);
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
        .nav-right { display: flex; gap: 36px; }
        .nav-link { color: rgba(250,246,238,0.6); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; font-weight: 500; }

        .checkout-wrap { max-width: 1080px; margin: 0 auto; padding: 140px 72px 96px; display: grid; grid-template-columns: 1fr 380px; gap: 64px; align-items: start; }

        .section-title { font-family: 'Cormorant Garamond', serif; font-size: 44px; font-weight: 700; margin-bottom: 40px; }
        .section-title em { color: var(--gold); font-style: italic; }

        .form-group { margin-bottom: 20px; }
        .form-label { display: block; color: rgba(250,246,238,0.4); font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 600; margin-bottom: 8px; }
        .form-input {
          width: 100%; padding: 14px 16px; background: rgba(250,246,238,0.04);
          border: 1px solid rgba(201,138,20,0.15); color: var(--cream);
          font-family: 'Jost', sans-serif; font-size: 14px; outline: none; transition: border 0.2s;
        }
        .form-input:focus { border-color: rgba(201,138,20,0.5); }
        .form-input::placeholder { color: rgba(250,246,238,0.2); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        .order-summary { background: rgba(250,246,238,0.02); border: 1px solid rgba(201,138,20,0.12); padding: 36px; position: sticky; top: 120px; }
        .summary-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; margin-bottom: 24px; }
        .summary-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(250,246,238,0.06); }
        .summary-item-name { color: rgba(250,246,238,0.6); font-size: 13px; }
        .summary-item-price { font-size: 13px; font-weight: 500; }
        .summary-total { display: flex; justify-content: space-between; align-items: baseline; margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(201,138,20,0.2); }
        .total-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: rgba(250,246,238,0.4); }
        .total-val { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 700; color: var(--gold); }

        .btn-pay { width: 100%; padding: 18px; background: var(--gold); color: var(--ink); font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; border: none; cursor: pointer; margin-top: 24px; transition: background 0.2s; }
        .btn-pay:hover { background: #d99a24; }
        .btn-pay:disabled { opacity: 0.6; cursor: not-allowed; }
        .pay-note { color: rgba(250,246,238,0.2); font-size: 11px; text-align: center; margin-top: 12px; }

        @media (max-width: 768px) {
          .nav { padding: 18px 24px; }
          .checkout-wrap { grid-template-columns: 1fr; padding: 120px 28px 72px; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="site">
        <nav className="nav">
          <Link href="/" className="nav-logo">Nivora Organics&#8482;</Link>
          <div className="nav-right">
            <Link href="/cart" className="nav-link">← Back to Cart</Link>
          </div>
        </nav>

        <div className="checkout-wrap">
          <div>
            <h1 className="section-title">Delivery <em>Details</em></h1>

            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="form-input" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input className="form-input" name="email" type="email" placeholder="email@example.com" value={form.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone *</label>
                <input className="form-input" name="phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Address *</label>
              <input className="form-input" name="address" placeholder="House / Flat / Street" value={form.address} onChange={handleChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City *</label>
                <input className="form-input" name="city" placeholder="City" value={form.city} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Pincode *</label>
                <input className="form-input" name="pincode" placeholder="000000" value={form.pincode} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">State</label>
              <input className="form-input" name="state" value={form.state} onChange={handleChange} />
            </div>
          </div>

          <div>
            <div className="order-summary">
              <div className="summary-title">Order Summary</div>
              {items.map(item => (
                <div className="summary-item" key={item.slug}>
                  <span className="summary-item-name">{item.name} × {item.qty}</span>
                  <span className="summary-item-price">₹{item.price * item.qty}</span>
                </div>
              ))}
              <div className="summary-item">
                <span className="summary-item-name">Shipping</span>
                <span className="summary-item-price" style={{color: "#4caf7d"}}>Free</span>
              </div>
              <div className="summary-total">
                <span className="total-label">Total</span>
                <span className="total-val">₹{total}</span>
              </div>
              <button className="btn-pay" onClick={handlePayment} disabled={loading || items.length === 0}>
                {loading ? "Processing..." : `Pay ₹${total} Securely`}
              </button>
              <p className="pay-note">Secured by Razorpay · UPI · Cards · NetBanking</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}