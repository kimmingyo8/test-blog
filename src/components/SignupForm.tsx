import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignupForm() {
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'email') {
      setEmail(value);
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!validRegex.test(value)) {
        setError('이메일 형식이 올바르지 않습니다.');
      } else {
        setError('');
      }
    }

    if (name === 'password') {
      setPassword(value);
      if (value?.length < 8) {
        setError('비밀번호는 8자리 이상으로 입력해주세요.');
      } else if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
        setError('비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요.');
      } else {
        setError('');
      }
    }

    if (name === 'password_confirm') {
      setPassword(value);
      if (value?.length < 8) {
        setError('비밀번호는 8자리 이상으로 입력해주세요.');
      } else if (value !== password) {
        setError('비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요.');
      } else {
        setError('');
      }
    }
  };
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
          />
        </div>
        {error && error?.length > 0 && (
          <div className="form__block">
            <p className="form__error">{error}</p>
          </div>
        )}
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
              disabled={error?.length > 0}
            />
          </label>
        </div>
      </form>
    </main>
  );
}
