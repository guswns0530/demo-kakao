import React, {Suspense, useState} from "react";

import RecommendFriendInfoComponent from "../../../component/app/friend/RecommendFriendInfo";
import {useQuery} from "react-query";
import {selectRecommendFriendList} from "../../../lib/api/friend";
import LoadingRecommendFriendInfo from "../../../component/app/friend/LoadingRecommendFriendInfo";

const RecommendFriendInfoFetching = () => {
    const {data} = useQuery("selectRecommendFriendList", async () => {
        return selectRecommendFriendList()
    }, {
        suspense: true,
        enabled: true
    });
    const [isMore, setMore] = useState(false)

    const onClick = (e) => {
        e.preventDefault()
        setMore(!isMore)
    }

    return <RecommendFriendInfoComponent resource={data} isMore={isMore} onClick={onClick}/>
}

const RecommendFriendInfo = () => {
    return (
        <Suspense fallback={<LoadingRecommendFriendInfo/>}>
            <RecommendFriendInfoFetching/>
        </Suspense>
    )
}

export default RecommendFriendInfo