import React, {useState} from "react";
import ProfileSettingPopupComponent from "../../../component/app/setting/ProfileSettingPopup";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useUpdateUser} from "../../../lib/query";

const fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/

const ProfileSettingPopup = ({onClick}) => {
    const {user} = useSelector(({user}) => ({
        user: user.user
    }))
    const [profileImage, setProfileImage] = useState(user.profile_image_url || 1)
    const [file, setFile] = useState('')
    const [name, setName] = useState(user.name || '')
    const [msg, setMsg] = useState(user.message || '')
    const {mutate} = useUpdateUser()

    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        if (name === "name") {
            if (value.length > 20) {
                return
            }
            return setName(e.target.value)
        }

        if (name === "msg") {
            if (value.length > 60) {
                return
            }
            return setMsg(e.target.value)
        }
    }

    const onUploadImage = (e) => {
        const file = e.target.files[0]

        if (e.target.value.match(fileForm)) {
            setFile(file)
            const reader = new FileReader()

            reader.onload = (e) => {
                setProfileImage(e.target.result)
            }
            reader.readAsDataURL(file)
        } else {
            toast.error("잘못된 파일 형식입니다.")
            e.target.value = ""
        }
    }

    const onSubmit = () => {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("message", msg)
        if (file) {
            formData.append("profileImageFile", file)
        }

        mutate(formData)
        onClick()
    }

    return <ProfileSettingPopupComponent onClose={onClick} onChange={onChange} name={name} msg={msg}
                                         profileImage={profileImage} onSubmit={onSubmit} onUploadImage={onUploadImage}/>
}

export default ProfileSettingPopup