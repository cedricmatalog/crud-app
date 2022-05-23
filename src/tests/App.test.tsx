import { render, screen } from '@testing-library/react';

import App from '../App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

test('renders 404 not found', async () => {
  const queryClient = new QueryClient();
  const history = createMemoryHistory();
  history.push('/some/bad/route');
  render(
    <QueryClientProvider client={queryClient}>
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    </QueryClientProvider>
  );

  //check if Not Found text is displayed
  expect(await screen.findByText(/Not Found/i)).toBeInTheDocument();
});
