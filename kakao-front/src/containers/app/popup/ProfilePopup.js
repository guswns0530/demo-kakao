import React, {Suspense} from "react";
import ProfilePopupComponent from "../../../component/app/popup/ProfilePopup";
import {useParams, Navigate} from "react-router-dom";
import {useQuery} from "react-query";
import {selectUser} from "../../../lib/api/friend";


const ProfilePopupFetching = () => {
    const {id} = useParams()
    const {data, error} = useQuery("selectUser", async () => selectUser(id), {
        suspense: true,
        onError: (error) => {
            console.log(error)
        }
    })

    console.log(data, error)

    if(error) {
        return <Navigate to={"/app"}/>
    }


    return <ProfilePopupComponent/>
}

const ProfilePopup = () => {
    return (
        <Suspense>
            <ProfilePopupFetching/>
        </Suspense>
        )
}

export default ProfilePopup