import React, {Suspense, useState} from "react";

import FriendInfoComponent from "../../../component/app/friend/FriendInfo";
import {useQuery} from "react-query";
import {selectFriendList} from "../../../lib/api/friend";
import LoadingFriendInfo from "../../../component/app/friend/LoadingFriendInfo";

const FriendInfoFetching = () => {
    const {data} = useQuery("selectFriendList", async () => {
        return selectFriendList()
    }, {
        suspense: true,
        enabled: true
    });
    const [isMore, setMore] = useState(true)

    const onClick = (e) => {
        e.preventDefault()
        setMore(!isMore)
    }

    return <FriendInfoComponent resource={data} isMore={isMore} onClick={onClick}/>
}

const FriendInfo = () => {
    return (
        <Suspense fallback={<LoadingFriendInfo/>}>
            <FriendInfoFetching/>
        </Suspense>
    )
}

export default FriendInfo