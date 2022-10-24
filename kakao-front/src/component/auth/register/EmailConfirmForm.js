import React from "react";
import style from "../../../css/RegisterPage.module.css";

const EmailConfirmForm = ({onChange, form, onClick, verify, emailInput, onSubmit, btnStatus, loading}) => {
    return <>
        <div className={style.title}>
            카카오계정으로 사용할<br/>
            이메일 주소를 입력해 주세요.
        </div>

        <form onSubmit={onSubmit}>
            <div className={style.box}>
                <div className={style.input}>
                    <input className={(form.email.error && style.error)} type="text" placeholder="이메일 주소 입력" name="email" onChange={onChange} value={form.email.value} style={{paddingRight: '80px'}}  ref={emailInput} disabled={verify}/>
                    {!verify &&
                        <button className={style.input_box_btn} onClick={onClick} disabled={loading}>인증요청</button>
                    }
                </div>
                {form.email.error &&
                <p>{form.email.error}</p>
                }
            </div>

            {
                verify &&
                <div className={style.box}>
                    <div className={style.input}>
                        <input className={form.verifyCode.error && style.error} type="text" placeholder="인증번호 입력"
                               name="verifyCode" onChange={onChange} value={form.verifyCode.value}/>
                    </div>
                    {form.verifyCode.error &&
                        <p>{form.verifyCode.error}</p>
                    }
                </div>
            }
            <button className={`${style.btn} ${btnStatus && style.able}`}>
                다음
            </button>
        </form>

    </>
}

export default EmailConfirmForm