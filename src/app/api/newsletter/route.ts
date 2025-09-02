import { NextResponse } from 'next/server';

// Optional: set in .env.local
// MAILCHIMP_API_KEY=xxxx-usX
// MAILCHIMP_AUDIENCE_ID=xxxxxxxxxx
// MAILCHIMP_DC=usX   (the “usX” part in your API key)
const MC_KEY = process.env.MAILCHIMP_API_KEY;
const MC_LIST = process.env.MAILCHIMP_AUDIENCE_ID;
const MC_DC = process.env.MAILCHIMP_DC; // e.g., "us21"

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
    }

    // If Mailchimp envs are not set, just succeed (stub).
    if (!MC_KEY || !MC_LIST || !MC_DC) {
      return NextResponse.json({ message: 'Subscribed (dev mode).' }, { status: 200 });
    }

    // Mailchimp subscribe
    const mcUrl = `https://${MC_DC}.api.mailchimp.com/3.0/lists/${MC_LIST}/members`;
    const res = await fetch(mcUrl, {
      method: 'POST',
      headers: {
        'Authorization': `apikey ${MC_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed', // use 'pending' for double opt-in
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: err?.detail || 'Failed to subscribe.' },
        { status: res.status }
      );
    }

    return NextResponse.json({ message: 'Subscribed! Check your inbox.' }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
