import { Resend } from 'resend';
import { Booking, KidsConsultation } from './supabase';

const resendApiKey = process.env.RESEND_API_KEY || '';
export const resend = new Resend(resendApiKey);

const SENDER = process.env.RESEND_FROM_EMAIL || 'Kaffy Saloon <onboarding@resend.dev>';
const ADMIN_EMAIL = process.env.SALON_ADMIN_EMAIL || 'fitzaramide@gmail.com';

const isResendConfigured = () => {
  const key = process.env.RESEND_API_KEY;
  return Boolean(key && !key.includes('your_resend_api_key') && key.startsWith('re_'));
};

/**
 * 1. Alert Kaffy when a new appointment is requested
 */
export async function sendNewBookingAlertToKaffy(booking: Booking) {
  if (!isResendConfigured()) {
    console.log('[Resend Mock] New booking alert to Kaffy:', booking);
    return;
  }

  const depositText = booking.payment_choice === 'deposit_50' 
    ? `50% Deposit (€${booking.deposit_amount.toFixed(2)}) requested` 
    : `Pay in full at salon (€${booking.price.toFixed(2)})`;

  const hairText = booking.hair_option === 'byoh' 
    ? 'Bringing Own Hair (BYOH)' 
    : 'Purchasing in-studio';

  const addonsText = booking.addons && booking.addons.length > 0 
    ? booking.addons.join(', ') 
    : 'None';

  return resend.emails.send({
    from: SENDER,
    to: ADMIN_EMAIL,
    subject: `🔔 New Booking Request: ${booking.client_name} - ${booking.service_title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #F8BBD0; border-radius: 16px; background-color: #FFF0F5;">
        <h2 style="color: #3B091E; font-size: 24px; margin-bottom: 8px;">New Booking Request for Kaffy Saloon!</h2>
        <p style="color: #5C2236; font-size: 14px;">A new appointment request needs your approval in the admin portal.</p>
        
        <div style="background-color: #FFFFFF; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #F8BBD0;">
          <p style="margin: 6px 0; color: #3B091E;"><strong>Client:</strong> ${booking.client_name}</p>
          <p style="margin: 6px 0; color: #3B091E;"><strong>Phone:</strong> <a href="tel:${booking.client_phone}" style="color: #E91E63;">${booking.client_phone}</a></p>
          <p style="margin: 6px 0; color: #3B091E;"><strong>Email:</strong> ${booking.client_email}</p>
          <p style="margin: 6px 0; color: #3B091E;"><strong>Hairstyle:</strong> ${booking.service_title}</p>
          <p style="margin: 6px 0; color: #3B091E;"><strong>Date & Time:</strong> ${booking.appointment_date} at ${booking.start_time}</p>
          <p style="margin: 6px 0; color: #3B091E;"><strong>Hair Extensions:</strong> ${hairText}</p>
          <p style="margin: 6px 0; color: #3B091E;"><strong>Add-Ons:</strong> ${addonsText}</p>
          <p style="margin: 6px 0; color: #3B091E;"><strong>Payment Option:</strong> ${depositText}</p>
        </div>

        <div style="text-align: center; margin-top: 24px;">
          <a href="https://saloonkaffy.vercel.app/admin" style="display: inline-block; background: #FF2A85; color: #FFFFFF; padding: 12px 28px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 14px;">Open Kaffy Dashboard to Accept / Decline</a>
        </div>
      </div>
    `,
  });
}

/**
 * 2. Send Confirmation Email to Client when Kaffy clicks Accept
 */
