import { ChangeEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { deletePost, getPosts, getPostsCategories } from '../../api/PostsAPI';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import IPost from '../../interfaces/IPost';
import IPostCategory from '../../interfaces/IPostCategory';

export default function PostList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const [searchResults, setSearchResults] = useState<IPost[] | undefined>(
    postsData
  );
  const [filter, setFilter] = useState<Record<string, string>>({
    text: '',
    active: 'false',
    inactive: 'false',
  });
  const [isBulkDeleteMode, setIsBulkDeleteMode] = useState(false);
  const [bulkDeleteList, setIsBulkDeleteList] = useState<number[]>([]);
  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('posts');
    },
  });

  useEffect(() => {
    handleFilterChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, postsData]);

  useEffect(() => {
    setIsBulkDeleteList([]);
  }, [isBulkDeleteMode]);

  useEffect(() => {
    console.log(bulkDeleteList);
  }, [bulkDeleteList]);

  function getPostCategory(categoryId: number) {
    return postsCategoriesData?.find(({ id }) => id === categoryId)?.name;
  }

  function handleFilterChange() {
    const filterPosts = () => {
      return (
        postsData?.filter(
          ({ name }) => name.toLowerCase().search(text) !== -1
        ) ?? []
      );
    };

    const { text, active, inactive } = filter;
    let results = [...(postsData ?? [])];

    if (
      (text === '' && active === 'false' && inactive === 'false') ||
      (text === '' && active === 'true' && inactive === 'true')
    ) {
      setSearchResults(postsData);
    }

    if (
      (text !== '' && active === 'false' && inactive === 'false') ||
      (text !== '' && active === 'true' && inactive === 'true')
    ) {
      setSearchResults(filterPosts);
    }

    if (
      (text !== '' || text === '') &&
      active === 'true' &&
      inactive === 'false'
    ) {
      results = filterPosts().filter(({ active }) => active);
      setSearchResults(results);
    }

    if (
      (text !== '' || text === '') &&
      active === 'false' &&
      inactive === 'true'
    ) {
      results = filterPosts().filter(({ active }) => !active);
      setSearchResults(results);
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, checked } = e.target;

    setFilter({
      ...filter,
      [name]: name === 'text' ? value.toLowerCase() : `${checked}`,
    });
  }

  function handleBulkDeleteList(postId: number) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;

      if (checked) {
        setIsBulkDeleteList([...bulkDeleteList, postId]);
      } else {
        setIsBulkDeleteList(bulkDeleteList.filter((id) => id !== postId));
      }
    };
  }

  function handleBulkDelete() {
    return () => {
      bulkDeleteList.forEach((id) => {
        deleteMutation.mutate(id);
      });
    };
  }

  if (postsError && postsCategoriesError) return <>'An error has occurred: </>;

  function renderFilters() {
    return (
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
    );
  }

  const isLoading = isPostsLoading && isPostsCategoriesLoading;
  const isPostsDataEmpty = postsData?.length === 0;

  return (
    <Container screen="xl">
      <Header title="Posts" />
      {renderFilters()}
      {isLoading && <Loading />}
      {isPostsDataEmpty && (
        <div className="relative p-8 text-center">
          <h2 className="text-2xl font-medium">There's nothing here...</h2>

          <p className="mt-4 text-sm text-gray-500">
            Created posts will appear here, try creating one!
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
        {searchResults?.map((post) => (
          <div key={post.id}>
            {isBulkDeleteMode && (
              <input
                id="toy"
                type="checkbox"
                name="inactive"
                className="w-5 h-5 border-gray-300 rounded"
                onChange={handleBulkDeleteList(post.id)}
              />
            )}

            <div
              className="cursor-pointer"
              onClick={() => navigate(`/posts/${post.id}`)}
            >
              <Card
                data={{ ...post, categoryName: getPostCategory(post.category) }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        {bulkDeleteList.length === 0 && !isBulkDeleteMode && (
          <Button text="Create" onClick={() => navigate('posts/add')} />
        )}

        {isBulkDeleteMode ? (
          <Button
            text={`Cancel`}
            color="white"
            border="red"
            onClick={() => setIsBulkDeleteMode(!isBulkDeleteMode)}
          />
        ) : (
          <Button
            text={`Delete`}
            color="red"
            onClick={() => setIsBulkDeleteMode(!isBulkDeleteMode)}
          />
        )}

        {bulkDeleteList.length > 0 && (
          <Button text="Delete" color="red" onClick={handleBulkDelete()} />
        )}
      </div>
    </Container>
  );
}
