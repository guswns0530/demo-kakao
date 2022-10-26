import React from "react";
import {Link} from "react-router-dom";
import { ReactComponent  as Logo } from "../assets/logo.svg";
import logo from "../assets/reload.png";
import style from '../css/RequestEndPage.module.css'

const RequestEndPage = () => {
    return (<>
        <header className={style.logo_title}>
            <div className={style.logo_wrap}>
                <Link to={"/"}>
                    <Logo/>
                </Link>
            </div>
        </header>
        <div className={style.error_comm}>
            <div className={style.error_wrap}>
                <div className={style.error_page}>
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
            </div>
        </div>
    </>)
}

export default RequestEndPage
