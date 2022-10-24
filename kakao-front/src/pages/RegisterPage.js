import React from 'react';
import style from "../css/RegisterPage.module.css"
import logo from "../assets/logo.svg";

const RegisterPage = () => {
    return (<>
        <section id={style.register_popup}>
            <div className={style.lp_logo}>
                <object data={logo} alt="KAKAO_LOGO">
                    <img alt={"logo"} src={logo}></img>
                </object>
            </div>
            <div className={style.form}>
                <div className={style.navigation_wrap}>
                    <div className={style.navigation_bar}></div>
                </div>

                <div className={style.title}>
                    카카오계정으로 사용할<br/>
                    이메일 주소를 입력해 주세요.
                </div>

                <form>
                    <div className={style.box}>
                        <div className={style.input}>
                            <input type="text" placeholder="이메일 주소 입력" name="email" />
                                <button className={style.input_box_btn}>인증요청</button>
                        </div>
                        <p>이메일을 입력해 주세요</p>
                    </div>
                    <div className={style.box}>
                        <div className={style.input}>
                            <input type="text" placeholder="인증번호 입력" name="email" />
                        </div>
                        <p>이메일을 입력해 주세요</p>
                    </div>
                </form>

                <div className={style.title}>
                    카카오계정 로그인에 사용할<br/>
                    비밀번호를 등록해 주세요.
                </div>

                <div className={style.account_info}>
                    <header>카카오계정</header>
                    <div>wooae1234@gmail.com</div>
                </div>


                <form>
                    <header>비밀번호</header>
                    <div className={style.box}>
                        <div className={style.input}>
                            <input type="password" placeholder="비밀번호 입력(8~32자리)" name="password" />
                        </div>
                        <p>이메일을 입력해 주세요</p>
                    </div>
                    <div className={style.box}>
                        <div className={style.input}>
                            <input type="password" placeholder="비밀번호 재입력" name="check_password" />
                        </div>
                        <p>이메일을 입력해 주세요</p>
                    </div>
                </form>

                <div className={style.title}>
                    카카오계정 프로필을<br/>
                    설정해 주세요.
                </div>
                <form>
                    <header>닉네임</header>
                    <div className={style.box}>
                        <div className={style.input}>
                            <input type="password" placeholder="닉네임 입력" name="password" />
                        </div>
                        <p>닉네임을 입력해주세요</p>
                    </div>
                </form>

                <div className={style.btn}>
                    다음
                </div>
            </div>
        </section>
    </>
);
};

export default RegisterPage;
