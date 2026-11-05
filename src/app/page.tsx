'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Phone, Menu, Loader2, AlertCircle, MessageCircle, ArrowRight, Check, CheckCircle, CheckCircle2, ShoppingBag, Droplets, Wind, Scissors, Baby, Heart, ShieldCheck, Coffee, Sun, ChevronDown, Copy, ExternalLink, Calendar, Clock, X, ZoomIn } from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  duration: string;
  desc: string;
  features: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: 'knotless-braids',
    title: 'Knotless Braids',
    subtitle: 'Small • Medium • Large • Waist/Thigh Length',
    price: 60,
    duration: '4-6 hours',
    desc: 'Tension-free, featherlight, and painless from day one. Seamless transition from your scalp without bulky knots. Flowing natural movement and incredible durability.',
    features: ['Razor-sharp grid parting', 'Lightweight, flexible styling', 'Lasts 6 to 8+ weeks'],
  },
  {
    id: 'ghana-weaving',
    title: 'Ghana Weaving & Feed-ins',
    subtitle: 'Straight Backs • Shuku • Geometric Designs',
    price: 40,
    duration: '2-4 hours',
    desc: 'Precision feed-in cornrows sculpted along your scalp. Smooth gradients that begin fine at the hairline and gradually thicken for a natural, elegant look.',
    features: ['Gentle on delicate front edges', 'Sleek, frizz-free finish', 'Perfect for daily elegance'],
  },
  {
    id: 'box-braids',
    title: 'Box Braids & Boho Styles',
    subtitle: 'Classic Box • Bohemian Curls • Triangle Parts',
    price: 50,
    duration: '4-5 hours',
    desc: 'Timeless protective styling. Choose sleek classic straight ends or trendy bohemian curls cascading down the braids for dreamy romantic volume.',
    features: ['Full, gorgeous body & volume', 'Endless styling (buns, half-up)', 'Low maintenance morning routine'],
  },
  {
    id: 'weaves',
    title: 'Weaves & Lace Closures',
    subtitle: 'Leave-Out Sew-In • HD Lace Closures • Frontals',
    price: 50,
    duration: '2-3 hours',
    desc: 'Silky, voluminous, natural sew-ins. We craft a secure, ultra-flat braided foundation so your weave lays seamlessly with zero lumps or bumps.',
    features: ['Ultra-flat, comfortable foundation', 'Undetectable hairline and parting', 'Straight, body wave, or deep curl'],
  },
  {
    id: 'cornrows',
    title: 'Cornrows & Men\'s Braids',
    subtitle: 'Natural Hair Braids • Pop Smoke • Feed-in Cornrows',
    price: 30,
    duration: '1-2 hours',
    desc: 'Crisp, sharp lines for natural hair or with subtle extension addition. Fast, immaculate styling for men, women, and teenagers.',
    features: ['Immaculate parting precision', 'Fast appointment turnaround', 'Scalp-soothing oil finish'],
  },
];

const LOOKBOOK_ITEMS = [
  { src: '/images/pinterest-1.jpg', title: 'Medium Knotless Braids', desc: 'Flawless mid-back to waist length medium knotless braids with neat parting.', tag: 'Client Favorite', category: 'knotless', price: '60' },
  { src: '/images/pinterest-2.jpg', title: 'Knotless Braids with Curly Ends', desc: 'Mid-back length knotless braids styled with soft, bouncy curly ends.', tag: 'Soft Glamour', category: 'knotless', price: '65' },
  { src: '/images/pinterest-3.jpg', title: 'Burgundy Boho Knotless', desc: 'Stunning autumn burgundy tones with bohemian curly extensions.', tag: 'Color & Curls', category: 'knotless', price: '70' },
  { src: '/images/pinterest-5.jpg', title: 'Ghana Shuku Braids', desc: 'High ponytail Ghana weaving with immaculate feed-in rows.', tag: 'Regal Shuku', category: 'weaving', price: '45' },
  { src: '/images/pinterest-4.jpg', title: 'Classic Clean Cornrows', desc: 'Classic straight-back cornrow parting on natural Afro hair.', tag: 'Sharp Lines', category: 'weaving', price: '30' },
  { src: '/images/knotless-braids.jpg', title: 'Square-Grid Knotless', desc: 'Precision square grid partings with seamless knot-free roots.', tag: 'Root Perfection', category: 'knotless', price: '60' },
  { src: '/images/ghana-weaving.jpg', title: 'Ghana Feed-ins', desc: 'Curved geometric cornrows sculpted seamlessly along the scalp.', tag: 'Sculpted Lines', category: 'weaving', price: '40' },
  { src: '/images/boho-box-braids.jpg', title: 'Boho Box Braids', desc: 'Waist-length box braids adorned with delicate, soft curly tendrils.', tag: 'Romantic Volume', category: 'box', price: '50' },
  { src: '/images/sleek-weave.jpg', title: 'Bone-Straight Weave', desc: 'Bone-straight sew-in with high gloss bounce and undetectable lace.', tag: 'Silky High-Gloss', category: 'weaves', price: '50' },
  { src: '/images/pinterest-7.jpg', title: 'Stitched Heart Feed-ins', desc: 'Viral heart-shaped scalp parting with immaculate stitch cornrows.', tag: 'Artistic Design', category: 'weaving', price: '45' },
  { src: '/images/pinterest-6.jpg', title: 'Half-Up Half-Down & Bang', desc: 'High-glam half-up ponytail with sleek swoop bang and straight hair.', tag: 'Glamour Weave', category: 'weaves', price: '55' },
  { src: '/images/pinterest-9.jpg', title: 'Deep Wave Flip-Over', desc: 'Seamless, voluminous flip-over sew-in with lush deep wave curls.', tag: 'Bouncy Curls', category: 'weaves', price: '60' },
  { src: '/images/pinterest-8.jpg', title: 'Crimson Red Frontal', desc: 'Bold ruby red lace frontal install with layered styling.', tag: 'Vibrant Color', category: 'weaves', price: '70' },
  { src: '/images/kids-1.jpg', title: 'Cute Cornrows & Plaits', desc: 'Gentle scalp styling for girls featuring plaits and colorful beads.', tag: 'Kids Collection', category: 'kids', price: 'Call to Discuss' },
  { src: '/images/kids-2.jpg', title: 'Toddler Gentle Braids', desc: 'Tender-head friendly neat partings with protective colorful beads.', tag: 'Tender Scalp Care', category: 'kids', price: 'Call to Discuss' },
  { src: '/images/kids-3.jpg', title: 'Kids Braided Ponytail', desc: 'Sweet braided high ponytail adorned with vibrant pastel beads.', tag: 'Pony & Beads', category: 'kids', price: 'Call to Discuss' },
  { src: '/images/kids-4.jpg', title: 'Protective Kids Cornrows', desc: 'Crisp, durable straight-back cornrows designed for school and play.', tag: 'School & Play', category: 'kids', price: 'Call to Discuss' },
];


