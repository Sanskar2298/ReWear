"use client"

import { useState } from "react"
import {
  UserIcon,
  Package,
  Star,
  MapPin,
  Calendar,
  Coins,
  CheckCircle,
  Shirt,
  Crown,
  Scissors,
  Palette,
  Heart,
  Recycle,
  ChevronLeft,
  ChevronRight,
  Share2,
  MessageCircle,
  Shield,
  Truck,
  RefreshCw,
  Info,
  Tag,
  Ruler,
  Droplets,
} from "lucide-react"

const ItemDetailPage = ({ item, uploader, currentUser, onSwapRequest, onPointsRedeem }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedAction, setSelectedAction] = useState(null)
  const [showSwapModal, setShowSwapModal] = useState(false)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === item.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? item.images.length - 1 : prev - 1))
  }

  const getConditionColor = (condition) => {
    switch (condition.toLowerCase()) {
      case "excellent":
        return "text-emerald-700 bg-emerald-50 border-emerald-200"
      case "good":
        return "text-blue-700 bg-blue-50 border-blue-200"
      case "fair":
        return "text-amber-700 bg-amber-50 border-amber-200"
      default:
        return "text-slate-700 bg-slate-50 border-slate-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Floating Clothing Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-8 h-8 text-emerald-200/30 animate-pulse">
          <Shirt className="w-full h-full" />
        </div>
        <div
          className="absolute top-40 right-20 w-6 h-6 text-blue-200/30 animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          <Crown className="w-full h-full" />
        </div>
        <div
          className="absolute bottom-40 left-20 w-7 h-7 text-purple-200/30 animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          <Scissors className="w-full h-full" />
        </div>
        <div
          className="absolute top-60 right-40 w-5 h-5 text-pink-200/30 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          <Palette className="w-full h-full" />
        </div>
        <div
          className="absolute bottom-60 right-10 w-6 h-6 text-indigo-200/30 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        >
          <Heart className="w-full h-full" />
        </div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-blue-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-3 text-slate-600 hover:text-slate-900 transition-colors duration-200">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back to Browse</span>
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-3 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 overflow-hidden">
              <div className="relative aspect-square">
                <img
                  src={item.images[currentImageIndex] || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {/* Navigation Arrows */}
                {item.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6 text-slate-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6 text-slate-700" />
                    </button>
                  </>
                )}
                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {item.images.length}
                </div>
                {/* Availability Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                      item.isAvailable
                        ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/25"
                        : "bg-slate-400 text-white border-slate-400"
                    }`}
                  >
                    {item.isAvailable ? "Available" : "Not Available"}
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {item.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex
                        ? "border-emerald-500 shadow-lg shadow-emerald-500/25"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-8">
            {/* Main Item Info */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 p-8">
              <div className="space-y-6">
                {/* Title and Category */}
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium flex items-center">
                      <Shirt className="w-3 h-3 mr-1" />
                      {item.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getConditionColor(item.condition)}`}
                    >
                      {item.condition}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{item.title}</h1>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>

                {/* Item Specifications */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                        <Ruler className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700">Size</p>
                        <p className="text-lg font-bold text-slate-900">{item.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                        <Palette className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700">Color</p>
                        <p className="text-lg font-bold text-slate-900">{item.color}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                        <Tag className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700">Brand</p>
                        <p className="text-lg font-bold text-slate-900">{item.brand}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                        <Droplets className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700">Material</p>
                        <p className="text-lg font-bold text-slate-900">{item.material}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Points Value */}
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                        <Coins className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-emerald-700">Style Points Value</p>
                        <p className="text-2xl font-bold text-emerald-900">{item.pointValue} points</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-emerald-600 font-medium">Your Balance</p>
                      <p className="text-lg font-bold text-emerald-900">{currentUser.points} points</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Uploader Info */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Style Curator</h3>
              </div>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    {uploader.avatar ? (
                      <img
                        src={uploader.avatar || "/placeholder.svg"}
                        alt={uploader.name}
                        className="w-16 h-16 rounded-2xl object-cover"
                      />
                    ) : (
                      <UserIcon className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-xl font-bold text-slate-900">{uploader.name}</h4>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < uploader.rating ? "text-amber-400 fill-current" : "text-slate-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-slate-600 ml-2">({uploader.reviewCount})</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-slate-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{uploader.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Package className="w-3 h-3" />
                      <span>{uploader.itemsListed} items listed</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>{uploader.successfulSwaps} successful swaps</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200">
                <button className="w-full bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 py-3 px-4 rounded-xl hover:from-slate-200 hover:to-slate-300 transition-all duration-300 text-sm font-semibold flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Curator
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            {item.isAvailable && (
              <div className="space-y-4">
                {/* Swap Request */}
                <button
                  onClick={() => setShowSwapModal(true)}
                  className="w-full group bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 px-6 rounded-2xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="text-lg font-semibold">Request Style Swap</span>
                  </div>
                  <p className="text-emerald-100 text-sm mt-1">Exchange one of your items</p>
                </button>

                {/* Points Redemption */}
                <button
                  onClick={() => onPointsRedeem(item)}
                  disabled={currentUser.points < item.pointValue}
                  className={`w-full group py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg ${
                    currentUser.points >= item.pointValue
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
                      : "bg-slate-200 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Coins className="w-5 h-5" />
                    <span className="text-lg font-semibold">Redeem with {item.pointValue} Points</span>
                  </div>
                  {currentUser.points < item.pointValue && (
                    <p className="text-slate-400 text-sm mt-1">
                      Need {item.pointValue - currentUser.points} more points
                    </p>
                  )}
                </button>
              </div>
            )}

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Info className="w-5 h-5 text-slate-600" />
                <h4 className="font-semibold text-slate-900">Additional Information</h4>
              </div>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Listed on {formatDate(item.listedDate)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Protected by ReWear's Style Guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4" />
                  <span>Free shipping on all exchanges</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Recycle className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600 font-medium">This exchange saves ~2.3kg CO₂ and 2,700L water</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Sample data for demonstration
const sampleItem = {
  id: 1,
  title: "Vintage Denim Jacket",
  description:
    "A beautiful vintage denim jacket in excellent condition. Perfect for layering and adding a classic touch to any outfit. Features original brass buttons and minimal wear.",
  category: "Jackets",
  size: "M",
  color: "Classic Blue",
  brand: "Levi's",
  material: "100% Cotton Denim",
  condition: "Excellent",
  pointValue: 150,
  isAvailable: true,
  listedDate: "2024-01-15",
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
}

const sampleUploader = {
  id: 1,
  name: "Sarah Chen",
  avatar: "/placeholder.svg?height=100&width=100",
  location: "San Francisco, CA",
  rating: 5,
  reviewCount: 47,
  itemsListed: 23,
  successfulSwaps: 18,
}

const sampleCurrentUser = {
  points: 320,
}

export default function ItemDetail() {
  const handleSwapRequest = (item) => {
    console.log("Swap request for:", item)
  }

  const handlePointsRedeem = (item) => {
    console.log("Points redemption for:", item)
  }

  return (
    <ItemDetailPage
      item={sampleItem}
      uploader={sampleUploader}
      currentUser={sampleCurrentUser}
      onSwapRequest={handleSwapRequest}
      onPointsRedeem={handlePointsRedeem}
    />
  )
}
