"use client"

import { 
  FiSmartphone, FiTool, FiShoppingBag, FiUsers, 
  FiArrowRight, FiTruck, FiCheckCircle, FiPackage, FiAward 
} from 'react-icons/fi'
import Link from 'next/link'


export default function AboutUs() {
    // UPDATED OBJECT MODELS: FOCUS ON SALES & RETAIL
    const stats = [
        { label: "Flagships Delivered", value: "25k+" },
        { label: "Gadget Variants", value: "800+" },
        { label: "Customer Rating", value: "4.9/5" },
        { label: "Store Locations", value: "5" },
    ]

    const serviceHighlights = [
        {
          title: "Express Delivery",
          desc: "Same-day delivery for all flagship orders within the city. Your new tech, delivered fast.",
          icon: FiTruck
        },
        {
          title: "Authenticity Guard",
          desc: "Every device comes with a verified manufacturer warranty and Samkay seal of authenticity.",
          icon: FiCheckCircle
        },
        {
          title: "Gadget Ecosystem",
          desc: "We don't just sell phones; we provide the audio, power, and protection to match.",
          icon: FiPackage
        }
    ]

    const businessPillars = [
        { 
        title: "Flagship Smartphone Sales", 
        desc: "The latest from Apple, Samsung, and Google. We provide the newest tech the moment it drops globally.",
        icon: FiSmartphone,
        tag: "Premier Retailer"
        },
        { 
        title: "The Gadget Boutique", 
        desc: "Curated premium accessories. From high-fidelity audio gear to intelligent power solutions.",
        icon: FiShoppingBag,
        tag: "Curated"
        },
        { 
        title: "Certified Support Lab", 
        desc: "Our high-end repair lab ensures your investment is protected with expert care and original parts.",
        icon: FiTool,
        tag: "After-Sales Support"
        },
    ]

    return (
        <div className="max-w-[1200px] bg-white text-slate-900 min-h-screen font-sans mx-auto">
        
        {/* --- SECTION 1: HERO (WHITE BG) --- */}
        <section className="relative pt-8 pb-16 md:py-24 border-b border-slate-100">
            <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-full mb-6">
                <span className="text-[9px] font-bold uppercase tracking-widest text-yellow-700">Nigeria's No.1 Mobile Store</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-6 uppercase">
                Your Next <br />
                <span className="text-yellow-500 underline decoration-slate-900 underline-offset-8">Great Device.</span>
            </h1>
            <p className="text-slate-700 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                At Samkay Mobile, we specialize in bringing you the world's most advanced smartphones and gadgets. More than a store—it's your gateway to premium tech.
            </p>
            </div>
        </section>

        {/* --- SECTION 2: CEO (DARK BG - PREVIOUS GLOW UI) --- */}
        <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 blur-[120px] rounded-full"></div>
            
            <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="relative shrink-0">
                <div className="relative group">
                    <div className="absolute inset-0 rounded-full bg-yellow-500/20 blur-2xl scale-125 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full bg-transparent ring-2 ring-yellow-400/50 shadow-[0_0_30px_rgba(250,204,21,0.4)] scale-105"></div>
                    <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full p-1 bg-gradient-to-tr from-yellow-300 via-yellow-500 to-amber-600 shadow-2xl">
                        <div className="w-full h-full rounded-full bg-gray-900 border-[3px] border-gray-900 overflow-hidden relative">
                            <img 
                            src="/ceo.jpg" 
                            alt="CEO Samkay Mobile" 
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 brightness-110"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 -z-10 text-gray-700">
                                <FiUsers size={40} />
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-6 py-1.5 rounded-full font-black uppercase text-[9px] shadow-[0_10px_20px_rgba(0,0,0,0.4)] border border-yellow-400">
                        Visionary CEO
                    </div>
                </div>
                </div>

                <div className="flex-1 space-y-6 text-center lg:text-left">
                <div className="space-y-1">
                    <h4 className="text-yellow-500 font-bold uppercase tracking-widest text-[11px]">Leadership</h4>
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter">Innovation In Your Hands</h2>
                </div>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base italic border-l-4 border-yellow-500 pl-6">
                    "We don't just sell devices. We select technology that empowers your life. At Samkay Mobile, our focus is the perfect marriage of a flagship device and premium after-sales support."
                </p>
                <div>
                    <h4 className="text-xl font-black text-white">Samuel Kayode</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mt-1 font-bold">Founder & CEO</p>
                </div>
                </div>
            </div>
            </div>
        </section>

        {/* --- SECTION 3: PILLARS (WHITE BG) --- */}
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {businessPillars.map((pillar, i) => (
                <div key={i} className="group p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-500/5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-6 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-500">
                    <pillar.icon size={22} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-yellow-600 mb-1 block">{pillar.tag}</span>
                    <h4 className="text-lg font-black uppercase mb-3">{pillar.title}</h4>
                    <p className="text-slate-700 leading-relaxed text-xs md:text-sm">{pillar.desc}</p>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* --- SECTION 4: STATS (PITCH BLACK) --- */}
        <section className="py-20 bg-black text-white border-y border-gray-800">
            <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                {stats.map((stat, i) => (
                <div key={i} className="text-center group">
                    <div className="text-3xl md:text-4xl font-black group-hover:text-yellow-500 transition-colors duration-300">{stat.value}</div>
                    <div className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-bold mt-2">{stat.label}</div>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* --- SECTION 5: RETAIL SERVICES (ENHANCED VISUAL APPEAL) --- */}
        <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {serviceHighlights.map((service, i) => (
                        <div key={i} className="relative group p-8 rounded-[32px] bg-gray-800/40 border border-white/5 backdrop-blur-md hover:bg-gray-800/60 hover:border-yellow-500/30 transition-all duration-500">
                            {/* Icon Box */}
                            <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-yellow-500 transition-all duration-500">
                                <service.icon className="text-yellow-500 group-hover:text-black transition-colors" size={28} />
                            </div>
                            
                            {/* Text Content */}
                            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white mb-3 group-hover:text-yellow-400 transition-colors">
                                {service.title}
                            </h4>
                            <p className="text-xs text-gray-400 leading-relaxed font-medium">
                                {service.desc}
                            </p>

                            {/* Bottom Glow Line */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-yellow-500 group-hover:w-1/2 transition-all duration-500 rounded-full opacity-50"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* --- SECTION 6: CTA (WHITE BG) --- */}
        <section className="py-24 bg-white container mx-auto px-6">
            <div className="relative rounded-[50px] bg-slate-900 p-12 md:p-20 text-center text-white overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-black uppercase italic mb-8 tracking-tighter">Ready for an Upgrade?</h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={"/store"}>
                    <button className="bg-yellow-500 text-slate-900 px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-white transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                        Explore your options <FiArrowRight />
                    </button>
                </Link>
                <Link href={"/services"}>
                    <button className="bg-transparent border border-white/30 text-white px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-white/10 transition-all active:scale-95">
                        Check Repairs
                    </button>
                </Link>
                </div>
            </div>
            </div>
        </section>
        </div>
    )
}