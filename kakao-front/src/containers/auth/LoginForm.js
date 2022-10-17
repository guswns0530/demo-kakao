import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {changeField, initializeForm, login} from "../../modules/auth";
import AuthLoginForm from "../../component/auth/AuthLoginForm";
import {check} from '../../modules/user'

const LoginForm = () => {
    const dispatch = useDispatch();
    const { form, auth, authError } = useSelector(( {auth}) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
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
        const { email, password } = form;
        dispatch(login({email, password}))
    }

    useEffect(() => {
        dispatch(initializeForm('login'))
    }, [dispatch])

    useEffect(() => {
        if(authError) {
            console.log("오류 발생")
            console.log(authError)
            return
        }
        if(auth) {
            console.log('로그인 성공')
            console.log(auth)
            dispatch(check)
        }
    }, [auth, authError, dispatch])

    useEffect(() => {
        if(auth) {
            window.history.push('/');
        }
    }, [window.history])

    return (
        <AuthLoginForm
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    )
}

export default LoginForm