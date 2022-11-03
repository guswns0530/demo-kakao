import React, {Suspense} from "react";
import ProfilePopupComponent from "../../../component/app/popup/ProfilePopup";
import {Navigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {selectUser} from "../../../lib/api/friend";
import ErrorBoundary from "../../../component/util/ErrorBoundary";


const ProfilePopupFetching = () => {
    const {id} = useParams()
    const {data} = useQuery("selectUser", async () => selectUser(id), {
        suspense: true,
    })


    return (<>
        <ProfilePopupComponent resource={data}/>
    </>)
}

const ProfilePopup = () => {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <ErrorBoundary fallback={Navigate({to: "/app"})}>
                <ProfilePopupFetching/>
            </ErrorBoundary>
        </Suspense>
    )
}

export default ProfilePopup