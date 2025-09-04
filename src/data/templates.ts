export interface Template {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  features: string[];
  style: string;
}

export const templates: Template[] = [
  {
    id: 'starter-blog',
    name: 'Starter Blog',
    description: 'A clean, minimalist blog template perfect for personal writers and content creators.',
    price: 499,
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop',
    features: ['Responsive Design', 'SEO Friendly', 'Contact Form', 'Social Media Links'],
    style: 'Minimalist'
  },
  {
    id: 'portfolio-pro',
    name: 'Portfolio Pro',
    description: 'A sleek, modern portfolio to showcase your creative work with a stunning gallery.',
    price: 1299,
    imageUrl: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=600&h=400&fit=crop',
    features: ['Animated Gallery', 'Project Pages', 'Testimonials Section', 'Dark Mode'],
    style: 'Modern'
  },
  {
    id: 'business-standard',
    name: 'Business Standard',
    description: 'A professional template for small businesses and startups to establish a strong online presence.',
    price: 2499,
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600&h=400&fit=crop',
    features: ['Services Section', 'About Us Page', 'Lead-gen Form', 'Google Maps'],
    style: 'Corporate'
  },
  {
    id: 'ecommerce-plus',
    name: 'E-commerce Plus',
    description: 'A feature-rich e-commerce solution for selling products online with ease.',
    price: 5999,
    imageUrl: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=600&h=400&fit=crop',
    features: ['Product Listings', 'Shopping Cart', 'Payment Gateway Ready', 'Customer Accounts'],
    style: 'E-commerce'
  },
  {
    id: 'agency-premium',
    name: 'Agency Premium',
    description: 'A comprehensive template for digital agencies to showcase services and case studies.',
    price: 12999,
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
    features: ['Case Study Pages', 'Team Showcase', 'Advanced Animations', 'Blog Integration'],
    style: 'Creative'
  },
  {
    id: 'enterprise-suite',
    name: 'Enterprise Suite',
    description: 'A robust, scalable template for large organizations with complex needs.',
    price: 25999,
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
    features: ['Multi-language Support', 'Advanced Security', 'Custom Dashboard', 'API Integrations'],
    style: 'Enterprise'
  }
];
