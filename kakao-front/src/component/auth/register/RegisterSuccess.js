import React from "react";
import style from "../../../css/RegisterPage.module.css"
import { Link} from "react-router-dom";

const RegisterSuccess = ({form}) => {
    return <>
        <div className={`${style.title} ${style.cng}`}>
            환영합니다!
        </div>

        <div className={style.account_text}>
            <p className={style.bold}>{form.name.value}</p>님 회원가입을 축하합니다. <br/>
            새로운 이메일은 <p className={style.bold}>{form.email.value}</p> 입니다
        </div>

        <Link to={"/login"}>
            <div className={`${style.btn} ${style.able}`}>
                시작하기
            </div>
        </Link>
    </>
}

export default RegisterSuccess