import React from "react";
import style from "../../css/MainPage.module.css"
import {Link} from "react-router-dom";
import ChattingList from "../../containers/app/chatting/ChattingList";
import SearchForm from "../../containers/app/chatting/SearchForm";

const Chatting = ({header, onClick, isOpen, section, onScroll}) => {
    return (<>
            <div className={`${style.container} ${style.rooms}`}>
                <header ref={header}>
                    <div className={style.h_title}>
                        <h2>채팅</h2>
                        <ul className={style.h_nav}>
                            <li>
                                <Link onClick={onClick}>
                                    <i className="material-icons">search</i>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/app"}>
                                    <i className="material-icons">add_comment</i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {isOpen && <SearchForm onClick={onClick}/>}
                </header>
                <section ref={section} onScroll={onScroll}>
                    <ChattingList/>
                </section>
            </div>
        </>
    )
}

export default Chatting