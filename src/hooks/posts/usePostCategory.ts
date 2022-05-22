import { useQuery } from 'react-query';
import { getPostCategory } from '../../api/PostsAPI';
import IPostCategory from '../../interfaces/IPostCategory';

export default function usePostCategory(id: number | undefined) {
  const {
    isLoading: isPostCategoryDataLoading,
    error: postCategoryError,
    data: postCategoryData,
  } = useQuery<IPostCategory, Error>(
    ['postCategory', id],
    () => getPostCategory(`${id}`),
    {
      enabled: !!id,
    }
  );

  return { isPostCategoryDataLoading, postCategoryError, postCategoryData };
}
