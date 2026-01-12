"use client"

import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiHome, FiSmartphone, FiSettings } from 'react-icons/fi'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link' // Best practice to use Link for internal routing

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const pathname = usePathname()

    const navItems = [
        { id: 'home', label: 'Home', icon: FiHome, href: '/' },
        { id: 'phones', label: 'Phones & Gadgets', icon: FiSmartphone, href: '/phones' },
        { id: 'services', label: 'Services', icon: FiSettings, href: '/services' },
    ]

    return (
        <header className="sticky top-0 z-20 md:z-40 w-full bg-gray-900/95 backdrop-blur-md text-white shadow-xl border-b border-gray-700/50 overflow-x-hidden">
            <div className="container mx-auto px-4 py-5">
                <div className="w-full flex items-center justify-between gap-2">
                    
                    {/* Logo & Mobile Menu Toggle */}
                    <div className="flex items-center space-x-2 md:space-x-4 shrink-0">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                        
                        <Link href="/" className="flex items-center space-x-2 md:space-x-3 min-w-0">
                            <div className="flex items-center gap-2 min-w-0">
                                <img
                                    src="/logo.jpg" 
                                    alt="logo"
                                    className="w-8 h-8 md:w-12 md:h-12 border-2 md:border-4 border-yellow-500/20 rounded-lg md:rounded-xl object-cover shrink-0" 
                                />
                                <div className="truncate">
                                    <h1 className="text-sm md:text-xl font-black tracking-tight truncate">
                                        <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                                            Samkay Mobile
                                        </span>
                                    </h1>
                                    <p className="text-[7.5px] md:text-[10px] text-gray-300/80 uppercase tracking-widest font-bold">Premium Mobile Solutions</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-4 lg:space-x-8 shrink-0">
                        <ul className="flex items-center space-x-4 lg:space-x-8">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                // ACCURATE CHECK: Checks if current path exactly matches href 
                                // OR if it's a sub-path of the item (except for home '/')
                                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                                
                                return (
                                    <li key={item.id} className="shrink-0">
                                        <Link 
                                            href={item.href} 
                                            className={`flex items-center space-x-2 transition-all duration-200 font-medium group relative text-sm lg:text-base ${
                                                isActive ? 'text-yellow-300' : 'hover:text-yellow-300'
                                            }`}
                                        >
                                            <Icon className={`group-hover:scale-110 transition-transform ${isActive ? 'text-yellow-300' : ''}`} />
                                            <span className="whitespace-nowrap">{item.label}</span>
                                            {isActive && (
                                                <div className="absolute -bottom-5 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full hidden md:block"></div>
                                            )}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-1 md:space-x-4 shrink-0">
                        <button 
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <FiSearch size={22} />
                        </button>

                        <div className="hidden md:flex items-center relative w-40 lg:w-64">
                            <FiSearch className="absolute left-3 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-gray-800 border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <button className="relative p-2 hover:bg-white/10 rounded-lg group">
                            <FiShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                            <span className="absolute -top-1 -right-1 bg-yellow-500 text-gray-900 text-[10px] w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full font-bold shadow-lg">
                                3
                            </span>
                        </button>

                        <button className="hidden sm:flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <FiUser size={22} />
                            <span className="font-medium hidden lg:inline">Login</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {isSearchOpen && (
                    <div className="md:hidden mt-3 animate-fade-in px-1">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search Samkay Mobile..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-700 max-h-[80vh] overflow-y-auto">
                    <div className="container mx-auto px-4 py-6">
                        <ul className="space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href
                                
                                return (
                                    <li key={item.id}>
                                        <Link 
                                            href={item.href} 
                                            className={`flex items-center space-x-3 p-4 rounded-lg transition-all duration-200 ${
                                                isActive
                                                    ? 'bg-yellow-500/20 border-l-4 border-yellow-400 text-yellow-300'
                                                    : 'hover:bg-gray-800 text-gray-300 hover:text-white'
                                            }`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <Icon size={22} className={isActive ? 'text-yellow-400' : ''} />
                                            <span className="font-bold tracking-wide">{item.label}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                            <li className="pt-4 mt-4 border-t border-gray-700">
                                <Link href="/login" className="flex items-center space-x-3 p-4 rounded-lg text-gray-300" onClick={() => setIsMenuOpen(false)}>
                                    <FiUser size={22} />
                                    <span className="font-bold">Account</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </header>
    )
}