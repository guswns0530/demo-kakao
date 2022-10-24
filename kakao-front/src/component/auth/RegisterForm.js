import React from "react";
import style from "../../css/RegisterPage.module.css";
import EmailConfirmForm from "../../containers/auth/register/EmailConfirmForm";
import PasswordForm from "../../containers/auth/register/PasswordForm";
import ProfileForm from "../../containers/auth/register/ProfileForm";

const RegisterForm = ({onChange, form, currentPage, setCurrentPage}) => {
    const Pages = [<EmailConfirmForm
        form={form}
        onChange={onChange}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
    />, <PasswordForm
        form={form}
        onChange={onChange}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
    />, <ProfileForm
        form={form}
        onChange={onChange}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
    />]

    return (<>
        <div className={style.form}>
            <div className={style.navigation_wrap}>
                <div className={style.navigation_bar}></div>
            </div>

            {Pages[currentPage]}
        </div>
    </>)
}

export default RegisterForm