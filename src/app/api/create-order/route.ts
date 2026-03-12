import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { amount } = await req.json();

  const Razorpay = (await import("razorpay")).default;
  
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });

  return NextResponse.json(order);
}