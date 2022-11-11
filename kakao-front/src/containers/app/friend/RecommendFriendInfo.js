import React, { useState} from "react";

import RecommendFriendInfoComponent from "../../../component/app/friend/RecommendFriendInfo";
import {useQuery} from "react-query";
import {selectRecommendFriendList} from "../../../lib/api/friend";
import LoadingRecommendFriendInfo from "../../../component/app/friend/LoadingRecommendFriendInfo";
import {useSelector} from "react-redux";
import ErrorHandler from "../../handler/ErrorHandler";
import searchServiceToFriend from "../../../services/searchService";

export const queryName = "selectRecommendFriendList"

const RecommendFriendInfo = () => {
    const {data, isError, isLoading, error} = useQuery("selectRecommendFriendList", async () => {
        return selectRecommendFriendList()
    }, {
        retry: false,
        cacheTime: 0
    });
    const {search} = useSelector(({form}) => ({
        search: form.friend.search
    }))
    const [isMore, setMore] = useState(false)

    if (isLoading) {
        return <LoadingRecommendFriendInfo/>
    }

    if (isError) {
        if (error.response.status === 401 || error.response.status === 400) {
            return <ErrorHandler error={error} path={"/logout"}/>
        }

        return <ErrorHandler error={error} path={"/app"}/>
    }

    const onClick = (e) => {
        e.preventDefault()
        setMore(!isMore)
    }

    const resource = data.data.data
    const filterData = searchServiceToFriend(resource, search)

    return <RecommendFriendInfoComponent data={filterData} isMore={isMore} onClick={onClick}/>
}

export default RecommendFriendInfo