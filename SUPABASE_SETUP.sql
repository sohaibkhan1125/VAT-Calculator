-- =====================================================
-- Supabase Table Setup for VAT Calculator Website
-- =====================================================
-- Table Name: vat_website
-- Purpose: Store all website content (homepage, footer, settings)
-- =====================================================

-- Create the vat_website table
CREATE TABLE IF NOT EXISTS public.vat_website (
  id SERIAL PRIMARY KEY,
  content_key TEXT UNIQUE NOT NULL,
  content_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.vat_website ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations
-- IMPORTANT: Adjust this policy based on your security requirements
-- This policy allows anonymous access - fine for public content
CREATE POLICY "Allow all operations on vat_website" 
ON public.vat_website 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create index for faster lookups by content_key
CREATE INDEX IF NOT EXISTS idx_content_key ON public.vat_website(content_key);

-- Insert initial content rows with default values
-- These will be populated when you save content from the admin panel
INSERT INTO public.vat_website (content_key, content_value) 
VALUES 
  ('homepage_content', ''),
  ('footer_top_content', ''),
  ('hero_heading', ''),
  ('hero_description', ''),
  ('website_title', 'VATCalc'),
  ('website_logo', ''),
  ('maintenance_mode', 'false'),
  ('social_links', '[]')
ON CONFLICT (content_key) DO NOTHING;

-- =====================================================
-- Verification Query
-- =====================================================
-- Run this to verify the table was created successfully
SELECT * FROM public.vat_website;

-- =====================================================
-- Instructions
-- =====================================================
-- 1. Login to Supabase: https://supabase.com/dashboard/project/deyzyxzqlsyszbmeqiqx
-- 2. Navigate to: SQL Editor (in left sidebar)
-- 3. Click "New Query"
-- 4. Copy and paste this entire file
-- 5. Click "Run" or press F5
-- 6. You should see 8 rows inserted
-- 7. Navigate to Table Editor to verify the vat_website table exists
-- =====================================================
