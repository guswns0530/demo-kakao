import React, {useState} from "react";
import AuthRegisterForm from "../../component/auth/RegisterForm";
import {useDispatch, useSelector} from "react-redux";
import {changeField} from "../../modules/form";
import EmailConfirmForm from "./register/EmailConfirmForm";
import PasswordForm from "./register/PasswordForm";
import ProfileForm from "./register/ProfileForm";

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

    const Pages = [<EmailConfirmForm
        form={form}
        onChange={onChange}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
    />, <PasswordForm
        form={form}
        onChange={onChange}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
    />, <ProfileForm
        form={form}
        onChange={onChange}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
    />]

    return <AuthRegisterForm
        form={form}
        onChange={onChange}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
    >
        {Pages[currentPage]}
    </AuthRegisterForm>
}

export default RegisterForm;