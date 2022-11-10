import React, {Suspense, useState} from "react";

import RecommendFriendInfoComponent from "../../../component/app/friend/RecommendFriendInfo";
import {useQuery} from "react-query";
import {selectRecommendFriendList} from "../../../lib/api/friend";
import LoadingRecommendFriendInfo from "../../../component/app/friend/LoadingRecommendFriendInfo";
import {useSelector} from "react-redux";
import {ErrorBoundary} from "react-error-boundary";
import ErrorHandler from "../../handler/ErrorHandler";
import searchServiceToFriend from "../../../services/searchService";

const RecommendFriendInfoFetching = () => {
    const {data: {data: {data}}} = useQuery("selectRecommendFriendList", async () => {
        return selectRecommendFriendList()
    }, {
        suspense: true,
        enabled: true,
        retry: false,
        cacheTime: 0
    });
    const {search} = useSelector(({form}) => ({
        search: form.friend.search
    }))
    const [isMore, setMore] = useState(false)

    const onClick = (e) => {
        e.preventDefault()
        setMore(!isMore)
    }

    const filterData = searchServiceToFriend(data, search)

    return <RecommendFriendInfoComponent data={filterData} isMore={isMore} onClick={onClick}/>
}

const RecommendFriendInfo = () => {
    return (
        <Suspense fallback={<LoadingRecommendFriendInfo/>}>
            <ErrorBoundary FallbackComponent={ErrorHandler({path: "/logout"})}>
                <RecommendFriendInfoFetching/>
            </ErrorBoundary>
        </Suspense>
    )
}

export default RecommendFriendInfo