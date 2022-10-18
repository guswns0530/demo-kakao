import React from "react";
import {Link} from "react-router-dom";
import kLogo from "../assets/logo.svg";
import logo from "../assets/reload.png";
import style from '../css/RequestEndPage.module.css'

const RequestEndPage = () => {
    return (<>
        <>
            <header>
                <Link to={"/"}>
                    <img src={kLogo}/>
                </Link>
            </header>
            <div className={style.wrap_error}>
                <div className={style.logo}>
                    <img src={logo}/>
                </div>
                <p className={style.title}>요청이 끝난 페이지입니다.</p>
                <p className={style.description}>요청이 완료되었습니다.<br/>
                    페이지를 닫아주시길바랍니다.</p>
                <button className={style.btn}>
                    <Link to={"/"}>
                        홈으로
                    </Link>
                </button>
            </div>
        </>
    </>)
}

export default RequestEndPage
