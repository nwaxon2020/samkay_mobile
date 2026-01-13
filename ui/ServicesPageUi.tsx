"use client"

import { useState, useEffect } from 'react'
import RepairCard, { RepairItem } from '@/components/RepairCard'
import EngineerCard from '@/components/EngineerCard'
import { FiYoutube, FiCalendar, FiClock, FiMessageSquare, FiTrendingUp, FiUsers } from 'react-icons/fi'

export default function ServicesPageUi() {
  const [repairs, setRepairs] = useState<RepairItem[]>([
    { id: '1', name: "iPhone 15 Pro Max OLED", category: "Screen Repair", partPrice: 150000, laborCost: 15000, daysToFix: 1, expressExtra: 5000, isNegotiable: false, image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=300" },
    { id: '2', name: "Samsung S24 Logic Board", category: "Board Repair", partPrice: 180000, laborCost: 30000, daysToFix: 3, expressExtra: 10000, isNegotiable: true, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=300" },
    { id: '3', name: "Type-C Charging Port", category: "Power Flex", partPrice: 12000, laborCost: 5000, daysToFix: 1, expressExtra: 2000, isNegotiable: true, image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=300" },
    { id: '4', name: "Samsung S24 Logic Board", category: "Board Repair", partPrice: 180000, laborCost: 30000, daysToFix: 3, expressExtra: 10000, isNegotiable: true, image: "data:image/jpeg;base64,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" },
]);

  const [engineers] = useState([
    { id: 'e1', name: "Engr. Sam", specialty: "Hardware & Logic Board", phone: "2347034632037", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=200" },
    { id: 'e2', name: "Engr. Kay", specialty: "Screen & Glass Expert", phone: "2347034632037", image: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=200" },
  ]);

  const [news, setNews] = useState<any[]>([]);
  
  // Logic to convert standard YouTube link to Embed link with Autoplay
  const rawYoutubeUrl = "https://www.youtube.com/watch?v=dQnMdRIEPEI";
  const videoId = rawYoutubeUrl.split('v=')[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`;

  useEffect(() => {
    fetch('/api/news').then(res => res.json()).then(data => setNews(data));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. REPAIR CARDS SECTION */}
      <section className="container mx-auto px-3 md:px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-black mb-10 text-center">Mobile <span className="text-blue-600">Hardware</span> Solutions</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {repairs.map(item => <RepairCard key={item.id} repair={item} />)}
        </div>
      </section>

      {/* 2. VIDEO SECTION */}
      <section className="bg-gray-50 py-20 px-3">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-xl md:text-3xl font-black mb-8 flex items-center gap-2"><FiYoutube className="text-red-600" /> New Tech Reviews</h2>
          <div className="aspect-video rounded-lg md:rounded-[1rem] overflow-hidden shadow-2xl border-[6px] md:border-[12px] border-white">
            <iframe 
              width="100%" 
              height="100%" 
              src={embedUrl} 
              allow="autoplay; encrypted-media; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* 3. MOBILE NEWS SECTION */}
      <section className="container mx-auto px-3 md:px-4 py-20">
        <h2 className="text-xl md:text-3xl font-black mb-10 flex items-center gap-2"><FiTrendingUp className="text-amber-500" /> World Wide  Mobile News</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {news.length > 0 ? news.map((article, i) => (
            <a key={i} href={article.url} target="_blank" className="group">
              <div className="h-48 rounded-2xl overflow-hidden mb-4">
                <img src={article.urlToImage || '/logo.jpg'} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{article.title}</h4>
            </a>
          )) : <p>Loading news...</p>}
        </div>
      </section>

      {/* 4. ENGINEER SECTION */}
      <section className="mb-4 bg-gray-200/20 border border-gray-100 container mx-auto px-3 md:px-4 py-16">
        <h2 className="text-xl md:text-3xl font-black mb-10 flex items-center gap-2">
            <FiUsers className="text-blue-600" />
            <span>Expert Engineers <br />
                <span className='text-gray-400 text-sm font-medium'>Contact our expert & experienced Engineers.</span>
            </span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {engineers.map(eng => <EngineerCard key={eng.id} engineer={eng} />)}
        </div>
      </section>

      {/* 5. OPENING HOURS (FOOTER TABLE) */}
      <section className="container mx-auto px-3 md:px-4 pb-20">
        <div className="bg-gray-900 rounded-lg md:rounded-[1rem] p-3 py-6 md:p-8 md:p-12 text-white overflow-hidden shadow-2xl border border-white/5">
          <h3 className="text-2xl font-black mb-8 flex items-center gap-2"><FiCalendar className="text-yellow-400" /> Shop Schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-xs uppercase tracking-[0.2em] border-b border-white/10">
                  <th className="py-4">Day</th>
                  <th className="py-4">Hours</th>
                  <th className="py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { d: "Monday - Friday", h: "9:00 AM - 7:30 PM", s: "Active" },
                  { d: "Saturday", h: "10:00 AM - 6:00 PM", s: "Active" },
                  { d: "Sunday", h: "Closed", s: "Rest Day" }
                ].map((row, i) => (
                  <tr key={i} className="text-sm">
                    <td className="py-5 font-bold">{row.d}</td>
                    <td className="py-5 text-gray-400">{row.h}</td>
                    <td className="py-5 text-right"><span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black">{row.s}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}