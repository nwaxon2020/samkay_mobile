// src/components/Hero.tsx
'use client'

import { FiArrowRight, FiChevronRight, FiShoppingCart, FiZap, FiShield, FiXCircle } from 'react-icons/fi'
import { useState } from 'react'
import Link from 'next/link'

export default function Hero() {
    // Warranty States
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [warrantyObj, setWarrantyObj] = useState({ phoneName: "", years: 1 });

    // Admin-manageable data structure
    const [heroData, setHeroData] = useState({
        title: "Power Up Your",
        subtitle: "Digital World",
        tagline: "⚡ Tech Revolution 2024",
        description: "Unleash the future with cutting-edge gadgets, premium accessories, and expert tech solutions. Where innovation meets exceptional service.",
        
        ctaPrimary: {
            text: "Shop Now",
            link: "/phone" 
        },
        
        ctaSecondary: {
            text: "Warranty Info",
            link: "/warranty"
        },
        
        stats: [
            { id: 1, value: "500+", label: "Premium Products", icon: "📱" },
            { id: 2, value: "98%", label: "Happy Customers", icon: "😊" },
            { id: 3, value: "24/7", label: "Expert Support", icon: "🛡️" },
            { id: 4, value: "⭐", label: "Top Rated", icon: "⭐" }
        ],
        
        featuredProduct: {
            name: "NEXUS",
            model: "ULTRA Z",
            tagline: "200MP Camera | 5G Ready",
            price: "$1,199",
            features: ["200MP Camera", "5G Ready", "120Hz Display", "5000mAh"],
            availability: true,
            badge: "LIMITED EDITION"
        },

        // Dynamic list for 2-year warranty brands
        twoYearBrands: ['oppo', 'samsung', 'vivo', 'huawei',],
        
        accessories: [
            { id: 1, name: "Wireless Earbuds", icon: "🎧", tag: "+" },
            { id: 2, name: "Fast Charger", icon: "🔋", tag: "50W" }
        ],
        
        settings: {
            backgroundEffects: true,
            animations: true,
            floatingElements: true
        }
    })

    // Logic for Nigerian Phone Market Warranty
    const handleWarrantyClick = () => {
        const brand = heroData.featuredProduct.name.toLowerCase();
        // Check if brand is in the premium list
        const duration = heroData.twoYearBrands.includes(brand) ? 2 : 1;

        setWarrantyObj({
            phoneName: `${heroData.featuredProduct.name} ${heroData.featuredProduct.model}`,
            years: duration
        });
        setIsOverlayOpen(true);
    };

    const getBackgroundSize = (size: 'sm' | 'md' | 'lg' = 'lg') => {
        const sizes = {
            sm: 'w-32 h-32 md:w-48 md:h-48',
            md: 'w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80',
            lg: 'w-64 h-64 md:w-96 md:h-96 lg:w-96 lg:h-96'
        }
        return sizes[size]
    }

    return (
        <section className="relative overflow-hidden bg-white">
        
        {/* WARRANTY OVERLAY */}
        {isOverlayOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
                <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-gray-100 scale-in-center">
                    <button 
                        onClick={() => setIsOverlayOpen(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <FiXCircle size={28} />
                    </button>
                    
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiShield className="text-blue-600" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Warranty Policy</h3>
                        <p className="text-[#F8AE1B] font-semibold mb-4">{warrantyObj.phoneName}</p>
                        
                        <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left space-y-3">
                            <div className="flex justify-between border-b pb-2 border-gray-200">
                                <span className="text-gray-500">Duration:</span>
                                <span className="font-bold text-gray-900">{warrantyObj.years} Year(s)</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                In the Nigerian phone market, standard mobile devices come with a 1-year manufacturer warranty. 
                               <span className='font-semibold'> Premium brands ({heroData.twoYearBrands.map(b => b.charAt(0).toUpperCase() + b.slice(1)).join(', ')}) typically offer extended 2-year coverage through authorized centers. </span>
                                This covers factory defects but excludes liquid damage, cracked screens, and software rooting.
                            </p>
                        </div>
                        
                        <button 
                            onClick={() => setIsOverlayOpen(false)}
                            className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg active:scale-95"
                        >
                            I Understand
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Dynamic background effects - Responsive */}
        {heroData.settings.backgroundEffects && (
            <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute top-1/4 left-4 md:left-1/4 ${getBackgroundSize('lg')} bg-[#F8AE1B]/10 rounded-full blur-3xl animate-pulse-slow`}></div>
            <div className={`absolute bottom-1/4 right-4 md:right-1/4 ${getBackgroundSize('md')} bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow`} style={{ animationDelay: '1s' }}></div>
            <div className={`absolute top-3/4 left-8 md:left-1/3 ${getBackgroundSize('sm')} bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow`} style={{ animationDelay: '2s' }}></div>
            </div>
        )}
        
        <div className="container mx-auto px-4 md:px-8 md:py-16 relative z-10">
            <div className="max-w-7xl mx-auto">
            
            {/* Mobile Layout (Stacked) */}
            <div className="lg:hidden">
                {/* Header Section */}
                <div className="space-y-4 animate-slide-up">
                <div className="flex justify-center">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#F8AE1B]/10 text-gray-900 text-xs font-medium border border-[#F8AE1B]/20">
                    <FiZap className="mr-1.5 animate-pulse text-[#F8AE1B]" size={12} />
                    {heroData.tagline}
                    </span>
                </div>
                
                <h1 className="text-xl sm:text-4xl font-bold tracking-tight text-center text-gray-900">
                    {heroData.title}{' '}
                    <span className="relative block sm:inline-block mt-2 sm:mt-0">
                    <span className="relative z-10 bg-gradient-to-r from-[#F8AE1B] via-yellow-400 to-[#F8AE1B] bg-clip-text text-transparent animate-shimmer text-3xl md:text-5xl">
                        {heroData.subtitle}
                    </span>
                    </span>
                </h1>
                
                <p className="text-sm md:text-lg text-gray-700 leading-relaxed text-center max-w-xl mx-auto px-4">
                    {heroData.description}
                </p>
                </div>

                {/* Phone Visual - Centered on Mobile */}
                <div className="px-5 my-8 sm:my-12">
                    <div className="relative mx-auto w-full max-w-xs sm:max-w-sm">
                        <div className={`relative z-10 ${heroData.settings.animations ? 'animate-phone-float' : ''}`}>
                        <div className="relative w-full h-[480px] sm:h-[520px] mx-auto bg-gradient-to-b from-gray-900 to-black rounded-[2.5rem] shadow-2xl border-[12px] sm:border-[14px] border-gray-800">
                            {heroData.settings.backgroundEffects && (
                            <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-[#F8AE1B]/30 via-transparent to-blue-500/30 rounded-[3rem] blur-xl opacity-30"></div>
                            )}
                            
                            <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-gray-900 to-black rounded-[1.5rem] sm:rounded-[1.8rem] overflow-hidden border border-gray-700/50">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#F8AE1B] via-yellow-400 to-[#F8AE1B] animate-shimmer"></div>
                            
                            <div className="relative p-4 sm:p-6 h-full flex flex-col justify-between">
                                <div>
                                <div className="flex items-center gap-1.5 mb-3">
                                    <div className="w-1.5 h-1.5 bg-[#F8AE1B] rounded-full animate-pulse"></div>
                                    <div className="text-[#F8AE1B] font-bold text-xs animate-pulse">{heroData.featuredProduct.badge}</div>
                                </div>
                                <div className="text-white text-xl sm:text-2xl font-bold mb-1">{heroData.featuredProduct.name}</div>
                                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#F8AE1B] to-yellow-400 bg-clip-text text-transparent">
                                    {heroData.featuredProduct.model}
                                </div>
                                <div className="text-gray-300 text-xs sm:text-sm mt-1.5 flex items-center gap-1.5">
                                    <FiZap className="text-[#F8AE1B]" size={12} />
                                    {heroData.featuredProduct.tagline}
                                </div>
                                </div>
                                <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                    <div>
                                    <div className="text-gray-300 text-xs">Starting at</div>
                                    <div className="text-2xl font-bold text-white">{heroData.featuredProduct.price}</div>
                                    </div>
                                    <button className="px-5 py-2.5 bg-gradient-to-r from-[#F8AE1B] to-yellow-500 text-black font-bold rounded-full text-sm hover:shadow-lg hover:shadow-[#F8AE1B]/30 transition-all duration-300 active:scale-95">
                                    Buy Now
                                    </button>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-5 sm:w-32 sm:h-6 bg-black rounded-b-xl border-x border-b border-gray-700"></div>
                        </div>
                        
                        {heroData.settings.floatingElements && heroData.settings.animations && (
                            <>
                            <div className="absolute -top-4 -left-6 w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-xl border border-gray-700/50 flex items-center justify-center shadow-lg animate-float"
                                style={{ animationDelay: '0.5s' }}>
                                <div className="text-xl text-white">{heroData.accessories[0].icon}</div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#F8AE1B] rounded-full flex items-center justify-center text-[8px] text-black font-bold">
                                {heroData.accessories[0].tag}
                                </div>
                            </div>
                            
                            <div className="absolute -bottom-4 -right-6 w-20 h-20 bg-gradient-to-br from-gray-800 to-black rounded-xl border border-gray-700/50 flex items-center justify-center shadow-lg animate-float"
                                style={{ animationDelay: '1s' }}>
                                <div className="text-2xl text-white">{heroData.accessories[1].icon}</div>
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                                {heroData.accessories[1].tag}
                                </div>
                            </div>
                            </>
                        )}
                        </div>
                    </div>
                </div>

                {/* CTA Buttons - Mobile */}
                <div className="flex flex-col gap-3 pt-4 px-4">
                <Link href={heroData.ctaPrimary.link} className="group relative inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold rounded-xl overflow-hidden transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl">
                    <span className="absolute inset-0 bg-gradient-to-r from-[#F8AE1B] to-yellow-500"></span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#F8AE1B] via-yellow-500 to-[#F8AE1B] opacity-0 group-hover:opacity-100 animate-shimmer"></span>
                    <span className="relative flex items-center text-gray-900 font-bold">
                    <FiShoppingCart className="mr-2" size={18} />
                    {heroData.ctaPrimary.text}
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </span>
                </Link>
                
                <button onClick={handleWarrantyClick} className="group inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold rounded-xl border border-[#F8AE1B]/50 text-gray-700 hover:bg-[#F8AE1B]/10 hover:border-[#F8AE1B] hover:text-[#F8AE1B] transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md">
                    <FiShield className="mr-2" size={18} />
                    <span>{heroData.ctaSecondary.text}</span>
                    <FiChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </button>
                </div>

                {/* Stats Grid - Mobile */}
                <div className="grid grid-cols-2 gap-3 pt-8 px-4">
                {heroData.stats.map((stat) => (
                    <div key={stat.id} className="p-3 rounded-lg bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{stat.icon}</span>
                        <div className="text-lg font-bold text-gray-900 truncate">{stat.value}</div>
                    </div>
                    <div className="text-xs text-gray-600 truncate">{stat.label}</div>
                    </div>
                ))}
                </div>
            </div>

            {/* Desktop Layout (Grid) */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Content */}
                <div className="space-y-8 animate-slide-up">
                <div>
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#F8AE1B]/10 text-gray-900 text-sm font-medium mb-6 border border-[#F8AE1B]/20 shadow-sm">
                    <FiZap className="mr-2 animate-pulse text-[#F8AE1B]" />{heroData.tagline}
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                    {heroData.title}{' '}
                    <span className="relative">
                        <span className="relative z-10 bg-gradient-to-r from-[#F8AE1B] via-yellow-400 to-[#F8AE1B] bg-clip-text text-transparent animate-shimmer">
                        {heroData.subtitle}
                        </span>
                    </span>
                    </h1>
                </div>
                
                <p className="text-xl text-gray-700 leading-relaxed max-w-2xl bg-gray-50/80 p-6 rounded-xl border border-gray-200 backdrop-blur-sm shadow-sm">
                    {heroData.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link href={heroData.ctaPrimary.link} className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg">
                    <span className="absolute inset-0 bg-gradient-to-r from-[#F8AE1B] to-yellow-500"></span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#F8AE1B] via-yellow-500 to-[#F8AE1B] opacity-0 group-hover:opacity-100 animate-shimmer"></span>
                    <span className="relative flex items-center text-gray-900 font-bold">
                        <FiShoppingCart className="mr-3" />
                        {heroData.ctaPrimary.text}
                        <FiArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
                    </span>
                    </Link>
                    
                    <button onClick={handleWarrantyClick} className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl border border-[#F8AE1B]/50 text-gray-700 hover:bg-[#F8AE1B]/10 hover:border-[#F8AE1B] hover:text-[#F8AE1B] transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md">
                    <FiShield className="mr-3" />
                    <span>{heroData.ctaSecondary.text}</span>
                    <FiChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </button>
                </div>
                
                {/* Stats Grid - Desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                {heroData.stats.map((stat) => (
                    <div key={stat.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200 backdrop-blur-sm hover:border-[#F8AE1B]/50 hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{stat.icon}</span>
                        <div className="text-2xl font-bold text-gray-900 group-hover:text-[#F8AE1B] transition-colors">{stat.value}</div>
                    </div>
                    <div className="text-sm text-gray-600 group-hover:text-gray-900">{stat.label}</div>
                    </div>
                ))}
                </div>
                </div>

                {/* Right Content - Hero Visual */}
                <div className="relative">
                {/* Main Phone Display */}
                <div className="relative mx-auto w-full max-w-md">
                    <div className={`relative z-10 ${heroData.settings.animations ? 'animate-phone-float' : ''}`}>
                    {/* Phone Device */}
                    <div className="relative w-80 h-[580px] mx-auto bg-gradient-to-b from-gray-900 to-black rounded-[3rem] shadow-2xl border-[16px] border-gray-800 transform rotate-3">
                        {heroData.settings.backgroundEffects && (
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#F8AE1B]/30 via-transparent to-blue-500/30 rounded-[3.5rem] blur-xl opacity-50"></div>
                        )}
                        
                        <div className="absolute inset-4 bg-gradient-to-br from-gray-900 to-black rounded-[2rem] overflow-hidden border border-gray-700/50">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F8AE1B] via-yellow-400 to-[#F8AE1B] animate-shimmer"></div>
                        
                        <div className="relative p-8 h-full flex flex-col justify-between">
                            <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 bg-[#F8AE1B] rounded-full animate-pulse"></div>
                                <div className="text-[#F8AE1B] font-bold text-sm animate-pulse">{heroData.featuredProduct.badge}</div>
                            </div>
                            <div className="text-white text-3xl font-bold mb-2">{heroData.featuredProduct.name}</div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-[#F8AE1B] to-yellow-400 bg-clip-text text-transparent">
                                {heroData.featuredProduct.model}
                            </div>
                            <div className="text-gray-300 text-sm mt-2 flex items-center gap-2">
                                <FiZap className="text-[#F8AE1B]" />
                                {heroData.featuredProduct.tagline}
                            </div>
                            </div>
                            <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                <div className="text-gray-300 text-sm">Starting at</div>
                                <div className="text-3xl font-bold text-white">{heroData.featuredProduct.price}</div>
                                </div>
                                <button className="px-6 py-3 bg-gradient-to-r from-[#F8AE1B] to-yellow-500 text-black font-bold rounded-full hover:shadow-lg hover:shadow-[#F8AE1B]/30 transition-all duration-300 hover:scale-105">
                                Buy Now
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-black rounded-b-2xl border-x border-b border-gray-700"></div>
                    </div>
                    
                    {/* Floating Accessories Desktop */}
                    {heroData.settings.floatingElements && heroData.settings.animations && (
                        <>
                        <div className="absolute -top-6 -left-10 w-24 h-24 bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-gray-700/50 flex items-center justify-center shadow-xl animate-float"
                            style={{ animationDelay: '0.5s' }}>
                            <div className="text-3xl text-white">{heroData.accessories[0].icon}</div>
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#F8AE1B] rounded-full flex items-center justify-center text-xs text-black font-bold">
                            {heroData.accessories[0].tag}
                            </div>
                        </div>
                        
                        <div className="absolute -bottom-6 -right-10 w-28 h-28 bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-gray-700/50 flex items-center justify-center shadow-xl animate-float"
                            style={{ animationDelay: '1s' }}>
                            <div className="text-3xl text-white">{heroData.accessories[1].icon}</div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                            {heroData.accessories[1].tag}
                            </div>
                        </div>
                        </>
                    )}
                    </div>
                    
                    {/* Particle Effects */}
                    {heroData.settings.animations && (
                        <>
                        <div className="absolute top-20 right-10 w-4 h-4 bg-[#F8AE1B] rounded-full animate-particle"></div>
                        <div className="absolute bottom-32 left-12 w-3 h-3 bg-blue-500 rounded-full animate-particle" style={{ animationDelay: '0.7s' }}></div>
                        <div className="absolute top-40 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-particle" style={{ animationDelay: '1.4s' }}></div>
                        </>
                    )}
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    )
}