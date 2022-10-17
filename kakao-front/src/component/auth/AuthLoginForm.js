import React from "react";
import {Link} from "react-router-dom";

const AuthLoginForm = ({form, onSubmit, onChange}) => {

    return (
    <form id="lp_form" onSubmit={onSubmit}>
        <div className="input_box">
            <input
                type="text"
                name="email"
                id="lp_id"
                placeholder="아이디"
                onChange={onChange}
                value={form.email}
                required
            />
            <input
                type="password"
                name="password"
                id="lp_pwd"
                placeholder="비밀번호"
                onChange={onChange}
                value={form.password}
                required
            />
        </div>
        <input type="submit" value="로그인" id="lp_submit"/>
        <div className="line_or">
            <div>또는</div>
        </div>
        <Link to={"/asd"} className="login_kakao">
            kakao 계정으로 로그인
        </Link>
    </form>)
}

export default AuthLoginForm