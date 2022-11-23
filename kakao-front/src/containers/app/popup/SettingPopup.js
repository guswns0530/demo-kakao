import React from "react";
import SettingPopupComponent from "../../../component/app/popup/SettingPopup";
import Popup from "../../../component/util/Popup";
import {useLocation, useNavigate} from "react-router-dom";

const SettingPopup = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const onClose = () => {
        navigate("/app", { state: location.state })
    }

    return (
        <Popup>
            <SettingPopupComponent onClose={onClose} />
        </Popup>
    )
}

export default SettingPopup
