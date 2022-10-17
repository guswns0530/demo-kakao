import React from 'react';
import { Link } from '../../node_modules/react-router-dom/dist/index';
import logo from '../logo.svg';

const LoginPage = () => {
  return (
    <section id="login_popup">
      <div className="lp_logo">
        <img src={logo} alt="KAKAO_LOGO" />
      </div>
      <form action="./login" method="POST" id="lp_form">
        <div className="input_box">
          <input
            type="text"
            name="id"
            id="lp_id"
            placeholder="아이디"
            required
          />
          <input
            type="password"
            name="pwd"
            id="lp_pwd"
            placeholder="비밀번호"
            required
          />
        </div>
        <input type="submit" value="로그인" id="lp_submit" />
        <div className="line_or">
          <div>또는</div>
        </div>
        <a href="/auth/kakao" className="login_kakao">
          kakao 계정으로 로그인
        </a>
      </form>

      <div className="account">
        <Link to={'/register'}>회원가입</Link>
        <div className="account_more">
          <Link>카카오계정</Link>
          <div></div>
          <Link>비밀번호 찾기</Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
