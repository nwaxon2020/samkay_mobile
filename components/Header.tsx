"use client"

import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiHome, FiSmartphone, FiSettings, FiTrash2, FiPlus, FiMinus, FiMessageSquare, } from 'react-icons/fi'
import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

// Define interfaces
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  quantity?: number;
}

interface CartItem extends Product {
  quantity: number;
  addedAt: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  href: string;
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [cartCount, setCartCount] = useState<number>(0)
    const [cartTotal, setCartTotal] = useState<number>(0)
    const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false)
    const pathname = usePathname()
    const router = useRouter()
    const cartRef = useRef<HTMLDivElement>(null)

    const navItems: NavItem[] = [
        { id: 'home', label: 'Home', icon: FiHome, href: '/' },
        { id: 'phones', label: 'Store', icon: FiSmartphone, href: '/store' },
        { id: 'services', label: 'Services', icon: FiSettings, href: '/services' },
        { id: 'chat', label: 'Chat', icon: FiMessageSquare, href: '/chat' },
    ]

    // Load cart from localStorage on mount
    useEffect(() => {
        loadCartFromStorage()
        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('samkay-update-cart', loadCartFromStorage)
        
        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('samkay-update-cart', loadCartFromStorage)
        }
    }, [])

    const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'samkay-cart') {
            loadCartFromStorage()
        }
    }

    const loadCartFromStorage = () => {
        const savedCart: CartItem[] = JSON.parse(localStorage.getItem('samkay-cart') || '[]')
        setCartItems(savedCart)
        updateCartStats(savedCart)
    }

    const updateCartStats = (items: CartItem[]) => {
        const count = items.reduce((total, item) => total + item.quantity, 0)
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        setCartCount(count)
        setCartTotal(total)
    }

    const updateCartItemQuantity = (productId: string, change: number) => {
        const updatedCart = [...cartItems]
        const itemIndex = updatedCart.findIndex(item => item.id === productId)
        
        if (itemIndex >= 0) {
            updatedCart[itemIndex].quantity += change
            
            if (updatedCart[itemIndex].quantity <= 0) {
                updatedCart.splice(itemIndex, 1)
                toast.error('Item removed from cart')
            } else {
                toast.success('Cart updated')
            }
            
            saveCart(updatedCart)
        }
    }

    const removeCartItem = (productId: string) => {
        const updatedCart = cartItems.filter(item => item.id !== productId)
        saveCart(updatedCart)
        toast.error('Item removed from cart')
    }

    const saveCart = (items: CartItem[]) => {
        localStorage.setItem('samkay-cart', JSON.stringify(items))
        setCartItems(items)
        updateCartStats(items)
        window.dispatchEvent(new Event('storage'))
    }

    const clearCart = () => {
        if (cartItems.length === 0) return;
        setShowClearConfirm(true)
    }

    const confirmClearCart = () => {
        saveCart([])
        toast.success('Cart cleared successfully')
        setShowClearConfirm(false)
        setIsCartOpen(false)
    }

    const cancelClearCart = () => {
        setShowClearConfirm(false)
    }

    const getCheckoutData = () => {
        return {
            items: cartItems,
            total: cartTotal,
            itemCount: cartCount,
            timestamp: new Date().toISOString()
        }
    }

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/store?search=${encodeURIComponent(searchQuery.trim())}`)
            setSearchQuery('')
            setIsSearchOpen(false)
        }
    }

    return (
        <header className="sticky top-0 z-40 w-full bg-gray-900 text-white shadow-lg border-b border-gray-800 overflow-x-hidden">
            <div className="container mx-auto px-3 sm:px-4 py-4 md:py-5">
                <div className="w-full flex items-center justify-between gap-1 sm:gap-2">
                    
                    {/* Logo & Mobile Menu Toggle */}
                    <div className="flex items-center space-x-1 sm:space-x-2 shrink-0 max-w-[60%]">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-1.5 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
                        </button>
                        
                        <Link href="/" className="flex items-center space-x-1 sm:space-x-2 min-w-0">
                            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                                    <img 
                                        src="/logo.jpg" 
                                        alt="Samkay Mobile Logo"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23f59e0b'%3E%3Cpath d='M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z'%3E%3C/path%3E%3C/svg%3E"
                                        }}
                                    />
                                </div>
                                <div className="truncate">
                                    <h2 className="text-xs sm:text-base md:text-xl font-black tracking-tighter italic leading-tight">
                                        <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                                            Samkay
                                        </span>
                                        <span className="text-white ml-0.5 sm:ml-1">Mobile</span>
                                    </h2>
                                    <p className="hidden xs:block text-[6px] sm:text-[8px] md:text-[9px] text-gray-400 uppercase tracking-widest font-bold truncate">Premium Mobile Solutions</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 shrink-0">
                        <ul className="flex items-center space-x-2 lg:space-x-4">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                                
                                return (
                                    <li key={item.id} className="shrink-0">
                                        <Link
                                            href={item.href}
                                            className={`flex items-center space-x-1.5 transition-all duration-200 font-medium group relative text-sm lg:text-base px-2 lg:px-3 py-1.5 rounded-lg ${
                                                isActive 
                                                    ? 'bg-gray-800 text-amber-400' 
                                                    : 'text-gray-300 hover:text-amber-400 hover:bg-gray-800'
                                            }`}
                                        >
                                            <Icon className={`group-hover:scale-110 transition-transform ${isActive ? 'text-amber-400' : ''}`} size={16} />
                                            <span className="whitespace-nowrap">{item.label}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-0.5 sm:space-x-2 shrink-0">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="md:hidden p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <FiSearch size={18} />
                        </button>

                        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative w-28 lg:w-48">
                            <FiSearch className="absolute left-3 text-gray-400" size={14} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="sr-only">Search</button>
                        </form>

                        {/* Cart Button with Dropdown */}
                        <div className="relative" ref={cartRef}>
                            <button 
                                onClick={() => setIsCartOpen(!isCartOpen)}
                                className="relative p-1.5 sm:p-2 hover:bg-gray-800 rounded-lg group transition-colors"
                            >
                                <FiShoppingCart size={18} className="text-gray-300 group-hover:text-amber-400 transition-colors" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[8px] w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center rounded-full font-bold shadow-lg">
                                        {cartCount > 99 ? '99+' : cartCount}
                                    </span>
                                )}
                            </button>

                            {/* Cart Dropdown */}
                            {isCartOpen && (
                                <>
                                    {/* Cart Panel */}
                                    <div
                                    className="
                                        fixed
                                        right-3 sm:right-6
                                        top-16 sm:top-20
                                        w-[92vw]
                                        max-w-sm sm:max-w-md
                                        bg-gray-900
                                        rounded-2xl
                                        shadow-2xl
                                        border border-gray-800
                                        overflow-hidden
                                        z-[1000]
                                        animate-scale-in
                                    "
                                    >
                                    <CartContent 
                                        cartItems={cartItems}
                                        cartCount={cartCount}
                                        cartTotal={cartTotal}
                                        onClose={() => setIsCartOpen(false)}
                                        onUpdateQuantity={updateCartItemQuantity}
                                        onRemoveItem={removeCartItem}
                                        onClearCart={clearCart}
                                        getCheckoutData={getCheckoutData}
                                    />
                                    </div>

                                    {/* Backdrop */}
                                    <div 
                                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
                                    onClick={() => setIsCartOpen(false)}
                                    />
                                </>
                            )}

                        </div>

                        <button className="p-1.5 sm:p-2 hover:bg-gray-800 rounded-lg transition-colors flex items-center space-x-1">
                            <FiUser size={18} className="text-gray-300" />
                            <span className="hidden lg:inline text-xs font-medium text-gray-300">Account</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {isSearchOpen && (
                    <div className="md:hidden mt-3 animate-fade-in px-0.5">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search Samkay Mobile..."
                                className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-gray-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="sr-only">Search</button>
                        </form>
                    </div>
                )}
            </div>

            {/* Clear Cart Confirmation Modal */}
            {showClearConfirm && (
                <>
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1500] flex items-center justify-center p-4">
                        <div className="bg-gray-900 rounded-2xl border border-gray-800 max-w-md w-full p-6 animate-scale-in">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-rose-500/20 to-rose-600/20 rounded-full flex items-center justify-center">
                                    <FiTrash2 className="text-rose-500 w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Clear Cart</h3>
                                <p className="text-gray-400 text-sm">
                                    Are you sure you want to remove all items from your cart? 
                                    This action cannot be undone.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={cancelClearCart}
                                    className="flex-1 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmClearCart}
                                    className="flex-1 py-3 bg-gradient-to-r from-rose-600 to-rose-700 text-white font-semibold rounded-lg hover:from-rose-700 hover:to-rose-800 transition-all"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-900 border-t border-gray-800 max-h-[80vh] overflow-y-auto shadow-lg">
                    <div className="container mx-auto px-4 py-4">
                        <ul className="space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href
                                
                                return (
                                    <li key={item.id}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                                                isActive
                                                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-amber-400 border-l-4 border-amber-500'
                                                    : 'hover:bg-gray-800 text-gray-300 hover:text-white'
                                            }`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <Icon size={18} className={`${isActive ? 'text-amber-400' : ''}`} />
                                            <span className="font-semibold tracking-wide text-sm">{item.label}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </header>
    )

    function CartContent({ 
        cartItems, 
        cartCount, 
        cartTotal, 
        onClose, 
        onUpdateQuantity, 
        onRemoveItem, 
        onClearCart,
        getCheckoutData 
    }: {
        cartItems: CartItem[]
        cartCount: number
        cartTotal: number
        onClose: () => void
        onUpdateQuantity: (id: string, change: number) => void
        onRemoveItem: (id: string) => void
        onClearCart: () => void
        getCheckoutData: () => any
    }) {
        return (
            <>
                <div className="p-3 sm:p-4 border-b border-gray-800 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm sm:text-lg text-white">Cart</h3>
                        <span className="text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded-full">{cartCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {cartCount > 0 && (
                            <button onClick={onClearCart} className="text-[10px] text-rose-400 hover:text-rose-300 px-2 py-1 hover:bg-gray-800 rounded">
                                Clear All
                            </button>
                        )}
                        <button onClick={onClose} className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                            <FiX size={18} />
                        </button>
                    </div>
                </div>
                
                <div className="max-h-[60vh] overflow-y-auto">
                    {cartCount === 0 ? (
                        <div className="p-8 text-center">
                            <FiShoppingCart className="mx-auto mb-3 text-gray-400 w-8 h-8" />
                            <p className="text-gray-300 text-sm">Your cart is empty</p>
                            <Link href="/store" onClick={onClose} className="mt-4 inline-block px-5 py-2 bg-amber-600 text-white text-xs font-bold rounded-lg">
                                Browse Products
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-800">
                            {cartItems.map(item => (
                                <div key={item.id} className="p-3 sm:p-4 hover:bg-gray-800/50 transition-colors">
                                    <div className="flex gap-3">
                                        <div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                                            <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain p-1" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-white truncate text-xs">{item.name}</h4>
                                                <button onClick={() => onRemoveItem(item.id)} className="text-gray-500 hover:text-rose-400 ml-2">
                                                    <FiTrash2 size={12} />
                                                </button>
                                            </div>
                                            <p className="text-amber-400 font-bold text-xs mt-1">₦{item.price.toLocaleString()}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
                                                    <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 px-2 hover:bg-gray-700 text-gray-400 disabled:opacity-30" disabled={item.quantity <= 1}>
                                                        <FiMinus size={10} />
                                                    </button>
                                                    <span className="px-2 py-0.5 text-xs font-medium text-white">{item.quantity}</span>
                                                    <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 px-2 hover:bg-gray-700 text-gray-400">
                                                        <FiPlus size={10} />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-white text-xs">₦{(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="p-4 bg-gray-900 sticky bottom-0">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-400 text-xs">Subtotal:</span>
                                    <span className="text-lg font-bold text-white">₦{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Link
                                        href={{
                                            pathname: '/purchase',
                                            query: { checkout: encodeURIComponent(JSON.stringify(getCheckoutData())) }
                                        }}
                                        onClick={onClose}
                                        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-2.5 rounded-lg text-center text-xs"
                                    >
                                        Checkout Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </>
        )
    }
}