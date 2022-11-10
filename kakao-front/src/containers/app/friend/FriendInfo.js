import React, {Suspense, useState} from "react";

import FriendInfoComponent from "../../../component/app/friend/FriendInfo";
import {useQuery} from "react-query";
import {selectFriendList} from "../../../lib/api/friend";
import LoadingFriendInfo from "../../../component/app/friend/LoadingFriendInfo";
import {useSelector} from "react-redux";
import ErrorHandler from "../../handler/ErrorHandler";
import {ErrorBoundary} from "react-error-boundary";
import searchServiceToFriend from "../../../services/searchService";

export const queryName = "selectFriendList"

const FriendInfoFetching = () => {
    const {data: {data: {data}}} = useQuery(queryName, async () => {
        return selectFriendList()
    }, {
        suspense: true,
        enabled: true,
        retry: false,
        cacheTime: 0
    });
    const {search} = useSelector(({form}) => ({
        search: form.friend.search
    }))
    const [isMore, setMore] = useState(true)


    const onClick = (e) => {
        e.preventDefault()
        setMore(!isMore)
    }

    const filterData = searchServiceToFriend(data, search)

    return <FriendInfoComponent data={filterData} isMore={isMore} onClick={onClick}/>
}

const FriendInfo = () => {
    return (
        <Suspense fallback={<LoadingFriendInfo/>}>
            <ErrorBoundary FallbackComponent={ErrorHandler({path: "/logout"})}>
                <FriendInfoFetching/>
            </ErrorBoundary>
        </Suspense>
    )
}

export default FriendInfo
