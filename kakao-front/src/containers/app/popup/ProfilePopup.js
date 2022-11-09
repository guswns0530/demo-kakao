import React, {Suspense} from "react";
import ProfilePopupComponent from "../../../component/app/popup/ProfilePopup";
import {Navigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {selectUserToId} from "../../../lib/api/friend";
import {ErrorBoundary} from "react-error-boundary";

const ProfilePopupFetching = () => {
    const {id} = useParams()
    const {data} = useQuery("selectUserToId", async () => selectUserToId(id), {
        suspense: true,
    })

    return (<>
        <ProfilePopupComponent resource={data}/>
    </>)
}

const ProfilePopup = () => {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <ErrorBoundary FallbackComponent={Navigate({to: "/app"})}>
                <ProfilePopupFetching/>
            </ErrorBoundary>
        </Suspense>
    )
}

export default ProfilePopup