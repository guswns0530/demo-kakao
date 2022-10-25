import React, {useEffect, useState} from "react";
import RegisterPasswordForm from "../../../component/auth/register/PasswordForm"
import {useDispatch} from "react-redux";
import {setFieldError} from "../../../modules/form";

const PasswordForm = ({onChange, form, currentPage, setCurrentPage}) => {
    const dispatch = useDispatch();
    const [btnStatus, setBtnStatus] = useState(false)

    useEffect(() => {
        const password = form.password.value
        const passwordConfirm = form.passwordConfirm.value

        setBtnStatus(false)

        dispatch(setFieldError({
            form: 'register',
            key: 'password',
            error: ''
        }))
        dispatch(setFieldError({
            form: 'register',
            key: 'passwordConfirm',
            error: ''
        }))
        if(password.trim() === '') {
            return
        }

        /* eslint-disable */
        if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d+-\_]{8,32}$/)) {
            const error = '하나이상의 문자와 하나이상의 숫자가 들어가야합니다.'
            dispatch(setFieldError({
                form: 'register',
                key: 'password',
                error
            }))

            return
        }

        if(passwordConfirm.trim() === '') {
            return
        }

        if(passwordConfirm !== password) {
            const error = '비밀번호가 일치하지 않습니다.'
            dispatch(setFieldError({
                form: 'register',
                key: 'passwordConfirm',
                error
            }))

            return
        }

        setBtnStatus(true)
    }, [dispatch, form.password.value, form.passwordConfirm.value])

    const onSubmit = (e) => {
        e.preventDefault()

        if(!btnStatus) {
            return
        }

        setCurrentPage(currentPage + 1)
    }

    return (<>
        <RegisterPasswordForm
            onChange={onChange}
            onSubmit={onSubmit}
            form={form}
            btnStatus={btnStatus}
        />
    </>)
}

export default PasswordForm