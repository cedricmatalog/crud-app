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

  if (postsError && postsCategoriesError) return <>'An error has occurred: </>;

  return (
    <Container screen='xl'>
      <Header title="Posts" />
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
        {postsData?.map((post) => (
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
