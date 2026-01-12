"use client"

import { Toaster as HotToaster } from 'react-hot-toast'

export default function Toaster() {
  return (
    <HotToaster
      position="bottom-right"
      reverseOrder={false}
      gutter={8}
      containerClassName="z-[100]"
      toastOptions={{
        duration: 3000,
        style: {
          background: 'white',
          color: '#374151',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          padding: '16px',
          fontSize: '14px',
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: 'white',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: 'white',
          },
        },
      }}
    />
  )
}

// Enhanced mock products with more variety
// export const mockProducts: Product[] = [
//   {
//     id: 'iphone-15-pro',
//     name: 'iPhone 15 Pro Max',
//     description: 'Titanium design with A17 Pro chip. 48MP camera with 5x optical zoom.',
//     price: 1199,
//     originalPrice: 1299,
//     discount: 8,
//     category: 'Smartphone',
//     rating: 4.8,
//     reviews: 1243,
//     isNew: true,
//     isFeatured: true,
//     stock: 25,
//     brand: 'Apple',
//     warranty: '1 Year',
//     delivery: 'Next Day',
//     images: [
//       'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500',
//       'https://images.unsplash.com/photo-1695048133085-2a52bc5d683e?auto=format&fit=crop&w=500'
//     ],
//     colors: ['#8B8B8C', '#F5F5F7', '#FAD7A0'],
//     specs: ['6.7" Super Retina XDR', 'A17 Pro Chip', '48MP Main Camera', '5G', '256GB Storage']
//   },
//   {
//     id: 'samsung-s24',
//     name: 'Samsung Galaxy S24 Ultra',
//     description: 'AI-powered smartphone with built-in S Pen. Snapdragon 8 Gen 3 processor.',
//     price: 1299,
//     category: 'Smartphone',
//     rating: 4.7,
//     reviews: 892,
//     isNew: true,
//     isFeatured: true,
//     stock: 42,
//     brand: 'Samsung',
//     warranty: '2 Years',
//     delivery: '2-3 Days',
//     images: [
//       'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500',
//       'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80'
//     ],
//     colors: ['#000000', '#3D5A80', '#98C1D9'],
//     specs: ['6.8" Dynamic AMOLED 2X', 'Snapdragon 8 Gen 3', '200MP Camera', 'S Pen Included', '512GB']
//   },
//   {
//     id: 'powerbank-100w',
//     name: 'Anker 100W Power Bank',
//     description: 'High-speed charging with 100W output. Charges laptop and phone simultaneously.',
//     price: 129,
//     originalPrice: 159,
//     discount: 19,
//     category: 'Power Bank',
//     rating: 4.6,
//     reviews: 3124,
//     stock: 156,
//     brand: 'Anker',
//     warranty: '18 Months',
//     delivery: 'Same Day',
//     images: [
//       'https://images.unsplash.com/photo-1597758604680-de06e9e6b5f5?auto=format&fit=crop&w=500',
//       'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=500'
//     ],
//     colors: ['#2D3748', '#4A5568'],
//     specs: ['100W Output', '25000mAh', 'PD 3.0', 'Dual USB-C', 'Laptop Charging']
//   },
//   {
//     id: 'macbook-air-m2',
//     name: 'MacBook Air M2',
//     description: 'Supercharged by M2 chip with 13.6" Liquid Retina display. All-day battery life.',
//     price: 1099,
//     category: 'Laptop',
//     rating: 4.9,
//     reviews: 3124,
//     stock: 18,
//     brand: 'Apple',
//     warranty: '1 Year',
//     delivery: 'Next Day',
//     images: [
//       'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500',
//       'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80'
//     ],
//     colors: ['#F5F5F7', '#1D1D1F'],
//     specs: ['M2 Chip', '8GB Unified Memory', '256GB SSD', '13.6" Retina', '18hr Battery']
//   },
//   {
//     id: 'airpods-pro-2',
//     name: 'AirPods Pro (2nd Gen)',
//     description: 'Active Noise Cancellation with Adaptive Audio. MagSafe Charging Case.',
//     price: 249,
//     originalPrice: 299,
//     discount: 17,
//     category: 'Earbuds',
//     rating: 4.6,
//     reviews: 4567,
//     stock: 89,
//     brand: 'Apple',
//     warranty: '1 Year',
//     delivery: 'Next Day',
//     images: [
//       'https://images.unsplash.com/photo-1599660662165-6dffb5c66a4e?auto=format&fit=crop&w=500',
//       'https://images.unsplash.com/photo-1591375278877-2c3b5b54512a?auto=format&fit=crop&w=500'
//     ],
//     colors: ['#F5F5F7'],
//     specs: ['Active Noise Cancellation', 'Adaptive Audio', '6hr Battery', 'MagSafe Case', 'H2 Chip']
//   },
//   {
//     id: 'wireless-charger',
//     name: 'Belkin 3-in-1 Wireless Charger',
//     description: 'Charge iPhone, Apple Watch, and AirPods simultaneously. MagSafe compatible.',
//     price: 149,
//     category: 'Charger',
//     rating: 4.5,
//     reviews: 987,
//     stock: 73,
//     brand: 'Belkin',
//     warranty: '2 Years',
//     delivery: '2-3 Days',
//     images: [
//       'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?auto=format&fit=crop&w=500',
//       'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?auto=format&fit=crop&w=500&q=60'
//     ],
//     specs: ['15W Fast Charging', 'MagSafe Compatible', '3-in-1 Design', 'LED Indicator', 'Apple Certified']
//   },
//   {
//     id: 'gaming-mouse',
//     name: 'Logitech G Pro X Superlight',
//     description: 'Ultra-lightweight gaming mouse with HERO sensor. Perfect for competitive gaming.',
//     price: 129,
//     originalPrice: 149,
//     discount: 13,
//     category: 'Gaming',
//     rating: 4.8,
//     reviews: 2109,
//     stock: 34,
//     brand: 'Logitech',
//     warranty: '2 Years',
//     delivery: 'Same Day',
//     images: [
//       'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=500',
//       'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=500'
//     ],
//     colors: ['#FFFFFF', '#000000', '#FF6B35'],
//     specs: ['63g Ultra-light', 'HERO 25K Sensor', '5 Programmable Buttons', '70hr Battery', 'Lightspeed Wireless']
//   },
//   {
//     id: 'smart-watch',
//     name: 'Apple Watch Ultra 2',
//     description: 'The most rugged and capable Apple Watch for extreme adventures and workouts.',
//     price: 799,
//     category: 'Smartwatch',
//     rating: 4.5,
//     reviews: 987,
//     stock: 28,
//     brand: 'Apple',
//     warranty: '1 Year',
//     delivery: 'Next Day',
//     images: [
//       'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=500',
//       'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=500'
//     ],
//     colors: ['#2D3748', '#4A5568'],
//     specs: ['49mm Titanium Case', 'Always-On Retina', 'GPS + Cellular', '36hr Battery', 'Depth Gauge']
//   },
//   {
//     id: 'portable-monitor',
//     name: 'ASUS ZenScreen Portable Monitor',
//     description: '15.6" USB-C portable monitor for mobile workstations. Perfect for travelers.',
//     price: 299,
//     originalPrice: 349,
//     discount: 14,
//     category: 'Monitor',
//     rating: 4.4,
//     reviews: 567,
//     stock: 52,
//     brand: 'ASUS',
//     warranty: '3 Years',
//     delivery: '3-5 Days',
//     images: [
//       'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500',
//       'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=500'
//     ],
//     specs: ['15.6" IPS', 'USB-C Power', '780g Weight', 'Smart Case Stand', 'HDR Support']
//   },
//   {
//     id: 'keyboard-mechanical',
//     name: 'Keychron K8 Pro Mechanical Keyboard',
//     description: 'Wireless mechanical keyboard with hot-swappable switches and RGB backlight.',
//     price: 99,
//     category: 'Keyboard',
//     rating: 4.7,
//     reviews: 892,
//     stock: 67,
//     brand: 'Keychron',
//     warranty: '1 Year',
//     delivery: '2-3 Days',
//     images: [
//       'https://images.unsplash.com/photo-1595225475487-2e1c8db3b82c?auto=format&fit=crop&w=500',
//       'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500'
//     ],
//     colors: ['#1A202C', '#2D3748'],
//     specs: ['Gateron Switches', 'Hot-swappable', 'RGB Backlight', 'Bluetooth 5.1', '4000mAh Battery']
//   },
//   {
//     id: 'webcam-4k',
//     name: 'Logitech Brio 4K Webcam',
//     description: '4K Ultra HD webcam with HDR and Windows Hello facial recognition.',
//     price: 199,
//     originalPrice: 249,
//     discount: 20,
//     category: 'Webcam',
//     rating: 4.6,
//     reviews: 1234,
//     stock: 41,
//     brand: 'Logitech',
//     warranty: '2 Years',
//     delivery: 'Same Day',
//     images: [
//       'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=500',
//       'https://images.unsplash.com/photo-1590602847867-6d3f4c8d6c2a?auto=format&fit=crop&w=500'
//     ],
//     specs: ['4K Ultra HD', 'HDR Support', 'Windows Hello', 'Autofocus', 'Noise Reduction']
//   },
//   {
//     id: 'external-ssd',
//     name: 'Samsung T7 Shield SSD 2TB',
//     description: 'Portable SSD with rugged design, IP65 rating, and 1050MB/s transfer speeds.',
//     price: 149,
//     category: 'Storage',
//     rating: 4.8,
//     reviews: 2987,
//     stock: 124,
//     brand: 'Samsung',
//     warranty: '3 Years',
//     delivery: 'Next Day',
//     images: [
//       'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=500',
//       'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500'
//     ],
//     colors: ['#2D3748', '#4A5568'],
//     specs: ['2TB Capacity', '1050MB/s Read', 'IP65 Water Resistant', 'USB 3.2 Gen2', 'Compact Design']
//   },
//   {
//     id: 'playstation-5',
//     name: 'PlayStation 5 Digital Edition',
//     description: 'Next-gen gaming console with ultra-high speed SSD and immersive gaming experiences.',
//     price: 399,
//     originalPrice: 449,
//     discount: 11,
//     category: 'Gaming Console',
//     rating: 4.9,
//     reviews: 6543,
//     stock: 15,
//     brand: 'Sony',
//     warranty: '1 Year',
//     delivery: '3-5 Days',
//     images: [
//       'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=500',
//       'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=500'
//     ],
//     specs: ['825GB SSD', '4K Gaming', 'Ray Tracing', 'Digital Edition', 'DualSense Controller']
//   },
//   {
//     id: 'noise-cancelling-headphones',
//     name: 'Sony WH-1000XM5',
//     description: 'Industry-leading noise cancellation with 30-hour battery life and voice assistant.',
//     price: 399,
//     category: 'Headphones',
//     rating: 4.8,
//     reviews: 5678,
//     stock: 82,
//     brand: 'Sony',
//     warranty: '2 Years',
//     delivery: 'Next Day',
//     images: [
//       'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500',
//       'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500'
//     ],
//     colors: ['#000000', '#2D3748'],
//     specs: ['Industry ANC', '30hr Battery', 'Touch Controls', 'Hi-Res Audio', 'Voice Assistant']
//   },
//   {
//     id: 'portable-projector',
//     name: 'XGIMI MoGo 2 Pro Portable Projector',
//     description: '1080p portable projector with Android TV, auto focus, and built-in battery.',
//     price: 599,
//     originalPrice: 699,
//     discount: 14,
//     category: 'Projector',
//     rating: 4.5,
//     reviews: 432,
//     stock: 23,
//     brand: 'XGIMI',
//     warranty: '2 Years',
//     delivery: '3-5 Days',
//     images: [
//       'https://images.unsplash.com/photo-1561930661-b36c5b7a6dcf?auto=format&fit=crop&w=500',
//       'https://images.unsplash.com/photo-1561930661-b36c5b7a6dcf?auto=format&fit=crop&w=500&q=80'
//     ],
//     specs: ['1080p Native', 'Android TV 11', 'Auto Focus', 'Built-in Battery', 'Harmon Kardon Sound']
//   },
//   {
//     id: 'smart-home-hub',
//     name: 'Google Nest Hub (2nd Gen)',
//     description: '7" smart display with Google Assistant, sleep sensing, and hands-free control.',
//     price: 99,
//     category: 'Smart Home',
//     rating: 4.4,
//     reviews: 2890,
//     stock: 156,
//     brand: 'Google',
//     warranty: '1 Year',
//     delivery: 'Same Day',
//     images: [
//       'https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?auto=format&fit=crop&w=500',
//       'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=500'
//     ],
//     colors: ['#F5F5F7', '#2D3748'],
//     specs: ['7" Display', 'Google Assistant', 'Sleep Sensing', 'Hands-free Control', 'Streaming Apps']
//   }
// ]