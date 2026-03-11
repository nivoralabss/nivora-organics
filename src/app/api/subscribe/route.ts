import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  try {

    // 1️⃣ Notification email (to you)
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
        html: `<p>New subscriber: <strong>${email}</strong></p>`
      }),
    });

    // 2️⃣ Welcome email (to user)
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Nivora <onboarding@resend.dev>",
        to: email,
        subject: "Welcome to Nivora Early Access 🌿",
        html: `
        <div style="font-family:sans-serif">
          <h2>Welcome to Nivora 🌿</h2>
          <p>Thanks for joining our early access list.</p>
          <p>You will be the first to know when our premium Kerala turmeric launches.</p>
          <br/>
          <p>— Nivora Organics</p>
        </div>
        `,
      }),
    });

    // 3️⃣ Save to Google Sheet
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
    console.error(error);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}