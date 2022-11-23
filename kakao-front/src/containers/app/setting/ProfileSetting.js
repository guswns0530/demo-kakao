import React, {useState} from "react";
import ProfileSettingComponent from "../../../component/app/setting/ProfileSetting";
import {useSelector} from "react-redux";
import ProfileSettingPopup from "./ProfileSettingPopup";

const ProfileSetting = () => {
    const {user} = useSelector(({user}) => ({
        user: user.user
    }))
    const [isOpen, setOpen] = useState(false)

    const onClick = () => {
        setOpen(!isOpen)
    }

    return (
        <>
            <ProfileSettingComponent user={user} onClick={onClick}/>
            {isOpen && <ProfileSettingPopup onClick={onClick}/> }
        </>
    )
}

export default ProfileSetting