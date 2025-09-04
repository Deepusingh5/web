/*
          # [Initial Schema Setup]
          This migration sets up the core database structure for the Cabbieo Web Service application. It creates tables for templates, orders, and inquiries, populates initial data, and establishes essential security policies.

          ## Query Description: [This script is foundational and should be run on a new project. It creates new tables and does not alter existing data, but it is critical for the application's functionality. Ensure your Supabase project is empty or backed up before running.]
          
          ## Metadata:
          - Schema-Category: ["Structural"]
          - Impact-Level: ["High"]
          - Requires-Backup: [true]
          - Reversible: [false]
          
          ## Structure Details:
          - Tables Created: templates, orders, inquiries
          - Types Created: order_status, inquiry_type
          - RLS Policies: Enabled on all tables. Public read on templates, admin-only on others.
          
          ## Security Implications:
          - RLS Status: [Enabled]
          - Policy Changes: [Yes]
          - Auth Requirements: [Admin actions require an authenticated role.]
          
          ## Performance Impact:
          - Indexes: [Primary keys are indexed automatically.]
          - Triggers: [None]
          - Estimated Impact: [Low on a new project.]
*/

-- 1. Create custom types for status fields
CREATE TYPE public.order_status AS ENUM ('Pending', 'Confirmed', 'Delivered', 'Returned');
CREATE TYPE public.inquiry_type AS ENUM ('form', 'voice');

-- 2. Create the 'templates' table
CREATE TABLE public.templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    image_url TEXT,
    features TEXT[],
    style TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create the 'orders' table
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT,
    customer_email TEXT,
    template_id UUID REFERENCES public.templates(id),
    status public.order_status DEFAULT 'Pending',
    total NUMERIC NOT NULL,
    payment_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create the 'inquiries' table
CREATE TABLE public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    type public.inquiry_type NOT NULL,
    subject TEXT,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies
-- Templates: Publicly readable, but only authenticated users (admins) can modify.
CREATE POLICY "Public can read templates" ON public.templates FOR SELECT USING (true);
CREATE POLICY "Admins can manage templates" ON public.templates FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Orders: Only authenticated users (admins) can access.
CREATE POLICY "Admins can manage orders" ON public.orders FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Inquiries: Only authenticated users (admins) can access.
CREATE POLICY "Admins can manage inquiries" ON public.inquiries FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- 7. Insert initial data into the 'templates' table
INSERT INTO public.templates (name, description, price, image_url, features, style) VALUES
('Starter Blog', 'A clean, minimalist blog template perfect for personal writers and content creators.', 499, 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop', '{"Responsive Design", "SEO Friendly", "Contact Form", "Social Media Links"}', 'Minimalist'),
('Portfolio Pro', 'A sleek, modern portfolio to showcase your creative work with a stunning gallery.', 1299, 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=600&h=400&fit=crop', '{"Animated Gallery", "Project Pages", "Testimonials Section", "Dark Mode"}', 'Modern'),
('Business Standard', 'A professional template for small businesses and startups to establish a strong online presence.', 2499, 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600&h=400&fit=crop', '{"Services Section", "About Us Page", "Lead-gen Form", "Google Maps"}', 'Corporate'),
('E-commerce Plus', 'A feature-rich e-commerce solution for selling products online with ease.', 5999, 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=600&h=400&fit=crop', '{"Product Listings", "Shopping Cart", "Payment Gateway Ready", "Customer Accounts"}', 'E-commerce'),
('Agency Premium', 'A comprehensive template for digital agencies to showcase services and case studies.', 12999, 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop', '{"Case Study Pages", "Team Showcase", "Advanced Animations", "Blog Integration"}', 'Creative'),
('Enterprise Suite', 'A robust, scalable template for large organizations with complex needs.', 25999, 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop', '{"Multi-language Support", "Advanced Security", "Custom Dashboard", "API Integrations"}', 'Enterprise');
