import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.svg'
import '../css/LoginPage.css'
import LoginForm from "../containers/auth/LoginForm";

const LoginPage = () => {
    return (
        <section id="login_popup">
            <div className="lp_logo">
                <img src={logo} alt="KAKAO_LOGO"/>
            </div>
            <LoginForm/>
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
