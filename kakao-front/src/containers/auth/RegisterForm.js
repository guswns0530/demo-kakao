import React, {useEffect, useState} from "react";
import AuthRegisterForm from "../../component/auth/RegisterForm";
import {useDispatch, useSelector} from "react-redux";
import {changeField, initializeForm} from "../../modules/form";
import EmailConfirmForm from "./register/EmailConfirmForm";
import PasswordForm from "./register/PasswordForm";
import ProfileForm from "./register/ProfileForm";
import RegisterSuccess from "../../component/auth/register/RegisterSuccess";
import RegisterFailure from "../../component/auth/register/RegisterFailure";

// import {Routes, Route} from "react-router-dom"

export const SUCCESS_PAGE = 3
export const FAILURE_PAGE = 4
const RegisterForm = () => {
    const dispatch = useDispatch();
    const {form} = useSelector(({form}) => ({
        form: form.register
    }))
    const [currentPage, setCurrentPage] = useState(0)

    const onChange = e => {
        const {value, name} = e.target
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        )
    }

    useEffect(() => {
        return () => {
            dispatch(initializeForm("register"))
        }
    }, [dispatch])

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
    />, <RegisterSuccess
        form={form}
    />, <RegisterFailure/>
    ]

    return <AuthRegisterForm
        currentPage={currentPage}
    >
        {/*<Routes>*/}
        {/*    <Route path={"/email-verify"} element={<EmailConfirmForm*/}
        {/*        form={form}*/}
        {/*        onChange={onChange}*/}
        {/*        currentPage={currentPage}*/}
        {/*        setCurrentPage={setCurrentPage}*/}
        {/*    />}>*/}

        {/*    </Route>*/}
        {/*    <Route path={"/password-confirm"} element={<PasswordForm*/}
        {/*        form={form}*/}
        {/*        onChange={onChange}*/}
        {/*        currentPage={currentPage}*/}
        {/*        setCurrentPage={setCurrentPage}*/}
        {/*    />}>*/}

        {/*    </Route>*/}
        {/*    <Route path={"/profile-setting"} element={<ProfileForm*/}
        {/*        form={form}*/}
        {/*        onChange={onChange}*/}
        {/*        currentPage={currentPage}*/}
        {/*        setCurrentPage={setCurrentPage}*/}
        {/*    />}>*/}
        {/*    </Route>*/}
        {/*</Routes>*/}


        {Pages[currentPage]}
    </AuthRegisterForm>
}

export default RegisterForm;