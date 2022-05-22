import { useQuery } from 'react-query';
import { getPosts } from '../../api/PostsAPI';
import IPost from '../../interfaces/IPost';

export default function usePosts() {
  const {
    isLoading: isPostsLoading,
    error: postsError,
    data: postsData,
  } = useQuery<IPost[], Error>('posts', getPosts, {
    initialData: [],
  });

  return { isPostsLoading, postsError, postsData: postsData ?? [] };
}
