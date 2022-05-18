import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';
import { QueryClient, QueryClientProvider } from 'react-query';

test('renders Dogs text', async () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
  
  expect(await screen.findByText(/Dogs/i)).toBeInTheDocument();
});
