export const mockUser = {
  id: 'user1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
  points: 1250,
  itemsExchanged: 28,
  sustainabilityScore: 95,
  joinedDate: '2023-06-15',
  location: 'San Francisco, CA',
  bio: 'Passionate about sustainable fashion and reducing textile waste. Love finding new homes for clothes I no longer wear!'
};

export const mockListings = [
  {
    id: 'item1',
    userId: 'user1',
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Vintage Levi\'s Denim Jacket',
    description: 'Classic blue denim jacket in excellent condition. Perfect for layering.',
    category: 'Outerwear',
    size: 'M',
    condition: 'Good',
    brand: 'Levi\'s',
    color: 'Blue',
    images: ['https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=400'],
    pointValue: 120,
    isAvailable: true,
    createdAt: '2024-01-15',
    swapType: 'both'
  },
  {
    id: 'item2',
    userId: 'user1',
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Silk Summer Blouse',
    description: 'Elegant silk blouse perfect for office or casual wear.',
    category: 'Tops',
    size: 'S',
    condition: 'Like New',
    brand: 'Zara',
    color: 'White',
    images: ['https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400'],
    pointValue: 80,
    isAvailable: true,
    createdAt: '2024-01-10',
    swapType: 'points'
  },
  {
    id: 'item3',
    userId: 'user1',
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Designer Black Dress',
    description: 'Little black dress, perfect for evening events.',
    category: 'Dresses',
    size: 'M',
    condition: 'New',
    brand: 'Calvin Klein',
    color: 'Black',
    images: ['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400'],
    pointValue: 200,
    isAvailable: false,
    createdAt: '2024-01-05',
    swapType: 'direct'
  }
];

export const mockPurchases = [
  {
    id: 'purchase1',
    itemId: 'item4',
    item: {
      id: 'item4',
      userId: 'user2',
      userName: 'Emma Davis',
      userAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Cozy Wool Sweater',
      description: 'Warm wool sweater for winter days.',
      category: 'Sweaters',
      size: 'M',
      condition: 'Good',
      brand: 'H&M',
      color: 'Gray',
      images: ['https://images.pexels.com/photos/7679841/pexels-photo-7679841.jpeg?auto=compress&cs=tinysrgb&w=400'],
      pointValue: 90,
      isAvailable: false,
      createdAt: '2024-01-08',
      swapType: 'points'
    },
    buyerId: 'user1',
    sellerId: 'user2',
    pointsSpent: 90,
    purchaseDate: '2024-01-20',
    status: 'delivered'
  },
  {
    id: 'purchase2',
    itemId: 'item5',
    item: {
      id: 'item5',
      userId: 'user3',
      userName: 'Mike Chen',
      userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Vintage Band T-Shirt',
      description: 'Classic rock band t-shirt from the 90s.',
      category: 'T-Shirts',
      size: 'L',
      condition: 'Good',
      brand: 'Vintage',
      color: 'Black',
      images: ['https://images.pexels.com/photos/7679647/pexels-photo-7679647.jpeg?auto=compress&cs=tinysrgb&w=400'],
      pointValue: 60,
      isAvailable: false,
      createdAt: '2024-01-12',
      swapType: 'points'
    },
    buyerId: 'user1',
    sellerId: 'user3',
    pointsSpent: 60,
    purchaseDate: '2024-01-18',
    status: 'shipping'
  }
];

export const mockOngoingSwaps = [
  {
    id: 'swap1',
    requesterItem: mockListings[0],
    targetItem: {
      id: 'item6',
      userId: 'user4',
      userName: 'Lisa Wilson',
      userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Leather Boots',
      description: 'Brown leather ankle boots, barely worn.',
      category: 'Shoes',
      size: '8',
      condition: 'Like New',
      brand: 'Doc Martens',
      color: 'Brown',
      images: ['https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=400'],
      pointValue: 150,
      isAvailable: true,
      createdAt: '2024-01-14',
      swapType: 'direct'
    },
    requesterId: 'user1',
    targetUserId: 'user4',
    status: 'pending',
    createdAt: '2024-01-22'
  },
  {
    id: 'swap2',
    requesterItem: mockListings[1],
    targetItem: {
      id: 'item7',
      userId: 'user5',
      userName: 'Amy Rodriguez',
      userAvatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Summer Sundress',
      description: 'Flowy floral sundress perfect for summer.',
      category: 'Dresses',
      size: 'S',
      condition: 'Good',
      brand: 'Forever 21',
      color: 'Floral',
      images: ['https://images.pexels.com/photos/1536622/pexels-photo-1536622.jpeg?auto=compress&cs=tinysrgb&w=400'],
      pointValue: 70,
      isAvailable: true,
      createdAt: '2024-01-16',
      swapType: 'both'
    },
    requesterId: 'user1',
    targetUserId: 'user5',
    status: 'accepted',
    createdAt: '2024-01-21'
  }
];

export const mockCompletedSwaps = [
  {
    id: 'swap3',
    requesterItem: {
      id: 'item8',
      userId: 'user1',
      userName: 'Sarah Johnson',
      userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Cashmere Scarf',
      description: 'Soft cashmere scarf in neutral colors.',
      category: 'Accessories',
      size: 'One Size',
      condition: 'Good',
      brand: 'Uniqlo',
      color: 'Beige',
      images: ['https://images.pexels.com/photos/7679836/pexels-photo-7679836.jpeg?auto=compress&cs=tinysrgb&w=400'],
      pointValue: 45,
      isAvailable: false,
      createdAt: '2024-01-01',
      swapType: 'direct'
    },
    targetItem: {
      id: 'item9',
      userId: 'user6',
      userName: 'Jessica Kim',
      userAvatar: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Wool Cardigan',
      description: 'Cozy wool cardigan with button closure.',
      category: 'Sweaters',
      size: 'M',
      condition: 'Good',
      brand: 'Gap',
      color: 'Navy',
      images: ['https://images.pexels.com/photos/7679844/pexels-photo-7679844.jpeg?auto=compress&cs=tinysrgb&w=400'],
      pointValue: 55,
      isAvailable: false,
      createdAt: '2024-01-03',
      swapType: 'direct'
    },
    requesterId: 'user1',
    targetUserId: 'user6',
    status: 'completed',
    createdAt: '2024-01-12',
    completedAt: '2024-01-19'
  }
];

export const mockPointHistory = [
  {
    id: 'trans1',
    type: 'earned',
    amount: 120,
    description: 'Sold Vintage Denim Jacket',
    date: '2024-01-20',
    relatedItemId: 'item1'
  },
  {
    id: 'trans2',
    type: 'spent',
    amount: 90,
    description: 'Purchased Wool Sweater',
    date: '2024-01-20',
    relatedItemId: 'item4'
  },
  {
    id: 'trans3',
    type: 'earned',
    amount: 80,
    description: 'Listed Silk Summer Blouse',
    date: '2024-01-18',
    relatedItemId: 'item2'
  },
  {
    id: 'trans4',
    type: 'earned',
    amount: 50,
    description: 'Completed Swap Bonus',
    date: '2024-01-15',
    relatedItemId: 'swap3'
  },
  {
    id: 'trans5',
    type: 'spent',
    amount: 60,
    description: 'Purchased Vintage T-Shirt',
    date: '2024-01-18',
    relatedItemId: 'item5'
  }
];