const FAQS = [
  {
    q: 'Where is Kaffy Saloon located and how do I get there?',
    a: 'We are located at 40, Anfield, Flat 2, Triq Brunzar, Santa Venera, Malta. We operate a dedicated private rooftop penthouse studio with plenty of free residential street parking right outside.'
  },
  {
    q: 'Can I bring my own hair extensions (BYOH)?',
    a: 'Absolutely! You are warmly welcome to bring your own hair packs (BYOH) in your preferred brand, length, and color. If you prefer us to provide hair, we also stock premium pre-stretched braiding hair and bohemian curls in-studio.'
  },
  {
    q: 'What is the 24-hour advance booking rule?',
    a: 'All online appointments must be booked at least 24 hours in advance so Kaffy can prepare the studio and sanitize tools. For same-day emergency requests, please message Kaffy directly on WhatsApp (+356 7756 7349).'
  },
  {
    q: 'How does payment and the 50% deposit option work?',
    a: 'During booking, you can choose to pay a 50% deposit to secure your slot, or choose to pay in full at the studio once your hairstyle is complete. We accept cash and Revolut.'
  },
  {
    q: 'How should I prepare my hair before arriving?',
    a: 'Please arrive with your hair thoroughly washed, detangled, and blown out straight, free of heavy oils or butter. If you would prefer us to wash or blow out your hair, simply check our Care & Prep add-ons during booking.'
  },
  {
    q: 'How do kids braiding appointments work?',
    a: 'Because young scalps are sensitive, we do not book kids styles blindly. Parents can submit a free Phone Consultation request. Kaffy will call or WhatsApp you to discuss your child\'s age, hair texture, and desired style to agree on a custom price and gentle timing.'
  }
];


// ============================================================================
// THE DOUBLE-SUBMIT & SILENT ERROR HARDENING ENGINE (SECURITY & RELIABILITY)
// ============================================================================
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateAndCleanPhone(phoneInput: string): { isValid: boolean; cleanPhone: string; error?: string } {
  const raw = phoneInput.trim();
  const digitsOnly = raw.replace(/[^0-9]/g, '');

  if (!raw) {
    return { isValid: false, cleanPhone: '', error: 'Phone / WhatsApp number is required.' };
  }

  // 1. Nigerian 11-digit local numbers starting with 080, 070, 081, 090, 091, 071, etc.
  const nigLocalMatch = raw.match(/^(070|080|081|090|091|071|082)[0-9]{8}$/);
  if (nigLocalMatch) {
    return { isValid: true, cleanPhone: '+234' + raw.slice(1) };
  }

  // 2. Nigerian international format (+234 or 234 followed by 10 digits)
  const nigIntlMatch = raw.match(/^(\+?234)(70|80|81|90|91|71|82)[0-9]{8}$/);
  if (nigIntlMatch) {
    const formatted = raw.startsWith('+') ? raw : '+' + raw;
    return { isValid: true, cleanPhone: formatted };
  }

  // 3. Malta local & international format (+356 followed by 8 digits, typically starts with 7 or 9)
  const maltaMatch = raw.match(/^(\+?356)?[79][0-9]{7}$/);
  if (maltaMatch) {
    if (raw.startsWith('+356')) return { isValid: true, cleanPhone: raw };
    if (raw.startsWith('356')) return { isValid: true, cleanPhone: '+' + raw };
    return { isValid: true, cleanPhone: '+356' + raw };
  }

  // 4. Standard E.164 International Phone Numbers (7 to 15 digits)
  if (digitsOnly.length >= 7 && digitsOnly.length <= 15) {
    const formatted = raw.startsWith('+') ? raw : '+' + raw.replace(/[^0-9]/g, '');
    return { isValid: true, cleanPhone: formatted };
  }

  return {
    isValid: false,
    cleanPhone: raw,
    error: 'Please enter a valid phone number (e.g. 11-digit 080... or +234... for Nigeria, or +356... for Malta).'
  };
}

