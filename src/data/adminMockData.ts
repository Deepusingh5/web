export interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  templateName: string;
  date: string;
  status: 'Pending' | 'Confirmed' | 'Delivered' | 'Returned';
  total: number;
}

export const mockOrders: Order[] = [
  { id: 'ORD-2401', customer: { name: 'Aarav Sharma', email: 'aarav.s@example.com' }, templateName: 'Business Standard', date: '2025-07-20', status: 'Delivered', total: 2499 },
  { id: 'ORD-2402', customer: { name: 'Priya Patel', email: 'priya.p@example.com' }, templateName: 'E-commerce Plus', date: '2025-07-19', status: 'Confirmed', total: 5999 },
  { id: 'ORD-2403', customer: { name: 'Rohan Gupta', email: 'rohan.g@example.com' }, templateName: 'Starter Blog', date: '2025-07-19', status: 'Pending', total: 499 },
  { id: 'ORD-2404', customer: { name: 'Sneha Reddy', email: 'sneha.r@example.com' }, templateName: 'Portfolio Pro', date: '2025-07-18', status: 'Delivered', total: 1299 },
  { id: 'ORD-2405', customer: { name: 'Vikram Singh', email: 'vikram.s@example.com' }, templateName: 'Agency Premium', date: '2025-07-17', status: 'Returned', total: 12999 },
  { id: 'ORD-2406', customer: { name: 'Ananya Iyer', email: 'ananya.i@example.com' }, templateName: 'Business Standard', date: '2025-07-16', status: 'Delivered', total: 2499 },
  { id: 'ORD-2407', customer: { name: 'Karan Malhotra', email: 'karan.m@example.com' }, templateName: 'Enterprise Suite', date: '2025-07-15', status: 'Confirmed', total: 25999 },
  { id: 'ORD-2408', customer: { name: 'Meera Desai', email: 'meera.d@example.com' }, templateName: 'Starter Blog', date: '2025-07-14', status: 'Delivered', total: 499 },
];

export interface Inquiry {
    id: string;
    name: string;
    type: 'form' | 'voice' | 'chat';
    subject: string;
    date: string;
    status: 'Pending' | 'Resolved';
    content: string;
    messages?: { sender: 'user' | 'admin', text: string, time: string }[];
}

export const mockInquiries: Inquiry[] = [
    { id: 'INQ-101', name: 'Alok Nath', type: 'form', subject: 'Question about E-commerce', date: '2025-07-20', status: 'Pending', content: 'I want to know if you can integrate a custom payment gateway for my e-commerce store.' },
    { id: 'INQ-102', name: 'Sunita Williams', type: 'voice', subject: 'Voice Note (0:45)', date: '2025-07-19', status: 'Pending', content: 'audio_blob_placeholder.mp3' },
    { id: 'CHAT-103', name: 'Rajesh Kumar', type: 'chat', subject: 'Live Chat Session', date: '2025-07-19', status: 'Resolved', content: 'Chat history...', messages: [
        { sender: 'user', text: 'Hi, I need help with my website.', time: '10:30 AM' },
        { sender: 'admin', text: 'Hello Rajesh, how can I assist you?', time: '10:31 AM' },
        { sender: 'user', text: 'My contact form is not working.', time: '10:32 AM' },
        { sender: 'admin', text: 'I see. Let me check the configuration. It should be fixed now.', time: '10:35 AM' },
        { sender: 'user', text: 'Wow, that was fast! Thank you!', time: '10:36 AM' },
    ]},
    { id: 'INQ-104', name: 'Fatima Sheikh', type: 'form', subject: 'Quote for Agency Website', date: '2025-07-18', status: 'Resolved', content: 'Please provide a quote for the Agency Premium template with custom branding.' },
];
