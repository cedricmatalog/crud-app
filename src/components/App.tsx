import { useQuery } from 'react-query';
import { getDogs } from '../api/DogsAPI';

type Dog = {
  name: string;
  description: string;
  category: number;
  active: boolean;
};

function App() {
  const { isLoading, error, data } = useQuery<Dog[], Error>('dogs', getDogs);

  if (isLoading) return <>'Loading...'</>;

  if (error) return <>'An error has occurred: ' + {error.message}</>;

  return <h1>Dogs</h1>;
}

export default App;
