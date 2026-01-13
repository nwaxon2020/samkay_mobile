// src/components/Footer.tsx
"use client"

import { 
  FiFacebook, FiTwitter, FiInstagram, FiYoutube, 
  FiMail, FiPhone, FiMapPin, FiArrowUp, FiChevronRight,
} from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

/** * EDITABLE CONFIGURATION 
 * Add or remove items here to update the footer instantly
 */
const FOOTER_DATA = {
  company: {
    name: "SAMKAY",
    suffix: "MOBILE",
    description: "Leading provider of premium smartphones, pro-grade accessories, and expert repair services. Quality and trust since 2015.",
    socials: [
      { icon: FiFacebook, href: "#", label: "Facebook" },
      { icon: FiTwitter, href: "#", label: "Twitter" },
      { icon: FiInstagram, href: "#", label: "Instagram" },
      { icon: FiYoutube, href: "#", label: "Youtube" },
    ]
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Phones & Gadgets", href: "/store" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "mailto:princnwachukwu308@yahoo.com" },
  ],
  categories: [
    { id: 'Smartphone', label: "Smartphones" },
    { id: 'Tablets', label: "Tablets" },
    { id: 'Power Bank', label: "Power Banks" },
    { id: 'Earbuds', label: "Headphones" },
    { id: 'Charger', label: "Chargers" },
    { id: 'Case', label: "Cases & Covers" },
  ],
  contact: {
    address: "123 Tech Street, Silicon Valley, CA",
    phone: "+234 (703) 463-2037",
    email: "support@samkay.com"
  }
}

export default function Footer() {
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/store?category=${encodeURIComponent(categoryId)}`);
  };

  return (
    <footer className="z-30 bg-gray-900 border-t border-gray-800 text-white relative overflow-hidden">
      {/* Decorative Top Flare */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"></div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* 1. BRAND SECTION */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="Samkay Mobile"
                className="w-10 h-10 border border-yellow-500/30 rounded-lg object-cover shadow-[0_0_15px_rgba(250,204,21,0.1)]"
              />
              <h2 className="text-xl md:text-2xl font-black tracking-tighter italic">
                <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  {FOOTER_DATA.company.name}
                </span>
                <span className="text-white ml-1">{FOOTER_DATA.company.suffix}</span>
              </h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {FOOTER_DATA.company.description}
            </p>
            <div className="flex space-x-3">
              {FOOTER_DATA.company.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-gray-800/40 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-yellow-500 hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all duration-300 group"
                >
                  <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. QUICK LINKS - Mapping from Object */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-yellow-500 mb-8 flex items-center gap-2">
              <span className="w-4 h-px bg-yellow-500"></span> Navigation
            </h3>
            <ul className="space-y-4">
              {FOOTER_DATA.navigation.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-400 hover:text-white flex items-center gap-2 transition-all duration-300 text-sm group">
                    <FiChevronRight size={12} className="text-yellow-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. CATEGORIES - Logic Updated to match Sidebar */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-yellow-500 mb-8 flex items-center gap-2">
              <span className="w-4 h-px bg-yellow-500"></span> Collections
            </h3>
            <ul className="grid grid-cols-1 gap-4">
              {FOOTER_DATA.categories.map((item) => (
                <li key={item.label}>
                  <button 
                    onClick={() => handleCategoryClick(item.id)}
                    className="text-gray-400 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block duration-300 text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. CONTACT INFO */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-yellow-500 mb-8 flex items-center gap-2">
              <span className="w-4 h-px bg-yellow-500"></span> Connect
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4 group">
                <div className="p-2.5 rounded-xl bg-gray-800/60 text-yellow-500 border border-gray-700 group-hover:border-yellow-500/50 transition-all">
                  <FiMapPin size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Address</span>
                  <span className="text-gray-300 text-sm">{FOOTER_DATA.contact.address}</span>
                </div>
              </li>
              <li className="flex items-center space-x-4 group">
                <div className="p-2.5 rounded-xl bg-gray-800/60 text-yellow-500 border border-gray-700 group-hover:border-yellow-500/50 transition-all">
                  <FiPhone size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Call Us</span>
                  <span className="text-gray-300 text-sm">{FOOTER_DATA.contact.phone}</span>
                </div>
              </li>
              <li className="flex items-center space-x-4 group">
                <div className="p-2.5 rounded-xl bg-gray-800/60 text-yellow-500 border border-gray-700 group-hover:border-yellow-500/50 transition-all">
                  <FiMail size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email</span>
                  <span className="text-gray-300 text-sm">{FOOTER_DATA.contact.email}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-800/50 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase font-bold">
              © {new Date().getFullYear()} {FOOTER_DATA.company.name} {FOOTER_DATA.company.suffix}
            </p>
            <p className="text-gray-600 text-[9px] uppercase tracking-tighter">Designed for High-Performance Users</p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-500 hover:text-yellow-500 text-[10px] uppercase font-bold tracking-widest transition-colors">Privacy</Link>
              <Link href="/terms" className="text-gray-500 hover:text-yellow-500 text-[10px] uppercase font-bold tracking-widest transition-colors">Terms</Link>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-yellow-500 text-black flex items-center justify-center hover:scale-110 hover:shadow-[0_0_15px_rgba(248,174,27,0.4)] transition-all active:scale-95"
              aria-label="Back to top"
            >
              <FiArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}