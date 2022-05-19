import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Header from '../../components/Header';
import IPost from '../../interfaces/IPost';

export default function PostForm({
  data,
  onClickCancel,
}: {
  data?: IPost;
  onClickCancel?: () => void;
}) {
  const navigate = useNavigate();

  return (
    <Container>
      <Header title={data ? 'Edit Post' : 'Create Post'} />
      <div className="flex justify-end">
        <Button
          text="Cancel"
          color="red"
          onClick={onClickCancel ? onClickCancel : () => navigate(-1)}
        />
        <Button text="Save" color="green" onClick={() => {}} />
      </div>
    </Container>
  );
}
