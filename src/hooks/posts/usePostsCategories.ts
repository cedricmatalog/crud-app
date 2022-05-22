import { useQuery } from 'react-query';
import { getPostsCategories } from '../../api/PostsAPI';
import IPostCategory from '../../interfaces/IPostCategory';

export default function usePostsCategories() {
  const {
    isLoading: isPostsCategoriesLoading,
    error: postsCategoriesError,
    data: postsCategoriesData,
  } = useQuery<IPostCategory[], Error>('postsCategories', getPostsCategories);

  return {
    isPostsCategoriesLoading,
    postsCategoriesError,
    postsCategoriesData,
  };
}
