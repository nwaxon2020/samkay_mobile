"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { FiShoppingCart, FiEye, FiX, FiCheck, FiHeart } from 'react-icons/fi'

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  rating: number;
  reviews: number;
  likes: number; 
  isNew?: boolean;
  isFeatured?: boolean;
  images: string[];
  specs: string[];
  quantity?: number;
  colors?: string[];
  stock: number;
  brand: string;
  warranty: string;
  delivery: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [currentLikes, setCurrentLikes] = useState(product.likes)

  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem('samkay-product-likes') || '[]')
    setIsLiked(likes.includes(product.id))
    
    // Listen for likes updates
    const handleLikesUpdate = () => {
      const updatedLikes = JSON.parse(localStorage.getItem('samkay-product-likes') || '[]')
      setIsLiked(updatedLikes.includes(product.id))
    }
    
    window.addEventListener('samkay-update-likes', handleLikesUpdate)
    return () => window.removeEventListener('samkay-update-likes', handleLikesUpdate)
  }, [product.id])

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation()
    const likes = JSON.parse(localStorage.getItem('samkay-product-likes') || '[]')
    let updated = isLiked ? likes.filter((id: string) => id !== product.id) : [...likes, product.id]
    localStorage.setItem('samkay-product-likes', JSON.stringify(updated))
    setIsLiked(!isLiked)
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1)
    window.dispatchEvent(new Event('samkay-update-likes'))
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites")
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation()
    onAddToCart(product)
    window.dispatchEvent(new Event('samkay-update-cart'))
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <>
      <div className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Container with reduced top padding pt-1 */}
        <div 
          className="relative md:h-50 overflow-hidden bg-gradient-to-b from-gray-50 to-white"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Like Button */}
          <button 
            onClick={toggleLike} 
            className={`absolute top-3 left-3 z-10 w-8 h-8 rounded-full shadow-lg flex items-center justify-center transition-all ${isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-red-50 hover:text-red-500'}`}
          >
            <FiHeart fill={isLiked ? "currentColor" : "none"} size={18} />
          </button>

          <div className="bg-black w-full h-60 flex justify-center items-center">
            <img
              src={isHovered && product.images[1] ? product.images[1] : product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-fill  md:object-cover  transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>
        
        <div className="p-4 pt-1">
          {/* Level Header: Brand and Eye Button */}
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{product.brand}</span>
            <button 
                onClick={(e) => {e.stopPropagation(); setIsDetailOpen(true)}}
                className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-full transition-colors"
                title="View Details"
            >
                <FiEye size={20} />
            </button>
          </div>
          
          <h3 className="font-bold text-gray-900 m:text-lg mb-1 line-clamp-2">{product.name}</h3>
          
          {/* Feature Highlight */}
          <p className="text-[10px] md:text-xs font-medium text-blue-600 mb-2 bg-blue-50 inline-block px-2 py-0.5 rounded">
            {product.specs[0]}
          </p>
          
          <div className="flex items-center gap-2 mb-2">
            <FiHeart className="text-red-500" fill="currentColor" size={14} />
            <span className="text-sm text-gray-500">{currentLikes} likes</span>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <p className="text-2xl font-bold text-gray-900">₦{product.price.toLocaleString()}</p>
            <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">{product.category}</span>
          </div>
          
          <div className="flex gap-2 items-center">
            <Link href={`/purchase?id=${product.id}`} className="flex-[3] bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3 rounded-lg text-center">
              Buy
            </Link>
            <button onClick={handleAddToCart} className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
              <FiShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Detail Overlay */}
      {isDetailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsDetailOpen(false)} />
          <div className="relative w-full h-full sm:h-auto sm:max-w-6xl bg-white sm:rounded-2xl shadow-2xl overflow-y-auto max-h-screen">
            <button onClick={() => setIsDetailOpen(false)} className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center"><FiX size={20} /></button>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-gray-50 p-6 md:p-8 flex flex-col items-center">
                <div className="h-64 sm:h-96 flex items-center justify-center mb-4">
                  <img src={product.images[selectedImage]} alt={product.name} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImage(i)} className={`w-16 h-16 rounded-lg border-2 ${selectedImage === i ? 'border-amber-500' : 'border-transparent'}`}>
                      <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover rounded-md" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-6 md:p-12">
                <span className="text-amber-600 font-bold text-sm uppercase">{product.brand}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{product.name}</h2>
                <div className="flex items-center gap-1 text-red-500 font-bold my-4">
                  <FiHeart fill="currentColor" /> {currentLikes} likes
                </div>
                <div className="text-sm md:text-base bg-gray-50 text-gray-500 p-3 rounded">{product.description}</div>
                <div className="text-4xl font-bold text-gray-900 my-4">₦{product.price.toLocaleString()}</div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={handleAddToCart} className="flex-1 bg-white border-2 border-amber-500 text-amber-600 font-bold py-4 rounded-xl flex items-center justify-center gap-2">
                    <FiShoppingCart /> Add to Cart
                  </button>
                  <Link href={`/purchase?id=${product.id}`} className="flex-1 bg-gray-900 text-white font-bold py-4 rounded-xl text-center">Buy Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}