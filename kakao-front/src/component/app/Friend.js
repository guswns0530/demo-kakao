import React from "react";

import style from "../../css/MainPage.module.css"
import {Link} from "react-router-dom";
import MyInfo from "../../containers/app/friend/MyInfo";
import FriendInfo from "../../containers/app/friend/FriendInfo";

const Friend = () => {
    return (<>
        <div className={`${style.container} ${style.friends} `}>
            <header>
                <h2>친구</h2>
                <ul className={style.h_nav}>
                    <li>
                        <Link>
                            <i className="material-icons">search</i>
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <i className="material-icons">person_add</i>
                        </Link>
                    </li>
                </ul>
            </header>
            <section>
                <MyInfo/>
                <FriendInfo/>
            </section>
        </div>
    </>
)
}

export default Friend