'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser, UserButton } from '@clerk/nextjs';
import { Booking } from '@/lib/supabase';
import { Sparkles, Calendar, Clock, MapPin, AlertCircle, XCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function ClientPortalPage() {
  const { user, isLoaded } = useUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      fetchBookings();
    }
  }, [isLoaded, user]);

  async function fetchBookings() {
    setLoading(true);
    try {
      const res = await fetch(`/api/bookings?clerk_id=${user?.id}`);
      const data = await res.json();
      if (data.bookings) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel(booking: Booking) {
    const appointmentDate = new Date(`${booking.appointment_date}T${booking.start_time}`);
    const now = new Date();
    const hoursDifference = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursDifference < 24) {
      alert('Appointments must be cancelled at least 24 hours in advance. Please message Kaffy directly on WhatsApp (+356 7756 7349) for late notice cancellations.');
      return;
    }

    if (!confirm('Are you sure you want to cancel this hair appointment?')) return;

    setCancellingId(booking.id);
    try {
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' }),
      });
      if (res.ok) {
        alert('Your appointment has been cancelled. You are welcome to book another slot anytime!');
        fetchBookings();
      }
    } catch (err) {
      console.error('Cancellation error:', err);
    } finally {
      setCancellingId(null);
    }
  }

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-glam-page flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-glam-pink"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-glam-page text-glam-plum">
      {/* Top Header */}
      <header className="sticky top-0 z-40 glass-nav border-b border-glam-border">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="font-serif tracking-[0.15em] text-2xl font-bold text-glam-plum">KAFFY SALOON</span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-glam-pink font-bold -mt-1">VIP Client Portal</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/#services" className="px-4 py-2 rounded-full pink-gradient-btn text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              + Book New Style
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* Welcome Banner */}
        <div className="p-8 rounded-3xl bg-white border-2 border-glam-border pop-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-glam-pink font-extrabold flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4" /> Welcome to Your Penthouse Portal
            </div>
            <h1 className="font-serif text-3xl font-bold text-glam-plum">
              Hello, {user?.firstName || 'Gorgeous'}!
            </h1>
            <p className="text-glam-mocha text-sm mt-1">
              Track your appointments, view salon preparation instructions, or reschedule your visits.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-glam-page border border-glam-border text-center sm:text-right shrink-0">
            <span className="text-xs text-glam-muted font-bold block">Need Help Fast?</span>
            <a href="https://wa.me/35677567349" target="_blank" className="text-xs font-extrabold text-glam-pinkDark hover:text-glam-pink">
              WhatsApp Kaffy (+356 7756 7349) &rarr;
            </a>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-glam-plum flex items-center gap-2">
            <Calendar className="w-6 h-6 text-glam-pink" /> Your Hair Appointments
          </h2>

          {bookings.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white border-2 border-glam-border text-center space-y-4 pop-card">
              <div className="w-16 h-16 rounded-full bg-glam-page text-glam-pink flex items-center justify-center mx-auto">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-glam-plum">No Appointments Yet</h3>
              <p className="text-sm text-glam-mocha max-w-sm mx-auto">
                Ready for fresh knotless braids, flawless weaves, or sleek Ghana weaving? Book your penthouse session today!
              </p>
              <Link href="/#services" className="inline-block px-8 py-3 rounded-full pink-gradient-btn text-white text-xs font-bold uppercase tracking-wider shadow-md">
                Browse Hairstyles & Book
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((booking) => {
                const isAccepted = booking.status === 'accepted';
                const isPending = booking.status === 'pending';
                const isDeclined = booking.status === 'declined';
                const isCancelled = booking.status === 'cancelled';

                return (
                  <div key={booking.id} className="p-6 rounded-3xl bg-white border-2 border-glam-border pop-card space-y-4 relative overflow-hidden">
                    {/* Status Pill */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest font-extrabold text-glam-muted">
                        {booking.service_title}
                      </span>
                      {isPending && (
                        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> Pending Kaffy's Approval
                        </span>
                      )}
                      {isAccepted && (
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                        </span>
                      )}
                      {isDeclined && (
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Unavailable
                        </span>
                      )}
                      {isCancelled && (
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold flex items-center gap-1">
                          Cancelled
                        </span>
                      )}
                    </div>

                    {/* Date & Time */}
                    <div className="p-4 rounded-2xl bg-glam-page border border-glam-border space-y-1">
                      <div className="font-bold text-glam-plum flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-glam-pink" />
                        {new Date(booking.appointment_date).toLocaleDateString('en-GB', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="text-xs text-glam-mocha flex items-center gap-2">
                        <Clock className="w-4 h-4 text-glam-pink" /> Starts at {booking.start_time}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="text-xs text-glam-mocha space-y-1.5 pt-1">
                      <div>
                        <strong>Hair Option:</strong>{' '}
                        {booking.hair_option === 'byoh' ? 'Bringing Own Packs (BYOH)' : 'Buying In-Studio'}
                      </div>
                      <div>
                        <strong>Payment Choice:</strong>{' '}
                        {booking.payment_choice === 'deposit_50'
                          ? `50% Deposit (€${booking.deposit_amount.toFixed(2)}) requested`
                          : `Pay in full at salon (€${booking.price.toFixed(2)})`}
                      </div>
                      {booking.addons && booking.addons.length > 0 && (
                        <div>
                          <strong>Add-Ons:</strong> {booking.addons.join(', ')}
                        </div>
                      )}
                    </div>

                    {/* Address & Prep (Only for Confirmed) */}
                    {isAccepted && (
                      <div className="p-3.5 rounded-2xl bg-glam-section border border-glam-border text-xs space-y-1">
                        <div className="font-bold text-glam-plum flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-glam-pink" /> Penthouse Location:
                        </div>
                        <p className="text-glam-mocha">
                          40, Anfield, Flat 2, Triq Brunzar, Santa Venera, Malta.
                        </p>
                        <p className="text-[11px] text-glam-pinkDark font-semibold pt-1">
                          ✨ Please arrive with hair washed, detangled & blown out straight.
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {!isCancelled && !isDeclined && (
                      <div className="pt-2 flex items-center justify-between border-t border-glam-border">
                        <button
                          onClick={() => handleCancel(booking)}
                          disabled={cancellingId === booking.id}
                          className="text-xs text-red-600 hover:text-red-800 font-bold flex items-center gap-1 transition-colors disabled:opacity-50"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          {cancellingId === booking.id ? 'Cancelling...' : 'Cancel Appointment (24h Notice)'}
                        </button>
                        <a
                          href={`https://wa.me/35677567349?text=Hi%20Kaffy,%20I'd%20like%20to%20reschedule%20my%20appointment%20for%20${booking.service_title}!`}
                          target="_blank"
                          className="text-xs text-glam-pinkDark hover:text-glam-pink font-bold flex items-center gap-1"
                        >
                          <RefreshCw className="w-3.5 h-3.5" /> Reschedule
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
