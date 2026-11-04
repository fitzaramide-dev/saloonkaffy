-- ====================================================================
-- KAFFY SALOON — SUPABASE DATABASE SCHEMA
-- Run this in your Supabase Dashboard -> SQL Editor -> Click 'Run'
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Bookings Table (Stores all client appointment requests)
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    client_clerk_id TEXT, -- User ID from Clerk (if signed in)
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    service_id TEXT NOT NULL, -- e.g. 'knotless-braids'
    service_title TEXT NOT NULL, -- e.g. 'Knotless Braids'
    price NUMERIC(10, 2) NOT NULL, -- Total starting price
    deposit_amount NUMERIC(10, 2) NOT NULL, -- 50% deposit amount
    payment_choice TEXT NOT NULL DEFAULT 'full_at_salon', -- 'deposit_50' OR 'full_at_salon'
    hair_option TEXT NOT NULL DEFAULT 'byoh', -- 'byoh' (bring your own) OR 'in_studio' (buy in studio)
    addons JSONB DEFAULT '[]'::JSONB, -- Array of selected add-on service names
    appointment_date DATE NOT NULL,
    start_time TEXT NOT NULL, -- e.g. '14:00'
    end_time TEXT NOT NULL, -- e.g. '18:00'
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'accepted', 'declined', 'cancelled', 'completed'
    decline_reason TEXT,
    notes TEXT
);

-- 3. Kids Hair Consultations Table (Specialty parent consultation calls)
CREATE TABLE IF NOT EXISTS public.kids_consultations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    parent_name TEXT NOT NULL,
    parent_email TEXT NOT NULL,
    parent_phone TEXT NOT NULL,
    child_age TEXT NOT NULL,
    desired_style TEXT,
    status TEXT NOT NULL DEFAULT 'needs_call', -- 'needs_call', 'called', 'booked', 'closed'
    agreed_price NUMERIC(10, 2),
    notes TEXT
);

-- 4. Blocked Dates / Salon Holidays (Days Kaffy marks herself off)
CREATE TABLE IF NOT EXISTS public.blocked_dates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    blocked_date DATE NOT NULL UNIQUE,
    reason TEXT DEFAULT 'Day Off / Vacation'
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kids_consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_dates ENABLE ROW LEVEL SECURITY;

-- 6. Public Access Policies (Allows website clients to book & Kaffy to manage)
CREATE POLICY "Allow public insert on bookings" 
ON public.bookings FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on bookings" 
ON public.bookings FOR SELECT USING (true);

CREATE POLICY "Allow public update on bookings" 
ON public.bookings FOR UPDATE USING (true);

CREATE POLICY "Allow public insert on kids_consultations" 
ON public.kids_consultations FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on kids_consultations" 
ON public.kids_consultations FOR SELECT USING (true);

CREATE POLICY "Allow public update on kids_consultations" 
ON public.kids_consultations FOR UPDATE USING (true);

CREATE POLICY "Allow public read on blocked_dates" 
ON public.blocked_dates FOR SELECT USING (true);

CREATE POLICY "Allow public insert on blocked_dates" 
ON public.blocked_dates FOR INSERT WITH CHECK (true);
