'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser, UserButton } from '@clerk/nextjs';
import { Booking, KidsConsultation } from '@/lib/supabase';
import { Sparkles, Calendar, Loader2, Clock, Phone, Mail, CheckCircle2, XCircle, Coffee, Baby, DollarSign, AlertCircle, Search, Share2, Copy, ExternalLink, MessageCircle } from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<'pending' | 'schedule' | 'kids'>('pending');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [consultations, setConsultations] = useState<KidsConsultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  function copyShareLink() {
    navigator.clipboard.writeText('https://saloonkaffy.vercel.app/#services');
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  }

  useEffect(() => {
    if (isLoaded) {
      loadDashboardData();
    }
  }, [isLoaded]);

  async function loadDashboardData() {
    setLoading(true);
    try {
      const [bookingsRes, consultationsRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/consultations'),
      ]);
      const bookingsData = await bookingsRes.json();
      const consultationsData = await consultationsRes.json();

      if (bookingsData.bookings) setBookings(bookingsData.bookings);
      if (consultationsData.consultations) setConsultations(consultationsData.consultations);
    } catch (err) {
      console.error('Error loading dashboard:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusUpdate(bookingId: string, status: 'accepted' | 'declined' | 'completed') {
    // [PROTECTION 1] DOUBLE-SUBMIT LOCK GUARD
    if (actionInProgress === bookingId) return;

    let reason = '';
    if (status === 'declined') {
      const input = prompt('Optional message/reason for declining (will be emailed to client):');
      if (input === null) return; // User cancelled prompt
      reason = input.trim();
    }

    // LOCK: Disable button & show transmitting state
    setActionInProgress(bookingId);

    // [PROTECTION 3] TRY / CATCH ERROR RESILIENCE
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, decline_reason: reason }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Server error updating booking status.');
      }

      // [PROTECTION 4] SUCCESS CONFIRMATION: Refresh state
      loadDashboardData();
    } catch (err: any) {
      console.error('Error updating status:', err);
      alert(err?.message || 'Database update failed. Please check network connection.');
    } finally {
      setActionInProgress(null);
    }
  }

  const pendingBookings = bookings.filter((b) => b.status === 'pending');
  const confirmedBookings = bookings.filter((b) => b.status === 'accepted');
  const kidsNeedCall = consultations.filter((c) => c.status === 'needs_call');

  return (
    <div className="min-h-screen bg-glam-page text-glam-plum">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-nav border-b border-glam-border">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="font-serif tracking-[0.15em] text-2xl font-bold text-glam-plum">KAFFY SALOON</span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-glam-pink font-extrabold -mt-1">Owner Admin Studio</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="text-xs font-bold text-glam-pinkDark hover:text-glam-pink">
              View Live Website &rarr;
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Top Summary Banner */}
        <div className="p-8 rounded-3xl bg-white border-2 border-glam-border pop-card">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-glam-pink font-extrabold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4" /> Kaffy's Penthouse Salon Control
              </div>
              <h1 className="font-serif text-3xl font-bold text-glam-plum">
                Salon Dashboard
              </h1>
              <p className="text-glam-mocha text-sm mt-1">
                Approve appointment requests, manage kids hair calls, and view your schedule with automatic 30-min break buffers.
              </p>
            </div>

            {/* Quick Stat Badges */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('pending')}
                className={`p-4 rounded-2xl text-center transition-all cursor-pointer ${
                  activeTab === 'pending'
                    ? 'bg-amber-100 border-2 border-amber-400 shadow-md scale-105'
                    : 'bg-amber-50 border border-amber-200 hover:scale-102'
                }`}
                title="Click to view Pending Requests"
              >
                <span className="block text-2xl font-extrabold text-amber-700">{pendingBookings.length}</span>
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Pending &rarr;</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('schedule')}
                className={`p-4 rounded-2xl text-center transition-all cursor-pointer ${
                  activeTab === 'schedule'
                    ? 'bg-green-100 border-2 border-green-500 shadow-md scale-105'
                    : 'bg-green-50 border border-green-200 hover:scale-102'
                }`}
                title="Click to view Schedule & Buffers"
              >
                <span className="block text-2xl font-extrabold text-green-700">{confirmedBookings.length}</span>
                <span className="text-[11px] font-bold text-green-800 uppercase tracking-wider">Confirmed &rarr;</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('kids')}
                className={`p-4 rounded-2xl text-center transition-all cursor-pointer ${
                  activeTab === 'kids'
                    ? 'bg-pink-100 border-2 border-glam-pink shadow-md scale-105'
                    : 'bg-pink-50 border border-pink-200 hover:scale-102'
                }`}
                title="Click to view Kids Consultations"
              >
                <span className="block text-2xl font-extrabold text-glam-pinkDark">{kidsNeedCall.length}</span>
                <span className="text-[11px] font-bold text-glam-plum uppercase tracking-wider">Kids to Call &rarr;</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="pt-6 mt-6 border-t border-glam-border space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-glam-muted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search appointments by client name, phone, email, or hairstyle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-glam-page border border-glam-border text-xs sm:text-sm font-medium text-glam-plum focus:outline-none focus:border-glam-pink shadow-inner"
              />
            </div>

            <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'pending'
                  ? 'pink-gradient-btn text-white shadow-md'
                  : 'bg-glam-page text-glam-mocha hover:text-glam-pinkDark'
              }`}
            >
              <AlertCircle className="w-4 h-4" /> Pending Requests ({pendingBookings.length})
            </button>

            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'schedule'
                  ? 'pink-gradient-btn text-white shadow-md'
                  : 'bg-glam-page text-glam-mocha hover:text-glam-pinkDark'
              }`}
            >
              <Calendar className="w-4 h-4" /> Schedule & Rest Buffers ({confirmedBookings.length})
            </button>

            <button
              onClick={() => setActiveTab('kids')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'kids'
                  ? 'pink-gradient-btn text-white shadow-md'
                  : 'bg-glam-page text-glam-mocha hover:text-glam-pinkDark'
              }`}
            >
              <Baby className="w-4 h-4" /> Kids Consultations ({kidsNeedCall.length})
            </button>
          </div>
        </div>
      </div>

        {/* TAB 1: PENDING REQUESTS (ACCEPT / DECLINE) */}
        {activeTab === 'pending' && (
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-glam-plum flex items-center gap-2">
              <Clock className="w-6 h-6 text-amber-500" /> Pending Requests Needing Approval
            </h2>

            {pendingBookings.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white border-2 border-glam-border text-center space-y-2 pop-card">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-glam-plum">All Caught Up!</h3>
                <p className="text-sm text-glam-mocha">No pending booking requests waiting for review right now.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingBookings.map((b) => (
                  <div key={b.id} className="p-6 rounded-3xl bg-white border-2 border-glam-border pop-card space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs uppercase tracking-widest text-glam-pink font-extrabold">{b.service_title}</span>
                        <h3 className="font-serif text-xl font-bold text-glam-plum">{b.client_name}</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-glam-muted font-bold block">
                          {b.payment_choice === 'deposit_50' ? '50% Deposit' : 'Pay at Salon'}
                        </span>
                        <span className="text-xl font-extrabold text-glam-pinkDark">
                          &euro;{b.price}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-glam-page border border-glam-border space-y-1 text-xs">
                      <div className="font-bold text-glam-plum flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-glam-pink" /> {b.appointment_date} at {b.start_time}
                      </div>
                      <div className="flex items-center gap-2 text-glam-mocha">
                        <Phone className="w-4 h-4 text-glam-pink" /> <a href={`tel:${b.client_phone}`} className="hover:underline">{b.client_phone}</a>
                      </div>
                      <div className="flex items-center gap-2 text-glam-mocha">
                        <Mail className="w-4 h-4 text-glam-pink" /> {b.client_email}
                      </div>
                      <div className="pt-1 text-glam-mocha">
                        <strong>Extensions:</strong> {b.hair_option === 'byoh' ? 'Bringing Own Packs' : 'Buying In-Studio'}
                      </div>
                      {b.addons && b.addons.length > 0 && (
                        <div>
                          <strong>Add-Ons:</strong> {b.addons.join(', ')}
                        </div>
                      )}
                    </div>

                    {/* Accept and Decline Action Buttons */}
                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={() => handleStatusUpdate(b.id, 'accepted')}
                        disabled={actionInProgress === b.id}
                        className="flex-1 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {actionInProgress === b.id ? 'Accepting...' : 'Accept Appointment'}
                      </button>

                      <button
                        onClick={() => handleStatusUpdate(b.id, 'declined')}
                        disabled={actionInProgress === b.id}
                        className="py-3 px-6 rounded-full border-2 border-red-300 hover:bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                      >
                        <XCircle className="w-4 h-4" /> Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SCHEDULE & 30-MIN REST BUFFERS */}
        {activeTab === 'schedule' && (
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-glam-plum flex items-center gap-2">
              <Calendar className="w-6 h-6 text-green-600" /> Confirmed Schedule & Break Buffers
            </h2>

            {confirmedBookings.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white border-2 border-glam-border text-center space-y-2 pop-card">
                <Calendar className="w-12 h-12 text-glam-pink mx-auto" />
                <h3 className="font-serif text-xl font-bold text-glam-plum">No Confirmed Bookings Yet</h3>
                <p className="text-sm text-glam-mocha">Approved client bookings will show up here along with your 30-minute rest buffers.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {confirmedBookings.map((b) => (
                  <div key={b.id} className="p-6 rounded-3xl bg-white border-2 border-glam-border pop-card space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold mb-2">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed Appointment
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-glam-plum">
                          {b.client_name} &bull; {b.service_title}
                        </h3>
                        <p className="text-xs text-glam-mocha mt-1">
                          Phone: <a href={`tel:${b.client_phone}`} className="text-glam-pinkDark font-bold">{b.client_phone}</a> &bull; Email: {b.client_email}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-glam-muted font-bold block">Total Price</span>
                        <span className="text-2xl font-extrabold text-glam-pinkDark">&euro;{b.price}</span>
                        <div className="text-[11px] text-glam-muted">
                          {b.payment_choice === 'deposit_50' ? `(€${b.deposit_amount} Deposit)` : '(Full at salon)'}
                        </div>
                      </div>
                    </div>

                    {/* Timeline & Automatic 30-min break visualization */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-2xl bg-glam-page border border-glam-border space-y-1">
                        <span className="text-[11px] font-bold text-glam-muted uppercase tracking-wider block">Hair Session Time</span>
                        <div className="font-extrabold text-glam-plum text-sm flex items-center gap-2">
                          <Clock className="w-4 h-4 text-glam-pink" /> {b.appointment_date} &bull; {b.start_time} – {b.end_time}
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                        <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block flex items-center gap-1">
                          <Coffee className="w-3.5 h-3.5" /> Kaffy's 30-Min Rest Buffer
                        </span>
                        <div className="font-extrabold text-amber-900 text-sm">
                          Reserved break time until next slot opens
                        </div>
                      </div>
                    </div>

                    {/* Payment Finish Button */}
                    <div className="pt-2 flex items-center justify-between border-t border-glam-border">
                      <a
                        href={`https://wa.me/${b.client_phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(b.client_name)},%20this%20is%20Kaffy%20from%20Kaffy%20Saloon!`}
                        target="_blank"
                        className="text-xs font-bold text-glam-pinkDark hover:text-glam-pink flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" /> WhatsApp Client
                      </a>

                      <button
                        onClick={() => handleStatusUpdate(b.id, 'completed')}
                        className="px-5 py-2 rounded-full pink-gradient-btn text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                      >
                        <DollarSign className="w-3.5 h-3.5" /> Mark Styling Completed & Paid
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: KIDS CONSULTATION QUEUE */}
        {activeTab === 'kids' && (
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-glam-plum flex items-center gap-2">
              <Baby className="w-6 h-6 text-glam-pink" /> Kids Hair Parent Inquiries
            </h2>

            {consultations.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white border-2 border-glam-border text-center space-y-2 pop-card">
                <Baby className="w-12 h-12 text-glam-pink mx-auto" />
                <h3 className="font-serif text-xl font-bold text-glam-plum">No Inquiries Waiting</h3>
                <p className="text-sm text-glam-mocha">When parents request a consultation call for their kids, they will appear right here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {consultations.map((c) => (
                  <div key={c.id} className="p-6 rounded-3xl bg-white border-2 border-glam-border pop-card space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs uppercase tracking-widest text-glam-pink font-extrabold">Parent Inquiry</span>
                        <h3 className="font-serif text-xl font-bold text-glam-plum">{c.parent_name}</h3>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-pink-100 text-glam-pinkDark text-xs font-bold">
                        Child: {c.child_age}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-glam-page border border-glam-border text-xs space-y-1">
                      <div><strong>Phone:</strong> <a href={`tel:${c.parent_phone}`} className="text-glam-pinkDark font-bold">{c.parent_phone}</a></div>
                      {c.parent_email && <div><strong>Email:</strong> {c.parent_email}</div>}
                      <div><strong>Desired Style:</strong> {c.desired_style || 'Not specified'}</div>
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <a
                        href={`tel:${c.parent_phone}`}
                        className="flex-1 py-2.5 rounded-full pink-gradient-btn text-white text-xs font-bold uppercase tracking-wider text-center shadow-md flex items-center justify-center gap-1.5"
                      >
                        <Phone className="w-4 h-4" /> Call Parent
                      </a>
                      <a
                        href={`https://wa.me/${c.parent_phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(c.parent_name)},%20this%20is%20Kaffy%20from%20Kaffy%20Saloon%20regarding%20your%20child's%20hair%20inquiry!`}
                        target="_blank"
                        className="flex-1 py-2.5 rounded-full border-2 border-glam-border hover:bg-glam-page text-glam-plum text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
