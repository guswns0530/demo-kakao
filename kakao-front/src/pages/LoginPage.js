import React from 'react';
import {Link} from 'react-router-dom';
import style from '../css/LoginPage.module.css'
import LoginForm from "../containers/auth/LoginForm";
import { ReactComponent  as Logo } from "../assets/logo.svg";



const LoginPage = () => {
    return (
        <div>
            <div className={style.account_comm}>
                <div className={style.account_wrap}>
                    <section id={style.login_popup}>
                        <div className={style.login_wrap}>
                            <div className={style.lp_logo}>
                                <Logo/>
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
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
