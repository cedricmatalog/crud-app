import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { getPosts, getPostsCategories } from '../../api/PostsAPI';
import Button from '../../components/Button';
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
          {postsData?.map(({ id, name, description, category, active }) => (
            <div
              key={id}
              className="cursor-pointer"
              onClick={() => navigate(`posts/${id}`)}
            >
              <div className="flex justify-center">
                <strong
                  className={`relative h-6 px-4 text-xs leading-6 text-white uppercase ${
                    active ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {active ? 'Active' : 'Inactive'}
                </strong>
              </div>

              <h5 className="mt-4 text-md text-black/90">{name}</h5>
              <h4 className="mt-1 text-sm text-black/90">{description}</h4>

              <div className="flex items-center  mt-4 font-bold">
                <p className="text-xs tracking-wide uppercase">
                  {getPostCategory(category)}
                </p>
              </div>
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
