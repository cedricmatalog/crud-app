import { ChangeEvent, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getPosts, getPostsCategories } from '../../api/PostsAPI';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import IPost from '../../interfaces/IPost';
import IPostCategory from '../../interfaces/IPostCategory';

export default function PostList() {
  const navigate = useNavigate();
  const {
    isLoading: isPostsLoading,
    error: postsError,
    data: postsData,
  } = useQuery<IPost[], Error>('posts', getPosts);

  const {
    isLoading: isPostsCategoriesLoading,
    error: postsCategoriesError,
    data: postsCategoriesData,
  } = useQuery<IPostCategory[], Error>('postsCategories', getPostsCategories);

  function getPostCategory(categoryId: number) {
    return postsCategoriesData?.find(({ id }) => id === categoryId)?.name;
  }

  const isLoading = isPostsLoading && isPostsCategoriesLoading;
  const isPostsDataEmpty = postsData?.length === 0;

  const [searchResults, setSearchResults] = useState<IPost[] | undefined>(
    postsData
  );
  const [filter, setFilter] = useState<Record<string, string>>({
    text: '',
    active: 'false',
    inactive: 'false',
  });

  useEffect(() => {
    const { text, active, inactive } = filter;
    if (text === '' && active === 'false' && inactive === 'false') {
      setSearchResults(postsData);
      return;
    }

    let results = [...(postsData ?? [])];

    function filterPosts() {
      return (
        postsData?.filter(
          ({ name }) => name.toLowerCase().search(text) !== -1
        ) ?? []
      );
    }

    if (
      (text !== '' && active === 'false' && inactive === 'false') ||
      (text !== '' && active === 'true' && inactive === 'true')
    ) {
      setSearchResults(filterPosts);
    }

    if (
      (text !== '' && active === 'true' && inactive === 'false') ||
      (text === '' && active === 'true' && inactive === 'false')
    ) {
      results = filterPosts().filter(({ active }) => active);
      setSearchResults(results);
    }

    if (
      (text !== '' && active === 'false' && inactive === 'true') ||
      (text === '' && active === 'false' && inactive === 'true')
    ) {
      results = filterPosts().filter(({ active }) => !active);
      setSearchResults(results ?? []);
    }

    if (text === '' && active === 'true' && inactive === 'true') {
      setSearchResults(postsData);
    }
  }, [filter, postsData]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, checked } = e.target;

    setFilter({
      ...filter,
      [name]: name === 'text' ? value.toLowerCase() : `${checked}`,
    });
  }

  if (postsError && postsCategoriesError) return <>'An error has occurred: </>;

  return (
    <Container screen="xl">
      <Header title="Posts" />
      <div className="flex justify-center">
        <div className="w-full items-center mr-4">
          <input
            className="w-full h-10 pl-4 pr-10 text-sm bg-white border-none rounded-full shadow-sm mr-2 outline outline-offset-2 outline-1"
            name="text"
            type="search"
            placeholder="Search posts..."
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center mr-2">
          <input
            id="toy"
            type="checkbox"
            name="active"
            className="w-5 h-5 border-gray-300 rounded"
            onChange={handleInputChange}
          />

          <label htmlFor="toy" className="ml-3 text-sm font-medium">
            Active
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="toy"
            type="checkbox"
            name="inactive"
            className="w-5 h-5 border-gray-300 rounded"
            onChange={handleInputChange}
          />

          <label htmlFor="toy" className="ml-3 text-sm font-medium">
            Inactive
          </label>
        </div>
      </div>

      {isLoading && <Loading />}
      {isPostsDataEmpty && (
        <div className="relative p-8 text-center">
          <h2 className="text-2xl font-medium">There's nothing here...</h2>

          <p className="mt-4 text-sm text-gray-500">
            Created posts will appear here, try creating one!
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
        {searchResults?.map((post) => (
          <div
            key={post.id}
            className="cursor-pointer"
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            <Card
              data={{ ...post, categoryName: getPostCategory(post.category) }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          text="Create"
          color="green"
          onClick={() => navigate('posts/add')}
        />
      </div>
    </Container>
  );
}
