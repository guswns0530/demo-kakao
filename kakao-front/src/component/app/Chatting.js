import React from "react";
import style from "../../css/MainPage.module.css"
import {Link} from "react-router-dom";
import ChattingList from "../../containers/app/chatting/ChattingList";

const Chatting = () => {
    return (<>
            <div className={`${style.container} ${style.rooms}`}>
                <header>
                    <div className={style.h_title}>
                        <h2>채팅</h2>
                        <ul className={style.h_nav}>
                            <li>
                                <Link>
                                    <i className="material-icons">search</i>
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <i className="material-icons">add_comment</i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </header>
                <section>
                    <ChattingList/>

                </section>
            </div>
        </>
    )
}

export default Chatting