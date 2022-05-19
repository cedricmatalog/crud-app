import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { QueryClient, QueryClientProvider } from 'react-query';

test('renders Posts text', async () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
  
  expect(await screen.findByText(/Posts/i)).toBeInTheDocument();
});
