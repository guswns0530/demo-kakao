import React from "react";

import style from "../../css/MainPage.module.css"
import {Link} from "react-router-dom";

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
                <div className={style.profile}>
                    <div className={style.image}>
                        <img src="./image/profile.png" alt=""/>
                    </div>
                    <div className={style.context}>
                        <div className={style.name}>현준</div>
                        <div className={style.msg}>
                            안녕하세요 양영디지털 고등학교에 재학중인 박현준이라고 합니다.
                        </div>
                    </div>
                </div>
                <div className={style.disable_box}>
                    <div className={style.content}>
                        <div className={style.name}>친구</div>
                        <div className={style.for}></div>
                    </div>
                </div>
                <ul>
                    <li>
                        <div className={style.profile}>
                            <div className={style.image}>
                                <img src="./image/profile.png" alt="" />
                            </div>
                            <div className={style.context}>
                                <div className={style.name}>현준</div>
                                <div className={style.msg}>안녕</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    </>
)
}

export default Friend