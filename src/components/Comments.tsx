import { useContext, useState } from 'react';
import { PostProps } from './PostList';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import { toast } from 'react-toastify';

interface CommentsProps {
  post: PostProps;
  getPost: (id: string) => Promise<void>;
}

export default function Comments({ post, getPost }: CommentsProps) {
  const [comment, setComment] = useState('');
  const { user } = useContext(AuthContext);

  console.log(post);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'comment') {
      setComment(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (post && post?.id) {
        const postRef = doc(db, 'posts', post.id);
        if (user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createdAt: new Date()?.toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          };
          await updateDoc(postRef, {
            comments: arrayUnion(commentObj),
            updateDated: new Date()?.toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          });
          // 댓글 업데이트
          await getPost(post.id);
        }
      }
      toast.success('댓글을 생성했습니다.');
      setComment('');
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  return (
    <section className="comments">
      <form onSubmit={onSubmit} className="comments__form">
        <div className="form__block">
          <label htmlFor="comment">댓글 입력</label>
          <textarea
            name="comment"
            id="comment"
            required
            value={comment}
            onChange={onChange}
          />
        </div>
        <button className="form__block form__block-reverse">
          <label htmlFor="send">
            <input
              type="submit"
              id="send"
              value="입력"
              className="form__btn-submit"
            />
          </label>
        </button>
      </form>
      <ul className="comments__list">
        {post?.comments
          ?.slice(0)
          .reverse()
          .map((comment) => (
            <li key={comment.createdAt} className="comment__box">
              <div className="comment__profile-box">
                <p className="comment__email">{comment?.email}</p>
                <p className="comment__date">{comment?.createdAt}</p>
                <button className="comment__delete">삭제</button>
              </div>
              <p className="comment__text">{comment?.content}</p>
            </li>
          ))}
      </ul>
    </section>
  );
}
