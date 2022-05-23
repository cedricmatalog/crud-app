import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import App from '../App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const server = setupServer(
  rest.get('http://localhost:4000/posts', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'Pellentesque1',
          description: 'Pellentesque sit amet porttitadsdor eget dolor morbi',
          category: 2,
          active: false,
          id: 1,
        },
        {
          name: 'Faucibus1',
          description: 'nisl tincidunt eget nullam non nisi',
          category: 1,
          active: true,
          id: 2,
        },
      ])
    );
  }),
  rest.get('http://localhost:4000/postsCategories', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: 'Tellus',
        },
        {
          id: 2,
          name: 'Quis viverra',
        },
        {
          id: 3,
          name: 'Vitae sapien',
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders Posts List', async () => {
  const queryClient = new QueryClient();
  const history = createMemoryHistory();

  render(
    <QueryClientProvider client={queryClient}>
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    </QueryClientProvider>
  );

  //check if Posts header is displayed
  expect(await screen.findByText(/Posts/i)).toBeInTheDocument();

  //check if loading is displayed when fetching
  expect(screen.getByTestId('loading')).toBeInTheDocument();

  //check if buttons are displayed after fetching
  expect(await screen.findByText(/Create/i)).toBeInTheDocument();
  expect(await screen.findByText(/Delete/i)).toBeInTheDocument();

  // check if two cards are displayed based on mocked api return
  const cards = screen.queryAllByTestId('card');
  expect(cards).toHaveLength(2);
});
