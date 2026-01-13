"use client"

import { FiMessageCircle } from 'react-icons/fi'

interface Engineer {
  id: string;
  name: string;
  image: string;
  specialty: string;
  phone: string;
}

export default function EngineerCard({ engineer }: { engineer: Engineer }) {
    const whatsappUrl = `https://wa.me/${engineer.phone}?text=${encodeURIComponent(
        `Hello ${engineer.name}, I am contacting you from Samkay Mobile regarding a repair service.`
    )}`;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-2 md:p-5 shadow-sm hover:shadow-md transition-all text-center group">
        <div className="w-12 h-12 md:w-24 md:h-24 mx-auto mb-2 md:mb-4 rounded-full overflow-hidden border-2 border-blue-100 group-hover:border-blue-500 transition-colors">
            <img src={engineer.image} alt={engineer.name} className="w-full h-full object-cover" />
        </div>
        <h4 className="font-bold text-gray-900 md:text-lg">{engineer.name}</h4>
        <p className="text-xs md:text-sm text-gray-500 md-3 md:mb-6">{engineer.specialty}</p>
        <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-xs md:text-sm flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-2 px-4 rounded-xl hover:opacity-90 transition-opacity"
        >
            <FiMessageCircle size={18} />
            Chat Eng.
        </a>
        </div>
    )
}