import React from "react";
import style from "../../../css/RegisterPage.module.css";

const PasswordForm = ({onChange, form, onSubmit,btnStatus}) => {
    return (<>
        <div className={style.title}>
            카카오계정 로그인에 사용할<br/>
            비밀번호를 등록해 주세요.
        </div>

        <div className={style.account_info}>
            <header>카카오계정</header>
            <div>{form.email.value}</div>
        </div>


        <form onSubmit={onSubmit}>
            <header>비밀번호</header>
            <div className={style.box}>
                <div className={style.input}>
                    <input className={form.password.error && style.error} type="password" placeholder="비밀번호 입력(8~32자리)" name="password" onChange={onChange} value={form.password.value}/>
                </div>
                {form.password.error &&
                    <p>{form.password.error}</p>
                }
            </div>
            <div className={style.box}>
                <div className={style.input}>
                    <input className={form.passwordConfirm.error && style.error} type="password" placeholder="비밀번호 재입력" name="passwordConfirm" onChange={onChange} value={form.passwordConfirm.value}/>
                </div>
                {form.passwordConfirm.error &&
                    <p>{form.passwordConfirm.error}</p>
                }
            </div>
            <button className={`${style.btn} ${btnStatus && style.able}`}>
                다음
            </button>
        </form>

    </>)
}

export default PasswordForm