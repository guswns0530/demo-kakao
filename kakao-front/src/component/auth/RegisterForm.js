import React from "react";
import style from "../../css/RegisterPage.module.css";

const RegisterForm = ({children, currentPage}) => {
    return (<>
        <div className={style.form}>
            {currentPage < 3 &&
                <div className={style.navigation_wrap}>
                    <div className={style.navigation_bar} data-idx={currentPage}></div>
                </div>
            }
            {children}
        </div>
    </>)
}

export default RegisterForm