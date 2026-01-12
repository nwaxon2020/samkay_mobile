// src/components/FeaturedProducts.tsx
'use client'

import { FiStar, FiShoppingCart, FiChevronRight, FiZap, FiTag } from 'react-icons/fi'
import { useState } from 'react'
import Link from 'next/link'


export default function FeaturedProducts() {
    // Admin-manageable data structure
    const [featuredData, setFeaturedData] = useState({
        title: "Featured",
        highlightedTitle: "Products",
        subtitle: "Discover our curated collection of premium devices and accessories",
        ctaButton: "View All Products",
        
        products: [
            {
                id: 1,
                name: 'Quantum X Pro',
                category: 'Flagship Smartphone',
                price: 1199,
                rating: 4.8,
                features: ['8K Video', '1TB Storage',],
                image: '📱',
                color: 'from-blue-500/20 via-blue-400/20 to-purple-500/20',
                tag: 'BEST SELLER'
            },
            {
                id: 2,
                name: 'AirPods Max Pro',
                category: 'Wireless Headphones',
                price: 549,
                rating: 4.9,
                features: ['Active Noise Cancel', '30h Battery',],
                image: '🎧',
                color: 'from-green-500/20 via-emerald-400/20 to-cyan-500/20',
                tag: 'NEW'
            },
            {
                id: 3,
                name: 'PowerJet 20000',
                category: 'Fast Power Bank',
                price: 89,
                rating: 4.5,
                features: ['20000mAh', '65W Fast Charge',],
                image: '🔋',
                color: 'from-orange-500/20 via-amber-400/20 to-yellow-500/20',
                tag: 'SALE'
            },
            {
                id: 4,
                name: 'Watch Pro Ultra',
                category: 'Smart Watch',
                price: 799,
                rating: 4.7,
                features: ['Health Tracking', '7-Day Battery',],
                image: '⌚',
                color: 'from-pink-500/20 via-rose-400/20 to-red-500/20',
                tag: 'PREMIUM'
            },
        ],

        settings: {
            animations: true,
            showTags: true,
            showRatings: true,
            darkMode: true
        }
    })

    // Admin update function
    const updateFeaturedData = (section: string, value: any) => {
        setFeaturedData(prev => ({
            ...prev,
            [section]: value
        }))
        console.log(`Updated featured ${section}:`, value)
    }

    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-900 via-gray-900 to-black">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#F8AE1B]/5 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16 lg:mb-20 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F8AE1B]/10 text-[#F8AE1B] text-sm font-medium mb-6 border border-[#F8AE1B]/20">
                <FiTag className="animate-pulse" />
                <span>Limited Time Offers</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
                {featuredData.title}{' '}
                <span className="relative">
                    <span className="relative z-10 bg-gradient-to-r from-[#F8AE1B] via-yellow-400 to-[#F8AE1B] bg-clip-text text-transparent animate-shimmer">
                        {featuredData.highlightedTitle}
                    </span>
                </span>
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl lg:max-w-3xl mx-auto px-4">
                {featuredData.subtitle}
            </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-2">
            {featuredData.products.map((product) => (
                <div
                key={product.id}
                className="group relative bg-gradient-to-b from-gray-800/30 to-gray-900/20 rounded-2xl overflow-hidden border border-gray-700/30 hover:border-[#F8AE1B]/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#F8AE1B]/10 backdrop-blur-sm"
                >
                {/* Product Tag */}
                {featuredData.settings.showTags && product.tag && (
                    <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#F8AE1B] to-yellow-500 text-black">
                        {product.tag}
                    </span>
                    </div>
                )}

                {/* Product Visual */}
                <div className={`relative h-48 sm:h-56 flex items-center justify-center bg-gradient-to-br ${product.color} overflow-hidden`}>
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-transparent animate-shimmer"></div>
                    
                    {/* Product Icon */}
                    <div className={`relative text-7xl sm:text-8xl ${featuredData.settings.animations ? 'animate-float' : ''}`}>
                    {product.image}
                    </div>
                    
                    {/* Glow Effect */}
                    <div className="absolute -inset-10 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                    {/* Category & Rating */}
                    <div className="flex items-start justify-between mb-3">
                    <div>
                        <span className="text-xs sm:text-sm text-gray-400 block mb-1">
                        {product.category}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#F8AE1B] transition-colors line-clamp-1">
                        {product.name}
                        </h3>
                    </div>
                    
                    {featuredData.settings.showRatings && (
                        <div className="flex items-center gap-1">
                        <FiStar className="text-[#F8AE1B] fill-current" size={14} />
                        <span className="text-sm font-medium text-white">{product.rating}</span>
                        </div>
                    )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-1.5 sm:space-y-2 mb-3">
                    {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-xs text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F8AE1B] mr-2 animate-pulse"></div>
                        <span className="line-clamp-1">{feature}</span>
                        </li>
                    ))}
                    <div className="flex items-center justify-between">
                        <div className="text-xs sm:text-sm text-gray-400">Starting price</div>
                        <div className="text-xl sm:text-2xl font-bold text-white">${product.price}</div>
                    </div>
                    </ul>

                    {/* Price & CTA */}
                    <div className="flex flex-col items-center justify-between pt-3 sm:pt-4 border-t border-gray-700/50">
                        
                        
                        <button className="text-center w-full group relative inline-flex justify-center items-center gap-1.5 sm:gap-2 px-3 py-2 md:px-4 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95">
                            <span className="absolute inset-0 bg-gradient-to-r from-[#F8AE1B] to-yellow-500"></span>
                            <span className="absolute inset-0 bg-gradient-to-r from-[#F8AE1B] via-yellow-500 to-[#F8AE1B] opacity-0 group-hover:opacity-100 animate-shimmer"></span>
                            <span className="relative flex items-center text-black font-bold text-sm sm:text-base">
                                <FiShoppingCart size={14} className="sm:size-[18px]" />
                                <span className="ml-1">Add</span>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#F8AE1B]/30 rounded-2xl transition-all duration-500"></div>
                </div>
            ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-10 sm:mt-12 lg:mt-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link href={"/store"}>
                <button className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl border-2 border-[#F8AE1B]/50 text-gray-300 hover:bg-[#F8AE1B]/10 hover:border-[#F8AE1B] hover:text-[#F8AE1B] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-[#F8AE1B]/10">
                    <span>{featuredData.ctaButton}</span>
                    <FiChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
            </Link>
            </div>
        </div>
        </section>
    )
}