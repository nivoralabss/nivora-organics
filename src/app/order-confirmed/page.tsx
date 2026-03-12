"use client";
import Link from "next/link";

export default function OrderConfirmedPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Jost:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root { --ink: #0E1410; --gold: #C98A14; --cream: #FAF6EE; --forest: #152B1E; }
        body { background: var(--ink); -webkit-font-smoothing: antialiased; }
        .site { font-family: 'Jost', sans-serif; color: var(--cream); min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px 28px; text-align: center; }

        .check-circle { width: 80px; height: 80px; border-radius: 50%; border: 2px solid var(--gold); display: flex; align-items: center; justify-content: center; margin: 0 auto 36px; }
        .check-icon { font-size: 32px; color: var(--gold); }

        .confirmed-eyebrow { color: var(--gold); font-size: 9px; letter-spacing: 4px; text-transform: uppercase; font-weight: 600; margin-bottom: 16px; display: block; }
        .confirmed-title { font-family: 'Cormorant Garamond', serif; font-size: 56px; font-weight: 700; line-height: 1.05; margin-bottom: 20px; }
        .confirmed-title em { color: var(--gold); font-style: italic; }
        .confirmed-sub { color: rgba(250,246,238,0.45); font-size: 15px; line-height: 1.9; max-width: 480px; margin: 0 auto 48px; font-weight: 300; }

        .confirmed-box { background: rgba(250,246,238,0.02); border: 1px solid rgba(201,138,20,0.15); padding: 32px 48px; margin-bottom: 48px; max-width: 480px; width: 100%; }
        .box-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(250,246,238,0.05); }
        .box-row:last-child { border-bottom: none; }
        .box-key { color: rgba(250,246,238,0.3); font-size: 12px; }
        .box-val { font-size: 12px; font-weight: 500; color: var(--gold); }

        .btn-home { display: inline-block; padding: 16px 40px; background: var(--gold); color: var(--ink); font-size: 10px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; text-decoration: none; margin-right: 12px; transition: background 0.2s; }
        .btn-home:hover { background: #d99a24; }
        .btn-shop { display: inline-block; padding: 16px 40px; border: 1px solid rgba(201,138,20,0.3); color: rgba(250,246,238,0.5); font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; transition: all 0.2s; }
        .btn-shop:hover { border-color: var(--gold); color: var(--gold); }

        .footer-note { margin-top: 64px; color: rgba(250,246,238,0.15); font-size: 11px; }
      `}</style>

      <div className="site">
        <div className="check-circle">
          <span className="check-icon">✓</span>
        </div>

        <span className="confirmed-eyebrow">Order Confirmed</span>
        <h1 className="confirmed-title">Thank you for<br /><em>your order.</em></h1>
        <p className="confirmed-sub">
          Your order has been placed successfully. You will receive a confirmation email shortly. We'll notify you when your spices are dispatched.
        </p>

        <div className="confirmed-box">
          {[
            { key: "Brand", val: "Nivora Organics™" },
            { key: "Standard", val: "Proven Pure" },
            { key: "Origin", val: "Thrissur, Kerala" },
            { key: "Lab Verified", val: "NABL Accredited" },
          ].map(r => (
            <div className="box-row" key={r.key}>
              <span className="box-key">{r.key}</span>
              <span className="box-val">{r.val}</span>
            </div>
          ))}
        </div>

        <div>
          <Link href="/" className="btn-home">Back to Home</Link>
          <Link href="/products" className="btn-shop">Shop More</Link>
        </div>

        <p className="footer-note">Manufactured by Nivora Labs™ · UDYAM-KL-13-0106481 · Thrissur, Kerala</p>
      </div>
    </>
  );
}