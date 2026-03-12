"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const ADMIN_PASSWORD = "nivora2024admin";

type Order = {
  id: string;
  created_at: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  amount: number;
  payment_id: string;
  status: string;
};

type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  mrp: number;
  description: string;
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<"orders" | "products" | "analytics">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saveMsg, setSaveMsg] = useState("");

  const login = () => {
    if (password === ADMIN_PASSWORD) setAuthed(true);
    else alert("Wrong password");
  };

  useEffect(() => {
    if (!authed) return;
    fetchOrders();
    fetchProducts();
  }, [authed]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (data) setOrders(data);
    setLoading(false);
  };

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("name");
    if (data) setProducts(data);
  };

  const updateOrderStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    fetchOrders();
  };

  const saveProduct = async () => {
    if (!editingProduct) return;
    await supabase.from("products").update({
      price: editingProduct.price,
      mrp: editingProduct.mrp,
      description: editingProduct.description,
    }).eq("id", editingProduct.id);
    setSaveMsg("Saved!");
    setTimeout(() => setSaveMsg(""), 2000);
    fetchProducts();
    setEditingProduct(null);
  };

  const totalRevenue = orders.filter(o => o.status === "paid").reduce((sum, o) => sum + o.amount, 0);
  const totalOrders = orders.length;
  const paidOrders = orders.filter(o => o.status === "paid").length;

  if (!authed) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Jost:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0E1410; font-family: 'Jost', sans-serif; }
        .login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .login-box { background: rgba(250,246,238,0.02); border: 1px solid rgba(201,138,20,0.15); padding: 52px; width: 380px; }
        .login-title { font-family: 'Cormorant Garamond', serif; color: #FAF6EE; font-size: 32px; font-weight: 700; margin-bottom: 8px; }
        .login-sub { color: rgba(250,246,238,0.3); font-size: 12px; margin-bottom: 32px; }
        .login-input { width: 100%; padding: 14px 16px; background: rgba(250,246,238,0.04); border: 1px solid rgba(201,138,20,0.15); color: #FAF6EE; font-family: 'Jost', sans-serif; font-size: 14px; outline: none; margin-bottom: 16px; }
        .login-btn { width: 100%; padding: 16px; background: #C98A14; color: #0E1410; font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; border: none; cursor: pointer; }
      `}</style>
      <div className="login-wrap">
        <div className="login-box">
          <div className="login-title">Admin Dashboard</div>
          <div className="login-sub">Nivora Organics · Staff Only</div>
          <input className="login-input" type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} />
          <button className="login-btn" onClick={login}>Enter Dashboard</button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Jost:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root { --ink: #0E1410; --gold: #C98A14; --cream: #FAF6EE; --forest: #152B1E; }
        body { background: var(--ink); font-family: 'Jost', sans-serif; color: var(--cream); }

        .admin-wrap { max-width: 1200px; margin: 0 auto; padding: 48px 40px; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 48px; }
        .admin-title { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 700; }
        .admin-title em { color: var(--gold); font-style: italic; }
        .admin-badge { background: rgba(201,138,20,0.1); border: 1px solid rgba(201,138,20,0.2); color: var(--gold); font-size: 9px; letter-spacing: 2px; text-transform: uppercase; padding: 6px 12px; font-weight: 600; }

        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-bottom: 48px; }
        .stat-card { background: rgba(250,246,238,0.02); border-top: 2px solid rgba(201,138,20,0.3); padding: 28px; }
        .stat-label { color: rgba(250,246,238,0.3); font-size: 9px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; font-weight: 600; }
        .stat-value { font-family: 'Cormorant Garamond', serif; font-size: 40px; font-weight: 700; color: var(--gold); }
        .stat-sub { color: rgba(250,246,238,0.2); font-size: 11px; margin-top: 4px; }

        .tabs { display: flex; gap: 2px; margin-bottom: 32px; }
        .tab { padding: 12px 24px; background: rgba(250,246,238,0.02); border: none; color: rgba(250,246,238,0.4); font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.2s; font-weight: 600; }
        .tab.active { background: var(--gold); color: var(--ink); }
        .tab:hover:not(.active) { background: rgba(250,246,238,0.05); color: var(--cream); }

        .table-wrap { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th { color: rgba(250,246,238,0.3); font-size: 9px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; padding: 12px 16px; text-align: left; border-bottom: 1px solid rgba(201,138,20,0.1); }
        td { padding: 16px; border-bottom: 1px solid rgba(250,246,238,0.04); font-size: 13px; color: rgba(250,246,238,0.7); vertical-align: middle; }
        tr:hover td { background: rgba(250,246,238,0.02); }

        .status-badge { display: inline-block; padding: 4px 10px; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 600; }
        .status-paid { background: rgba(76,175,125,0.1); color: #4caf7d; border: 1px solid rgba(76,175,125,0.2); }
        .status-pending { background: rgba(201,138,20,0.1); color: var(--gold); border: 1px solid rgba(201,138,20,0.2); }
        .status-dispatched { background: rgba(100,149,237,0.1); color: #6495ed; border: 1px solid rgba(100,149,237,0.2); }

        .status-select { background: rgba(250,246,238,0.04); border: 1px solid rgba(201,138,20,0.15); color: var(--cream); font-family: 'Jost', sans-serif; font-size: 11px; padding: 6px 10px; cursor: pointer; outline: none; }

        .edit-btn { background: none; border: 1px solid rgba(201,138,20,0.2); color: var(--gold); font-size: 10px; letter-spacing: 1px; text-transform: uppercase; padding: 6px 12px; cursor: pointer; font-family: 'Jost', sans-serif; transition: all 0.2s; }
        .edit-btn:hover { background: rgba(201,138,20,0.1); }

        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 200; }
        .modal { background: #152B1E; border: 1px solid rgba(201,138,20,0.2); padding: 40px; width: 480px; max-width: 90vw; }
        .modal-title { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 700; margin-bottom: 24px; }
        .modal-field { margin-bottom: 16px; }
        .modal-label { color: rgba(250,246,238,0.4); font-size: 9px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; margin-bottom: 6px; display: block; }
        .modal-input { width: 100%; padding: 12px 14px; background: rgba(250,246,238,0.04); border: 1px solid rgba(201,138,20,0.15); color: var(--cream); font-family: 'Jost', sans-serif; font-size: 14px; outline: none; }
        .modal-textarea { width: 100%; padding: 12px 14px; background: rgba(250,246,238,0.04); border: 1px solid rgba(201,138,20,0.15); color: var(--cream); font-family: 'Jost', sans-serif; font-size: 13px; outline: none; height: 80px; resize: vertical; }
        .modal-btns { display: flex; gap: 12px; margin-top: 24px; }
        .btn-save { flex: 1; padding: 14px; background: var(--gold); color: var(--ink); font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; border: none; cursor: pointer; }
        .btn-cancel { flex: 1; padding: 14px; background: transparent; color: rgba(250,246,238,0.4); font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; border: 1px solid rgba(250,246,238,0.1); cursor: pointer; }
        .save-msg { color: #4caf7d; font-size: 12px; margin-top: 8px; }

        .empty { text-align: center; padding: 64px; color: rgba(250,246,238,0.2); font-size: 13px; }

        @media (max-width: 768px) {
          .admin-wrap { padding: 32px 20px; }
          .stats-grid { grid-template-columns: 1fr; }
          .tabs { flex-wrap: wrap; }
        }
      `}</style>

      <div className="admin-wrap">
        <div className="admin-header">
          <h1 className="admin-title">Nivora <em>Admin</em></h1>
          <span className="admin-badge">Staff Dashboard</span>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Revenue</div>
            <div className="stat-value">₹{totalRevenue.toLocaleString()}</div>
            <div className="stat-sub">From paid orders</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Orders</div>
            <div className="stat-value">{totalOrders}</div>
            <div className="stat-sub">{paidOrders} paid</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Products</div>
            <div className="stat-value">{products.length}</div>
            <div className="stat-sub">Active in catalog</div>
          </div>
        </div>

        <div className="tabs">
          {(["orders", "products", "analytics"] as const).map(t => (
            <button key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>

        {tab === "orders" && (
          <div className="table-wrap">
            {loading ? <div className="empty">Loading orders...</div> : orders.length === 0 ? (
              <div className="empty">No orders yet. Share your store link to get your first sale.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Amount</th>
                    <th>Payment ID</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td>{new Date(o.created_at).toLocaleDateString("en-IN")}</td>
                      <td style={{color: "var(--cream)", fontWeight: 500}}>{o.customer_name}</td>
                      <td>{o.email}</td>
                      <td>{o.phone}</td>
                      <td style={{color: "var(--gold)", fontFamily: "Cormorant Garamond, serif", fontSize: "18px", fontWeight: 700}}>₹{o.amount}</td>
                      <td style={{fontSize: "11px", color: "rgba(250,246,238,0.3)"}}>{o.payment_id?.slice(0, 16)}...</td>
                      <td>
                        <select className="status-select" value={o.status} onChange={e => updateOrderStatus(o.id, e.target.value)}>
                          <option value="paid">Paid</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === "products" && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>MRP</th>
                  <th>Description</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td style={{color: "var(--cream)", fontWeight: 500}}>{p.name}</td>
                    <td style={{color: "var(--gold)", fontFamily: "Cormorant Garamond, serif", fontSize: "18px", fontWeight: 700}}>₹{p.price}</td>
                    <td style={{color: "rgba(250,246,238,0.3)", textDecoration: "line-through"}}>₹{p.mrp}</td>
                    <td style={{maxWidth: "280px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{p.description}</td>
                    <td><button className="edit-btn" onClick={() => setEditingProduct(p)}>Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "analytics" && (
          <div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">Avg Order Value</div>
                <div className="stat-value">₹{paidOrders > 0 ? Math.round(totalRevenue / paidOrders) : 0}</div>
                <div className="stat-sub">Per paid order</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Conversion</div>
                <div className="stat-value">{totalOrders > 0 ? Math.round((paidOrders / totalOrders) * 100) : 0}%</div>
                <div className="stat-sub">Orders paid</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Catalog Size</div>
                <div className="stat-value">{products.length}</div>
                <div className="stat-sub">Spices listed</div>
              </div>
            </div>
            <div style={{marginTop: "32px", padding: "32px", background: "rgba(250,246,238,0.02)", border: "1px solid rgba(201,138,20,0.1)"}}>
              <p style={{color: "rgba(250,246,238,0.3)", fontSize: "13px", lineHeight: "1.9"}}>
                More analytics coming soon — daily revenue chart, top selling products, customer locations, repeat buyers. As orders come in the data will populate here automatically.
              </p>
            </div>
          </div>
        )}
      </div>

      {editingProduct && (
        <div className="modal-overlay" onClick={() => setEditingProduct(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Edit Product</div>
            <div className="modal-field">
              <label className="modal-label">Product Name</label>
              <input className="modal-input" value={editingProduct.name} disabled style={{opacity: 0.5}} />
            </div>
            <div className="modal-field">
              <label className="modal-label">Price (₹)</label>
              <input className="modal-input" type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} />
            </div>
            <div className="modal-field">
              <label className="modal-label">MRP (₹)</label>
              <input className="modal-input" type="number" value={editingProduct.mrp} onChange={e => setEditingProduct({...editingProduct, mrp: Number(e.target.value)})} />
            </div>
            <div className="modal-field">
              <label className="modal-label">Description</label>
              <textarea className="modal-textarea" value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} />
            </div>
            <div className="modal-btns">
              <button className="btn-save" onClick={saveProduct}>Save Changes</button>
              <button className="btn-cancel" onClick={() => setEditingProduct(null)}>Cancel</button>
            </div>
            {saveMsg && <p className="save-msg">✓ {saveMsg}</p>}
          </div>
        </div>
      )}
    </>
  );
}