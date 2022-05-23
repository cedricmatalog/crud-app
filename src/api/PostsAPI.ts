import IPost from '../interfaces/IPost';

const options = (method: string, data: Record<string, any>) => ({
  method: method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

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

const updateRequest = (url: string, data: Record<string, any>) =>
  fetch(baseUrl + url, options('PUT', data));

const updatePost = ({ id, name, description, category, active }: IPost) =>
  updateRequest(`posts/${id}`, {
    name,
    description,
    category: +category,
    active,
  });

const postRequest = (url: string, data: Record<string, any>) =>
  fetch(baseUrl + url, options('POST', data));

const createPost = ({ name, description, category, active }: IPost) =>
  postRequest(`posts`, {
    name,
    description,
    category: +category,
    active,
  });

export {
  getPosts,
  getPost,
  getPostsCategories,
  getPostCategory,
  deletePost,
  updatePost,
  createPost,
};
