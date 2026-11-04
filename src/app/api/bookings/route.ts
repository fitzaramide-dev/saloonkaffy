import { NextResponse } from 'next/server';
import { supabase, Booking } from '@/lib/supabase';
import { sendNewBookingAlertToKaffy } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      client_name,
      client_email,
      client_phone,
      service_id,
      service_title,
      price,
      payment_choice,
      hair_option,
      addons,
      appointment_date,
      start_time,
      client_clerk_id,
      notes,
    } = body;

    if (!client_name || !client_email || !client_phone || !service_title || !appointment_date || !start_time) {
      return NextResponse.json({ error: 'Missing required booking fields.' }, { status: 400 });
    }

    // 24-Hour Advance Notice Validation Rule
    const appointmentDateTime = new Date(`${appointment_date}T${start_time}`);
    const minAdvanceTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

    if (appointmentDateTime < minAdvanceTime) {
      return NextResponse.json(
        { error: 'Appointments must be booked at least 24 hours in advance. For emergency same-day appointments, please message Kaffy on WhatsApp.' },
        { status: 400 }
      );
    }

    // Calculate 50% Deposit
    const numericPrice = Number(price) || 50;
    const depositAmount = numericPrice * 0.5;

    // Estimate End Time (default 4 hours for braiding + 30 min buffer)
    const [hours, minutes] = start_time.split(':').map(Number);
    const endHour = (hours + 4) % 24;
    const end_time = `${endHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    const newBooking: Partial<Booking> = {
      client_name,
      client_email,
      client_phone,
      client_clerk_id: client_clerk_id || null,
      service_id: service_id || 'custom-style',
      service_title,
      price: numericPrice,
      deposit_amount: depositAmount,
      payment_choice: payment_choice || 'full_at_salon',
      hair_option: hair_option || 'byoh',
      addons: addons || [],
      appointment_date,
      start_time,
      end_time,
      status: 'pending',
      notes: notes || '',
    };

    // Save to Supabase (fallback to mock if Supabase credentials are pending)
    let savedBooking = newBooking as Booking;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
      const { data, error } = await supabase.from('bookings').insert([newBooking]).select().single();
      if (error) {
        console.error('Supabase insert error:', error);
      } else if (data) {
        savedBooking = data as Booking;
      }
    } else {
      savedBooking.id = 'booking_' + Math.random().toString(36).substring(2, 9);
      savedBooking.created_at = new Date().toISOString();
    }

    // Trigger Resend notification email to Kaffy
    try {
      await sendNewBookingAlertToKaffy(savedBooking);
    } catch (emailErr) {
      console.error('Resend notification error:', emailErr);
    }

    return NextResponse.json({ success: true, booking: savedBooking }, { status: 201 });
  } catch (err: any) {
    console.error('Booking API error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clerkId = searchParams.get('clerk_id');
    const status = searchParams.get('status');

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
      let query = supabase.from('bookings').select('*').order('appointment_date', { ascending: true });

      if (clerkId) {
        query = query.eq('client_clerk_id', clerkId);
      }
      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return NextResponse.json({ bookings: data || [] });
    }

    return NextResponse.json({ bookings: [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error fetching bookings' }, { status: 500 });
  }
}
