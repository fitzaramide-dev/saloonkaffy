import { NextResponse } from 'next/server';
import { supabase, KidsConsultation } from '@/lib/supabase';
import { sendKidsConsultationAlert } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { parent_name, parent_email, parent_phone, child_age, desired_style } = body;

    if (!parent_name || !parent_phone || !child_age) {
      return NextResponse.json({ error: 'Please provide name, phone number, and child age.' }, { status: 400 });
    }

    const newConsultation: Partial<KidsConsultation> = {
      parent_name,
      parent_email: parent_email || '',
      parent_phone,
      child_age,
      desired_style: desired_style || '',
      status: 'needs_call',
    };

    let savedConsultation = newConsultation as KidsConsultation;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
      const { data, error } = await supabase.from('kids_consultations').insert([newConsultation]).select().single();
      if (error) console.error('Supabase kids insert error:', error);
      else if (data) savedConsultation = data as KidsConsultation;
    } else {
      savedConsultation.id = 'kids_' + Math.random().toString(36).substring(2, 9);
      savedConsultation.created_at = new Date().toISOString();
    }

    // Trigger Resend email to Kaffy
    try {
      await sendKidsConsultationAlert(savedConsultation);
    } catch (err) {
      console.error('Resend consultation email error:', err);
    }

    return NextResponse.json({ success: true, consultation: savedConsultation }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error creating consultation' }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
      const { data, error } = await supabase.from('kids_consultations').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return NextResponse.json({ consultations: data || [] });
    }
    return NextResponse.json({ consultations: [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error fetching consultations' }, { status: 500 });
  }
}
