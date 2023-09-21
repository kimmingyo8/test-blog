import { Link } from 'react-router-dom';

export default function SignupForm() {
  return (
    <main>
      <form action="/post" method="POST" className="form form--lg">
        <h1 className="form__title">회원가입</h1>
        <div className="form__block">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            aria-label="이메일"
          />
        </div>
        <div className="form__block">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            aria-label="비밀번호"
          />
        </div>
        <div className="form__block">
          <label htmlFor="password_confirm">비밀번호 확인</label>
          <input
            type="password"
            name="password_confirm"
            id="password_confirm"
            required
            aria-label="비밀번호 확인"
          />
        </div>
        <div className="form__block">
          계정이 있으신가요?
          <Link to="/login" className="form__link">
            로그인하기
          </Link>
        </div>
        <div className="form__block">
          <label htmlFor="signup_submit" className="form__block">
            <input
              type="submit"
              id="signup_submit"
              value="회원가입"
              className="form__btn--submit"
              aria-label="회원가입 버튼"
            />
          </label>
        </div>
      </form>
    </main>
  );
}
