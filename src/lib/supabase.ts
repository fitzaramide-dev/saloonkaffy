import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export interface Booking {
  id: string;
  created_at: string;
  client_clerk_id?: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  service_id: string;
  service_title: string;
  price: number;
  deposit_amount: number;
  payment_choice: 'deposit_50' | 'full_at_salon';
  hair_option: 'byoh' | 'in_studio';
  addons: string[];
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'accepted' | 'declined' | 'cancelled' | 'completed';
  decline_reason?: string;
  notes?: string;
}

export interface KidsConsultation {
  id: string;
  created_at: string;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  child_age: string;
  desired_style?: string;
  status: 'needs_call' | 'called' | 'booked' | 'closed';
  agreed_price?: number;
  notes?: string;
}
