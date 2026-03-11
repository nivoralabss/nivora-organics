import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    // 1️⃣ Send notification email to you
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Nivora <hello@nivoraorganics.com>",
        to: "vishnunair@nivoraorganics.com",
        subject: "🌿 New Nivora Waitlist Signup",
        html: `
          <div style="font-family:sans-serif;padding:24px;background:#FAF6EE;">
            <h2 style="color:#0E1410;">New Waitlist Signup</h2>
            <p style="color:#444;">Someone just joined the Nivora Organics waitlist.</p>
            <div style="background:#0E1410;padding:16px;border-left:3px solid #C98A14;margin:16px 0;">
              <p style="color:#FAF6EE;font-size:18px;margin:0;">
                <strong>${email}</strong>
              </p>
            </div>
            <p style="color:#888;font-size:12px;">
              Nivora Organics • Proven Pure
            </p>
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
        from: "Nivora <hello@nivoraorganics.com>",
        to: email,
        subject: "Welcome to Nivora 🌿",
        html: `
          <div style="font-family:sans-serif;padding:24px;background:#FAF6EE;">
            <h2 style="color:#0E1410;">Welcome to Nivora</h2>
            <p style="color:#444;">
              You're officially on the waitlist for early access.
            </p>
            <p style="color:#444;">
              We're preparing something special — authentic spices sourced
              directly from trusted farms in Kerala.
            </p>
            <p style="color:#444;">
              We'll notify you as soon as we launch.
            </p>
            <br/>
            <strong style="color:#0E1410;">
              The Nivora Team
            </strong>
          </div>
        `,
      }),
    });

    // 3️⃣ Save to Google Sheets
    await fetch(
      "https://script.google.com/macros/s/AKfycbxllRk-zHtPTGjAg9i8a9KcDNda6jVQen_JUh1u1TWawJ9tke3j0YlvsAYlExIg9BMK/exec",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          source: "website",
        }),
      }
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}