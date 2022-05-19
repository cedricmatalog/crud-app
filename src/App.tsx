import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Post from './features/posts/Post';
import PostForm from './features/posts/PostForm';
import PostList from './features/posts/PostList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/posts/add" element={<PostForm/>} />
        <Route path="/posts/:id/edit" element={<PostForm/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
