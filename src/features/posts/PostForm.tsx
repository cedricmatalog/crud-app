import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Header from '../../components/Header';
import usePostsCategories from '../../hooks/posts/usePostsCategories';
import IPost from '../../interfaces/IPost';

export default function PostForm({
  data,
  onClickCancel,
}: {
  data?: IPost;
  onClickCancel?: () => void;
}) {
  const navigate = useNavigate();
  const {
    isPostsCategoriesLoading,
    postsCategoriesError,
    postsCategoriesData,
  } = usePostsCategories();

  return (
    <Container>
      <Header title={data ? 'Edit Post' : 'Create Post'} />

      <div className="space-y-4">
        <div>
          <label className="sr-only" htmlFor="name">
            Name
          </label>
          <input
            className="w-full p-3 text-sm border-gray-200 rounded-lg outline outline-offset-2 outline-1"
            placeholder="Name"
            type="text"
            id="name"
          />
        </div>
        <div className="flex items-center">
          <div>
            <label className="relative" htmlFor="sort">
              Category:
              <span className="sr-only"> Sort </span>
              <select
                className="py-3 ml-2 mr-3 pl-5 pr-10 text-xs font-medium border-gray-200 rounded-lg  hover:z-10 focus:outline-none focus:border-indigo-600 focus:z-10 hover:bg-gray-50 focus:ring-0 outline outline-offset-2 outline-1"
                id="sort"
                name="sort"
              >
                {postsCategoriesData?.map(({ id, name }) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <div className="flex items-center justify-center w-full">
              Status:
              <label
                htmlFor="toogleA"
                className="flex items-center cursor-pointer"
              >
                <div className="relative  ml-2 ">
                  <input id="toogleA" type="checkbox" className="sr-only" />

                  <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>

                  <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                </div>

                <div className="ml-3 text-gray-700 font-medium">Toggle Me!</div>
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="sr-only" htmlFor="message">
            Message
          </label>
          <textarea
            className="w-full p-3 text-sm border-gray-200 rounded-lg outline outline-offset-2 outline-1"
            placeholder="Message"
            rows={8}
            id="message"
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          text="Cancel"
          color="red"
          onClick={onClickCancel ? onClickCancel : () => navigate(-1)}
        />
        <Button
          text={data ? 'Update' : 'Create'}
          color="green"
          onClick={() => {}}
        />
      </div>
    </Container>
  );
}
