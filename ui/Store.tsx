"use client"

import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import Toaster from '@/components/Toaster'
import { FiFilter, FiGrid, FiList, FiChevronDown, FiTrendingUp, FiHeart, FiX, FiCheck } from 'react-icons/fi'

// Define Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  rating: number;
  reviews: number;
  likes: number;
  isNew?: boolean;
  isFeatured?: boolean;
  images: string[];
  specs: string[];
  stock: number;
  brand: string;
  warranty: string;
  delivery: string;
  colors?: string[];
}

// Enhanced mock products with more variety - all prices converted to Naira (1 USD = 1500 NGN)
const mockProducts: Product[] = [
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro Max',
    description: 'Titanium design with A17 Pro chip. 48MP camera with 5x optical zoom.',
    price: 1798500,
    originalPrice: 1948500,
    discount: 8,
    category: 'Smartphone',
    rating: 4.8,
    reviews: 1243,
    likes: 245,
    isNew: true,
    isFeatured: true,
    stock: 25,
    brand: 'Apple',
    warranty: '1 Year',
    delivery: 'Next Day',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1695048133085-2a52bc5d683e?auto=format&fit=crop&w=500'
    ],
    colors: ['#8B8B8C', '#F5F5F7', '#FAD7A0'],
    specs: ['6.7" Super Retina XDR', 'A17 Pro Chip', '48MP Main Camera', '5G', '256GB Storage']
  },
  {
    id: 'samsung-s24',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'AI-powered smartphone with built-in S Pen. Snapdragon 8 Gen 3 processor.',
    price: 1948500,
    category: 'Smartphone',
    rating: 4.7,
    reviews: 892,
    likes: 189,
    isNew: true,
    isFeatured: true,
    stock: 42,
    brand: 'Samsung',
    warranty: '2 Years',
    delivery: '2-3 Days',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80'
    ],
    colors: ['#000000', '#3D5A80', '#98C1D9'],
    specs: ['6.8" Dynamic AMOLED 2X', 'Snapdragon 8 Gen 3', '200MP Camera', 'S Pen Included', '512GB']
  },
  {
    id: 'powerbank-100w',
    name: 'Anker 100W Power Bank',
    description: 'High-speed charging with 100W output. Charges laptop and phone simultaneously.',
    price: 193500,
    originalPrice: 238500,
    discount: 19,
    category: 'Power Bank',
    rating: 4.6,
    reviews: 3124,
    likes: 456,
    stock: 156,
    brand: 'Anker',
    warranty: '18 Months',
    delivery: 'Same Day',
    images: [
      'https://images.unsplash.com/photo-1597758604680-de06e9e6b5f5?auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=500'
    ],
    colors: ['#2D3748', '#4A5568'],
    specs: ['100W Output', '25000mAh', 'PD 3.0', 'Dual USB-C', 'Laptop Charging']
  },
  {
    id: 'macbook-air-m2',
    name: 'MacBook Air M2',
    description: 'Supercharged by M2 chip with 13.6" Liquid Retina display. All-day battery life.',
    price: 1648500,
    category: 'Laptop',
    rating: 4.9,
    reviews: 3124,
    likes: 312,
    stock: 18,
    brand: 'Apple',
    warranty: '1 Year',
    delivery: 'Next Day',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80'
    ],
    colors: ['#F5F5F7', '#1D1D1F'],
    specs: ['M2 Chip', '8GB Unified Memory', '256GB SSD', '13.6" Retina', '18hr Battery']
  },
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro (2nd Gen)',
    description: 'Active Noise Cancellation with Adaptive Audio. MagSafe Charging Case.',
    price: 373500,
    originalPrice: 448500,
    discount: 17,
    category: 'Earbuds',
    rating: 4.6,
    reviews: 4567,
    likes: 567,
    stock: 89,
    brand: 'Apple',
    warranty: '1 Year',
    delivery: 'Next Day',
    images: [
      'https://images.unsplash.com/photo-1599660662165-6dffb5c66a4e?auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1591375278877-2c3b5b54512a?auto=format&fit=crop&w=500'
    ],
    colors: ['#F5F5F7'],
    specs: ['Active Noise Cancellation', 'Adaptive Audio', '6hr Battery', 'MagSafe Case', 'H2 Chip']
  },
  {
    id: 'wireless-charger',
    name: 'Belkin 3-in-1 Wireless Charger',
    description: 'Charge iPhone, Apple Watch, and AirPods simultaneously. MagSafe compatible.',
    price: 223500,
    category: 'Charger',
    rating: 4.5,
    reviews: 987,
    likes: 234,
    stock: 73,
    brand: 'Belkin',
    warranty: '2 Years',
    delivery: '2-3 Days',
    images: [
      'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?auto=format&fit=crop&w=500&q=60'
    ],
    specs: ['15W Fast Charging', 'MagSafe Compatible', '3-in-1 Design', 'LED Indicator', 'Apple Certified']
  },
  {
    id: 'gaming-mouse',
    name: 'Logitech G Pro X Superlight',
    description: 'Ultra-lightweight gaming mouse with HERO sensor. Perfect for competitive gaming.',
    price: 193500,
    originalPrice: 223500,
    discount: 13,
    category: 'Gaming',
    rating: 4.8,
    reviews: 2109,
    likes: 345,
    stock: 34,
    brand: 'Logitech',
    warranty: '2 Years',
    delivery: 'Same Day',
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=500'
    ],
    colors: ['#FFFFFF', '#000000', '#FF6B35'],
    specs: ['63g Ultra-light', 'HERO 25K Sensor', '5 Programmable Buttons', '70hr Battery', 'Lightspeed Wireless']
  },
  {
    id: 'smart-watch',
    name: 'Apple Watch Ultra 2',
    description: 'The most rugged and capable Apple Watch for extreme adventures and workouts.',
    price: 1198500,
    category: 'Smartwatch',
    rating: 4.5,
    reviews: 987,
    likes: 178,
    stock: 28,
    brand: 'Apple',
    warranty: '1 Year',
    delivery: 'Next Day',
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=500'
    ],
    colors: ['#2D3748', '#4A5568'],
    specs: ['49mm Titanium Case', 'Always-On Retina', 'GPS + Cellular', '36hr Battery', 'Depth Gauge']
  },
  {
    id: 'portable-monitor',
    name: 'ASUS ZenScreen Portable Monitor',
    description: '15.6" USB-C portable monitor for mobile workstations. Perfect for travelers.',
    price: 448500,
    originalPrice: 523500,
    discount: 14,
    category: 'Monitor',
    rating: 4.4,
    reviews: 567,
    likes: 89,
    stock: 52,
    brand: 'ASUS',
    warranty: '3 Years',
    delivery: '3-5 Days',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=500'
    ],
    specs: ['15.6" IPS', 'USB-C Power', '780g Weight', 'Smart Case Stand', 'HDR Support']
  },
  {
    id: 'keyboard-mechanical',
    name: 'Keychron K8 Pro Mechanical Keyboard',
    description: 'Wireless mechanical keyboard with hot-swappable switches and RGB backlight.',
    price: 148500,
    category: 'Keyboard',
    rating: 4.7,
    reviews: 892,
    likes: 167,
    stock: 67,
    brand: 'Redmi',
    warranty: '1 Year',
    delivery: '2-3 Days',
    images: [
      'https://images.unsplash.com/photo-1595225475487-2e1c8db3b82c?auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500'
    ],
    colors: ['#1A202C', '#2D3748'],
    specs: ['Gateron Switches', 'Hot-swappable', 'RGB Backlight', 'Bluetooth 5.1', '4000mAh Battery']
  },
  {
    id: 'webcam-4k',
    name: 'Logitech Brio 4K Webcam',
    description: '4K Ultra HD webcam with HDR and Windows Hello facial recognition.',
    price: 298500,
    originalPrice: 373500,
    discount: 20,
    category: 'Webcam',
    rating: 4.6,
    reviews: 1234,
    likes: 256,
    stock: 41,
    brand: 'Vivo',
    warranty: '2 Years',
    delivery: 'Same Day',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1590602847867-6d3f4c8d6c2a?auto=format&fit=crop&w=500'
    ],
    specs: ['4K Ultra HD', 'HDR Support', 'Windows Hello', 'Autofocus', 'Noise Reduction']
  },
  {
    id: 'external-ssd',
    name: 'Samsung T7 Shield SSD 2TB',
    description: 'Portable SSD with rugged design, IP65 rating, and 1050MB/s transfer speeds.',
    price: 223500,
    category: 'Storage',
    rating: 4.8,
    reviews: 2987,
    likes: 456,
    stock: 124,
    brand: 'Samsung',
    warranty: '3 Years',
    delivery: 'Next Day',
    images: [
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500'
    ],
    colors: ['#2D3748', '#4A5568'],
    specs: ['2TB Capacity', '1050MB/s Read', 'IP65 Water Resistant', 'USB 3.2 Gen2', 'Compact Design']
  },
  {
    id: 'playstation-5',
    name: 'PlayStation 5 Digital Edition',
    description: 'Next-gen gaming console with ultra-high speed SSD and immersive gaming experiences.',
    price: 598500,
    originalPrice: 673500,
    discount: 11,
    category: 'Gaming Console',
    rating: 4.9,
    reviews: 6543,
    likes: 789,
    stock: 15,
    brand: 'Sony',
    warranty: '1 Year',
    delivery: '3-5 Days',
    images: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=500'
    ],
    specs: ['825GB SSD', '4K Gaming', 'Ray Tracing', 'Digital Edition', 'DualSense Controller']
  },
  {
    id: 'noise-cancelling-headphones',
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise cancellation with 30-hour battery life and voice assistant.',
    price: 598500,
    category: 'Headphones',
    rating: 4.8,
    reviews: 5678,
    likes: 678,
    stock: 82,
    brand: 'Sony',
    warranty: '2 Years',
    delivery: 'Next Day',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500'
    ],
    colors: ['#000000', '#2D3748'],
    specs: ['Industry ANC', '30hr Battery', 'Touch Controls', 'Hi-Res Audio', 'Voice Assistant']
  },
  {
    id: 'portable-projector',
    name: 'XGIMI MoGo 2 Pro Portable Projector',
    description: '1080p portable projector with Android TV, auto focus, and built-in battery.',
    price: 898500,
    originalPrice: 1048500,
    discount: 14,
    category: 'Projector',
    rating: 4.5,
    reviews: 432,
    likes: 123,
    stock: 23,
    brand: 'Oppo',
    warranty: '2 Years',
    delivery: '3-5 Days',
    images: [
      'https://images.unsplash.com/photo-1561930661-b36c5b7a6dcf?auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1561930661-b36c5b7a6dcf?auto=format&fit=crop&w=500&q=80'
    ],
    specs: ['1080p Native', 'Android TV 11', 'Auto Focus', 'Built-in Battery', 'Harmon Kardon Sound']
  },
  {
    id: 'smart-home-hub',
    name: 'Google Nest Hub (2nd Gen)',
    description: '7" smart display with Google Assistant, sleep sensing, and hands-free control.',
    price: 148500,
    category: 'Smart Home',
    rating: 4.4,
    reviews: 2890,
    likes: 456,
    stock: 156,
    brand: 'Google',
    warranty: '1 Year',
    delivery: 'Same Day',
    images: [
      'https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=500'
    ],
    colors: ['#F5F5F7', '#2D3748'],
    specs: ['7" Display', 'Google Assistant', 'Sleep Sensing', 'Hands-free Control', 'Streaming Apps']
  }
]

