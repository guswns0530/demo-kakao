import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../modules/auth";
import {initializeUser} from "../modules/user";

const MainPage = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(({user}) => ({
        user: user.user
    }))

    return (<>
        {user &&
        <div>
            <div>
                <ul>
                    <li>아이디: {user.id}</li>
                    <li>이메일: {user.email}</li>
                    <li>이름: {user.name}</li>
                </ul>
            </div>
            <button onClick={() => {
                dispatch(logout())
                dispatch(initializeUser())
            }}>로그아웃</button>
        </div>
        }
        <Link to={"/login"}><button>로그인</button></Link>
        <Link to={"/register"}><button>회원가입</button></Link>
    </>)
}

export default MainPage