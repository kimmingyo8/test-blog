import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PostProps } from './PostList';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import Loader from './Loader';

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);

      setPost({ ...(docSnap.data() as PostProps), id: docSnap.id });
    }
  };

  const handleDelete = () => {
    console.log('delete');
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  return (
    <>
      <main className="post__detail">
        {post ? (
          <section className="post__box">
            <h1 className="post__title">{post?.title}</h1>
            <ul className="post__profile-box">
              <li className="post__profile" />
              <li className="post__author-name">{post?.email}</li>
              <li className="post__date">{post?.createdAt}</li>
            </ul>
            <ul className="post__utils-box">
              <li className="post__delete" onClick={handleDelete}>
                삭제
              </li>
              <li className="post__edit">
                <Link to={`/posts/edit/${post?.id}`}>수정</Link>
              </li>
            </ul>
            <p className="post__text post__text--pre-wrap">{post?.content}</p>
          </section>
        ) : (
          <Loader />
        )}
      </main>
    </>
  );
}