export default function StorePageUi() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [categories, setCategories] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>('featured')
  const [priceRange, setPriceRange] = useState<number>(2250000) // Single price range: up to ₦2,250,000 (was $1500)
  const [cartCount, setCartCount] = useState<number>(0)
  const [likesCount, setLikesCount] = useState<number>(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)

  useEffect(() => {
    // Extract unique categories
    const uniqueCategories = ['all', ...new Set(mockProducts.map(p => p.category))]
    setCategories(uniqueCategories)
    
    // Extract unique brands
    const uniqueBrands = ['All', ...new Set(mockProducts.map(p => p.brand))]
    setBrands(uniqueBrands)
    
    // Load cart count from localStorage
    updateCartCount()
    
    // Load likes count from localStorage
    updateLikesCount()
    
    // Listen for cart updates
    window.addEventListener('samkay-update-cart', updateCartCount)
    window.addEventListener('samkay-update-likes', updateLikesCount)
    
    return () => {
      window.removeEventListener('samkay-update-cart', updateCartCount)
      window.removeEventListener('samkay-update-likes', updateLikesCount)
    }
  }, [])

  const updateCartCount = () => {
    const savedCart = JSON.parse(localStorage.getItem('samkay-cart') || '[]')
    const count = savedCart.reduce((total: number, item: any) => total + (item.quantity || 1), 0)
    setCartCount(count)
  }

  const updateLikesCount = () => {
    const likedProducts = JSON.parse(localStorage.getItem('samkay-product-likes') || '[]')
    setLikesCount(likedProducts.length)
  }

  useEffect(() => {
    let filtered = [...products]

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Filter by selected brands (exclude 'All' from brands array)
    const brandFilter = selectedBrands.filter(brand => brand !== 'All')
    if (brandFilter.length > 0) {
      filtered = filtered.filter(p => brandFilter.includes(p.brand))
    }

    // Filter by price range (price and below)
    filtered = filtered.filter(p => p.price <= priceRange)

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'discount':
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0))
        break
      case 'likes':
        filtered.sort((a, b) => b.likes - a.likes)
        break
      default:
        // Featured: New and featured items first
        filtered.sort((a, b) => {
          const aScore = (a.isFeatured ? 3 : 0) + (a.isNew ? 2 : 0) + (a.discount ? 1 : 0)
          const bScore = (b.isFeatured ? 3 : 0) + (b.isNew ? 2 : 0) + (b.discount ? 1 : 0)
          return bScore - aScore
        })
    }

    setFilteredProducts(filtered)
  }, [selectedCategory, selectedBrands, sortBy, priceRange, products])

  const handleAddToCart = (product: Product) => {
    const savedCart = JSON.parse(localStorage.getItem('samkay-cart') || '[]')
    
    // Check if product already in cart
    const existingIndex = savedCart.findIndex((item: any) => item.id === product.id)
    
    if (existingIndex >= 0) {
      // Increment quantity
      savedCart[existingIndex].quantity += 1
    } else {
      // Add new item
      savedCart.push({
        ...product,
        quantity: 1,
        addedAt: new Date().toISOString()
      })
    }
    
    localStorage.setItem('samkay-cart', JSON.stringify(savedCart))
    updateCartCount()
    
    // Dispatch event for header to update
    window.dispatchEvent(new Event('samkay-update-cart'))
  }

  const toggleBrand = (brand: string) => {
    if (brand === 'All') {
      // If "All" is clicked, clear all other brands and select only "All"
      setSelectedBrands(['All'])
    } else {
      // Remove "All" from selection if any specific brand is selected
      const updatedBrands = selectedBrands.filter(b => b !== 'All')
      
      if (updatedBrands.includes(brand)) {
        // Remove brand if already selected
        setSelectedBrands(updatedBrands.filter(b => b !== brand))
      } else {
        // Add brand if not selected
        setSelectedBrands([...updatedBrands, brand])
      }
    }
  }

  const clearAllFilters = () => {
    setSelectedCategory('all')
    setSelectedBrands(['All'])
    setPriceRange(2250000)
    setSortBy('featured')
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Toaster />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-700 to-gray-900">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="container mx-auto px-4 py-6 md:py-10 relative">
          <div className="pt-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <FiTrendingUp className="text-yellow-300 font-semibold" />
              <span className="text-white text-sm font-medium">Trending Products</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black mb-4 text-yellow-300">
              Premium Phones & Gadgets
            </h1>
            <p className="text-sm md:text-base text-white/90 mb-8">
              Discover cutting-edge technology, from flagship smartphones to essential gadgets. 
              Experience innovation with exclusive deals.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="text-sm bg-gradient-to-r from-red-500 to-red-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
                <FiHeart className="text-white" /> 
                {likesCount} Products Liked
              </div>
              <div className="text-sm bg-black/20 backdrop-blur-sm text-white font-bold px-6 py-3 rounded-lg border border-white/30 flex items-center gap-2">
                🛒 {cartCount} in Cart
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <FiFilter size={18} />
                  Filters
                  <FiChevronDown className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className="hidden md:flex flex-wrap gap-2">
                  {categories.slice(0, 5).map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category === 'all' ? 'All' : category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-amber-100 text-amber-600' : 'text-gray-500'}`}
                >
                  <FiGrid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-amber-100 text-amber-600' : 'text-gray-500'}`}
                >
                  <FiList size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-300 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Best Discount</option>
                  <option value="likes">Most Liked</option>
                </select>
              </div>
              
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-amber-100 text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <FiGrid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-amber-100 text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <FiList size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Expanded Filters */}
          {isFilterOpen && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                          selectedCategory === category
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category === 'all' ? 'All Products' : category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Price Range: Up to ₦{priceRange.toLocaleString()}</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="4500000"
                        step="50000"
                        value={priceRange}
                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">₦0</span>
                      <span className="text-sm text-gray-600">₦4,500,000</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Brand</h4>
                  <div className="flex flex-wrap gap-2">
                    {brands.map(brand => {
                      const isSelected = selectedBrands.includes(brand)
                      return (
                        <button
                          key={brand}
                          onClick={() => toggleBrand(brand)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                            isSelected
                              ? 'bg-amber-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {isSelected && <FiCheck size={12} />}
                          {brand}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to find what you're looking for.</p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of{' '}
                <span className="font-semibold text-gray-900">{products.length}</span> products
              </p>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <FiHeart className="text-red-500" /> {likesCount} liked
                </div>
                <div className="text-sm text-gray-500">
                  🛒 {cartCount} items in cart
                </div>
              </div>
            </div>
            
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
            
            {/* Pagination would go here */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700">
                  3
                </button>
                <span className="text-gray-500">...</span>
                <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700">
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <p className="text-gray-300">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <p className="text-gray-300">Customer Support</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">1-2 Years </div>
              <p className="text-gray-300">Warranty Policy</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">Free</div>
              <p className="text-gray-300">Shipping Over ₦475,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

