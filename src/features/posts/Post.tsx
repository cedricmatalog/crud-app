import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePost, getPost, getPostCategory } from '../../api/PostsAPI';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Container from '../../components/Container';
import Header from '../../components/Header';
import IPost from '../../interfaces/IPost';
import IPostCategory from '../../interfaces/IPostCategory';
import PostForm from './PostForm';

export default function Post() {
  const navigate = useNavigate();
  const { id: postId } = useParams();

  const [isEditMode, setIsEditMode] = useState(false);
  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      // Invalidate and refetch
      // queryClient.invalidateQueries('posts');
      navigate('/');
    },
  });

  const {
    isLoading: isPostLoading,
    error: postError,
    data: postData,
  } = useQuery<IPost, Error>(['post', postId], () => getPost(postId));

  const postCategoryId = postData?.category;

  const {
    isLoading: isPostCategoryLoading,
    error: postCategoryError,
    data: postCategoryData,
  } = useQuery<IPostCategory, Error>(
    ['postCategory', postCategoryId],
    () => getPostCategory(`${postCategoryId}`),
    {
      enabled: !!postCategoryId,
    }
  );

  if (postData && postCategoryData) {
    if (isEditMode) {
      return (
        <PostForm data={postData} onClickCancel={() => setIsEditMode(false)} />
      );
    }
    return (
      <Container>
        <Header title="Post" />
        <Card data={{ ...postData, categoryName: postCategoryData.name }} />
        <div className="flex justify-end">
          <Button text="Back" color="gray" onClick={() => navigate(-1)} />
          <Button
            text="Edit"
            color="blue"
            onClick={() => setIsEditMode(true)}
          />
          <Button
            text="Delete"
            color="red"
            onClick={() => {
              deleteMutation.mutate(postData.id);
            }}
          />
        </div>
      </Container>
    );
  }

  return <></>;
}
