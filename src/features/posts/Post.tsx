import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { deletePost, getPostCategory } from '../../api/PostsAPI';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Container from '../../components/Container';
import Header from '../../components/Header';
import usePost from '../../hooks/posts/usePost';
import IPostCategory from '../../interfaces/IPostCategory';
import PostForm from './PostForm';

export default function Post() {
  const navigate = useNavigate();
  const { id: postId = '' } = useParams();

  const [isEditMode, setIsEditMode] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      navigate('/');
    },
  });

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShowToast(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [showToast]);

  const { postData } = usePost(postId);

  const postCategoryId = postData?.category;

  const { data: postCategoryData } = useQuery<IPostCategory, Error>(
    ['postCategory', postCategoryId],
    () => getPostCategory(`${postCategoryId}`),
    {
      enabled: !!postCategoryId,
    }
  );

  if (postData && postCategoryData) {
    if (isEditMode) {
      return (
        <PostForm
          data={postData}
          onClickCancel={() => setIsEditMode(false)}
          showToast={() => setShowToast(true)}
        />
      );
    }
    return (
      <Container>
        {showToast && (
          <div
            className="p-4 border rounded text-sky-700 bg-sky-50 border-sky-900/10"
            role="alert"
          >
            <strong className="text-sm font-medium">
              Post has been updated!
            </strong>
          </div>
        )}
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
