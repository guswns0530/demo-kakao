import React, {useRef, useState} from "react";

import MyInfoComponent from "../../../component/app/friend/Profile";
import {useDispatch, useSelector} from "react-redux";
import {Item, Menu,  useContextMenu} from "react-contexify";
import {useNavigate} from "react-router-dom";
import style from "../../../css/MainPage.module.css";
import {oepnPopup} from "../../../modules/popup";
import {toast} from "react-toastify";
import {useUpdateUser} from "../../../lib/query";

export const menuId = "MyInfoMenuId"

const MyInfo = () => {
    const dispatch = useDispatch()
    const navigate =useNavigate()
    const inputRef = useRef()
    const {user} = useSelector(({user}) => ({
        user: user.user
    }))
    const {show} = useContextMenu({
        id: menuId
    })
    const {mutate} = useUpdateUser()

    const handleContextMenu = (e, user) => {
        e.preventDefault()
        show(e, {
            props: () => ({
                user
            })
        })
    }
    const goProfile = (e) => {
        const user = e.props().user
        navigate("/app/profile/" + user.id)
    }
    const changeName = (e) => {
        const user = e.props().user

        const action = oepnPopup({
            element: <InputForm user={user} inputRef={inputRef}/>,

            submit: () => {
                const value = inputRef.current.value

                if(value) {

                    mutate({name: value})
                    return true;
                }

                toast.error("빈칸으로는 이름을 설정할 수 없습니다. 다시 입력해주세요.")
                return false;
            }
        })
        dispatch(action)
    }

    return (
        <>
            <div onContextMenu={(e) => handleContextMenu(e, user)}>
                <MyInfoComponent user={user}/>
            </div>
            <Menu id={menuId} animation={false}>
                <Item onClick={goProfile}>프로필 보기</Item>
                <Item onClick={changeName}>이름 변경</Item>
            </Menu>
        </>
    )
}

const InputForm = ({user, inputRef}) => {
    const [input, setInput] = useState(user.name || '')

    const changeInput = (e) => {
        const value = e.target.value
        if (value.length <= 20) {
            setInput(value)
        }
    }

    return (<>
        <header className={style.left}>
            내 이름을 변경합니다.
        </header>
        <div className={style.layer_input}>
            <input type="text" placeholder={input} value={input} onChange={changeInput} ref={inputRef}/>
            <span className={style.counter}> {input.length}/20 </span>
        </div>
    </>)
}

export default MyInfo