import React from "react";
import style from "../../../css/RegisterPage.module.css";

const ProfileForm = ({onChange, form}) => {
    return (<>
        <div className={style.title}>
            카카오계정 프로필을<br/>
            설정해 주세요.
        </div>
        <form>
            <header>닉네임</header>
            <div className={style.box}>
                <div className={style.input}>
                    <input className={form.name.error && style.error} type="text" placeholder="닉네임 입력" name="name" onChange={onChange} value={form.name.value}/>
                </div>
                {form.name.error &&
                    <p>{form.name.error}</p>
                }
            </div>
            <button className={style.btn}>
                다음
            </button>
        </form>

    </>)
}

export default ProfileForm