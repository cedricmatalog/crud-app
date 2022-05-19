import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { getPosts, getPostsCategories } from '../../api/PostsAPI';
import Card from '../../components/Card';
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

  if (isPostsLoading && isPostsCategoriesLoading) return <>'Loading...'</>;

  if (postsError && postsCategoriesError) return <>'An error has occurred: </>;

  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto">
        <div>
          <h2 className="mt-1 text-2xl font-extrabold tracking-wide uppercase lg:text-3xl">
            Posts
          </h2>
        </div>

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
          <Link
            to="/posts/add"
            className="inline-block px-6 py-3 mt-6 text-sm text-white bg-black rounded"
          >
            Create a Post
          </Link>
        </div>
      </div>
    </section>
  );
}
