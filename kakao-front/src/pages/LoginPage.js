import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.svg'
import style from '../css/LoginPage.module.css'
import LoginForm from "../containers/auth/LoginForm";



const LoginPage = () => {
    return (
        <section id={style.login_popup}>
            <div className={style.lp_logo}>
                <object data={logo} alt="KAKAO_LOGO">
                    <img alt={"logo"} src={logo}></img>
                </object>
            </div>
            <LoginForm/>
            <div className={style.account}>
                <Link to={'/register'}>회원가입</Link>
                <div className={style.account_more}>
                    <Link>카카오계정</Link>
                    <div></div>
                    <Link>비밀번호 찾기</Link>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
