import { NextResponse } from 'next/server';
import { supabase, Booking } from '@/lib/supabase';
import { sendBookingAcceptedToClient, sendBookingDeclinedToClient } from '@/lib/resend';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = params.id;
    const body = await request.json();
    const { status, decline_reason } = body;

    if (!['accepted', 'declined', 'cancelled', 'completed'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });
    }

    let updatedBooking: Booking | null = null;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
      const { data, error } = await supabase
        .from('bookings')
        .update({
          status,
          decline_reason: decline_reason || null,
        })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) throw error;
      updatedBooking = data as Booking;
    }

    // Trigger emails via Resend
    if (updatedBooking) {
      try {
        if (status === 'accepted') {
          await sendBookingAcceptedToClient(updatedBooking);
        } else if (status === 'declined') {
          await sendBookingDeclinedToClient(updatedBooking, decline_reason);
        }
      } catch (emailErr) {
        console.error('Resend status update error:', emailErr);
      }
    }

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (err: any) {
    console.error('Update booking error:', err);
    return NextResponse.json({ error: err.message || 'Error updating booking' }, { status: 500 });
  }
}
