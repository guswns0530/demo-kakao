import React from "react";
import style from "../../../css/MainPage.module.css";
import ProfileImage from "../../util/ProfileImage";
import Svg from "../../util/Svg";
import searchServiceToFriend from "../../../services/searchService";

const AddChattingJs = ({onChange, search, isLoading, data, onClose, onChecked, list}) => {
    console.log(list)
    return (<div id={style.add_chatting_popup} className={`${style.popup} ${style.focus}`}>
        <div className={style.tab}>
            <div className={style.exit} onClick={onClose}>
                <div></div>
                <div></div>
            </div>
        </div>
        <header>대화상대 선택</header>
        <section>
            <div className={style.search_box}>
                <div className={style.search_form}>
                    <div className={style.icon}>
                        <Svg><i className={"material-icons"}>search</i></Svg>
                    </div>
                    <input onChange={onChange} value={search} name="search"/>
                </div>
            </div>
            <form>
                <ul>
                    {!isLoading && searchServiceToFriend(data, {value: search}).map(user => <Profile key={user.email} user={user} onChecked={onChecked}/>)}
                </ul>
                <div className={style.aff_buttons}>
                    <button className={ list.length > 0 ? style.active : style.disable}>추가</button>
                    <button onClick={onClose}>취소</button>
                </div>
            </form>
        </section>
    </div>)
}

const Profile = ({user: {name, profile_image_url, message, email}, user, onChecked}) => {
    return (
        <li>
            <input id={email} type={"checkbox"} onChange={(e) => onChecked(e, user)}/>
            <label className={style.check} htmlFor={email}>
                <div className={style.profile}>
                    <div className={style.image}>
                        <ProfileImage profile_image_url={profile_image_url}/>
                    </div>
                    <div className={style.context}>
                        <div className={style.name}>{name}</div>
                        <div className={style.msg}>{message}</div>
                    </div>
                    <div className={style.check_box}>
                        <span className={"material-icons"}>check</span>
                    </div>
                </div>
            </label>
        </li>
    )
}

export default AddChattingJs