export default function HomePage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [copySuccess, setCopySuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES[0]);
  const [hairOption, setHairOption] = useState<'byoh' | 'in_studio'>('byoh');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('10:00');
  const [paymentChoice, setPaymentChoice] = useState<'deposit_50' | 'full_at_salon'>('deposit_50');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [confirmedBookingDetails, setConfirmedBookingDetails] = useState<{ name: string; service: string; date: string; time: string } | null>(null);

  // Kids Consultation Modal State
  const [isKidsModalOpen, setIsKidsModalOpen] = useState(false);
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [childAge, setChildAge] = useState('');
  const [desiredStyle, setDesiredStyle] = useState('');
  const [kidsLoading, setKidsLoading] = useState(false);
  const [kidsSuccess, setKidsSuccess] = useState(false);
  const [kidsError, setKidsError] = useState<string | null>(null);
  const [confirmedKidsParent, setConfirmedKidsParent] = useState<string>('');

  // Lightbox State
  const [lightboxItem, setLightboxItem] = useState<{ src: string; title: string; desc: string } | null>(null);

  // Minimum date: Tomorrow (24-hour advance notice rule)
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  function copyAddress() {
    navigator.clipboard.writeText('40, Anfield, Flat 2, Triq Brunzar, Santa Venera, Malta');
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  }

  function toggleAddon(name: string) {
    if (selectedAddons.includes(name)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== name));
    } else {
      setSelectedAddons([...selectedAddons, name]);
    }
  }

  async function handleBookingSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBookingError(null);

    // [PROTECTION 1] DOUBLE-SUBMISSION LOCK GUARD
    if (bookingLoading) return;

    // [PROTECTION 2] CLIENT-SIDE INPUT VALIDATION & SANITIZATION
    const trimmedName = clientName.trim();
    const trimmedEmail = clientEmail.trim();
    const trimmedPhone = clientPhone.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setBookingError('Full Name is required (minimum 2 characters).');
      return;
    }

    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      setBookingError('Please enter a valid email address (e.g. yourname@example.com) to receive confirmation.');
      return;
    }

    const phoneValidation = validateAndCleanPhone(trimmedPhone);
    if (!phoneValidation.isValid) {
      setBookingError(phoneValidation.error || 'Please enter a valid phone number.');
      return;
    }

    if (!appointmentDate) {
      setBookingError('Please select an appointment date.');
      return;
    }

    // 24-Hour Notice Verification
    const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
    const minNotice = new Date(Date.now() + 23.5 * 60 * 60 * 1000);
    if (appointmentDateTime < minNotice) {
      setBookingError('Appointments must be booked at least 24 hours in advance. For emergency same-day appointments, please message Kaffy on WhatsApp.');
      return;
    }

    // LOCK: Immediately disable UI & transition to transmitting state
    setBookingLoading(true);

    // [PROTECTION 3] TRY / CATCH ERROR RESILIENCE
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: trimmedName,
          client_email: trimmedEmail,
          client_phone: phoneValidation.cleanPhone,
          service_id: selectedService.id,
          service_title: selectedService.title,
          price: selectedService.price,
          payment_choice: paymentChoice,
          hair_option: hairOption,
          addons: selectedAddons,
          appointment_date: appointmentDate,
          start_time: appointmentTime,
          notes: bookingNotes.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Server rejected booking. Please verify your details and try again.');
      }

      // [PROTECTION 4] SUCCESS CONFIRMATION FLOW: Reset form fields, unlock button & show success view
      setConfirmedBookingDetails({
        name: trimmedName,
        service: selectedService.title,
        date: appointmentDate,
        time: appointmentTime,
      });
      setBookingSuccess(true);
      setClientName('');
      setClientEmail('');
      setClientPhone('');
      setBookingNotes('');
      setSelectedAddons([]);
      setBookingError(null);
    } catch (err: any) {
      console.error('Booking submission error:', err);
      const friendlyMsg = err?.message?.includes('Failed to fetch')
        ? 'Network connectivity issue. Please verify your internet connection or contact Kaffy directly on WhatsApp.'
        : (err?.message || 'Unable to submit booking. Please try again or contact Kaffy directly.');
      setBookingError(friendlyMsg);
    } finally {
      // Ensure button unlocks if not in success state
      setBookingLoading(false);
    }
  }

  async function handleKidsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setKidsError(null);

    // [PROTECTION 1] DOUBLE-SUBMISSION LOCK GUARD
    if (kidsLoading) return;

    // [PROTECTION 2] CLIENT-SIDE INPUT VALIDATION & SANITIZATION
    const trimmedParent = parentName.trim();
    const trimmedPhone = parentPhone.trim();
    const trimmedAge = childAge.trim();
    const trimmedEmail = parentEmail.trim();

    if (!trimmedParent || trimmedParent.length < 2) {
      setKidsError('Parent / Guardian name is required.');
      return;
    }

    const phoneValidation = validateAndCleanPhone(trimmedPhone);
    if (!phoneValidation.isValid) {
      setKidsError(phoneValidation.error || 'Please enter a valid phone number for the consultation call.');
      return;
    }

    if (trimmedEmail && !EMAIL_REGEX.test(trimmedEmail)) {
      setKidsError('Please enter a valid email address (or leave it blank).');
      return;
    }

    if (!trimmedAge) {
      setKidsError('Please specify your child\'s age (e.g. 4 years old).');
      return;
    }

    // LOCK: Immediately disable UI & transition to transmitting state
    setKidsLoading(true);

    // [PROTECTION 3] TRY / CATCH ERROR RESILIENCE
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parent_name: trimmedParent,
          parent_email: trimmedEmail,
          parent_phone: phoneValidation.cleanPhone,
          child_age: trimmedAge,
          desired_style: desiredStyle.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Server was unable to save your consultation request. Please try again.');
      }

      // [PROTECTION 4] SUCCESS CONFIRMATION FLOW: Reset form fields, unlock button & show success view
      setConfirmedKidsParent(trimmedParent);
      setKidsSuccess(true);
      setParentName('');
      setParentPhone('');
      setParentEmail('');
      setChildAge('');
      setDesiredStyle('');
      setKidsError(null);
    } catch (err: any) {
      console.error('Kids consultation submission error:', err);
      const friendlyMsg = err?.message?.includes('Failed to fetch')
        ? 'Network connectivity issue. Please verify your internet connection or WhatsApp Kaffy directly.'
        : (err?.message || 'Unable to submit consultation request. Please try again or WhatsApp Kaffy directly.');
      setKidsError(friendlyMsg);
    } finally {
      setKidsLoading(false);
    }
  }

  const filteredLookbook = selectedFilter === 'all'
    ? LOOKBOOK_ITEMS
    : LOOKBOOK_ITEMS.filter((i) => i.category === selectedFilter);

  return (
    <div className="min-h-screen bg-glam-page text-glam-plum">
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-glam-pinkDark via-glam-pink to-glam-pinkDark text-white text-xs py-2.5 px-4 text-center tracking-wider font-semibold flex items-center justify-center gap-3 shadow-sm">
        <span className="inline-flex items-center gap-1.5 bg-white/20 px-2.5 py-0.5 rounded-full text-white text-[11px] font-bold">
          <Sparkles className="w-3.5 h-3.5" /> STYLES START FROM &euro;30
        </span>
        <span className="text-white/40">&bull;</span>
        <span>Bring your own hair or buy extensions in-studio</span>
        <span className="text-white/40 hidden sm:inline">&bull;</span>
        <span className="hidden sm:inline text-white/90">Santa Venera, Malta</span>
      </div>

      {/* NAVIGATION */}
      <header className="sticky top-0 z-40 glass-nav border-b border-glam-border transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="group flex flex-col">
            <span className="font-serif tracking-[0.15em] text-2xl font-bold text-glam-plum group-hover:text-glam-pinkDark transition-colors">
              KAFFY SALOON
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-glam-pink font-bold -mt-1">
              Boutique Penthouse Studio &bull; Malta
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-glam-mocha">
            <a href="#services" className="hover:text-glam-pinkDark transition-colors">Hairstyles & Pricing</a>
            <a href="#hair-policy" className="hover:text-glam-pinkDark transition-colors">Hair Extensions</a>
            <a href="#lookbook" className="hover:text-glam-pinkDark transition-colors">Lookbook</a>
            <a href="#experience" className="hover:text-glam-pinkDark transition-colors">The Penthouse</a>
            <a href="#location" className="hover:text-glam-pinkDark transition-colors">Location</a>
            <a href="#faq" className="hover:text-glam-pinkDark transition-colors">FAQ</a>
            <Link href="/portal" className="text-glam-pinkDark hover:text-glam-pink font-bold">Client Portal</Link>
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <a href="tel:+35677567349" className="p-2.5 rounded-full border border-glam-border bg-white text-glam-plum hover:text-glam-pinkDark hover:border-glam-pink transition-all shadow-sm hidden sm:inline-flex" title="Call Kaffy">
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => {
                setSelectedService(SERVICES[0]);
                setIsBookingOpen(true);
                setBookingSuccess(false);
              }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 rounded-full pink-gradient-btn text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full border border-glam-border bg-white text-glam-plum hover:text-glam-pink md:hidden flex items-center justify-center transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-glam-border px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-3 text-sm font-bold text-glam-plum">
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="py-1 hover:text-glam-pink transition-colors">
                Hairstyles & Pricing Menu
              </a>
              <a href="#hair-policy" onClick={() => setIsMobileMenuOpen(false)} className="py-1 hover:text-glam-pink transition-colors">
                Hair Extensions (BYOH or Buy)
              </a>
              <a href="#lookbook" onClick={() => setIsMobileMenuOpen(false)} className="py-1 hover:text-glam-pink transition-colors">
                Photo Lookbook
              </a>
              <a href="#experience" onClick={() => setIsMobileMenuOpen(false)} className="py-1 hover:text-glam-pink transition-colors">
                The Penthouse Sanctuary
              </a>
              <a href="#location" onClick={() => setIsMobileMenuOpen(false)} className="py-1 hover:text-glam-pink transition-colors">
                Location & Opening Hours
              </a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="py-1 hover:text-glam-pink transition-colors">
                Frequently Asked Questions (FAQ)
              </a>
            </nav>
            <div className="pt-3 border-t border-glam-border flex items-center justify-between">
              <Link
                href="/portal"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-bold text-glam-pinkDark hover:text-glam-pink flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" /> VIP Client Portal
              </Link>
              <a
                href="https://wa.me/35677567349"
                target="_blank"
                className="text-xs font-bold text-green-700 flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-green-600" /> WhatsApp Kaffy
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-glam-page via-white to-glam-page">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-glam-pink/15 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-glam-pink/40 bg-white text-glam-pinkDark text-xs tracking-wider uppercase font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-glam-pink" />
                Penthouse Hair Sanctuary &bull; Santa Venera, Malta
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.18] text-glam-plum">
                Flawless Braids, <br />
                <span className="italic font-normal pink-gradient-text">Pure Penthouse Comfort.</span>
              </h1>

              <p className="text-glam-mocha text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Gentle hands, razor-sharp partings, and long-lasting hair artistry in an exclusive, private rooftop sanctuary. From silk-touch knotless braids to flawless weaves and sweet kids styles, your crown is treated like royalty.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-glam-plum font-semibold">
                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-glam-border shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-glam-pink" />
                  <span>Styles from &euro;30</span>
                </div>
                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-glam-border shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-glam-pink" />
                  <span>Bring or Buy Hair Extensions</span>
                </div>
                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-glam-border shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-glam-pink" />
                  <span>50% Deposit or Pay in Salon</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => {
                    setSelectedService(SERVICES[0]);
                    setIsBookingOpen(true);
                    setBookingSuccess(false);
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full pink-gradient-btn text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 group"
                >
                  <span>Book Penthouse Session</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a href="#lookbook" className="w-full sm:w-auto px-8 py-4 rounded-full border border-glam-pink/40 bg-white hover:bg-glam-section text-glam-pinkDark text-xs sm:text-sm font-bold tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm">
                  <span>View Lookbook</span>
                </a>
              </div>

              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 border-t border-glam-border text-xs text-glam-muted font-medium">
                <div>
                  <span className="block text-2xl font-bold font-serif text-glam-plum">&euro;30+</span>
                  <span>Transparent Pricing</span>
                </div>
                <div className="w-px h-8 bg-glam-border"></div>
                <div>
                  <span className="block text-2xl font-bold font-serif text-glam-plum">1-on-1</span>
                  <span>Private VIP Care</span>
                </div>
                <div className="w-px h-8 bg-glam-border"></div>
                <div>
                  <span className="block text-2xl font-bold font-serif text-glam-plum">Malta</span>
                  <span>Santa Venera</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-3.5 rounded-3xl border-2 border-glam-pink/60 -rotate-1 pointer-events-none"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white bg-white aspect-[4/5]">
                  <img src="/images/hero-model.jpg" alt="Kaffy Saloon Knotless Braids Model" className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-glam-border shadow-lg flex items-center justify-between">
                    <div>
                      <div className="text-[10px] tracking-widest uppercase text-glam-pinkDark font-extrabold">Signature Artistry</div>
                      <div className="font-serif text-base text-glam-plum font-bold">Waist-Length Knotless Braids</div>
                    </div>
                    <div className="px-3 py-1 rounded-full pink-gradient-btn text-white text-xs font-bold shadow-sm">
                      From &euro;60
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HAIR EXTENSIONS POLICY */}
      <section id="hair-policy" className="py-12 bg-glam-section border-y border-glam-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-12 border-2 border-glam-border bg-white pop-card relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs uppercase tracking-widest text-glam-pinkDark font-extrabold flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-glam-pink" /> Extensions & Hair Packs
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-glam-plum font-bold">
                  Bring Your Favorite Hair or <span className="italic pink-gradient-text">Purchase In-Studio.</span>
                </h2>
                <p className="text-glam-mocha text-sm sm:text-base leading-relaxed font-normal">
                  We make your styling experience completely effortless. Have your favorite brand, color, or texture? You are warmly invited to bring your own packs. Need hair supplied? We stock premium pre-stretched braiding hair, curls for bohemian styles, and hair bundles right in our studio.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setHairOption('byoh');
                      setSelectedService(SERVICES[0]);
                      setIsBookingOpen(true);
                      setBookingSuccess(false);
                    }}
                    className="p-4 rounded-2xl bg-glam-page border-2 border-glam-border hover:border-glam-pink text-left transition-all group pop-card"
                  >
                    <div className="font-bold text-glam-plum flex items-center justify-between gap-2 text-sm">
                      <span className="flex items-center gap-2 group-hover:text-glam-pinkDark transition-colors">
                        <CheckCircle className="w-4 h-4 text-glam-pink" /> Bring Your Own (BYOH)
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-glam-pinkDark bg-white px-2 py-0.5 rounded-full border border-glam-pink/30 group-hover:bg-glam-pink group-hover:text-white transition-colors">
                        Select & Book &rarr;
                      </span>
                    </div>
                    <p className="text-xs text-glam-muted mt-1">Bring your preferred brand, length, or custom colors.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setHairOption('in_studio');
                      setSelectedService(SERVICES[0]);
                      setIsBookingOpen(true);
                      setBookingSuccess(false);
                    }}
                    className="p-4 rounded-2xl bg-glam-page border-2 border-glam-border hover:border-glam-pink text-left transition-all group pop-card"
                  >
                    <div className="font-bold text-glam-plum flex items-center justify-between gap-2 text-sm">
                      <span className="flex items-center gap-2 group-hover:text-glam-pinkDark transition-colors">
                        <ShoppingBag className="w-4 h-4 text-glam-pink" /> Buy In-Studio
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-glam-pinkDark bg-white px-2 py-0.5 rounded-full border border-glam-pink/30 group-hover:bg-glam-pink group-hover:text-white transition-colors">
                        Select & Book &rarr;
                      </span>
                    </div>
                    <p className="text-xs text-glam-muted mt-1">Top-grade X-Pression, extensions, and curly packs ready on site.</p>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
                <div className="text-center lg:text-right space-y-4 p-6 rounded-2xl bg-glam-page border border-glam-border w-full max-w-md">
                  <div className="text-xs tracking-wider text-glam-muted uppercase font-bold">Questions about hair packs or colors?</div>
                  <div className="font-serif text-xl text-glam-plum font-bold">Call or WhatsApp Kaffy for hair pricing & pack advice</div>
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
                    <a href="https://wa.me/35677567349?text=Hi%20Kaffy,%20I'd%20like%20to%20ask%20about%20the%20price%20and%20types%20of%20hair%20extensions%20available!" target="_blank" className="px-5 py-3 rounded-full pink-gradient-btn text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:scale-105">
                      <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
                    </a>
                    <a href="tel:+35677567349" className="px-5 py-3 rounded-full border border-glam-pink/40 bg-white hover:bg-glam-section text-glam-pinkDark text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm">
                      <Phone className="w-4 h-4" /> Call Directly
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES & PRICING MENU */}
      <section id="services" className="py-20 lg:py-28 relative bg-glam-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-glam-pinkDark font-extrabold bg-white px-4 py-1 rounded-full border border-glam-border shadow-sm">Curated Hair Menu</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-glam-plum font-bold">
              Hairstyles & <span className="italic font-normal pink-gradient-text">Starting Prices</span>
            </h2>
            <p className="text-glam-mocha text-sm sm:text-base font-medium">
              All adult styles start from &euro;30 upward. 24-hour advance notice required. 50% deposit option available.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((s) => (
              <div key={s.id} className="group rounded-3xl bg-white border-2 border-glam-border hover:border-glam-pink p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between pop-card hover:-translate-y-1.5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-glam-pink to-glam-pinkDark"></div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start justify-between">
                    <div className="p-3.5 rounded-2xl bg-glam-page text-glam-pinkDark border border-glam-border group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-glam-muted uppercase tracking-wider font-bold">Starts From</span>
                      <div className="font-serif text-3xl font-extrabold text-glam-pinkDark">&euro;{s.price}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl text-glam-plum group-hover:text-glam-pinkDark transition-colors font-bold">{s.title}</h3>
                    <p className="text-xs text-glam-pinkDark font-bold mt-1">{s.subtitle}</p>
                  </div>

                  <p className="text-sm text-glam-mocha leading-relaxed font-normal">{s.desc}</p>

                  <ul className="text-xs text-glam-muted space-y-2 pt-2 border-t border-glam-border font-medium">
                    {s.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-glam-pink" /> {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => {
                      setSelectedService(s);
                      setIsBookingOpen(true);
                      setBookingSuccess(false);
                    }}
                    className="w-full py-3.5 rounded-2xl pink-gradient-btn text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:scale-102"
                  >
                    <span>Book {s.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* KIDS HAIR CARD */}
            <div className="group rounded-3xl bg-white border-2 border-glam-border hover:border-glam-pink p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between pop-card hover:-translate-y-1.5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-glam-pink to-glam-pinkDark"></div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start justify-between">
                  <div className="p-3.5 rounded-2xl bg-glam-page text-glam-pinkDark border border-glam-border group-hover:scale-110 transition-transform">
                    <Baby className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-glam-pinkDark uppercase tracking-wider font-extrabold bg-glam-page px-2 py-0.5 rounded-md border border-glam-border">Separate Pricing</span>
                    <div className="font-serif text-xl font-extrabold text-glam-plum mt-1">Call to Discuss</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-glam-plum group-hover:text-glam-pinkDark transition-colors font-bold">Kids Braids & Hairstyles</h3>
                  <p className="text-xs text-glam-pinkDark font-bold mt-1">Toddlers • Girls • Boys • Beads & Accessories</p>
                </div>

                <p className="text-sm text-glam-mocha leading-relaxed font-normal">
                  Gentle, patient care crafted for young, tender scalps. Cute, protective cornrows, plaits, and pony styles with colorful beads and hair cuffs.
                </p>

                <ul className="text-xs text-glam-muted space-y-2 pt-2 border-t border-glam-border font-medium">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-glam-pink" /> Gentle touch, zero scalp tension</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-glam-pink" /> Fun beads, bows & barrettes</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-glam-pink" /> Tailored phone consultation</li>
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => {
                    setIsKidsModalOpen(true);
                    setKidsSuccess(false);
                  }}
                  className="w-full py-3.5 rounded-2xl pink-gradient-btn text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:scale-102"
                >
                  <Phone className="w-4 h-4" />
                  <span>Request Kids Consultation Call</span>
                </button>
              </div>
            </div>
          </div>

          {/* CARE & PREP ADD-ONS */}
          <div className="mt-16 pt-12 border-t border-glam-border">
            <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
              <span className="text-xs uppercase tracking-[0.25em] text-glam-pinkDark font-extrabold bg-white px-4 py-1 rounded-full border border-glam-border shadow-sm">Care & Prep Services</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-glam-plum font-bold">Hair Care Add-Ons</h3>
              <p className="text-glam-mocha text-xs sm:text-sm font-medium">
                Need prep before your braiding appointment or help safely taking down an old style? Select these during booking.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-white border-2 border-glam-border hover:border-glam-pink transition-all space-y-3 pop-card">
                <div className="p-3.5 rounded-2xl bg-glam-page text-glam-pinkDark border border-glam-border w-fit">
                  <Droplets className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-glam-plum font-bold">Hair Washing & Cleanse</h4>
                <p className="text-xs text-glam-mocha leading-relaxed">
                  Thorough shampoo cleanse and nourishing conditioning wash to refresh your scalp before fresh braids.
                </p>
                <div className="text-xs text-glam-pinkDark font-bold pt-2 border-t border-glam-border flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" /> Selectable during booking
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border-2 border-glam-border hover:border-glam-pink transition-all space-y-3 pop-card">
                <div className="p-3.5 rounded-2xl bg-glam-page text-glam-pinkDark border border-glam-border w-fit">
                  <Wind className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-glam-plum font-bold">Blow Drying & Stretch</h4>
                <p className="text-xs text-glam-mocha leading-relaxed">
                  Safe tension blow-out to stretch your natural hair for crisp, razor-sharp parts and faster, painless braiding.
                </p>
                <div className="text-xs text-glam-pinkDark font-bold pt-2 border-t border-glam-border flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" /> Selectable during booking
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border-2 border-glam-border hover:border-glam-pink transition-all space-y-3 pop-card">
                <div className="p-3.5 rounded-2xl bg-glam-page text-glam-pinkDark border border-glam-border w-fit">
                  <Scissors className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-glam-plum font-bold">Unbraiding & Takedown</h4>
                <p className="text-xs text-glam-mocha leading-relaxed">
                  Careful, patient takedown of your old braids or weaves without cutting, breaking, or pulling your natural edges.
                </p>
                <div className="text-xs text-glam-pinkDark font-bold pt-2 border-t border-glam-border flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" /> Selectable during booking
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOOKBOOK / GALLERY */}
      <section id="lookbook" className="py-20 bg-glam-section border-t border-glam-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-glam-pinkDark font-extrabold bg-white px-4 py-1 rounded-full border border-glam-border shadow-sm">Our Portfolio</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-glam-plum font-bold">
                The Lookbook <span className="italic font-normal pink-gradient-text">Showcase</span>
              </h2>
              <p className="text-glam-mocha text-sm max-w-lg font-medium">
                Tap any style to inspect the crisp partings, neat baby hairs, and book that exact look.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-bold">
              {['all', 'knotless', 'weaving', 'box', 'weaves', 'kids'].map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFilter(f)}
                  className={`px-4 py-2 rounded-full uppercase tracking-wider transition-all ${
                    selectedFilter === f
                      ? 'pink-gradient-btn text-white shadow-md'
                      : 'bg-white text-glam-mocha hover:text-glam-pinkDark border border-glam-border'
                  }`}
                >
                  {f === 'all' ? 'All Styles' : f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLookbook.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxItem(item)}
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-white border-2 border-white cursor-pointer shadow-lg hover:shadow-2xl transition-all"
              >
                <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-glam-plum/90 via-glam-plum/20 to-transparent opacity-85 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                  <span className="text-[10px] tracking-wider uppercase text-pink-300 font-extrabold">{item.tag}</span>
                  <h4 className="font-serif text-xl text-white font-bold">{item.title}</h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20 text-xs text-white/90">
                    <span className="font-semibold">{item.price === 'Call to Discuss' ? item.price : `From €${item.price}`}</span>
                    <span className="text-pink-300 font-bold flex items-center gap-1">Tap to Zoom <ZoomIn className="w-3.5 h-3.5" /></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PENTHOUSE EXPERIENCE */}
      <section id="experience" className="py-20 lg:py-28 relative bg-white border-t border-glam-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-glam-border shadow-xl bg-glam-page">
                <img src="/images/studio-ambiance.jpg" alt="Kaffy Saloon Penthouse Studio Interior in Santa Venera" className="w-full h-auto object-cover" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-glam-border text-xs text-glam-mocha shadow-md">
                  <span className="text-glam-pinkDark font-extrabold flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-glam-pink" /> Penthouse Setting &bull; Santa Venera, Malta
                  </span>
                  40, Anfield, Flat 2, Triq Brunzar. Dedicated rooftop studio terrace.
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-glam-pinkDark font-extrabold bg-glam-page px-4 py-1 rounded-full border border-glam-border shadow-sm">The Penthouse Difference</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-glam-plum font-bold leading-tight">
                Not Your Typical Salon. <br />
                <span className="italic font-normal pink-gradient-text">A Private Sanctuary.</span>
              </h2>
              <p className="text-glam-mocha text-sm sm:text-base leading-relaxed font-normal">
                Braiding is an intimate art that takes time, care, and delicate touch. Instead of sitting in a noisy, crowded street-level shop, Kaffy Saloon welcomes you into a calm, sun-drenched penthouse studio high above Santa Venera.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-glam-page border border-glam-border">
                  <div className="p-2.5 rounded-xl bg-white text-glam-pinkDark shadow-sm shrink-0 border border-glam-border">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-glam-plum text-base font-bold">1-on-1 VIP Dedication</h4>
                    <p className="text-xs text-glam-muted mt-0.5 font-medium">No juggling multiple clients at once. Kaffy gives 100% focused, tender attention to your hair from start to finish.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-glam-page border border-glam-border">
                  <div className="p-2.5 rounded-xl bg-white text-glam-pinkDark shadow-sm shrink-0 border border-glam-border">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-glam-plum text-base font-bold">Comfort, Refreshments & Entertainment</h4>
                    <p className="text-xs text-glam-muted mt-0.5 font-medium">Complimentary tea, coffee, chilled juice, high-speed Wi-Fi, and your favorite movies or music while you get pampered.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-glam-page border border-glam-border">
                  <div className="p-2.5 rounded-xl bg-white text-glam-pinkDark shadow-sm shrink-0 border border-glam-border">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-glam-plum text-base font-bold">Penthouse Terrace & Natural Air</h4>
                    <p className="text-xs text-glam-muted mt-0.5 font-medium">Gentle sunlight, cool air conditioning, and a private rooftop terrace to take relaxing breaks during multi-hour styles.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION & CONTACT */}
      <section id="location" className="py-20 lg:py-28 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-glam-page border-2 border-glam-border p-8 sm:p-12 lg:p-16 relative overflow-hidden pop-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs uppercase tracking-[0.25em] text-glam-pinkDark font-extrabold bg-white px-4 py-1 rounded-full border border-glam-border shadow-sm">Studio Location</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-glam-plum font-bold">
                  Visit Kaffy Saloon <br />
                  <span className="italic font-normal pink-gradient-text">Santa Venera, Malta</span>
                </h2>
                <p className="text-glam-mocha text-sm sm:text-base leading-relaxed font-normal">
                  We operate exclusively by appointment to ensure every client enjoys a private, relaxing session with zero rush. Please message or book ahead.
                </p>

                <div className="p-6 rounded-3xl bg-white border-2 border-glam-border space-y-3 pop-card">
                  <div className="text-xs uppercase tracking-wider text-glam-pinkDark font-extrabold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-glam-pink" /> Address
                  </div>
                  <div className="text-base sm:text-lg font-bold text-glam-plum">
                    40, Anfield, Flat 2, Triq Brunzar, Santa Venera, Malta
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button onClick={copyAddress} className="px-4 py-2 rounded-xl bg-glam-page hover:bg-glam-section text-xs text-glam-plum border border-glam-border transition-colors flex items-center gap-1.5 font-bold">
                      <Copy className="w-3.5 h-3.5 text-glam-pink" />
                      <span>{copySuccess ? 'Address Copied!' : 'Copy Full Address'}</span>
                    </button>
                    <a href="https://maps.google.com/?q=Triq+Brunzar,+Santa+Venera,+Malta" target="_blank" className="px-4 py-2 rounded-xl bg-glam-page hover:bg-glam-section text-xs text-glam-pinkDark border border-glam-pink/40 transition-colors flex items-center gap-1.5 font-bold">
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open in Google Maps</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <a href="https://wa.me/35677567349" target="_blank" className="p-4 rounded-2xl bg-white hover:border-glam-pink border-2 border-glam-border transition-all flex items-center gap-3 pop-card">
                    <div className="p-3 rounded-xl bg-glam-page text-glam-pinkDark border border-glam-border">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-glam-muted font-bold">WhatsApp Booking</div>
                      <div className="text-sm font-extrabold text-glam-plum">+356 7756 7349</div>
                    </div>
                  </a>

                  <a href="tel:+35677567349" className="p-4 rounded-2xl bg-white hover:border-glam-pink border-2 border-glam-border transition-all flex items-center gap-3 pop-card">
                    <div className="p-3 rounded-xl bg-glam-page text-glam-pinkDark border border-glam-border">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-glam-muted font-bold">Direct Phone</div>
                      <div className="text-sm font-extrabold text-glam-plum">+356 7756 7349</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="p-6 rounded-3xl bg-white border-2 border-glam-border space-y-4 pop-card">
                  <h3 className="font-serif text-xl text-glam-plum font-bold flex items-center gap-2">
                    <Clock className="w-5 h-5 text-glam-pink" /> Studio Hours
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-glam-mocha font-semibold">
                    <li className="flex items-center justify-between pb-2 border-b border-glam-border">
                      <span className="text-glam-plum">Monday – Friday</span>
                      <span className="text-glam-pinkDark font-extrabold">09:00 – 19:30</span>
                    </li>
                    <li className="flex items-center justify-between pb-2 border-b border-glam-border">
                      <span className="text-glam-plum">Saturday</span>
                      <span className="text-glam-pinkDark font-extrabold">09:00 – 19:00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-glam-plum">Sunday</span>
                      <span className="text-glam-muted">Special Request Only</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-3xl bg-gradient-to-br from-glam-section via-white to-glam-page border-2 border-glam-pink/50 text-center space-y-3 pop-card">
                  <span className="text-xs uppercase tracking-wider text-glam-pinkDark font-extrabold">Ready to get styled?</span>
                  <div className="font-serif text-2xl text-glam-plum font-bold">Reserve Your Penthouse Session</div>
                  <p className="text-xs text-glam-mocha max-w-xs mx-auto font-medium">
                    Appointments fill up quickly for weekends. Secure your preferred time slot today.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedService(SERVICES[0]);
                      setIsBookingOpen(true);
                      setBookingSuccess(false);
                    }}
                    className="w-full py-3.5 rounded-full pink-gradient-btn text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Open Booking System</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section id="faq" className="py-20 lg:py-28 relative bg-glam-section border-t border-glam-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-glam-pinkDark font-extrabold bg-white px-4 py-1 rounded-full border border-glam-border shadow-sm">
              Got Questions?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-glam-plum font-bold">
              Frequently Asked <span className="italic font-normal pink-gradient-text">Questions</span>
            </h2>
            <p className="text-glam-mocha text-sm max-w-lg mx-auto font-medium">
              Everything you need to know about our Santa Venera penthouse salon, hair policies, and booking workflow.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border-2 border-glam-border bg-white overflow-hidden pop-card transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-glam-plum hover:text-glam-pinkDark transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className={`p-1.5 rounded-full bg-glam-page text-glam-pinkDark shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-glam-pink text-white' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-glam-mocha leading-relaxed border-t border-glam-page pt-3 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-6 rounded-3xl bg-white border-2 border-glam-border text-center space-y-3 pop-card">
            <h3 className="font-serif text-lg font-bold text-glam-plum">Have another question not listed here?</h3>
            <p className="text-xs text-glam-mocha">Kaffy is always happy to answer questions directly on WhatsApp or over the phone.</p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <a
                href="https://wa.me/35677567349?text=Hi%20Kaffy,%20I'd%20like%20to%20ask%20a%20question%20before%20booking%20my%20hair%20appointment!"
                target="_blank"
                className="px-5 py-2.5 rounded-full pink-gradient-btn text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" /> Message on WhatsApp
              </a>
              <a
                href="tel:+35677567349"
                className="px-5 py-2.5 rounded-full border border-glam-pink/40 bg-white hover:bg-glam-section text-glam-pinkDark text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4" /> Call Studio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-glam-plum text-white border-t border-glam-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="text-center md:text-left">
              <div className="font-serif tracking-[0.15em] text-2xl font-bold text-white">KAFFY SALOON</div>
              <p className="text-xs text-pink-300 mt-1 font-semibold">Boutique Penthouse Studio &bull; Santa Venera, Malta</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/80 font-medium">
              <a href="#services" className="hover:text-pink-300 transition-colors">Hairstyles</a>
              <a href="#hair-policy" className="hover:text-pink-300 transition-colors">Hair Extensions</a>
              <a href="#lookbook" className="hover:text-pink-300 transition-colors">Lookbook</a>
              <a href="#faq" className="hover:text-pink-300 transition-colors">FAQ</a>
              <Link href="/portal" className="text-pink-300 hover:underline">Client Portal</Link>
              <Link href="/admin" className="text-white/60 hover:text-white">Admin Studio</Link>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4 text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} Kaffy Saloon. All rights reserved. 40, Anfield, Flat 2, Triq Brunzar, Santa Venera, Malta.</p>
            <p className="text-pink-300 font-semibold">Styles start from &euro;30 &bull; Boutique Penthouse Hair Sanctuary</p>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE BOOKING MODAL */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 bg-glam-plum/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto overscroll-contain animate-in fade-in duration-200">
          <div className="relative w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden border-t-2 sm:border-2 border-glam-border shadow-2xl max-h-[92dvh] sm:max-h-[90vh] flex flex-col my-0 sm:my-auto">
            {/* Sticky Modal Header */}
            <div className="relative px-5 py-3.5 sm:px-6 sm:py-5 border-b border-glam-border bg-white flex items-center justify-between shrink-0">
              <div className="pr-4">
                <span className="text-[10px] uppercase tracking-widest text-glam-pink font-extrabold block">
                  Book Penthouse Hair Appointment
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-glam-plum truncate max-w-[240px] sm:max-w-md">
                  {selectedService.title}
                </h3>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-glam-mocha">
                  <span className="font-bold text-glam-pinkDark">From &euro;{selectedService.price}</span>
                  <span>&bull;</span>
                  <span>Est. {selectedService.duration}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => { setIsBookingOpen(false); setBookingSuccess(false); }}
                className="w-9 h-9 rounded-full bg-glam-page text-glam-plum hover:bg-glam-pink hover:text-white transition-colors flex items-center justify-center shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 flex-1 overscroll-contain">
              {bookingSuccess ? (
                <div className="text-center py-6 sm:py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-glam-plum">Booking Request Sent!</h3>
                  <p className="text-xs sm:text-sm text-glam-mocha max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{confirmedBookingDetails?.name || 'VIP Client'}</strong>! Your appointment request for <strong>{confirmedBookingDetails?.service || selectedService.title}</strong> on <strong>{confirmedBookingDetails?.date || appointmentDate} at {confirmedBookingDetails?.time || appointmentTime}</strong> has been sent to Kaffy.
                  </p>
                  <div className="p-4 rounded-2xl bg-glam-page border border-glam-border text-xs text-glam-mocha text-left space-y-2">
                    <div className="font-bold text-glam-plum">What happens next?</div>
                    <p>&bull; Kaffy will review and click <strong>Accept</strong> in her dashboard.</p>
                    <p>&bull; You will receive an email confirmation with your hair preparation checklist and Santa Venera penthouse directions.</p>
                    <p>&bull; You can also view your booking status in your <Link href="/portal" className="text-glam-pinkDark underline font-bold">Client Portal</Link> anytime.</p>
                  </div>
                  <button
                    onClick={() => { setIsBookingOpen(false); setBookingSuccess(false); }}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full pink-gradient-btn text-white text-xs font-bold uppercase tracking-wider shadow-md"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4 sm:space-y-5">
                  {/* Hair Extensions Option */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-glam-plum block">Hair Extensions Choice:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs">
                      <button
                        type="button"
                        onClick={() => setHairOption('byoh')}
                        className={`p-3 rounded-2xl border-2 text-left transition-all ${
                          hairOption === 'byoh'
                            ? 'border-glam-pink bg-pink-50/50 font-bold text-glam-pinkDark'
                            : 'border-glam-border bg-white text-glam-mocha'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold mb-0.5">
                          <CheckCircle className="w-4 h-4 text-glam-pink" /> Bring My Own Hair (BYOH)
                        </div>
                        <span className="text-[11px] font-normal text-glam-muted block">I will bring my own hair packs</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setHairOption('in_studio')}
                        className={`p-3 rounded-2xl border-2 text-left transition-all ${
                          hairOption === 'in_studio'
                            ? 'border-glam-pink bg-pink-50/50 font-bold text-glam-pinkDark'
                            : 'border-glam-border bg-white text-glam-mocha'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold mb-0.5">
                          <ShoppingBag className="w-4 h-4 text-glam-pink" /> Buy in Studio
                        </div>
                        <span className="text-[11px] font-normal text-glam-muted block">Kaffy provides hair in-studio</span>
                      </button>
                    </div>
                  </div>

                  {/* Care & Prep Add-ons */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-glam-plum block">Care & Prep Add-Ons (Optional):</label>
                    <div className="space-y-1.5 text-xs">
                      {[
                        { name: 'Hair Washing & Conditioning', price: 15 },
                        { name: 'Blow Drying & Tension Stretch', price: 10 },
                        { name: 'Unbraiding Old Hair Takedown', price: 20 },
                      ].map((addon) => (
                        <label key={addon.name} className="flex items-center justify-between p-2.5 rounded-xl border border-glam-border bg-glam-page/60 hover:bg-glam-page cursor-pointer">
                          <span className="flex items-center gap-2 text-glam-plum font-semibold">
                            <input
                              type="checkbox"
                              checked={selectedAddons.includes(addon.name)}
                              onChange={() => toggleAddon(addon.name)}
                              className="w-4 h-4 rounded border-glam-border text-glam-pink focus:ring-glam-pink"
                            />
                            {addon.name}
                          </span>
                          <span className="font-bold text-glam-pinkDark">+&euro;{addon.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Date & Time Picker (24h rule) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs font-bold text-glam-plum block mb-1">Date (Min 24h Notice):</label>
                      <input
                        type="date"
                        required
                        min={tomorrow}
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="w-full p-3 rounded-2xl border border-glam-border bg-glam-page text-xs sm:text-xs font-bold text-glam-plum focus:outline-none focus:border-glam-pink"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-glam-plum block mb-1">Preferred Time:</label>
                      <select
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        className="w-full p-3 rounded-2xl border border-glam-border bg-glam-page text-xs sm:text-xs font-bold text-glam-plum focus:outline-none focus:border-glam-pink"
                      >
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:30">11:30 AM</option>
                        <option value="13:00">01:00 PM</option>
                        <option value="14:30">02:30 PM</option>
                        <option value="16:00">04:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Payment Option Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-glam-plum block">Payment Preference:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs">
                      <button
                        type="button"
                        onClick={() => setPaymentChoice('deposit_50')}
                        className={`p-3 rounded-2xl border-2 text-left transition-all ${
                          paymentChoice === 'deposit_50'
                            ? 'border-glam-pink bg-pink-50/50 font-bold text-glam-pinkDark'
                            : 'border-glam-border bg-white text-glam-mocha'
                        }`}
                      >
                        <div className="font-bold">Pay 50% Deposit</div>
                        <span className="text-[11px] font-semibold text-glam-pink block mt-0.5">
                          &euro;{(selectedService.price * 0.5).toFixed(2)} to secure slot
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentChoice('full_at_salon')}
                        className={`p-3 rounded-2xl border-2 text-left transition-all ${
                          paymentChoice === 'full_at_salon'
                            ? 'border-glam-pink bg-pink-50/50 font-bold text-glam-pinkDark'
                            : 'border-glam-border bg-white text-glam-mocha'
                        }`}
                      >
                        <div className="font-bold">Pay in Full at Salon</div>
                        <span className="text-[11px] text-glam-muted block mt-0.5">
                          &euro;{selectedService.price} once hair is done
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Client Contact Details */}
                  <div className="space-y-2.5 pt-2 border-t border-glam-border">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="p-3 rounded-2xl border border-glam-border bg-glam-page text-xs sm:text-xs font-medium text-glam-plum focus:outline-none focus:border-glam-pink"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Phone / WhatsApp (+356...)"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="p-3 rounded-2xl border border-glam-border bg-glam-page text-xs sm:text-xs font-medium text-glam-plum focus:outline-none focus:border-glam-pink"
                      />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address (for confirmation & directions)"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full p-3 rounded-2xl border border-glam-border bg-glam-page text-xs sm:text-xs font-medium text-glam-plum focus:outline-none focus:border-glam-pink"
                    />
                    <textarea
                      rows={2}
                      placeholder="Special requests or hair questions (optional)"
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      className="w-full p-3 rounded-2xl border border-glam-border bg-glam-page text-xs sm:text-xs font-medium text-glam-plum focus:outline-none focus:border-glam-pink"
                    ></textarea>
                  </div>

                  {bookingError && (
                    <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5 animate-in fade-in duration-150">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div className="flex-1 font-medium">{bookingError}</div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className={`w-full py-4 rounded-full pink-gradient-btn text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 ${
                      bookingLoading ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'hover:shadow-xl hover:scale-[1.01]'
                    }`}
                  >
                    {bookingLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Transmitting to Database...</span>
                      </>
                    ) : (
                      <span>Confirm & Request Appointment</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* KIDS CONSULTATION MODAL */}
      {isKidsModalOpen && (
        <div className="fixed inset-0 z-50 bg-glam-plum/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto overscroll-contain animate-in fade-in duration-200">
          <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden border-t-2 sm:border-2 border-glam-border shadow-2xl max-h-[92dvh] sm:max-h-[85vh] flex flex-col my-0 sm:my-auto">
            {/* Sticky Kids Header */}
            <div className="relative px-5 py-3.5 sm:px-6 sm:py-5 border-b border-glam-border bg-white flex items-center justify-between shrink-0">
              <div className="pr-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100 text-glam-pinkDark text-[11px] font-bold mb-1">
                  <Baby className="w-3.5 h-3.5" /> Gentle Kids Care
                </div>
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-glam-plum">
                  Kids Hair Consultation Call
                </h3>
              </div>

              <button
                type="button"
                onClick={() => { setIsKidsModalOpen(false); setKidsSuccess(false); }}
                className="w-9 h-9 rounded-full bg-glam-page text-glam-plum hover:bg-glam-pink hover:text-white transition-colors flex items-center justify-center shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Kids Body */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-4 flex-1 overscroll-contain">
              {kidsSuccess ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-pink-100 text-glam-pinkDark flex items-center justify-center mx-auto">
                    <Baby className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-glam-plum">Consultation Request Received!</h3>
                  <p className="text-xs sm:text-sm text-glam-mocha max-w-sm mx-auto">
                    Thank you, <strong>{confirmedKidsParent || 'Parent'}</strong>! Kaffy has received your request and will call or WhatsApp you shortly to discuss pricing and schedule your child's appointment.
                  </p>
                  <button
                    onClick={() => { setIsKidsModalOpen(false); setKidsSuccess(false); }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full pink-gradient-btn text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleKidsSubmit} className="space-y-3.5">
                  <p className="text-xs text-glam-mocha leading-relaxed">
                    Because young scalps are sensitive, Kaffy discusses child age, hair length, and desired styles with parents first before setting a custom price and time.
                  </p>

                  <div className="space-y-2.5 pt-1">
                    <input
                      type="text"
                      required
                      placeholder="Parent's Name"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full p-3 rounded-2xl border border-glam-border bg-glam-page text-xs sm:text-xs font-medium text-glam-plum focus:outline-none focus:border-glam-pink"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number for Call / WhatsApp"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      className="w-full p-3 rounded-2xl border border-glam-border bg-glam-page text-xs sm:text-xs font-medium text-glam-plum focus:outline-none focus:border-glam-pink"
                    />
                    <input
                      type="email"
                      placeholder="Parent's Email Address (optional)"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      className="w-full p-3 rounded-2xl border border-glam-border bg-glam-page text-xs sm:text-xs font-medium text-glam-plum focus:outline-none focus:border-glam-pink"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Child's Age (e.g. 4 years old)"
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      className="w-full p-3 rounded-2xl border border-glam-border bg-glam-page text-xs sm:text-xs font-medium text-glam-plum focus:outline-none focus:border-glam-pink"
                    />
                    <textarea
                      rows={2}
                      placeholder="Desired hairstyle, beads, or scalp notes"
                      value={desiredStyle}
                      onChange={(e) => setDesiredStyle(e.target.value)}
                      className="w-full p-3 rounded-2xl border border-glam-border bg-glam-page text-xs sm:text-xs font-medium text-glam-plum focus:outline-none focus:border-glam-pink"
                    ></textarea>
                  </div>

                  {kidsError && (
                    <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5 animate-in fade-in duration-150">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div className="flex-1 font-medium">{kidsError}</div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={kidsLoading}
                    className={`w-full py-3.5 rounded-full pink-gradient-btn text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 ${
                      kidsLoading ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'hover:shadow-lg hover:scale-[1.01]'
                    }`}
                  >
                    {kidsLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Transmitting to Database...</span>
                      </>
                    ) : (
                      <span>Request Phone Consultation</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-glam-plum/85 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setLightboxItem(null)}>
          <div className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden border-2 border-glam-border shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-glam-plum/70 text-white hover:bg-glam-pinkDark transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-[4/3] bg-glam-page overflow-hidden">
              <img src={lightboxItem.src} alt={lightboxItem.title} className="w-full h-full object-contain" />
            </div>
            <div className="p-6 bg-white space-y-3">
              <h3 className="font-serif text-2xl text-glam-plum font-bold">{lightboxItem.title}</h3>
              <p className="text-xs sm:text-sm text-glam-mocha leading-relaxed">{lightboxItem.desc}</p>
              <button
                onClick={() => {
                  setLightboxItem(null);
                  setIsBookingOpen(true);
                  setBookingSuccess(false);
                }}
                className="w-full py-3 rounded-full pink-gradient-btn text-white text-xs font-bold uppercase tracking-wider text-center"
              >
                Book This Hairstyle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
