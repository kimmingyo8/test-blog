import { useState } from 'react';
import { Link } from 'react-router-dom';

interface PostListProps {
  hasNavigation?: boolean;
}

type TabType = 'all' | 'my';

export default function PostList({ hasNavigation = true }: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  return (
    <>
      {hasNavigation && (
        <ul className="post__navigation">
          <li
            role="presentation"
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'post__navigation--active' : ''}
          >
            전체
          </li>
          <li
            role="presentation"
            onClick={() => setActiveTab('my')}
            className={activeTab === 'my' ? 'post__navigation--active' : ''}
          >
            나의 글
          </li>
        </ul>
      )}
      <section className="post__list">
        <h1 className="a11y-hidden">게시글 목록</h1>
        {[...Array(10)].map((e, index) => (
          <div key={index} className="post__box">
            <Link to={`/posts/${index}`}>
              <ul className="post__profile-box">
                <li className="post__profile" />
                <li className="post__author-name">김민교</li>
                <li className="post__date">2023.9.19 화요일</li>
              </ul>
              <h2 className="post__title">게시글 {index}</h2>
              <p className="post__text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus doloribus sed, maiores aliquam rem tempora
                voluptatibus error reprehenderit. Amet ratione placeat nobis
                velit dolorum! Quaerat rerum odit velit deleniti rem!
              </p>
              <ul className="post__utils-box">
                <li className="post__delete">삭제</li>
                <li className="post__edit">수정</li>
              </ul>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}
