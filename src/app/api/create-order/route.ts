import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { amount, customer, items, payment_id } = body;

  const Razorpay = (await import("razorpay")).default;

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  // If payment_id exists — payment is done, save order to Supabase
  if (payment_id) {
    const { error } = await supabase.from("orders").insert([
      {
        customer_name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: `${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}`,
        amount: amount,
        payment_id: payment_id,
        status: "paid",
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Send order confirmation email
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Nivora Organics <hello@nivoraorganics.com>",
        to: customer.email,
        subject: "✅ Order Confirmed — Nivora Organics",
        html: `
          <div style="font-family: Arial, sans-serif; background:#FAF6EE; padding:40px;">
            <div style="max-width:600px;margin:auto;background:white;border-radius:12px;padding:40px;">
              <h1 style="color:#0E1410;">Order Confirmed ✅</h1>
              <p style="color:#555;">Hi ${customer.name}, your order has been placed successfully.</p>
              <div style="background:#0E1410;padding:20px;margin:20px 0;border-left:3px solid #C98A14;">
                <p style="color:#FAF6EE;margin:0;">Amount Paid: <strong style="color:#C98A14;">₹${amount}</strong></p>
                <p style="color:#FAF6EE;margin:8px 0 0;">Payment ID: ${payment_id}</p>
              </div>
              <p style="color:#555;">We will dispatch your spices within 2-3 business days.</p>
              <p style="color:#999;font-size:13px;">Nivora Organics — Proven Pure.</p>
            </div>
          </div>
        `,
      }),
    });

    return NextResponse.json({ success: true });
  }

  // Create Razorpay order
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });

  return NextResponse.json(order);
}