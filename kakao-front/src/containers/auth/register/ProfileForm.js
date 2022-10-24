import React from "react";
import RegisterProfileForm from "../../../component/auth/register/ProfileForm"

const ProfileForm = ({onChange, form}) => {
    return <RegisterProfileForm
        onChange={onChange}
        form={form}
    />
}

export default ProfileForm