import { ChangeEvent, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { createPost, updatePost } from '../../api/PostsAPI';

import Button from '../../components/Button';
import Container from '../../components/Container';
import Header from '../../components/Header';
import usePostsCategories from '../../hooks/posts/usePostsCategories';
import IPost from '../../interfaces/IPost';

export default function PostForm({
  data,
  onClickCancel,
  showToast,
}: {
  data?: IPost;
  onClickCancel?: () => void;
  showToast?: () => void;
}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IPost>(data!);
  const { postsCategoriesData } = usePostsCategories();
  const queryClient = useQueryClient();
  const updateMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('post');
      if (onClickCancel) onClickCancel();
    },
  });

  const createMutation = useMutation(createPost, {
    onSuccess: () => {
      navigate('/');
    },
  });

  const { name = '', category, description, active = false } = formData || {};

  const getCategory = () => {
    if (postsCategoriesData !== undefined) {
      return postsCategoriesData.find(({ id }) => id === category)?.id;
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    setFormData({
      ...formData,
      [name]: name !== 'active' ? value : checked,
    });
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    if (showToast) showToast();
    updateMutation.mutate(formData);
  };

  const handleCreate = () => {
    const formDataCopy = { ...formData };
    const { category, active } = formDataCopy;
    if (!category) formDataCopy.category = 1;
    if (!active) formDataCopy.active = false;
    createMutation.mutate(formDataCopy);
  };

  const isFormDataValid = name !== '' && description !== '';

  const renderNameField = () => (
    <div>
      <label className="sr-only" htmlFor="name">
        Name
      </label>
      <input
        name="name"
        className="w-full p-3 text-sm border-gray-200 rounded-lg outline outline-offset-2 outline-1"
        placeholder="Name"
        type="text"
        value={name}
        onChange={handleInputChange}
        id="name"
      />
    </div>
  );

  const renderCategoryField = () => (
    <div>
      <label className="relative" htmlFor="sort">
        Category:
        <select
          className="py-3 ml-2 mr-3 pl-5 pr-10 text-xs font-medium border-gray-200 rounded-lg  hover:z-10 focus:outline-none focus:border-indigo-600 focus:z-10 hover:bg-gray-50 focus:ring-0 outline outline-offset-2 outline-1"
          name="category"
          value={getCategory()}
          onChange={handleSelectChange}
        >
          {postsCategoriesData?.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );

  const renderStatusField = () => (
    <div>
      <div className="flex items-center justify-center w-full">
        Status:
        <label htmlFor="toogleA" className="flex items-center cursor-pointer">
          <div className="relative  ml-2 ">
            <input
              id="toogleA"
              type="checkbox"
              className="sr-only"
              checked={active}
              name="active"
              onChange={handleInputChange}
            />

            <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>

            <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
          </div>

          <div className="ml-3 text-gray-700 font-medium">
            {active ? 'Active' : 'Inactive'}
          </div>
        </label>
      </div>
    </div>
  );

  const renderDescriptionField = () => (
    <div>
      <label className="sr-only" htmlFor="message">
        Description
      </label>
      <textarea
        className="w-full p-3 text-sm border-gray-200 rounded-lg outline outline-offset-2 outline-1"
        placeholder="Description"
        rows={8}
        id="message"
        name="description"
        onChange={handleTextAreaChange}
        value={description}
      ></textarea>
    </div>
  );

  return (
    <Container>
      <Header title={data ? 'Edit Post' : 'Create Post'} />

      <div className="space-y-4">
        {renderNameField()}
        <div className="flex items-center">
          {renderCategoryField()}
          {renderStatusField()}
        </div>
        {renderDescriptionField()}
      </div>

      <div className="flex justify-end">
        <Button
          text="Cancel"
          color="red"
          onClick={onClickCancel ? onClickCancel : () => navigate(-1)}
        />
        <Button
          disabled={!isFormDataValid}
          text={data ? 'Update' : 'Create'}
          color="green"
          onClick={() => {
            if (data) {
              handleUpdate();
            } else {
              handleCreate();
            }
          }}
        />
      </div>
    </Container>
  );
}
