import React from "react";

import style from "../../css/MainPage.module.css"
import {Link} from "react-router-dom";
import MyInfo from "../../containers/app/friend/MyInfo";
import FriendList from "../../containers/app/friend/FriendList";
import RecommendFriendList from "../../containers/app/friend/RecommendFriendList";
import SearchForm from "../../containers/app/friend/SearchForm";

const Friend = ({header, onClick, isOpen, section, onScroll}) => {
    return (<>
            <div className={`${style.container} ${style.friends} `} >
                <header ref={header}>
                    <div className={style.h_title}>
                        <h2>친구</h2>
                        <ul className={style.h_nav}>
                            <li>
                                <Link onClick={onClick}>
                                    <i className="material-icons">search</i>
                                </Link>
                            </li>
                            <li>
                                <Link to={"./add-friend"}>
                                    <i className="material-icons">person_add</i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {isOpen && <SearchForm onClick={onClick}/>}
                </header>
                <section ref={section} onScroll={onScroll}>
                    <MyInfo/>
                    <RecommendFriendList/>
                    <FriendList/>
                </section>
            </div>
        </>
    )
}


export default Friend