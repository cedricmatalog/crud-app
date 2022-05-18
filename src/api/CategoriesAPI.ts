const getCategories = () =>
  fetch('http://localhost:4000/categories').then((res) => res.json());

export { getCategories };
