import React from "react";
import style from "../../css/RegisterPage.module.css";

const RegisterForm = ({children}) => {
    return (<>
        <div className={style.form}>
            <div className={style.navigation_wrap}>
                <div className={style.navigation_bar}></div>
            </div>
            {children}
        </div>
    </>)
}

export default RegisterForm