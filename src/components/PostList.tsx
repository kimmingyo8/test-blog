import AuthContext from 'context/AuthContext';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType | CategoryType;
}

export interface PostProps {
  id: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  uid: string;
  category?: CategoryType;
  comments?: CommentInterface[];
}

export interface CommentInterface {
  content: string;
  uid: string;
  email: string;
  createdAt: string;
}

type TabType = 'all' | 'my';

export type CategoryType = 'Frontend' | 'Backend' | 'Web' | 'ETC';
export const CATEGORIES: CategoryType[] = ['Frontend', 'Backend', 'Web', 'ETC'];

export default function PostList({
  hasNavigation = true,
  defaultTab = 'all',
}: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab,
  );
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getPosts = async () => {
    setPosts([]);
    const postsRef = collection(db, 'posts');
    let postsQuery;

    if (activeTab === 'my' && user) {
      //나의 글 필터링
      postsQuery = query(
        postsRef,
        where('uid', '==', user.uid),
        orderBy('createdAt', 'asc'),
      );
    } else if (activeTab === 'all') {
      //모든 글 보여주기
      postsQuery = query(postsRef, orderBy('createdAt', 'asc'));
    } else {
      postsQuery = query(
        postsRef,
        where('category', '==', activeTab),
        orderBy('createdAt', 'asc'),
      );
    }

    const datas = await getDocs(postsQuery);
    datas?.forEach((doc) => {
      const postDataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, postDataObj as PostProps]);
    });
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('해당 게시글을 삭제하시겠습니까?');
    if (confirm && id) {
      await deleteDoc(doc(db, 'posts', id));
      toast.success('게시글을 삭제했습니다.');
      getPosts(); // 변경된 post리스트를 다시 받아옴
    }
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

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
          {CATEGORIES?.map((category) => (
            <li
              key={category}
              role="presentation"
              onClick={() => setActiveTab(category)}
              className={
                activeTab === category ? 'post__navigation--active' : ''
              }
            >
              {category}
            </li>
          ))}
        </ul>
      )}
      <section className="post__list">
        <h1 className="a11y-hidden">게시글 목록</h1>
        {posts?.length > 0 ? (
          posts?.map((post, index) => (
            <div key={post?.id} className="post__box">
              <Link to={`/posts/${post?.id}`}>
                <ul className="post__profile-box">
                  <li className="post__profile" />
                  <li className="post__author-name">{post?.email}</li>
                  <li className="post__date">{post?.createdAt}</li>
                </ul>
                <h2 className="post__title">{post?.title}</h2>
                <p className="post__text">{post?.summary}</p>
              </Link>

              {post?.email === user?.email && (
                <ul className="post__utils-box">
                  <li
                    className="post__delete"
                    onClick={() => handleDelete(post.id as string)}
                  >
                    삭제
                  </li>
                  <li className="post__edit">
                    <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                  </li>
                </ul>
              )}
            </div>
          ))
        ) : (
          <h1 className="post__no-post">
            <button
              type="button"
              className="post__btn-write"
              onClick={() => navigate('/posts/new')}
            >
              게시글이 없습니다.
            </button>
          </h1>
        )}
      </section>
    </>
  );
}
