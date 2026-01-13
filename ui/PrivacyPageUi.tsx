"use client"

import { useState } from 'react'
import { 
  FiShield, 
  FiLock, 
  FiEye, 
  FiClock, 
  FiUserCheck, 
  FiGlobe, 
  FiSmartphone, 
  FiArrowRight 
} from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'

export default function PrivacyPolicy() {
  // This state is designed to be easily replaced by a Backend CMS fetch
  const [content, setContent] = useState({
    lastUpdated: "January 13, 2026",
    introduction: "At Samkay Mobile, we believe transparency is the foundation of premium service. This policy explains how we protect your digital footprint while you enjoy our elite mobile solutions.",
    
    // Identity & Auth Section
    authSafety: {
      title: "Google Authentication & Safety",
      text: "To ensure maximum security during management consultations and support chats, we exclusively use Google Authentication. We do not see, store, or have access to your Google password. This method ensures that your identity is verified by Google's world-class security protocols, keeping your Samkay account inaccessible to unauthorized parties.",
      note: "Your Google data is only used to establish a secure session for chatting with management."
    },

    sections: [
      {
        id: "data-collection",
        title: "Information We Collect",
        icon: FiEye,
        text: "We collect essential data to fulfill your premium gadget orders: name, encrypted payment tokens, and delivery coordinates. We also analyze device metadata (such as model and OS version) to recommend the most compatible accessories for your specific hardware."
      },
      {
        id: "chat-privacy",
        title: "Communication Confidentiality",
        icon: FiUserCheck,
        text: "Direct chats with Samkay Management are end-to-end encrypted. We maintain logs only for the duration of your service request to ensure quality control and accountability. Once a support ticket is resolved, sensitive chat data is archived in a secure, cold-storage environment."
      },
      {
        id: "security",
        title: "Elite Digital Protection",
        icon: FiShield,
        text: "Our servers are protected by military-grade firewalls. Just as a flagship phone uses biometric security, our database uses multi-factor validation to ensure that only you—and authorized Samkay logistics partners—can access your order history."
      },
      {
        id: "cookies",
        title: "Tracking & Cookies",
        icon: FiGlobe,
        text: "We use 'Essential Cookies' to remember your cart items and 'Preference Cookies' to save your UI settings (like Grid/List view). We do not sell your browsing habits to third-party advertisers."
      },
      {
        id: "device-care",
        title: "Technical Support Data",
        icon: FiSmartphone,
        text: "When requesting technical services or repairs, we may ask for your device's IMEI or Serial Number. This information is used strictly to verify warranty status with manufacturers and is never shared with outside marketing firms."
      }
    ]
  })

  return (
    <div className="my-4 min-h-screen bg-gray-950 text-gray-200 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full mb-6">
            <FiShield className="text-amber-500" />
            <span className="text-amber-500 text-sm font-bold tracking-widest uppercase">Security & Trust</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Privacy <span className="text-amber-500">Policy</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <FiClock />
            <span>Last Updated: {content.lastUpdated}</span>
          </div>
        </div>

        {/* Introduction Block */}
        <div className="bg-gray-900/40 border-l-4 border-amber-500 p-6 mb-12 rounded-r-2xl">
          <p className="text-lg leading-relaxed text-gray-300 italic">
            "{content.introduction}"
          </p>
        </div>

        {/* GOOGLE AUTH SPECIAL SECTION */}
        <div className="mb-12 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent blur-2xl -z-10 opacity-50"></div>
          <div className="bg-gray-900 border border-amber-500/30 rounded-3xl p-8 shadow-2xl transition-all hover:border-amber-500/60">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="p-4 bg-white rounded-2xl shadow-xl shrink-0">
                <FcGoogle size={40} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
                  {content.authSafety.title} <FiShield className="text-green-500" />
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  {content.authSafety.text}
                </p>
                <div className="inline-block bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold px-3 py-1.5 rounded-lg">
                  Note: {content.authSafety.note}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="grid gap-8">
          {content.sections.map((section) => {
            const Icon = section.icon
            return (
              <div key={section.id} className="bg-gray-900/50 border border-gray-800 p-8 rounded-3xl transition-all hover:bg-gray-900/80 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-800 rounded-xl group-hover:bg-amber-500/10 transition-colors">
                    <Icon className="text-amber-500" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>
                    <p className="text-gray-400 leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation Link to Terms */}
        <div className="mt-12 p-6 bg-gray-900/40 border border-gray-800 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
                <h4 className="text-white font-bold">Terms of Service</h4>
                <p className="text-sm text-gray-500">Understand your rights and responsibilities when using Samkay.</p>
            </div>
            <Link 
                href="/terms" 
                className="flex items-center gap-2 text-amber-500 font-bold hover:gap-3 transition-all"
            >
                Read Terms <FiArrowRight />
            </Link>
        </div>

        {/* Final Assurance */}
        <div className="mt-16 text-center">
          <div className="p-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-8"></div>
          <p className="text-gray-500 mb-6 max-w-2xl mx-auto">
            Your trust is our most valuable asset. If you have any concerns regarding how your data is handled, our management is available for direct consultation via the Chat portal.
          </p>
          <Link 
            href="/chat" 
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-amber-500 transition-colors"
          >
            <FiLock /> Contact Privacy Officer
          </Link>
        </div>

      </div>
    </div>
  )
}