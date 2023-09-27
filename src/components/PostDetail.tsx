import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PostProps } from './PostList';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import Loader from './Loader';
import { toast } from 'react-toastify';
import Comments from './Comments';

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);

      setPost({ ...(docSnap.data() as PostProps), id: docSnap.id });
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('해당 게시글을 삭제하시겠습니까?');
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, 'posts', post.id));
      toast.success('게시글을 삭제 했습니다.');
      navigate('/');
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  return (
    <>
      <main className="post__detail">
        {post ? (
          <>
            <section className="post__box">
              <h1 className="post__title">{post?.title}</h1>
              <ul className="post__profile-box">
                <li className="post__profile" />
                <li className="post__author-name">{post?.email}</li>
                <li className="post__date">{post?.createdAt}</li>
              </ul>
              <ul className="post__utils-box">
                {post?.category && (
                  <li className="post__category">{post?.category}</li>
                )}
                <li className="post__delete" onClick={handleDelete}>
                  삭제
                </li>
                <li className="post__edit">
                  <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                </li>
              </ul>
              <p className="post__text post__text--pre-wrap">{post?.content}</p>
            </section>
            <Comments />
          </>
        ) : (
          <Loader />
        )}
      </main>
    </>
  );
}
