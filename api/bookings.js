import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize Supabase and Resend using your secret keys
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests (sending data from the booking form)
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // 1. Gather all the detailed information coming from your lookbook booking form
    const {
      client_name,
      client_email,
      client_phone,
      service_title,
      price,
      appointment_date,
      start_time,
      end_time,
      hair_option
    } = req.body;

    // 2. Insert the data into your premium "public.bookings" table matches your exact SQL columns
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          client_name,
          client_email,
          client_phone,
          service_id: service_title.toLowerCase().replace(/\s+/g, '-'), // Auto-generates an ID like 'knotless-braids'
          service_title,
          price: parseFloat(price) || 0,
          deposit_amount: 0, // Defaulting to 0 for now since payments are done at the salon
          payment_choice: 'full_at_salon',
          hair_option: hair_option || 'byoh',
          appointment_date,
          start_time,
          end_time,
          status: 'pending'
        }
      ]);

    if (error) throw error;

    // 3. Send the automated email notification to you/your mom using Resend
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: client_email, // Sends a confirmation copy straight to the client
      subject: `💇‍♀️ Salon Booking Request Received: ${service_title}`,
      html: `
        <h3>Hi ${client_name}, your booking request has been received!</h3>
        <p>We are reviewing your request for your penthouse session in Santa Venera.</p>
        <hr />
        <p><strong>Hairstyle:</strong> ${service_title}</p>
        <p><strong>Price:</strong> €${price}</p>
        <p><strong>Date:</strong> ${appointment_date}</p>
        <p><strong>Time:</strong> ${start_time} - ${end_time}</p>
        <p><strong>Hair Option:</strong> ${hair_option === 'byoh' ? 'Bring Your Own Hair' : 'Buy In-Studio'}</p>
        <br />
        <p>We will contact you shortly at ${client_phone} to confirm your appointment!</p>
      `
    });

    // 4. Return success status code back to your website frontend
    return res.status(200).json({ success: true, message: 'Booking successfully logged and email dispatched!' });

  } catch (error) {
    // Catch any backend bugs and safely report them back
    return res.status(500).json({ success: false, error: error.message });
  }
}
