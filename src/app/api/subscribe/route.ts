import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  try {

    // 1️⃣ Send notification email to you
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Nivora <onboarding@resend.dev>",
        to: "vishnunair@nivoraorganics.com",
        subject: "🌿 New Nivora Waitlist Signup",
        html: `
          <div style="font-family:sans-serif;padding:24px;background:#FAF6EE;">
            <h2 style="color:#0E1410;">New Waitlist Signup</h2>
            <p style="color:#4a4438;">Someone just joined the Nivora Organics waitlist.</p>
            <div style="background:#0E1410;padding:16px;border-left:3px solid #C98A14;margin:16px 0;">
              <p style="color:#FAF6EE;margin:0;font-size:18px;"><strong>${email}</strong></p>
            </div>
            <p style="color:#888;font-size:12px;">Nivora Organics • Proven Pure.</p>
          </div>
        `,
      }),
    });

    // 2️⃣ Send welcome email to subscriber
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Nivora Organics <onboarding@resend.dev>",
        to: email,
        subject: "Welcome to the Nivora Early Access List 🌿",
        html: `
          <div style="font-family:sans-serif;padding:24px;background:#FAF6EE;">
            <h2 style="color:#0E1410;">Welcome to Nivora 🌿</h2>
            <p style="color:#4a4438;">
              Thank you for joining the Nivora Organics early access list.
            </p>
            <p style="color:#4a4438;">
              We are building something special — premium Kerala turmeric sourced directly from farmers.
            </p>
            <p style="color:#4a4438;">
              You'll be the first to know when we launch.
            </p>
            <br/>
            <p style="color:#888;font-size:12px;">— Nivora Organics • Proven Pure.</p>
          </div>
        `,
      }),
    });

    // 3️⃣ Save email to Google Sheet
    await fetch(
      "https://script.google.com/macros/s/AKfycbxllRk-zHtPTGjAg9i8a9KcDNda6jVQen_JUh1u1TWawJ9tke3j0YlvsAYlExIg9BMK/exec",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          source: "website",
        }),
      }
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ error: "Failed to process signup" }, { status: 500 });
  }
}