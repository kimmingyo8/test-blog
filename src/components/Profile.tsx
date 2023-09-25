import { getAuth, signOut } from 'firebase/auth';
import { app } from 'firebaseApp';
import { toast } from 'react-toastify';

const onSignOut = async () => {
  try {
    const auth = getAuth(app);
    await signOut(auth);
    toast.success('로그아웃 되었습니다.');
  } catch (error: any) {
    console.log(error);
    toast.error(error?.code);
  }
};

export default function Profile() {
  const auth = getAuth(app);

  return (
    <section className="profile__box">
      <ul className="flex__box-lg">
        <li className="profile__image" />
        <li className="profile-info">
          <p className="profile-info__email">{auth?.currentUser?.email}</p>
          <p className="profile-info__name">
            {auth?.currentUser?.displayName || '사용자'}
          </p>
        </li>
      </ul>
      <button onClick={onSignOut} className="profile__logout">
        로그아웃
      </button>
    </section>
  );
}
