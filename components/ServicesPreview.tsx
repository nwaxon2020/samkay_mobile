'use client'

import { 
    FiTool, 
    FiTruck, 
    FiChevronRight, 
    FiMessageCircle, 
    FiHeadphones, 
    FiStar, 
    FiCheckCircle, 
    FiX 
} from 'react-icons/fi'
import { useState } from 'react'

export default function ServicesPreview() {
    // State to track which service modal is open
    const [activeService, setActiveService] = useState<any>(null);

    // Admin-manageable data structure
    const [servicesData, setServicesData] = useState({
        title: "Premium",
        highlightedTitle: "Services",
        subtitle: "Beyond selling products, we provide comprehensive services to ensure your devices perform at their best throughout their lifespan.",
        
        services: [
            {
                id: 1,
                icon: FiTool,
                title: 'Repair Services',
                description: 'Expert repair for all smartphone models with genuine parts',
                color: 'from-orange-500/10 via-amber-400/10 to-yellow-500/10',
                gradient: 'from-orange-500 to-yellow-500',
                features: ['Same-Day Service', 'Genuine Parts', '6-Month Warranty'],
                tag: 'POPULAR',
                modalContent: "Our repair center is equipped with state-of-the-art tools to handle screen replacements, battery issues, and motherboard repairs. We use only high-quality parts to ensure your device feels brand new."
            },
            {
                id: 2,
                icon: FiTruck,
                title: 'Free Delivery',
                description: 'Free shipping on all orders above $200',
                color: 'from-red-500/10 via-orange-400/10 to-orange-500/10',
                gradient: 'from-red-500 to-orange-500',
                features: ['Same-Day Delivery', 'Free Returns', 'Tracking Included'],
                tag: 'FREE',
                modalContent: "Enjoy seamless logistics with our premium delivery service. We partner with top-tier couriers to ensure your gadgets reach your doorstep safely and on time, anywhere in the country."
            },
        ],

        ctaSection: {
            title: 'Need Professional Help With Your Device?',
            description: 'Our certified technicians are ready to assist with any issue, big or small.',
            buttonText: 'Message on WhatsApp',
            whatsapp: {
                phoneNumber: '+2347034632037', 
                defaultMessage: 'Hello! I would like to book a service appointment for my device.' 
            },
            email: "princenwachukwu308@yahoo.com",
            stats: [
                { value: '24/7', label: 'Support Available' },
                { value: '30min', label: 'Average Response' },
                { value: '99%', label: 'Satisfied Rate' },
            ]
        },

        settings: {
            animations: true,
            showTags: true,
            showFeatures: true,
        }
    });

    const handleWhatsAppClick = () => {
        const { phoneNumber, defaultMessage } = servicesData.ctaSection.whatsapp;
        const cleanedPhone = phoneNumber.replace(/[^\d+]/g, '');
        const encodedMessage = encodeURIComponent(defaultMessage);
        const whatsappUrl = `https://wa.me/${cleanedPhone}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-white relative">
            {/* Background Effects */}
            {servicesData.settings.animations && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#F8AE1B]/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
            )}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F8AE1B]/10 text-gray-900 text-sm font-medium mb-6 border border-[#F8AE1B]/20">
                        <FiCheckCircle className="text-[#F8AE1B]" />
                        <span>Expert Solutions</span>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
                        {servicesData.title}{' '}
                        <span className="text-[#F8AE1B]">
                            {servicesData.highlightedTitle}
                        </span>
                    </h2>
                    
                    <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-2xl lg:max-w-3xl mx-auto px-4">
                        {servicesData.subtitle}
                    </p>
                </div>

                {/* Services Grid */}
                <div className="mx-auto max-w-[55rem] grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {servicesData.services.map((service) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={service.id}
                                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#F8AE1B] transition-all duration-300 hover:shadow-xl"
                            >
                                {servicesData.settings.showTags && service.tag && (
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#F8AE1B] text-black">
                                            {service.tag}
                                        </span>
                                    </div>
                                )}

                                <div className={`relative p-8 flex items-center justify-center bg-gradient-to-br ${service.color}`}>
                                    <div className={`relative p-5 rounded-2xl bg-gradient-to-r ${service.gradient} shadow-lg text-white`}>
                                        <Icon size={32} />
                                    </div>
                                </div>

                                <div className="p-5 sm:p-6">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#F8AE1B] transition-colors mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {servicesData.settings.showFeatures && (
                                        <ul className="space-y-2 mb-6">
                                            {service.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center text-xs sm:text-sm text-gray-600">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#F8AE1B] mr-2 flex-shrink-0"></div>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    <button 
                                        onClick={() => setActiveService(service)}
                                        className="group inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold rounded-lg border border-[#F8AE1B]/50 text-[#F8AE1B] hover:bg-[#F8AE1B]/10 transition-all active:scale-95"
                                    >
                                        <span>Learn More</span>
                                        <FiChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <div className="mt-16 sm:mt-20 lg:mt-24">
                    <div className="relative bg-gray-50 border border-gray-200 rounded-3xl px-4 py-6 md:p-6 sm:p-12 max-w-4xl mx-auto shadow-lg overflow-hidden">
                        <div className="relative z-10">
                            <div className="text-center mb-12">
                                <h3 className="text-xl sm:text-4xl font-bold text-gray-900 mb-4">
                                    {servicesData.ctaSection.title}
                                </h3>
                                <p className="text-gray-700 max-w-2xl mx-auto">
                                    {servicesData.ctaSection.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-12 text-center">
                                {servicesData.ctaSection.stats.map((stat, idx) => (
                                    <div key={idx} className="p-4 bg-white rounded-xl border border-gray-100">
                                        <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-tighter">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button 
                                    onClick={handleWhatsAppClick}
                                    className="flex items-center justify-center px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1da851] transition-all"
                                >
                                    <FiMessageCircle className="mr-3" size={20} />
                                    {servicesData.ctaSection.buttonText}
                                </button>
                                <a 
                                    href={`mailto:${servicesData.ctaSection.email}`}
                                    className="flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-all"
                                >
                                    <FiHeadphones className="mr-3" />
                                    Contact Support
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL OVERLAY */}
            {activeService && (
                <div 
                    className="fixed inset-0 w-full h-full bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-[9999]"
                    onClick={() => setActiveService(null)}
                >
                    <div 
                        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 sm:p-10 transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setActiveService(null)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                        >
                            <FiX size={24} />
                        </button>

                        <h3 className="text-2xl sm:text-3xl font-bold text-[#F8AE1B] mb-4">
                            {activeService.title}
                        </h3>
                        
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                            {activeService.modalContent}
                        </p>

                        <button 
                            onClick={() => setActiveService(null)}
                            className="w-full py-4 bg-[#F8AE1B] text-black font-bold rounded-xl hover:bg-[#e09a18] transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}