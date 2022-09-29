import React, { useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Login from './components/Login';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import RecivedMessages from './components/RecivedMessages';

const queryClient = new QueryClient();

function App() {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <>
        {!userId ?
          (<Login setUserId={setUserId} />
          ) : (
            <>
              <Chat userId={userId} />
              <RecivedMessages userId={userId} />
            </>
          )}
      </>
    </QueryClientProvider>
  );
}

export default App;
