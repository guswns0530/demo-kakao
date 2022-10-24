import React, {useState} from "react";
import AuthRegisterForm from "../../component/auth/RegisterForm";
import {useDispatch, useSelector} from "react-redux";
import {changeField} from "../../modules/form";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const {form} = useSelector(({form}) => ({
        form: form.register
    }))
    const [currentPage, setCurrentPage] = useState(0)

    const onChange = e => {
        const { value, name } = e.target
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        )
    }

    return <AuthRegisterForm
        form={form}
        onChange={onChange}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
    />
}

export default RegisterForm;