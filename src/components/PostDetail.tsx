import { Link } from 'react-router-dom';

export default function PostDetail() {
  return (
    <>
      <main className="post__detail">
        <section className="post__box">
          <h1 className="post__title">titletitletiteltitletiitel</h1>
          <ul className="post__profile-box">
            <li className="post__profile" />
            <li className="post__author-name">김민교</li>
            <li className="post__date">2023.9.19 화요일</li>
          </ul>
          <ul className="post__utils-box">
            <li className="post__delete">삭제</li>
            <li className="post__edit">
              <Link to={'/posts/edit/1'}>수정</Link>
            </li>
          </ul>
          <p className="post__text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
            doloribus sed, maiores aliquam rem tempora voluptatibus error
            reprehenderit. Amet ratione placeat nobis velit dolorum! Quaerat
            rerum odit velit deleniti rem!
          </p>
        </section>
      </main>
    </>
  );
}
