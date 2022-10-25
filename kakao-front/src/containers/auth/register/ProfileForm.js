import React, {useEffect, useState} from "react";
import RegisterProfileForm from "../../../component/auth/register/ProfileForm"
import {useDispatch} from "react-redux";
import {setFieldError} from "../../../modules/form";
import {register} from "../../../lib/api/auth";
import {FAILURE_PAGE, SUCCESS_PAGE} from "../RegisterForm";

const ProfileForm = ({onChange, form, currentPage, setCurrentPage}) => {
    const dispatch = useDispatch()
    const [btnStatus, setBtnStatus] = useState(false)

    useEffect(() => {
        const name = form.name.value

        setBtnStatus(false)

        dispatch(setFieldError({
            form: 'register',
            key: 'name',
            error: ''
        }))

        if(name.trim() === '') {
            return
        }

        if(!(name.length >= 1 && name.length <= 10)) {
            const error = '이름은 최대 10글자입니다'
            dispatch(setFieldError({
                form: 'register',
                key: 'name',
                error
            }))

            return
        }

        if(!name.match(/^[A-Za-z\d+가-힣]{1,10}$/)) {
            const error = '이름에 포함되서는 안되는 문자열이 포함되어있습니다.'
            dispatch(setFieldError({
                form: 'register',
                key: 'name',
                error
            }))

            return
        }

        setBtnStatus(true)
    }, [dispatch, form.name.value])

    const onSubmit = async (e) => {
        e.preventDefault()

        if(!btnStatus) {
            return
        }

        setBtnStatus(false)

        const password = form.password.value
        const name = form.name.value

        try {
            await register({password, name})
            setCurrentPage(SUCCESS_PAGE)
        } catch (err) {
            setCurrentPage(FAILURE_PAGE)
        }
    }

    return <RegisterProfileForm
        onChange={onChange}
        form={form}
        btnStatus={btnStatus}
        onSubmit={onSubmit}
    />
}

export default ProfileForm