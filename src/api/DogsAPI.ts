const getDogs = () =>
  fetch('http://localhost:4000/dogs').then((res) => res.json());

export { getDogs };
