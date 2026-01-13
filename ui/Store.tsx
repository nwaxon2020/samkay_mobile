"use client"

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
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

// Mock products data
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
    name: 'Oppo 100W Power Bank',
    description: 'High-speed charging with 100W output. Charges laptop and phone simultaneously.',
    price: 193500,
    originalPrice: 238500,
    discount: 19,
    category: 'Power Bank',
    rating: 4.6,
    reviews: 3124,
    likes: 456,
    stock: 156,
    brand: 'Oppo',
    warranty: '18 Months',
    delivery: 'Same Day',
    images: [
      'https://images.philips.com/is/image/philipsconsumer/6b679765189446f4b3aab0bf00788c3b?$pnglarge$&wid=960',
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
  }
]

export default function StorePageUi() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSearch = searchParams.get('search')
  const currentCategory = searchParams.get('category')

  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [categories, setCategories] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>('featured')
  const [priceRange, setPriceRange] = useState<number>(2250000)
  const [cartCount, setCartCount] = useState<number>(0)
  const [likesCount, setLikesCount] = useState<number>(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)

  // Pagination States
  const [currentPage, setCurrentPage] = useState<number>(1)
  const productsPerPage = 16

  // Listen for category updates from URL (Sidebar navigation)
  useEffect(() => {
    if (currentCategory) {
      setSelectedCategory(currentCategory);
    }
  }, [currentCategory])

  useEffect(() => {
    const uniqueCategories = ['all', ...new Set(mockProducts.map(p => p.category))]
    setCategories(uniqueCategories)
    const uniqueBrands = ['All', ...new Set(mockProducts.map(p => p.brand))]
    setBrands(uniqueBrands)
    
    // --- GLOBAL CLEANUP LOGIC ---
    const syncLikesWithStore = () => {
      const savedLikes = JSON.parse(localStorage.getItem('samkay-product-likes') || '[]')
      const currentIds = mockProducts.map(p => p.id)
      
      // Remove IDs that don't exist in mockProducts
      const validLikes = savedLikes.filter((id: string) => currentIds.includes(id))
      
      if (validLikes.length !== savedLikes.length) {
        localStorage.setItem('samkay-product-likes', JSON.stringify(validLikes))
      }
    }
    syncLikesWithStore()
    // ----------------------------

    updateCartCount()
    updateLikesCount()
    
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

    // Search filter
    if (currentSearch) {
      const query = currentSearch.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.brand.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Brand filter
    const brandFilter = selectedBrands.filter(brand => brand !== 'All')
    if (brandFilter.length > 0) {
      filtered = filtered.filter(p => brandFilter.includes(p.brand))
    }

    // Price filter
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
        filtered.sort((a, b) => {
          const aScore = (a.isFeatured ? 3 : 0) + (a.isNew ? 2 : 0) + (a.discount ? 1 : 0)
          const bScore = (b.isFeatured ? 3 : 0) + (b.isNew ? 2 : 0) + (b.discount ? 1 : 0)
          return bScore - aScore
        })
    }

    setFilteredProducts(filtered)
    setCurrentPage(1) // Reset to page 1 whenever filters change
  }, [selectedCategory, selectedBrands, sortBy, priceRange, products, currentSearch])

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const handleAddToCart = (product: Product) => {
    const savedCart = JSON.parse(localStorage.getItem('samkay-cart') || '[]')
    const existingIndex = savedCart.findIndex((item: any) => item.id === product.id)
    if (existingIndex >= 0) {
      savedCart[existingIndex].quantity += 1
    } else {
      savedCart.push({
        ...product,
        quantity: 1,
        addedAt: new Date().toISOString()
      })
    }
    localStorage.setItem('samkay-cart', JSON.stringify(savedCart))
    updateCartCount()
    window.dispatchEvent(new Event('samkay-update-cart'))
  }

  const toggleBrand = (brand: string) => {
    if (brand === 'All') {
      setSelectedBrands(['All'])
    } else {
      const updatedBrands = selectedBrands.filter(b => b !== 'All')
      if (updatedBrands.includes(brand)) {
        setSelectedBrands(updatedBrands.filter(b => b !== brand))
      } else {
        setSelectedBrands([...updatedBrands, brand])
      }
    }
  }

  const clearAllFilters = () => {
    setSelectedCategory('all')
    setSelectedBrands(['All'])
    setPriceRange(2250000)
    setSortBy('featured')
    // Clear URL parameters
    router.push('/store')
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
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
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
                      onClick={() => category === 'all' ? clearAllFilters() : setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        (selectedCategory === category && !currentSearch && !currentCategory) || (category === 'all' && selectedCategory === 'all' && !currentCategory)
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
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-lg shadow-md active:scale-95 transition-transform"
                >
                  All
                </button>
              </div>
            </div>
            
            {/* High-End and Low-end Logic */}
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
          
          {/* Cartigories Dropdown and Logic */}
          {isFilterOpen && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => category === 'all' ? clearAllFilters() : setSelectedCategory(category)}
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
                
                {/* Price Range Logic */}
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
                
                {/* Brand Logic */}
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

      {/* Filtered Result */}
      <div className="w-full container mx-auto px-4 py-8">
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
            <div className="mb-6 flex gap-1 items-center justify-between">
              <div className="text-xs text-gray-600">
                {currentSearch ? (
                  <span>Showing results for "<span className="font-bold">{currentSearch}</span>"</span>
                ) : currentCategory ? (
                  <span>Category: <span className="font-bold">{currentCategory}</span></span>
                ) : (
                  <span>Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of{' '}
                  <span className="font-semibold text-gray-900">{products.length}</span> products</span>
                )}
              </div>
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
              {currentProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
            
            {/* Conditional Pagination: Only shows if products exceed 16 */}
            {filteredProducts.length > productsPerPage && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
                        currentPage === page
                          ? 'bg-amber-500 text-white font-bold shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  {currentPage < totalPages && (
                    <button 
                      onClick={() => {
                        setCurrentPage(prev => prev + 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 font-medium"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">2,000+</div>
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