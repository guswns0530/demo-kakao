import React from 'react';
import style from "../css/RegisterPage.module.css"
import logo from "../assets/logo.svg";
import RegisterForm from "../containers/auth/RegisterForm";
import {Link} from "react-router-dom";

const RegisterPage = () => {
    return (<>
            <section id={style.register_popup}>
                <Link to={"/"}>
                    <div className={style.lp_logo}>
                        <object data={logo} alt="KAKAO_LOGO">
                            <img alt={"logo"} src={logo}></img>
                        </object>
                    </div>
                </Link>
                <RegisterForm/>
            </section>
        </>
    );
};

export default RegisterPage;
