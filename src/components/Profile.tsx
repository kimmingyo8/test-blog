import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <section className="profile__box">
      <ul className="flex__box-lg">
        <li className="profile__image" />
        <li className="profile-info">
          <p className="profile-info__email">test@test.com</p>
          <p className="profile-info__name">김민교</p>
        </li>
      </ul>
      <Link to="/" className="profile__logout">
        로그아웃
      </Link>
    </section>
  );
}
