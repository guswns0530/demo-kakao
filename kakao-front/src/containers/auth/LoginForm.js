import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {LOGIN, login, loginFailure} from "../../modules/auth";
import {changeField, initializeForm} from "../../modules/form";
import AuthLoginForm from "../../component/auth/AuthLoginForm";
import {check} from '../../modules/user'
import { useNavigate } from "react-router-dom";
import {OAUTH2_REDIRECT_URI} from "../../constants";


const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { form, auth, authError, user, authLoading } = useSelector(( {auth, user, loading, form}) => ({
        form: form.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
        authLoading: loading[LOGIN]
    }))
    const [popup, setPopup] = useState(null);

    const onChange = e => {
        const { value, name } = e.target
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        )
    }

    const onSubmit = e => {
        e.preventDefault()
        const { email, password } = form;
        if(email.trim() === '') {
            const errorMsg = "계정을 입력해주세요"
            dispatch(loginFailure(errorMsg))
            return
        }
        /* eslint-disable */
        if(!email.match(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
            const errorMsg = "이메일 형식이 맞지않습니다. 다시 입력해주세요"
            dispatch(loginFailure(errorMsg))
            return
        }
        if(password.trim() === '') {
            const errorMsg = "비밀번호를 입력해주세요"
            dispatch(loginFailure(errorMsg))
            return
        }

        dispatch(login({email, password}))
    }

    const onClick = () => {
        if(popup) {
            popup.focus()
            return
        }

        const opener = window.open(`http://localhost:8080/oauth2/authorization/kakao?redirect_uri=${OAUTH2_REDIRECT_URI}`, 'Popup', "resizable=0, status=0,toolbar=0, width=400, height=600")
        setPopup(opener)
    }

    useEffect(() => {
        dispatch(initializeForm('login'))
    }, [dispatch, auth, user])

    useEffect(() => {
        if(authError) {
            return
        }
        if(auth) {
            dispatch(check())
        }
    }, [auth, authError, dispatch])

    useEffect(() => {
        if(auth && user) {
            navigate('/');
        }
    }, [navigate, auth, user])

    useEffect(() => {
        return () => {
            if(popup) {
                popup.close()
                setPopup(null)
            }
        }
    }, [dispatch, popup])

    return (
        <AuthLoginForm
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            authError={authError}
            onClick={onClick}
            popup={popup}
            authLoading={authLoading}
        />
    )
}

export default LoginForm