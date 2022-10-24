import React from "react";
import RegisterPasswordForm from "../../../component/auth/register/PasswordForm"

const PasswordForm = ({onChange, form}) => {
    return (<>
        <RegisterPasswordForm
            onChange={onChange}
            form={form}
        />
    </>)
}

export default PasswordForm