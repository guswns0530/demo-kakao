import React from "react";
import logo from '../assets/404.png'
import kakaoLogo from '../assets/logo.svg'
import style from '../css/NotFoundPage.module.css'
import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <>
            <header>
                <Link to={"/"}>
                    <img src={kakaoLogo}/>
                </Link>
            </header>
            <div className={style.wrap_error}>
                <div className={style.logo}>
                    <img src={logo}/>
                </div>
                <p className={style.title}>찾으시는 페이지가 없습니다.</p>
                <p className={style.description}>잘못된 접근이거나 요청하신 페이지를 찾을 수 없습니다.<br/>
                    입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.</p>
                <button className={style.btn}>
                    <Link to={"/"}>
                        홈으로
                    </Link>
                </button>
            </div>
        </>
    )
}

export default NotFoundPage
