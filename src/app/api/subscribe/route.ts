import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  try {

    /* ADMIN EMAIL (notification) */

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
        <div style="font-family:Arial;padding:20px">
          <h2>New Waitlist Signup</h2>
          <p><strong>${email}</strong> joined the waitlist.</p>
        </div>
        `,
      }),
    });


    /* USER WELCOME EMAIL */

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Nivora Organics <hello@nivoraorganics.com>",
        to: email,
        subject: "🌿 Welcome to Nivora Organics",
        html: `
<div style="font-family: Arial, sans-serif; background:#F6F8F5; padding:40px;">
  
  <div style="max-width:600px;margin:auto;background:white;border-radius:12px;padding:40px;text-align:center">

    <img src="https://www.nivoraorganics.com/logo.png" width="140" style="margin-bottom:20px"/>

    <h1 style="color:#0F3E2A;margin-bottom:10px">
      Welcome to Nivora Organics 🌿
    </h1>

    <p style="font-size:16px;color:#555;line-height:1.6">
      Thank you for joining our early access list.
      <br/><br/>
      We are building something special — spices that are
      <strong>pure, traceable, and proven.</strong>
    </p>

    <p style="font-size:16px;color:#555">
      You'll be among the first to experience Nivora.
    </p>

    <a href="https://www.nivoraorganics.com"
       style="
       display:inline-block;
       margin-top:25px;
       background:#0F3E2A;
       color:white;
       padding:14px 26px;
       border-radius:8px;
       text-decoration:none;
       font-weight:bold;
       ">
       Visit Nivora
    </a>

    <p style="margin-top:35px;color:#999;font-size:13px">
      Nivora Organics — Proven Pure
    </p>

  </div>

</div>
        `,
      }),
    });


    return NextResponse.json({ success: true });

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );

  }
}