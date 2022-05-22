import { useQuery } from 'react-query';
import { getPost } from '../../api/PostsAPI';
import IPost from '../../interfaces/IPost';

export default function usePost(postId: string) {
  const {
    isLoading: isPostLoading,
    error: postError,
    data: postData,
  } = useQuery<IPost, Error>(['post', postId], () => getPost(postId));

  return { isPostLoading, postError, postData };
}
