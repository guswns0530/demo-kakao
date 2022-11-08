import React, {useEffect, useRef, useState} from "react";

import style from "../../css/MainPage.module.css"
import {Link} from "react-router-dom";
import MyInfo from "../../containers/app/friend/MyInfo";
import FriendInfo from "../../containers/app/friend/FriendInfo";
import RecommendFriendInfo from "../../containers/app/friend/RecommendFriendInfo";
import Svg from "../util/Svg";
import {useDispatch, useSelector} from "react-redux";
import {changeField} from "../../modules/form";

const Friend = () => {
    const [isOpen, setOpen] = useState(false)
    const onClick = () => setOpen(!isOpen)
    const header = useRef()
    const section = useRef()

    useEffect(() => {
        if(header && section) {
            const {clientHeight} = header.current

            section.current.style.paddingTop = clientHeight + 'px'
        }
    }, [header, section, isOpen])

    return (<>
            <div className={`${style.container} ${style.friends} `}>
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
                <section ref={section}>
                    <MyInfo/>
                    <RecommendFriendInfo />
                    <FriendInfo />
                </section>
            </div>
        </>
    )
}

const SearchForm = ({onClick}) => {
    const dispatch = useDispatch();
    const { form } = useSelector(({form}) => ({
        form: form,
    }))

    const onChange = e => {
        const { value, name } = e.target
        dispatch(
            changeField({
                form: 'friend',
                key: name,
                value
            })
        )
    }

    return (<div className={style.search_box}>
        <div className={style.search_form}>
            <div className={style.icon}>
                <Svg><i className={"material-icons"}>search</i></Svg>
            </div>
            <input onChange={onChange} value={form.friend.search.value} name="search" />
        </div>
        <div className={style.search_close} onClick={() => {
            dispatch(changeField({
                form: 'friend',
                key: 'search',
                value: ''
            }))
            onClick()
        }}>
            <div>
                <div/>
                <div/>
            </div>
        </div>
    </div>)
}

export default Friend