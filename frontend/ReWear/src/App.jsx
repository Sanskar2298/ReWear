import React from 'react';
import UserDashboard from './components/UserDashboard'
import {
  mockUser,
  mockListings,
  mockPurchases,
  mockOngoingSwaps,
  mockCompletedSwaps,
  mockPointHistory
} from './data/mockData';

function App() {
  return (
    <UserDashboard
      user={mockUser}
      listings={mockListings}
      purchases={mockPurchases}
      ongoingSwaps={mockOngoingSwaps}
      completedSwaps={mockCompletedSwaps}
      pointHistory={mockPointHistory}
    />
  );
}

export default App;