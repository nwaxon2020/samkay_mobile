"use client"

import { useState } from 'react'
import { FiFileText, FiTruck, FiRefreshCw, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'

export default function TermsAndConditionsPageUi() {
  const [terms, setTerms] = useState({
    version: "2.1.0",
    effectiveDate: "January 01, 2024",
    clauses: [
      {
        title: "1. Acceptance of Terms",
        icon: FiCheckCircle,
        content: "By accessing Samkay Mobile, you agree to follow our premium service standards. We provide high-end mobile solutions under the condition that users provide accurate information and respect our intellectual property."
      },
      {
        title: "2. Shipping & Logistics",
        icon: FiTruck,
        content: "We provide insured shipping for all gadgets. While we aim for next-day delivery on flagships, Samkay Mobile is not liable for delays caused by third-party logistics providers or custom clearances for imported tech."
      },
      {
        title: "3. Warranty & Returns",
        icon: FiRefreshCw,
        content: "Our gadgets come with a standard 1-2 year warranty. Returns are only accepted for manufacturer defects. Physical damage, water exposure, or unauthorized software modifications (rooting/jailbreaking) void all Samkay warranties."
      },
      {
        title: "4. Pricing & Payments",
        icon: FiAlertTriangle,
        content: "Prices for gadgets fluctuate based on international tech markets. We reserve the right to cancel orders if a pricing error occurs. All payments are processed through secure, encrypted gateways."
      }
    ]
  })

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 border-b border-gray-800 pb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Service <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">Terms</span>
          </h1>
          <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest">
            <span className="bg-gray-800 px-3 py-1 rounded text-gray-400">Version {terms.version}</span>
            <span className="bg-gray-800 px-3 py-1 rounded text-gray-400">Effective: {terms.effectiveDate}</span>
          </div>
        </div>

        {/* Dynamic Clauses */}
        <div className="grid gap-8">
          {terms.clauses.map((clause, index) => {
            const Icon = clause.icon
            return (
              <div 
                key={index} 
                className="relative overflow-hidden group bg-gray-900/30 border border-gray-800 p-8 rounded-2xl hover:border-amber-500/30 transition-all duration-500"
              >
                {/* Background Decor */}
                <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <Icon size={120} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="text-amber-500" size={20} />
                    <h3 className="text-xl font-bold text-white">{clause.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {clause.content}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-16 p-8 bg-amber-500/5 rounded-2xl border border-amber-500/10 text-center">
          <p className="text-gray-400 text-sm">
            By continuing to use Samkay Mobile, you acknowledge that you have read and understood these terms in full.
          </p>
        </div>
      </div>
    </div>
  )
}