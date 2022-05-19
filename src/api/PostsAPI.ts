const baseUrl = 'http://localhost:4000/';

const baseFetch = (url: string) =>
  fetch(baseUrl + url).then((res) => res.json());

const getPosts = () => baseFetch('posts');

const getPostsCategories = () => baseFetch('postsCategories');

const getPost = (id = '') => baseFetch(`posts/${id}`);

const getPostCategory = (id = '') => baseFetch(`postsCategories/${id}`);

export { getPosts, getPost, getPostsCategories, getPostCategory };
