'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Props = { style_2?: boolean };

const NewsletterBanner: React.FC<Props> = ({ style_2 = false }) => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setMessage('Please enter a valid email address.');
      setState('error');
      return;
    }
    try {
      setState('loading');
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Subscription failed.');
      setState('success');
      setMessage(data?.message || 'You’re subscribed! Please check your inbox.');
      setEmail('');
    } catch (err: any) {
      setState('error');
      setMessage(err?.message || 'Something went wrong. Try again.');
    }
  };

  return (
    <div className="newsletter-banner">
      <div className="container">
        <div className={`main-wrapper ${style_2 ? '' : 'top-border'} bottom-border`}>
          <div className="row">
            <div className="col-lg-6">
              <h2 className={`${style_2 ? '' : 'text-dark'} fw-bold`}>Need insurance insights?</h2>
              <p className="text-lg md-pb-20">Subscribe for market tips, policy updates & smart savings.</p>
            </div>

            <div className="col-lg-6">
              <form onSubmit={onSubmit} className="m-auto ms-lg-auto" noValidate>
                <div className="d-flex align-items-center justify-content-between">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email address"
                    required
                  />
                  <button
                    className="rounded-circle tran3s"
                    type="submit"
                    disabled={state === 'loading'}
                    aria-label="Subscribe"
                  >
                    {state === 'loading' ? <i className="bi bi-hourglass-split"></i> : <i className="bi bi-arrow-right"></i>}
                  </button>
                </div>

                {/* feedback */}
                {state === 'success' && (
                  <p className="m0 pt-3 text-success">{message}</p>
                )}
                {state === 'error' && (
                  <p className="m0 pt-3 text-danger">{message}</p>
                )}

                <p className="text-center text-lg-end m0 pt-5">
                  Already subscribed?{' '}
                  <Link href="/unsubscribe" className={`${style_2 ? '' : 'text-dark'} fw-500`}>
                    Unsubscribe
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterBanner;
