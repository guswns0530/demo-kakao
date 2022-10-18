import React from "react";
import {Link} from "react-router-dom";

const MainPage = () => {
    return (<>
        <div>Main Page</div>
        <Link to={"/login"}><button>로그인</button></Link>
        <Link to={"/register"}><button>회원가입</button></Link>
    </>)
}

export default MainPage