export async function sendBookingAcceptedToClient(booking: Booking) {
  if (!isResendConfigured()) {
    console.log('[Resend Mock] Booking accepted email to client:', booking.client_email);
    return;
  }

  return resend.emails.send({
    from: SENDER,
    to: booking.client_email,
    subject: `💖 Your Hair Appointment is CONFIRMED! — Kaffy Saloon`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #F8BBD0; border-radius: 16px; background-color: #FFF0F5;">
        <h2 style="color: #3B091E; font-size: 24px;">Yay, ${booking.client_name}! You're Confirmed! ✨</h2>
        <p style="color: #5C2236; font-size: 15px; line-height: 1.5;">Kaffy has accepted your appointment request. We can't wait to pamper your crown in our private penthouse studio.</p>

        <div style="background-color: #FFFFFF; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #F8BBD0;">
          <h3 style="color: #FF2A85; margin-top: 0;">Appointment Details</h3>
          <p style="margin: 6px 0; color: #3B091E;"><strong>Hairstyle:</strong> ${booking.service_title}</p>
          <p style="margin: 6px 0; color: #3B091E;"><strong>Date:</strong> ${booking.appointment_date}</p>
          <p style="margin: 6px 0; color: #3B091E;"><strong>Time:</strong> ${booking.start_time}</p>
          <p style="margin: 6px 0; color: #3B091E;"><strong>Studio Location:</strong> 40, Anfield, Flat 2, Triq Brunzar, Santa Venera, Malta</p>
        </div>

        <div style="background-color: #FCE4EC; padding: 16px; border-radius: 12px; margin: 20px 0;">
          <h4 style="color: #3B091E; margin-top: 0;">🌸 Hair Preparation Checklist</h4>
          <ul style="color: #5C2236; font-size: 13px; line-height: 1.6; padding-left: 20px; margin: 0;">
            <li>Please arrive with your hair thoroughly washed, detangled, and blown out straight (unless you selected wash & blow dry add-on).</li>
            <li>Free of heavy oils or greases so your parts are crisp and last longer!</li>
            <li>If you selected Bring Your Own Hair, don't forget your extension packs.</li>
          </ul>
        </div>

        <p style="color: #8E4B62; font-size: 13px; text-align: center;">Questions or running late? Call or WhatsApp Kaffy directly at <strong>+356 7756 7349</strong></p>
      </div>
    `,
  });
}

/**
 * 3. Send Decline Notice to Client
 */
export async function sendBookingDeclinedToClient(booking: Booking, reason?: string) {
  if (!isResendConfigured()) {
    console.log('[Resend Mock] Booking declined email to client:', booking.client_email);
    return;
  }

  return resend.emails.send({
    from: SENDER,
    to: booking.client_email,
    subject: `Kaffy Saloon — Appointment Update`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #F8BBD0; border-radius: 16px; background-color: #FFF0F5;">
        <h2 style="color: #3B091E;">Hi ${booking.client_name},</h2>
        <p style="color: #5C2236; font-size: 15px; line-height: 1.5;">Thank you for your appointment request. Unfortunately, Kaffy is fully booked or unavailable on <strong>${booking.appointment_date} at ${booking.start_time}</strong>.</p>
        ${reason ? `<p style="color: #8E4B62; font-size: 14px;"><strong>Note from Kaffy:</strong> ${reason}</p>` : ''}
        
        <p style="color: #5C2236; font-size: 14px;">We'd love to style your hair! Please choose another open slot on the website or message Kaffy directly on WhatsApp to coordinate an alternative time.</p>
        
        <div style="text-align: center; margin-top: 24px;">
          <a href="https://wa.me/35677567349?text=Hi%20Kaffy,%20I'd%20like%20to%20find%20another%20open%20slot%20for%20my%20hair%20appointment!" style="display: inline-block; background: #25D366; color: #FFFFFF; padding: 12px 28px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 14px;">Chat with Kaffy on WhatsApp</a>
        </div>
      </div>
    `,
  });
}

/**
 * 4. Alert Kaffy for a Kids Hair consultation request
 */
export async function sendKidsConsultationAlert(consultation: KidsConsultation) {
  if (!isResendConfigured()) {
    console.log('[Resend Mock] Kids consultation alert:', consultation);
    return;
  }

  return resend.emails.send({
    from: SENDER,
    to: ADMIN_EMAIL,
    subject: `👶 New Kids Hair Call Request: ${consultation.parent_name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #F8BBD0; border-radius: 16px; background-color: #FFF0F5;">
        <h2 style="color: #3B091E;">New Kids Hair Consultation Request!</h2>
        <p style="color: #5C2236;">A parent has requested a consultation call to discuss their child's hair.</p>
        
        <div style="background-color: #FFFFFF; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #F8BBD0;">
          <p style="margin: 6px 0;"><strong>Parent Name:</strong> ${consultation.parent_name}</p>
          <p style="margin: 6px 0;"><strong>Phone:</strong> <a href="tel:${consultation.parent_phone}" style="color: #E91E63; font-weight: bold;">${consultation.parent_phone}</a></p>
          <p style="margin: 6px 0;"><strong>Email:</strong> ${consultation.parent_email}</p>
          <p style="margin: 6px 0;"><strong>Child's Age:</strong> ${consultation.child_age}</p>
          <p style="margin: 6px 0;"><strong>Desired Style:</strong> ${consultation.desired_style || 'Not specified'}</p>
        </div>

        <div style="text-align: center; margin-top: 24px;">
          <a href="tel:${consultation.parent_phone}" style="display: inline-block; background: #FF2A85; color: #FFFFFF; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: bold; margin-right: 12px;">Call Parent Now</a>
          <a href="https://wa.me/${consultation.parent_phone.replace(/[^0-9]/g, '')}" style="display: inline-block; background: #25D366; color: #FFFFFF; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: bold;">WhatsApp Parent</a>
        </div>
      </div>
    `,
  });
}
