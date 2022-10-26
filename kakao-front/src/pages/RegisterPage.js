import React from 'react';
import style from "../css/RegisterPage.module.css"
import { ReactComponent  as Logo } from "../assets/logo.svg";
import RegisterForm from "../containers/auth/RegisterForm";
import {Link} from "react-router-dom";

const RegisterPage = () => {
    return (
        <div>
            <div className={style.account_comm}>
                <div className={style.account_wrap}>
                    <section id={style.register_popup}>
                        <div className={style.register_wrap}>
                                <div className={style.lp_logo}>
                                    <Link to={"/"}>
                                        <Logo/>
                                    </Link>
                                </div>
                            <RegisterForm/>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
