import { render, screen } from '@testing-library/react';

import App from '../App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

test('renders Posts Form', async () => {
  const queryClient = new QueryClient();
  const history = createMemoryHistory();
  history.push('/posts/add');
  render(
    <QueryClientProvider client={queryClient}>
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    </QueryClientProvider>
  );

  //check if Create Post header is displayed
  expect(await screen.findByText(/Create Post/i)).toBeInTheDocument();

  //check if form fields are displayed
  expect(await screen.findByText(/Name/i)).toBeInTheDocument();
  expect(await screen.findByText(/Category/i)).toBeInTheDocument();
  expect(await screen.findByText(/Status/i)).toBeInTheDocument();
  expect(await screen.findByText(/Description/i)).toBeInTheDocument();

  //check if buttons are displayed
  expect(screen.getByTestId('Cancel')).toBeInTheDocument();
  expect(screen.getByTestId('Create')).toBeInTheDocument();
});
