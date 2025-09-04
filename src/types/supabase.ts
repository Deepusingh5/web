export interface Template {
  id: string;
  created_at: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  features: string[];
  style: string;
}

export interface Order {
  id: number;
  created_at: string;
  order_id: string;
  customer_name: string;
  customer_email: string;
  template_id: string;
  template_name: string;
  status: 'Pending' | 'Confirmed' | 'Delivered' | 'Returned';
  total: number;
}

export interface Inquiry {
  id: number;
  created_at: string;
  name: string;
  email?: string;
  type: 'form' | 'voice' | 'chat';
  subject: string;
  status: 'Pending' | 'Resolved';
  content: string; // For form messages or voice note URL
}
