"use client"

import { 
  FiSmartphone, 
  FiTablet, 
  FiBattery, 
  FiSpeaker, 
  FiHeadphones,   
  FiZap, 
  FiShield, 
  FiPackage,
  FiGrid,
  FiMenu,
  FiX,
  FiSettings,
  FiMessageSquare
} from 'react-icons/fi'
import { MdOutlineLocalOffer as OfferIcon } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function SideBar() {
  // --- 1. ALL HOOKS MUST BE DECLARED FIRST ---
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeItem, setActiveItem] = useState('smartphones')
  const pathname = usePathname()

  // --- 2. SCREEN DETECTION HOOK ---
  useEffect(() => {
    const checkMobile = () => {
      const mobileSize = window.innerWidth < 768
      setIsMobile(mobileSize)
      // Desktop stays open, Mobile starts closed
      setIsOpen(!mobileSize)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // --- 3. PREVENT SCROLL HOOK ---
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => { document.body.style.overflow = 'auto' }
  }, [isMobile, isOpen])

  // --- 4. CONDITIONAL HIDE LOGIC (MUST BE AFTER HOOKS) ---
  const hiddenPages = ['/about-us', '/privacy', '/terms']
  if (hiddenPages.includes(pathname)) {
    return null
  }

  // --- 5. DATA OBJECTS ---
  const mainNavItems = [
    { id: 'smartphones', label: 'Smartphones', icon: FiSmartphone, color: 'text-blue-500', bgColor: 'bg-blue-500/10', count: 12 },
    { id: 'tablets', label: 'Tablets', icon: FiTablet, color: 'text-purple-500', bgColor: 'bg-purple-500/10', count: 5 },
    { id: 'power-banks', label: 'Power Banks', icon: FiBattery, color: 'text-green-500', bgColor: 'bg-green-500/10', count: 15 },
    { id: 'speakers', label: 'Bluetooth Speakers', icon: FiSpeaker, color: 'text-orange-500', bgColor: 'bg-orange-500/10', count: 6 },
    { id: 'headphones', label: 'Headphones', icon: FiHeadphones, color: 'text-pink-500', bgColor: 'bg-pink-500/10', count: 9 },
    { id: 'cases', label: 'Cases & Covers', icon: FiPackage, color: 'text-indigo-500', bgColor: 'bg-indigo-500/10', count: 24 },
    { id: 'chargers', label: 'Chargers', icon: FiZap, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', count: 18 },
    { id: 'screen-protectors', label: 'Screen Protectors', icon: FiShield, color: 'text-teal-500', bgColor: 'bg-teal-500/10', count: 10 }
  ]

  const bottomNavItems = [
    { id: 'services', label: 'Services', icon: FiSettings, color: 'text-teal-500', bgColor: 'bg-teal-500/10' },
    { id: 'complain', label: 'Complain', icon: FiMessageSquare, color: 'text-red-500', bgColor: 'bg-red-500/10' }
  ]

  const totalItems = mainNavItems.reduce((acc, item) => acc + item.count, 0)

  return (
    <>
      {/* MOBILE TOGGLE - FIXED BALL */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed left-1/2 -translate-x-1/2 z-[110] p-4 rounded-full shadow-2xl transition-all duration-300 bottom-8 active:scale-95 ${
            isOpen 
              ? 'bg-gray-800 text-white' 
              : 'bg-[#F8AE1B] text-black'
          }`}
        >
          {isOpen ? <FiX size={24} /> : (
            <div className="relative">
              <FiMenu size={24} />
              <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-30 scale-125"></span>
              <span className="absolute inset-0 rounded-full bg-[#F8AE1B] animate-ping opacity-15 scale-[1.75]"></span>
            </div>
          )}
        </button>
      </div>

      {/* SIDEBAR WRAPPER */}
      <div className={`
        ${isMobile ? 'fixed inset-0 z-[100]' : 'relative'}
        transition-all duration-300 ${isOpen ? 'visible' : 'invisible md:visible'}
      `}>
        
        {isMobile && isOpen && (
          <div 
            onClick={() => setIsOpen(false)} 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          />
        )}

        <div className={`
          ${isMobile ? 'absolute top-0 left-0 h-screen' : 'sticky top-24 h-[calc(100vh-96px)]'}
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isMobile ? 'w-64' : 'w-60'}
        `}>
          
          <div className="h-full flex flex-col bg-gradient-to-b from-gray-900/95 via-gray-900 to-gray-900 backdrop-blur-xl border-r border-gray-700/30 shadow-xl overflow-hidden">
            
            <div className="p-4 border-b border-gray-700/30">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <FiGrid className="text-yellow-400 relative z-10" size={18} />
                  <div className="absolute inset-0 bg-yellow-400/20 blur-md animate-pulse"></div>
                </div>
                <h3 className="font-bold text-white text-sm tracking-widest uppercase">Categories</h3>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-2 px-3 scrollbar-thin scrollbar-thumb-gray-800">
              <ul className="space-y-1">
                {mainNavItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeItem === item.id
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => { 
                          setActiveItem(item.id); 
                          if (isMobile) setIsOpen(false); 
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 group flex items-center justify-between
                          ${isActive 
                            ? `bg-green-400/10 ${item.color}/20 border-l-2 border-yellow-500 shadow-inner` 
                            : 'hover:bg-gray-700/40 hover:border-l-2 hover:border-gray-600'
                          }
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-1.5 rounded-md ${isActive ? 'bg-yellow-500/20' : item.bgColor}`}>
                            <Icon size={16} className={isActive ? 'text-yellow-400' : item.color} />
                          </div>
                          <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                            {item.label}
                          </span>
                        </div>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full min-w-[24px] text-center ${
                          isActive ? 'bg-white/20 text-white' : 'bg-gray-800 text-gray-400'
                        }`}>
                          {item.count}
                        </span>
                      </button>
                    </li>
                  )
                })}

                <div className="border-t border-gray-700/50 my-4 pt-4"></div>

                {bottomNavItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeItem === item.id
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => { 
                          setActiveItem(item.id); 
                          if (isMobile) setIsOpen(false); 
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 group flex items-center justify-between
                          ${isActive 
                            ? `bg-gradient-to-r ${item.color}/20 border-l-2 border-yellow-500 shadow-inner` 
                            : 'hover:bg-gray-800/40 hover:border-l-2 hover:border-gray-600'
                          }
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-1.5 rounded-md ${item.bgColor}`}>
                            <Icon size={16} className={item.color} />
                          </div>
                          <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                            {item.label}
                          </span>
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="p-4 border-t border-gray-700/30 bg-black/20 mt-auto">
              <div className="group relative overflow-hidden rounded-xl bg-gray-800/30 border border-white/5 p-3 transition-all hover:border-yellow-500/30">
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500/40"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500/80"></span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-gray-300 transition-colors">
                      Stock
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-black text-white group-hover:text-yellow-400 transition-colors">
                      {totalItems}
                    </span>
                    <span className="text-[9px] font-bold text-gray-600 uppercase">Units</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-700/30">
                  <div className="h-full w-2/3 bg-yellow-500/40 group-hover:w-full transition-all duration-700"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}