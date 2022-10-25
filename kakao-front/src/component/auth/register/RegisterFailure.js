import React from "react";
import style from "../../../css/RegisterPage.module.css"
import {Link} from "react-router-dom";

const RegisterFailure = ({form}) => {
    return <>
        <div className={`${style.title} ${style.cng}`}>
            환영합니다!
        </div>

        <div className={style.account_text}>
            회원가입 도중 오류가 발생하였습니다.
        </div>

        <Link to={"/register"}>
            <div className={`${style.btn} ${style.able}`}>
                처음으로
            </div>
        </Link>
    </>
}

export default RegisterFailure