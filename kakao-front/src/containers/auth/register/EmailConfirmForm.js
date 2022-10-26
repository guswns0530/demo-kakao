import React, {useEffect, useRef, useState} from "react";
import RegisterEmailConfirmForm from "../../../component/auth/register/EmailConfirmForm";
import {useDispatch} from "react-redux";
import {setFieldError} from "../../../modules/form";
import {checkEmailVerify, getEmailVerify} from "../../../lib/api/auth";
import {PASSWORD_CONFIRM} from "../RegisterForm";

const EmailConfirmForm = ({onChange, form, setCurrentPage}) => {
    const dispatch = useDispatch();
    const [verify, setVerify] = useState(false)
    const [btnStatus, setBtnStatus] = useState(false)
    const [loading, setLoading] = useState(false)
    const emailInput = useRef()

    useEffect(() => {
        const verifyCode = form.verifyCode.value
        if(verifyCode.length !== 7) {
            const error = "인증번호는 7자리 입니다."
            dispatch(setFieldError({form: "register", key: "verifyCode", error}))
            setBtnStatus(false)
            return
        }

        const error = ""
        dispatch(setFieldError({form: "register", key: "verifyCode", error}))
        setBtnStatus(true)
    }, [form.verifyCode.value, dispatch])

    const onClick = async (e) => {
        e.preventDefault()

        if(loading) {
            return;
        }
        setLoading(true)
        const email = form.email.value
        emailInput.current.value = email + ""

        if(email.trim() === '') {
            const error = "이메일을 입력해주세요."
            dispatch(setFieldError({form: "register", key: "email", error}))
            setLoading(false)
            return
        }

        /* eslint-disable */
        if(!email.match(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
            const error = "이메일 형식이 맞지않습니다. 다시 입력해주세요"
            dispatch(setFieldError({form: "register", key: "email", error}))
            setLoading(false)
            return
        } else {
            dispatch(setFieldError({form: "register", key: "email", error: ""}))
        }

        try {
            const response = await getEmailVerify(email)

            setVerify(true)
        } catch (err) {
            const {error_description } = err.response.data
            dispatch(setFieldError({form: "register", key: "email", error: error_description}))
        }
        setLoading(false)
    }


    const onSubmit = async (e) => {
        e.preventDefault()

        if(!btnStatus) return
        setBtnStatus(false)

        const verifyCode = form.verifyCode.value

        try {
            await checkEmailVerify(verifyCode)
            setCurrentPage(PASSWORD_CONFIRM)
        } catch(err) {
            const {error_description } = err.response.data
            dispatch(setFieldError({form: "register", key: "verifyCode", error: error_description}))
        }
        setBtnStatus(true)
    }

    return <>
        <RegisterEmailConfirmForm
            form={form}
            verify={verify}
            emailInput={emailInput}
            onChange={onChange}
            onClick={onClick}
            onSubmit={onSubmit}
            btnStatus={btnStatus}
            loading={loading}
        />
    </>
}

export default EmailConfirmForm