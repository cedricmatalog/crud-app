const baseUrl = 'http://localhost:4000/';

const getRequest = (url: string) =>
  fetch(baseUrl + url).then((res) => res.json());

const getPosts = () => getRequest('posts');

const getPostsCategories = () => getRequest('postsCategories');

const getPost = (id = '') => getRequest(`posts/${id}`);

const getPostCategory = (id = '') => getRequest(`postsCategories/${id}`);

const deleteRequest = (url: string) =>
  fetch(baseUrl + url, { method: 'DELETE' }).then((res) => res.json());

const deletePost = (id: number) => deleteRequest(`posts/${id}`);

export { getPosts, getPost, getPostsCategories, getPostCategory, deletePost };
