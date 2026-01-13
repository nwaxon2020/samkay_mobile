"use client"
import { useState } from 'react'
import { FiTool, FiX, FiClock, FiZap, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

export interface RepairItem {
  id: string;
  name: string;      // e.g. "iPhone 15 Pro Max Screen"
  category: string;  // e.g. "Screen Repair"
  partPrice: number; 
  laborCost: number;
  daysToFix: number;
  expressExtra: number;
  isNegotiable: boolean;
  image: string;
}

export default function RepairCard({ repair }: { repair: RepairItem }) {
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    return (
        <>
        <div 
            onClick={() => setIsDetailOpen(true)}
            className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-yellow-200 transition-all duration-300 cursor-pointer"
        >
            <div className="h-48 bg-gray-50 flex items-center justify-center p-4">
                <img src={repair.image} alt={repair.name} className="w-full h-full object-fill group-hover:scale-110 transition-transform duration-500 rounded" />
            </div>
            
            <div className="relative p-5">
            <p className='text-sm text-gray-400 absolute font-semibold top-5 right-3 underline'>Open</p>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded-md mb-2 inline-block">
                {repair.category}
            </span>
            <h3 className="font-bold text-gray-900 line-clamp-1">{repair.name}</h3>
            <div className="mt-3 flex items-center justify-between">
                <p className="text-xl font-black text-gray-900">₦{(repair.partPrice + repair.laborCost).toLocaleString()}</p>
                {repair.isNegotiable ? (
                <span className="text-[10px] text-green-600 font-bold flex items-center gap-1"><FiCheckCircle /> Negotiable</span>
                ) : (
                <span className="text-[10px] text-red-500 font-bold flex items-center gap-1"><FiAlertCircle /> Fixed</span>
                )}
            </div>
            </div>
        </div>

        {/* DETAIL OVERLAY */}
        {isDetailOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsDetailOpen(false)} />
                <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden animate-scale-in">
                    <button onClick={() => setIsDetailOpen(false)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200"><FiX /></button>
                    <div className="grid md:grid-cols-2">
                    <div className=" bg-gray-50 pt-4  md:p-8 flex items-center justify-center">
                        <img src={repair.image} alt={repair.name} className="rounded-lg max-h-64 object-contain" />
                    </div>
                    <div className="p-4 md:p-8">
                        <h2 className="text-xl md:text-2xl font-black mb-4 md:mb-6">{repair.name}</h2>
                        <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Part Price:</span>
                            <span className="font-bold">₦{repair.partPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Standard Labor:</span>
                            <span className="font-bold">₦{repair.laborCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm border-t pt-2">
                            <span className="font-bold">Total Cost:</span>
                            <span className="font-black text-blue-600 text-lg">₦{(repair.partPrice + repair.laborCost).toLocaleString()}</span>
                        </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-blue-50 rounded-xl">
                            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs mb-1"><FiClock /> Standard</div>
                            <p className="text-sm font-black">{repair.daysToFix} Days</p>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-xl">
                            <div className="flex items-center gap-2 text-amber-600 font-bold text-xs mb-1"><FiZap /> Express</div>
                            <p className="text-sm font-black">+₦{repair.expressExtra.toLocaleString()}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}