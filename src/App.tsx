import { Routes, Route } from 'react-router-dom';
import NoRouteFound from './components/NoRouteFound';

import Post from './features/posts/Post';
import PostForm from './features/posts/PostForm';
import PostList from './features/posts/PostList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts/:id" element={<Post />} />
      <Route path="/posts/add" element={<PostForm />} />
      <Route path="*" element={<NoRouteFound />} />
    </Routes>
  );
}

export default App;
