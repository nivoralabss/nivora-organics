"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
  if (!email) return;

  setLoading(true);

  try {
    await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    setSubmitted(true);
    setEmail("");

  } catch (error) {
    console.error(error);
  }

  setLoading(false);
};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Jost:wght@300;400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --ink: #0E1410;
          --gold: #C98A14;
          --cream: #FAF6EE;
          --forest: #152B1E;
          --warm-gray: #4a4438;
        }

        html { scroll-behavior: smooth; }
        body { background: var(--ink); -webkit-font-smoothing: antialiased; }
        .site { font-family: 'Jost', sans-serif; color: var(--cream); }

        /* NAV */
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
        }
        .nav-right { display: flex; align-items: center; gap: 36px; }
        .nav-tagline { color: rgba(250,246,238,0.3); font-size: 10px; letter-spacing: 3px; text-transform: uppercase; }
        .nav-link {
          color: rgba(250,246,238,0.6); font-size: 11px; letter-spacing: 2px;
          text-transform: uppercase; text-decoration: none; font-weight: 500; transition: color 0.2s;
        }
        .nav-link:hover { color: var(--gold); }

        /* HERO */
        .hero {
          position: relative; min-height: 100vh;
          display: flex; flex-direction: column; justify-content: flex-end;
          overflow: hidden;
        }
        .hero-img {
          position: absolute; inset: 0;
          background-image: url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1800&q=90');
          background-size: cover; background-position: center;
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(14,20,16,0.72) 0%,
            rgba(14,20,16,0.50) 30%,
            rgba(14,20,16,0.80) 65%,
            rgba(14,20,16,0.99) 100%
          );
        }
        .hero-content {
          position: relative; z-index: 2;
          padding: 0 72px 88px; max-width: 900px;
        }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 12px; margin-bottom: 32px;
        }
        .eyebrow-line { width: 32px; height: 1px; background: var(--gold); }
        .eyebrow-text { color: var(--gold); font-size: 10px; letter-spacing: 4px; text-transform: uppercase; font-weight: 500; }
        .hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          color: #FFFFFF;
          font-size: clamp(52px, 6vw, 92px);
          font-weight: 700; line-height: 1.0; margin-bottom: 30px; letter-spacing: -0.5px;
          text-shadow: 0 2px 40px rgba(0,0,0,0.5);
        }
        .hero-h1 em { color: var(--gold); font-style: italic; font-weight: 600; }
        .hero-sub {
          color: rgba(255,255,255,0.75); font-size: 16px;
          line-height: 1.9; max-width: 520px; margin-bottom: 52px;
          font-weight: 300; letter-spacing: 0.2px;
          text-shadow: 0 1px 12px rgba(0,0,0,0.4);
        }
        .hero-sub strong { color: #FFFFFF; font-weight: 500; }

        /* EMAIL */
        .email-wrap { max-width: 460px; }
        .email-row { display: flex; }
        .email-input {
          flex: 1; padding: 15px 18px; font-size: 13px;
          font-family: 'Jost', sans-serif; letter-spacing: 0.5px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.2);
          border-right: none; color: #fff; outline: none;
        }
        .email-input::placeholder { color: rgba(255,255,255,0.35); font-size: 12px; }
        .email-input:focus { border-color: rgba(201,138,20,0.6); background: rgba(255,255,255,0.11); }
        .email-btn {
          padding: 15px 26px; background: var(--gold); color: var(--ink);
          font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 700;
          letter-spacing: 2.5px; text-transform: uppercase; border: none; cursor: pointer;
          white-space: nowrap; transition: background 0.2s; min-width: 130px;
        }
        .email-btn:hover { background: #d99a24; }
        .email-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .email-note { color: rgba(255,255,255,0.25); font-size: 11px; margin-top: 10px; font-weight: 300; }
        .email-note.success { color: rgba(201,138,20,0.8); }

        /* STATS */
        .stats { background: var(--gold); display: flex; justify-content: center; flex-wrap: wrap; }
        .stat { padding: 22px 52px; text-align: center; border-right: 1px solid rgba(14,20,16,0.12); }
        .stat:last-child { border-right: none; }
        .stat-num { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 700; color: var(--ink); display: block; line-height: 1; }
        .stat-label { font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(14,20,16,0.55); margin-top: 6px; display: block; font-weight: 600; }

        /* INSIGHT */
        .insight { background: var(--cream); padding: 110px 72px; }
        .insight-inner { max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: 320px 1fr; gap: 96px; align-items: start; }
        .insight-left { position: sticky; top: 120px; }
        .section-label { color: var(--gold); font-size: 9px; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 20px; display: block; font-weight: 600; }
        .insight-pull {
          font-family: 'Cormorant Garamond', serif;
          color: var(--ink); font-size: 24px; line-height: 1.55;
          font-style: italic; font-weight: 600;
          border-left: 2px solid var(--gold); padding-left: 24px;
        }
        .insight-headline {
          font-family: 'Cormorant Garamond', serif;
          color: var(--ink); font-size: 44px; line-height: 1.12;
          font-weight: 700; margin-bottom: 32px; letter-spacing: -0.3px;
        }
        .insight-headline em { color: var(--gold); font-style: italic; }
        .insight-body { color: var(--warm-gray); font-size: 15.5px; line-height: 1.95; font-weight: 300; margin-bottom: 22px; }
        .insight-body strong { color: var(--ink); font-weight: 600; }
        .insight-callout {
          background: var(--ink); padding: 28px 32px; margin: 36px 0;
          border-left: 3px solid var(--gold);
        }
        .insight-callout p {
          font-family: 'Cormorant Garamond', serif;
          color: var(--cream); font-size: 20px; line-height: 1.65;
          font-style: italic; font-weight: 500;
        }

        /* PILLARS */
        .pillars { background: var(--ink); padding: 96px 72px; }
        .pillars-header { max-width: 1080px; margin: 0 auto 64px; }
        .pillars-title { font-family: 'Cormorant Garamond', serif; color: var(--cream); font-size: 44px; font-weight: 700; line-height: 1.1; }
        .pillars-title em { color: var(--gold); font-style: italic; }
        .pillars-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; max-width: 1080px; margin: 0 auto; }
        .pillar { padding: 44px 36px; background: rgba(250,246,238,0.02); border-top: 2px solid rgba(201,138,20,0.35); transition: background 0.3s; }
        .pillar:hover { background: rgba(250,246,238,0.04); }
        .pillar-num { font-family: 'Cormorant Garamond', serif; color: rgba(201,138,20,0.2); font-size: 52px; font-weight: 700; line-height: 1; margin-bottom: 20px; display: block; }
        .pillar-title { color: #FFFFFF; font-size: 17px; font-weight: 600; margin-bottom: 14px; }
        .pillar-desc { color: rgba(250,246,238,0.45); font-size: 14px; line-height: 1.85; font-weight: 300; }

        /* PRODUCT */
        .product { display: grid; grid-template-columns: 1fr 1fr; min-height: 640px; }
        .product-img {
          background-image: url('https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=1000&q=90');
          background-size: cover; background-position: center;
        }
        .product-content { background: var(--forest); padding: 80px 64px; display: flex; flex-direction: column; justify-content: center; }
        .product-tag { display: inline-block; border: 1px solid rgba(201,138,20,0.35); color: var(--gold); font-size: 9px; letter-spacing: 3px; text-transform: uppercase; padding: 7px 14px; margin-bottom: 32px; font-weight: 600; width: fit-content; }
        .product-title { font-family: 'Cormorant Garamond', serif; color: #FFFFFF; font-size: 44px; line-height: 1.1; margin-bottom: 10px; font-weight: 700; }
        .product-subtitle { color: rgba(201,138,20,0.85); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 28px; font-weight: 600; }
        .product-desc { color: rgba(250,246,238,0.5); font-size: 14.5px; line-height: 1.9; font-weight: 300; margin-bottom: 40px; }
        .product-specs { display: flex; flex-direction: column; gap: 16px; }
        .spec { display: flex; align-items: flex-start; gap: 14px; }
        .spec-dot { width: 3px; height: 3px; background: var(--gold); border-radius: 50%; flex-shrink: 0; margin-top: 8px; }
        .spec-text { color: rgba(250,246,238,0.55); font-size: 13px; line-height: 1.65; font-weight: 300; }

        /* FOR WHOM */
        .forwhom { background: var(--cream); padding: 110px 72px; }
        .forwhom-inner { max-width: 1080px; margin: 0 auto; }
        .forwhom-headline { font-family: 'Cormorant Garamond', serif; color: var(--ink); font-size: 48px; font-weight: 700; line-height: 1.1; margin-bottom: 56px; max-width: 680px; }
        .forwhom-headline em { color: var(--gold); font-style: italic; }
        .forwhom-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; }
        .forwhom-card { padding: 40px; background: rgba(14,20,16,0.03); border-top: 1px solid rgba(14,20,16,0.1); }
        .forwhom-card-title { font-size: 16px; font-weight: 600; color: var(--ink); margin-bottom: 10px; }
        .forwhom-card-desc { font-size: 14px; color: var(--warm-gray); line-height: 1.85; font-weight: 300; }

        /* FOOTER */
        .footer {
          background: var(--ink); padding: 44px 72px;
          display: flex; justify-content: space-between; align-items: center;
          border-top: 1px solid rgba(201,138,20,0.1); flex-wrap: wrap; gap: 24px;
        }
        .footer-logo { font-family: 'Cormorant Garamond', serif; color: var(--gold); font-size: 17px; letter-spacing: 4px; font-weight: 600; }
        .footer-meta p { color: rgba(250,246,238,0.22); font-size: 11px; line-height: 1.8; text-align: center; font-weight: 300; }
        .footer-right { text-align: right; }
        .footer-email { color: rgba(250,246,238,0.32); font-size: 12px; font-weight: 300; display: block; }
        .footer-ig { color: var(--gold); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; display: block; margin-top: 8px; font-weight: 500; }
        .footer-ig:hover { color: #d99a24; }

        @media (max-width: 768px) {
          .nav { padding: 18px 24px; }
          .nav-tagline { display: none; }
          .hero-content { padding: 0 28px 64px; }
          .insight { padding: 72px 28px; }
          .insight-inner { grid-template-columns: 1fr; gap: 48px; }
          .insight-left { position: static; }
          .pillars { padding: 72px 28px; }
          .pillars-grid { grid-template-columns: 1fr; }
          .product { grid-template-columns: 1fr; }
          .product-img { min-height: 320px; }
          .product-content { padding: 48px 28px; }
          .forwhom { padding: 72px 28px; }
          .forwhom-grid { grid-template-columns: 1fr; }
          .footer { padding: 36px 28px; flex-direction: column; text-align: center; }
          .footer-right { text-align: center; }
        }
      `}</style>

      <div className="site">

        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo">Nivora Organics&#8482;</div>
          <div className="nav-right">
            <span className="nav-tagline">Proven Pure.</span>
            <a href="https://instagram.com/nivoraorganics" className="nav-link">@nivoraorganics</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-img" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="hero-eyebrow">
              <div className="eyebrow-line" />
              <span className="eyebrow-text">Kerala Grown · NABL Lab Verified · Single Origin</span>
            </div>
            <h1 className="hero-h1">
              The spice your<br />
              grandmother trusted<br />
              — <em>with proof.</em>
            </h1>
            <p className="hero-sub">
              Kerala has always been the land of spices. What changed is what happens between the farm and your kitchen.{" "}
              <strong>Nivora Organics brings back what every conscious cook already knows to demand — spices you can verify, not just believe.</strong>
            </p>
            <div className="email-wrap">
              <div className="email-row">
                <input
                  className="email-input"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
                <button className="email-btn" onClick={handleSubmit} disabled={loading || submitted}>
                  {loading ? "Saving..." : submitted ? "✓ You're In" : "Notify Me"}
                </button>
              </div>
              <p className={`email-note ${submitted ? "success" : ""}`}>
                {submitted
                  ? "You're on the list. We'll reach out at launch."
                  : "Launching soon on Amazon India · No spam, ever."}
              </p>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="stats">
          {[
            { num: "4.5%+", label: "Curcumin Verified" },
            { num: "NABL", label: "Accredited Lab" },
            { num: "Zero", label: "Additives or Fillers" },
            { num: "₹149", label: "100g · Launch Price" },
          ].map(s => (
            <div className="stat" key={s.label}>
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* INSIGHT */}
        <section className="insight">
          <div className="insight-inner">
            <div className="insight-left">
              <span className="section-label">Why Nivora Exists</span>
              <p className="insight-pull">
                "The smartest kitchens already knew. They just needed a brand they could finally trust."
              </p>
            </div>
            <div className="insight-right">
              <h2 className="insight-headline">
                Some cooks never stopped<br />
                <em>buying whole spices.</em><br />
                Now they don't have to.
              </h2>
              <p className="insight-body">
                A hotelier in our family taught us something we never forgot. Every time he sourced spices for his kitchen, he would only buy whole, unground raw masalas — verified at source, ground in-house. Not out of habit. Out of intelligence.
              </p>
              <p className="insight-body">
                <strong>He knew what most people don't want to admit: once a spice is powdered, you cannot see what else is in it.</strong> Brick dust in red chilli. Synthetic curcumin inflating turmeric percentages. Starch padding out weight. It is not rare — it is widespread, and the pressure to cut costs makes it worse every year.
              </p>
              <div className="insight-callout">
                <p>"The people who know the most about food have always been the most careful about spices. Nivora Organics is for those people — and for every family that deserves that same standard."</p>
              </div>
              <p className="insight-body">
                We built Nivora Organics so the conscious cook — the one feeding children, managing health, or simply refusing to compromise — does not have to grind their own spices to feel safe. <strong>We do the verification for you. With a lab report, not a promise.</strong>
              </p>
              <p className="insight-body">
                Born in Bombay. Rooted in Kerala. The land of spices deserves a brand that actually proves it.
              </p>
            </div>
          </div>
        </section>

        {/* PILLARS */}
        <section className="pillars">
          <div className="pillars-header">
            <span className="section-label">The Nivora Standard</span>
            <h2 className="pillars-title">
              Three things we commit to.<br />
              <em>All three, every single batch.</em>
            </h2>
          </div>
          <div className="pillars-grid">
            {[
              {
                n: "01", title: "Source You Can Trace",
                desc: "Sourced directly from PGS-India certified organic farmers in Thrissur, Palakkad & Wayanad. Single origin. No blending with commodity supply. If the harvest is short, we produce less."
              },
              {
                n: "02", title: "A Lab Report, Not a Label Claim",
                desc: "Curcumin %, pesticide residue, moisture and microbiology — tested at NABL-accredited labs before dispatch. The report reference is printed on every pack. Ask us for the full document anytime."
              },
              {
                n: "03", title: "Nothing You Didn't Ask For",
                desc: "No anti-caking agents. No flow additives. No synthetic colour. No starch fillers. One ingredient. The spice itself. What you read on the label is everything that is in the pouch."
              },
            ].map(p => (
              <div className="pillar" key={p.n}>
                <span className="pillar-num">{p.n}</span>
                <div className="pillar-title">{p.title}</div>
                <div className="pillar-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCT */}
        <section className="product">
          <div className="product-img" />
          <div className="product-content">
            <span className="product-tag">Flagship · Launching Soon</span>
            <h2 className="product-title">Organic<br />Turmeric Powder</h2>
            <p className="product-subtitle">100g · Kerala Single Origin · Batch Lab Tested</p>
            <p className="product-desc">
              Grown in Kerala's red laterite soil where turmeric has been cultivated for centuries. Harvested at peak curcumin density. Processed without additives. Tested by a third party before it reaches your kitchen.
            </p>
            <div className="product-specs">
              {[
                "Minimum 4.5% curcumin — lab verified, report reference on every pack",
                "Kraft paper ziplock pouch — resealable, no plastic contact with the product",
                "Zero preservatives · Zero additives · One ingredient: organic turmeric",
                "Launching on Amazon India — Prime delivery from Day 1",
              ].map(s => (
                <div className="spec" key={s}>
                  <div className="spec-dot" />
                  <span className="spec-text">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOR WHOM */}
        <section className="forwhom">
          <div className="forwhom-inner">
            <h2 className="forwhom-headline">
              Made for kitchens<br />that <em>refuse to settle.</em>
            </h2>
            <div className="forwhom-grid">
              {[
                {
                  title: "The Conscious Home Cook",
                  desc: "You read ingredient labels. You've switched to organic produce. You know processed spices are the last blind spot in most kitchens. Nivora is the answer you've been looking for."
                },
                {
                  title: "Parents Who Cook for Children",
                  desc: "When you cook for your children, the standard is different. You don't want to wonder what's in the turmeric going into the dal. Neither do we. That's exactly why we built this."
                },
                {
                  title: "The Health-Aware Buyer",
                  desc: "Curcumin is why you buy turmeric. But commodity turmeric can carry as little as 1–2% curcumin. Ours is lab-verified at 4.5%+. You're buying a measurable outcome, not a feeling."
                },
                {
                  title: "Professional Kitchens & Hotels",
                  desc: "The best kitchens have always demanded source verification. Now there's a brand built around that same standard — with lab documentation to back every claim. B2B enquiries welcome."
                },
              ].map(c => (
                <div className="forwhom-card" key={c.title}>
                  <div className="forwhom-card-title">{c.title}</div>
                  <div className="forwhom-card-desc">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-logo">Nivora Organics&#8482;</div>
          <div className="footer-meta">
            <p>Manufactured by Nivora Labs&#8482; · UDYAM-KL-13-0106481</p>
            <p>Nivora Organics brand by Nivora Labs&#8482; · Thrissur, Kerala · Proven Pure.</p>
          </div>
          <div className="footer-right">
            <span className="footer-email">vishnunair@nivoraorganics.com</span>
            <a href="https://instagram.com/nivoraorganics" className="footer-ig">
              Instagram · @nivoraorganics
            </a>
          </div>
        </footer>

      </div>
    </>
  );
}