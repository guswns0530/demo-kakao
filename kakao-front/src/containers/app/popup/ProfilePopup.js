import React, { useEffect} from "react";
import ProfilePopupComponent from "../../../component/app/popup/ProfilePopup";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {selectUserToId} from "../../../lib/api/user";
import {useSelector} from "react-redux";
import ErrorHandler from "../../handler/ErrorHandler";

const ProfilePopup = () => {
    const {id} = useParams()
    const {data, isLoading, isError, error} = useQuery(["selectUserToId", id], async () => selectUserToId(id), {
        suspense: false,
        useErrorBoundary: false,
        retry: false,
    })
    const navigate = useNavigate()
    const {user} = useSelector(({user}) => ({
        user: user.user
    }))


    const onClose = () => {
        navigate("/app")
    }

    if(isLoading) {
        return <div></div>
    }

    if(isError) {
        return <ErrorHandler error={error} path={"/app"}/>
    }

    const resource = data.data.data

    const isMe = user.id === resource.id
    const isFriend = resource.friend_status === "FRIEND";

    return <ProfilePopupComponent resource={resource} onClose={onClose} isMe={isMe} isFriend={isFriend}/>

}

// const ProfilePopup = () => {
//     return (
//         <Suspense fallback={<div></div>}>
//             <ErrorBoundary FallbackComponent={ErrorHandler}>
//                 <ProfilePopupFetching/>
//             </ErrorBoundary>
//         </Suspense>
//     )
// }

export default ProfilePopup