import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { deletePost } from '../../api/PostsAPI';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Container from '../../components/Container';
import Error from '../../components/Error';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import usePost from '../../hooks/posts/usePost';
import usePostCategory from '../../hooks/posts/usePostCategory';

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

  const { isPostLoading, postError, postData } = usePost(postId);
  const { isPostCategoryDataLoading, postCategoryError, postCategoryData } = usePostCategory(postData?.category);

  useEffect(() => {
    const toastId = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => {
      clearTimeout(toastId);
    };
  }, [showToast]);

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
      {!isEditMode && <Header title="Post" />}
      {(isPostLoading || isPostCategoryDataLoading) && <Loading />}
      {(postError || postCategoryError) && <Error />}

      {postData && postCategoryData && (
        <>
          {isEditMode ? (
            <PostForm
              data={postData}
              onClickCancel={() => setIsEditMode(false)}
              showToast={() => setShowToast(true)}
            />
          ) : (
            <>
              <Card
                data={{ ...postData, categoryName: postCategoryData.name }}
              />
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
            </>
          )}
        </>
      )}
    </Container>
  );
}
