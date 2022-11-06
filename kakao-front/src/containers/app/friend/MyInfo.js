import React, {Suspense} from "react";

import MyInfoComponent from "../../../component/app/friend/Profile";
import {useQuery} from "react-query";
import {selectMe} from "../../../lib/api/user";
import LoadingProfile from "../../../component/app/friend/LoadingProfile";

const MyInfoFetch = () => {
    const {data} = useQuery("checkUser", async () => {
        return selectMe()
    }, {
        suspense: true,
        enabled: true
    })

    return (
        <MyInfoComponent user={data.data.data}/>
    )
}

const MyInfo = () => {
    return <Suspense fallback={<LoadingProfile />}>
        <MyInfoFetch/>
    </Suspense>
}

export default MyInfo