import { useState } from 'react';

const COMMENTS = [
  {
    id: 1,
    email: 'test@test.com',
    content: '댓글입니다 1',
    createdAt: '2023-07-13',
  },
  {
    id: 2,
    email: 'test@test.com',
    content: '댓글입니다 2',
    createdAt: '2023-07-13',
  },
  {
    id: 3,
    email: 'test@test.com',
    content: '댓글입니다 3',
    createdAt: '2023-07-13',
  },
  {
    id: 4,
    email: 'test@test.com',
    content: '댓글입니다 4',
    createdAt: '2023-07-13',
  },
  {
    id: 5,
    email: 'test@test.com',
    content: '댓글입니다 5',
    createdAt: '2023-07-13',
  },
  {
    id: 6,
    email: 'test@test.com',
    content: '댓글입니다 6',
    createdAt: '2023-07-13',
  },
  {
    id: 7,
    email: 'test@test.com',
    content: '댓글입니다 7',
    createdAt: '2023-07-13',
  },
];

export default function Comments() {
  const [comment, setComment] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'comment') {
      setComment(value);
    }
  };

  return (
    <section className="comments">
      <form className="comments__form">
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
        {COMMENTS?.map((comment) => (
          <li key={comment.id} className="comment__box">
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
