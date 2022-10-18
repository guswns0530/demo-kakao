import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {changeField, initializeForm, login, loginFailure} from "../../modules/auth";
import AuthLoginForm from "../../component/auth/AuthLoginForm";
import {check} from '../../modules/user'
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(( {auth, user}) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
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

        const opener = window.open('http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/request-end', 'Popup', "resizable=0, status=0,toolbar=0, width=400, height=600")
        setPopup(opener)

        const interval = setInterval(() => {
            try {
                const { href } = opener.location
                const token = new URL(href).searchParams.get("token")
                if(token && !(href === 'about:blank')) {
                    setPopup(null)
                    opener.close()
                    clearInterval(interval)

                    // dispatch()
                }
            } catch (e) {

            }
            if(opener.closed) {
                setPopup(null)
                clearInterval(interval)
            }
        }, 300)
    }

    useEffect(() => {
        dispatch(initializeForm('login'))
    }, [dispatch])

    useEffect(() => {
        if(authError) {
            return
        }
        if(auth) {
            dispatch(check())
        }
    }, [auth, authError, dispatch])

    useEffect(() => {
        if(user) {
            navigate('/');
        }
    }, [navigate, user])

    useEffect(() => {

        return () => {
            if(popup) {
                popup.close()
            }
        }
    })

    return (
        <AuthLoginForm
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            authError={authError}
            onClick={onClick}
            popup={popup}
        />
    )
}

export default LoginForm