const getPosts = () =>
  fetch('http://localhost:4000/posts').then((res) => res.json());

const getPostsCategories = () =>
  fetch('http://localhost:4000/categories').then((res) => res.json());

export { getPosts, getPostsCategories };
