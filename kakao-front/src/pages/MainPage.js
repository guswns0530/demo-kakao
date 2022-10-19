import React from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../modules/auth";

const MainPage = () => {
    const dispatch = useDispatch()

    return (<>
        <div>Main Page</div>
        <Link to={"/login"}><button>로그인</button></Link>
        <Link to={"/register"}><button>회원가입</button></Link>
        <button onClick={() => {
            dispatch(logout())
        }}>로그아웃</button>
    </>)
}

export default MainPage