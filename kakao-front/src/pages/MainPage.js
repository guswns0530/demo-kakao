import React from "react";
import {useDispatch} from "react-redux";
import {logout} from "../modules/auth";

import style from '../css/MainPage.module.css'
import {Link} from "react-router-dom";

const MainPage = () => {
    const dispatch = useDispatch()

    return (<>
        <nav className={style.fixed_nav}>
            <ul className={style.main_nav}>
                <li>
                    <Link className={style.select}>
                        <i className="material-icons" id="nav_1">person</i>
                    </Link>
                </li>
                <li>
                    <Link>
                        <i className="material-icons" id="nav_2"
                        >chat_bubble
                            <div className={style.alert}>1</div>
                        </i>
                    </Link>
                </li>
            </ul>

            <ul className={style.sub_nav}>
                <li>
                    <a href="/auth/logout">
                        <i className="material-icons"> settings </i>
                    </a>
                </li>
            </ul>
        </nav>
        <button onClick={() => dispatch(logout())}>로그아웃</button>
    </>)
}

export default MainPage