import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Package, 
  ShoppingBag, 
  Star, 
  MapPin, 
  Calendar,
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  TrendingUp,
  Sparkles,
  Award,
  Leaf,
  Shirt,
  Crown,
  Scissors,
  Palette,
  Zap,
  Heart,
  Recycle,
  ShoppingCart
} from 'lucide-react';

const UserDashboard = ({
  user,
  listings,
  purchases,
  ongoingSwaps,
  completedSwaps,
  pointHistory
}) => {
  const [activeTab, setActiveTab] = useState('listings');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'accepted':
      case 'delivered':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'pending':
      case 'shipping':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'declined':
      case 'cancelled':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const recentEarnings = pointHistory.filter(t => t.type === 'earned').slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Floating Clothing Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-8 h-8 text-emerald-200/30 animate-pulse">
          <Shirt className="w-full h-full" />
        </div>
        <div className="absolute top-40 right-20 w-6 h-6 text-blue-200/30 animate-bounce" style={{ animationDelay: '1s' }}>
          <Crown className="w-full h-full" />
        </div>
        <div className="absolute bottom-40 left-20 w-7 h-7 text-purple-200/30 animate-pulse" style={{ animationDelay: '2s' }}>
          <Scissors className="w-full h-full" />
        </div>
        <div className="absolute top-60 right-40 w-5 h-5 text-pink-200/30 animate-bounce" style={{ animationDelay: '0.5s' }}>
          <Palette className="w-full h-full" />
        </div>
        <div className="absolute bottom-60 right-10 w-6 h-6 text-indigo-200/30 animate-pulse" style={{ animationDelay: '1.5s' }}>
          <Heart className="w-full h-full" />
        </div>
      </div>

      {/* Enhanced Header with Fashion Theme */}
      <div className="relative bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-blue-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center space-x-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-500/25">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-24 h-24 rounded-3xl object-cover"
                  />
                ) : (
                  <UserIcon className="w-12 h-12 text-white" />
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Shirt className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <h1 className="text-4xl font-light text-slate-900">{user.name}</h1>
                <div className="flex items-center space-x-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                  <Crown className="w-4 h-4" />
                  <span>Fashion Curator</span>
                </div>
              </div>
              <div className="flex items-center space-x-8 text-slate-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-sm">{user.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm">Member since {formatDate(user.joinedDate)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Recycle className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium">{user.sustainabilityScore} Style Impact Score</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Enhanced Stats Grid with Clothing Icons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-white/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1 flex items-center">
                  <Coins className="w-3 h-3 mr-1" />
                  Style Points
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                  {user.points.toLocaleString()}
                </p>
                <p className="text-xs text-emerald-600 font-medium mt-1">+120 this week</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-7 h-7 text-emerald-600" />
              </div>
            </div>
          </div>
          
          <div className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-white/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1 flex items-center">
                  <Shirt className="w-3 h-3 mr-1" />
                  Active Listings
                </p>
                <p className="text-3xl font-bold text-slate-900">{listings.filter(item => item.isAvailable).length}</p>
                <p className="text-xs text-blue-600 font-medium mt-1">2 new views</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Package className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-white/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1 flex items-center">
                  <Recycle className="w-3 h-3 mr-1" />
                  Items Exchanged
                </p>
                <p className="text-3xl font-bold text-slate-900">{user.itemsExchanged}</p>
                <p className="text-xs text-purple-600 font-medium mt-1">+3 this month</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-7 h-7 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-white/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1 flex items-center">
                  <Scissors className="w-3 h-3 mr-1" />
                  Active Swaps
                </p>
                <p className="text-3xl font-bold text-slate-900">{ongoingSwaps.length}</p>
                <p className="text-xs text-orange-600 font-medium mt-1">1 pending response</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-7 h-7 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 overflow-hidden">
              {/* Enhanced Tab Navigation with Fashion Icons */}
              <div className="border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-transparent">
                <nav className="flex">
                  {[
                    { id: 'listings', label: 'My Wardrobe', icon: Shirt, count: listings.length },
                    { id: 'purchases', label: 'My Finds', icon: ShoppingCart, count: purchases.length },
                    { id: 'swaps', label: 'Style Swaps', icon: Scissors, count: ongoingSwaps.length + completedSwaps.length }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center space-x-3 px-8 py-5 text-sm font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'text-emerald-700 bg-gradient-to-r from-emerald-50 to-emerald-100/50'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/50'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        activeTab === tab.id
                          ? 'bg-emerald-200 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {tab.count}
                      </span>
                      {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-8">
                {/* Enhanced My Listings Tab */}
                {activeTab === 'listings' && (
                  <div>
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center">
                          <Shirt className="w-6 h-6 mr-3 text-emerald-600" />
                          My Wardrobe
                        </h3>
                        <p className="text-slate-600">Manage your clothing items available for exchange</p>
                      </div>
                      <button className="group flex items-center space-x-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30">
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        <span className="font-medium">Add New Item</span>
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {listings.map(item => (
                        <div key={item.id} className="group relative bg-gradient-to-r from-white to-slate-50/50 border border-slate-200/60 rounded-2xl p-6 hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-300/60 transition-all duration-300">
                          <div className="flex items-center space-x-6">
                            <div className="relative">
                              <img 
                                src={item.images[0]} 
                                alt={item.title}
                                className="w-20 h-20 rounded-xl object-cover shadow-md"
                              />
                              <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                item.isAvailable 
                                  ? 'bg-emerald-500 text-white' 
                                  : 'bg-slate-400 text-white'
                              }`}>
                                {item.isAvailable ? <Sparkles className="w-3 h-3" /> : '×'}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-slate-900 text-lg mb-1">{item.title}</h4>
                              <p className="text-slate-600 mb-2 flex items-center">
                                <Palette className="w-3 h-3 mr-1" />
                                {item.category} • Size {item.size} • {item.condition}
                              </p>
                              <div className="flex items-center space-x-4">
                                <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold">
                                  <Coins className="w-4 h-4" />
                                  <span>{item.pointValue} pts</span>
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                  item.isAvailable 
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                    : 'bg-slate-50 text-slate-700 border-slate-200'
                                }`}>
                                  {item.isAvailable ? 'Available' : 'Unavailable'}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110">
                                <Eye className="w-5 h-5" />
                              </button>
                              <button className="p-3 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 hover:scale-110">
                                <Edit className="w-5 h-5" />
                              </button>
                              <button className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110">
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhanced My Purchases Tab */}
                {activeTab === 'purchases' && (
                  <div>
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center">
                        <ShoppingCart className="w-6 h-6 mr-3 text-blue-600" />
                        My Fashion Finds
                      </h3>
                      <p className="text-slate-600">Track your clothing purchases and delivery status</p>
                    </div>
                    <div className="space-y-4">
                      {purchases.map(purchase => (
                        <div key={purchase.id} className="bg-gradient-to-r from-white to-slate-50/50 border border-slate-200/60 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center space-x-6">
                            <div className="relative">
                              <img 
                                src={purchase.item.images[0]} 
                                alt={purchase.item.title}
                                className="w-20 h-20 rounded-xl object-cover shadow-md"
                              />
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <ShoppingBag className="w-3 h-3 text-white" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-slate-900 text-lg mb-1">{purchase.item.title}</h4>
                              <p className="text-slate-600 mb-1 flex items-center">
                                <UserIcon className="w-3 h-3 mr-1" />
                                From {purchase.item.userName}
                              </p>
                              <p className="text-slate-500 text-sm flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {formatDate(purchase.purchaseDate)}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-1 text-emerald-700 font-bold mb-2">
                                <Coins className="w-4 h-4" />
                                <span>{purchase.pointsSpent} pts</span>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(purchase.status)}`}>
                                {purchase.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhanced Swap History Tab */}
                {activeTab === 'swaps' && (
                  <div className="space-y-10">
                    {/* Ongoing Swaps */}
                    <div>
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                          <Scissors className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-slate-900">Active Style Swaps</h4>
                          <p className="text-slate-600 text-sm">{ongoingSwaps.length} swaps in progress</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {ongoingSwaps.map(swap => (
                          <div key={swap.id} className="bg-gradient-to-r from-orange-50/50 to-white border border-orange-200/60 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                              <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(swap.status)}`}>
                                {swap.status}
                              </span>
                              <span className="text-sm text-slate-500 font-medium">{formatDate(swap.createdAt)}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                              <div>
                                <p className="text-sm font-semibold text-slate-700 mb-4 flex items-center">
                                  <ArrowUpRight className="w-4 h-4 mr-2 text-emerald-600" />
                                  Your Item
                                </p>
                                <div className="flex items-center space-x-4">
                                  <img 
                                    src={swap.requesterItem.images[0]} 
                                    alt={swap.requesterItem.title}
                                    className="w-16 h-16 rounded-xl object-cover shadow-md"
                                  />
                                  <div className="min-w-0">
                                    <p className="font-semibold text-slate-900">{swap.requesterItem.title}</p>
                                    <p className="text-sm text-slate-600 flex items-center">
                                      <Shirt className="w-3 h-3 mr-1" />
                                      {swap.requesterItem.category}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-700 mb-4 flex items-center">
                                  <ArrowDownLeft className="w-4 h-4 mr-2 text-blue-600" />
                                  Their Item
                                </p>
                                <div className="flex items-center space-x-4">
                                  <img 
                                    src={swap.targetItem.images[0]} 
                                    alt={swap.targetItem.title}
                                    className="w-16 h-16 rounded-xl object-cover shadow-md"
                                  />
                                  <div className="min-w-0">
                                    <p className="font-semibold text-slate-900">{swap.targetItem.title}</p>
                                    <p className="text-sm text-slate-600 flex items-center">
                                      <UserIcon className="w-3 h-3 mr-1" />
                                      {swap.targetItem.userName}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Completed Swaps */}
                    <div>
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-slate-900">Completed Style Swaps</h4>
                          <p className="text-slate-600 text-sm">{completedSwaps.length} successful exchanges</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {completedSwaps.slice(0, 3).map(swap => (
                          <div key={swap.id} className="bg-gradient-to-r from-emerald-50/50 to-white border border-emerald-200/60 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                              <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 font-semibold text-sm flex items-center">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Completed
                              </span>
                              <span className="text-sm text-slate-500 font-medium">{formatDate(swap.completedAt)}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                              <div>
                                <p className="text-sm font-semibold text-slate-700 mb-4 flex items-center">
                                  <ArrowUpRight className="w-4 h-4 mr-2 text-emerald-600" />
                                  Your Item
                                </p>
                                <div className="flex items-center space-x-4">
                                  <img 
                                    src={swap.requesterItem.images[0]} 
                                    alt={swap.requesterItem.title}
                                    className="w-16 h-16 rounded-xl object-cover shadow-md"
                                  />
                                  <div className="min-w-0">
                                    <p className="font-semibold text-slate-900">{swap.requesterItem.title}</p>
                                    <p className="text-sm text-slate-600 flex items-center">
                                      <Shirt className="w-3 h-3 mr-1" />
                                      {swap.requesterItem.category}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-700 mb-4 flex items-center">
                                  <ArrowDownLeft className="w-4 h-4 mr-2 text-blue-600" />
                                  Their Item
                                </p>
                                <div className="flex items-center space-x-4">
                                  <img 
                                    src={swap.targetItem.images[0]} 
                                    alt={swap.targetItem.title}
                                    className="w-16 h-16 rounded-xl object-cover shadow-md"
                                  />
                                  <div className="min-w-0">
                                    <p className="font-semibold text-slate-900">{swap.targetItem.title}</p>
                                    <p className="text-sm text-slate-600 flex items-center">
                                      <UserIcon className="w-3 h-3 mr-1" />
                                      {swap.targetItem.userName}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar with Fashion Elements */}
          <div className="space-y-6">
            {/* Enhanced Profile Card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                  <Crown className="w-4 h-4 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Style Profile</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <p className="text-sm text-slate-900 bg-slate-50 rounded-lg px-3 py-2">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                  <p className="text-sm text-slate-900 bg-slate-50 rounded-lg px-3 py-2">{user.location}</p>
                </div>
                <button className="w-full bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 py-3 px-4 rounded-xl hover:from-slate-200 hover:to-slate-300 transition-all duration-300 text-sm font-semibold flex items-center justify-center">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Enhanced Points Activity */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Recent Style Activity</h3>
              </div>
              <div className="space-y-4">
                {recentEarnings.map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50/50 to-transparent rounded-xl border border-emerald-100/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-emerald-700">+{transaction.amount}</p>
                        <p className="text-xs text-slate-600">{transaction.description}</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{formatDate(transaction.date)}</span>
                  </div>
                ))}
                <button className="w-full text-sm text-emerald-600 hover:text-emerald-700 font-semibold pt-3 hover:bg-emerald-50 rounded-lg py-2 transition-all duration-200">
                  View All Activity
                </button>
              </div>
            </div>

            {/* Enhanced Impact Card with Fashion Theme */}
            <div className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-2xl p-6 text-white shadow-xl shadow-emerald-500/25 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              <div className="absolute top-4 right-4 text-white/20">
                <Shirt className="w-8 h-8" />
              </div>
              <div className="absolute bottom-4 left-4 text-white/20">
                <Recycle className="w-6 h-6" />
              </div>
              <div className="relative">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold">Your Fashion Impact</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-100 text-sm font-medium flex items-center">
                      <Shirt className="w-3 h-3 mr-1" />
                      Clothes Saved
                    </span>
                    <span className="font-bold text-lg">{user.itemsExchanged}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-100 text-sm font-medium flex items-center">
                      <Leaf className="w-3 h-3 mr-1" />
                      CO₂ Reduced
                    </span>
                    <span className="font-bold text-lg">{(user.itemsExchanged * 2.3).toFixed(1)} kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-100 text-sm font-medium flex items-center">
                      <Recycle className="w-3 h-3 mr-1" />
                      Water Saved
                    </span>
                    <span className="font-bold text-lg">{(user.itemsExchanged * 2700).toLocaleString()} L</span>
                  </div>
                  <div className="pt-4 border-t border-white/20">
                    <div className="flex items-center space-x-2">
                      <Crown className="w-4 h-4 text-yellow-300" />
                      <span className="text-sm font-medium">Fashion sustainability champion!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;