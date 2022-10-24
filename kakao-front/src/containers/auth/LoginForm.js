import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {LOGIN, login, LOGIN_FAILURE, setPopup} from "../../modules/auth";
import {changeField, initializeForm} from "../../modules/form";
import AuthLoginform from "../../component/auth/LoginForm";
import { useNavigate } from "react-router-dom";
import {OAUTH2_REDIRECT_URI} from "../../constants";
import {check} from "../../modules/user";

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { form, auth, authError, user, authLoading, authPopup } = useSelector(( {auth, user, loading, form}) => ({
        form: form.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
        authLoading: loading[LOGIN],
        authPopup: auth.authPopup
    }))

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
        const { email: {value: email}, password: {value: password} } = form;
        if(email.trim() === '') {
            const errorMsg = "계정을 입력해주세요"
            dispatch({
                type: LOGIN_FAILURE,
                payload: errorMsg,
                error: true
            })
            return
        }
        /* eslint-disable */
        if(!email.match(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
            const errorMsg = "이메일 형식이 맞지않습니다. 다시 입력해주세요"
            dispatch({
                type: LOGIN_FAILURE,
                payload: errorMsg,
                error: true
            })
            return
        }
        if(password.trim() === '') {
            const errorMsg = "비밀번호를 입력해주세요"
            dispatch({
                type: LOGIN_FAILURE,
                payload: errorMsg,
                error: true
            })
            return
        }

        dispatch(login({email, password}))
    }

    const onClick = () => {
        if(authPopup) {
            authPopup.focus()
            return
        }

        const opener = window.open(`http://localhost:8080/oauth2/authorization/kakao?redirect_uri=${OAUTH2_REDIRECT_URI}`, 'Popup', "resizable=0, status=0,toolbar=0, width=400, height=600")
        dispatch(setPopup(opener))

        const interval = setInterval(() => {
            if(opener.closed) {
                dispatch(setPopup(null))
                clearInterval(interval)
            }
        }, 300)
    }

    // form 초기화
    useEffect(() => {
        dispatch(initializeForm('login'))
    }, [dispatch, auth, user])

    useEffect(() => {
        if(authError) {
            return
        } else if (auth) {
            dispatch(check(auth.access_token))
        }
    }, [auth, authError, dispatch])

    useEffect(() => {
        if(auth && user) {
            navigate('/');
        }
    }, [navigate, auth, user])

    useEffect(() => {
        return () => {
            if(authPopup) {
                dispatch(setPopup(null))
                authPopup.close()
            }
        }
    }, [dispatch, authPopup])

    return (
        <AuthLoginform
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            authError={authError}
            onClick={onClick}
            popup={authPopup}
            authLoading={authLoading}
        />
    )
}

export default LoginForm