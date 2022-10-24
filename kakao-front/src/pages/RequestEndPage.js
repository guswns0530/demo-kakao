import React from "react";
import {Link} from "react-router-dom";
import kakaoLogo from "../assets/logo.svg";
import logo from "../assets/reload.png";
import style from '../css/RequestEndPage.module.css'

const RequestEndPage = () => {
    return (<>
        <header className={style.title}>
            <Link to={"/"}>
                <object data={kakaoLogo} alt="KAKAO_LOGO">
                    <img alt={"kakaoLogo"} src={kakaoLogo}></img>
                </object>
            </Link>
        </header>
        <div className={style.wrap_error}>
            <div className={style.logo}>
                <img src={logo} alt="logo"/>
            </div>
            <p className={style.title}>요청이 끝난 페이지입니다.</p>
            <p className={style.description}>요청이 완료되었습니다.<br/>
                페이지를 닫아주시길바랍니다.</p>
            <Link to={"/"}>
                <button className={style.btn}>
                    홈으로
                </button>
            </Link>
        </div>
    </>)
}

export default RequestEndPage
