import React from "react";
import ProfilePopupComponent from "../../../component/app/popup/ProfilePopup";
import {useParams} from "react-router-dom";


const ProfilePopup = () => {
    const {id} = useParams()
    console.log(id)

    return <ProfilePopupComponent/>
}

export default ProfilePopup