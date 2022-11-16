import React, { useState} from "react";

import RecommendFriendInfoComponent from "../../../component/app/friend/RecommendFriendList";
import {useQuery} from "react-query";
import {selectRecommendFriendList} from "../../../lib/api/friend";
import LoadingRecommendFriendInfo from "../../../component/app/friend/LoadingRecommendFriendList";
import {useSelector} from "react-redux";
import ErrorHandler from "../../handler/ErrorHandler";
import searchServiceToFriend from "../../../services/searchService";

export const queryName = "selectRecommendFriendList"

const RecommendFriendList = () => {
    const {data, isError, isLoading, error} = useQuery("selectRecommendFriendList", async () => {
        return selectRecommendFriendList()
    }, {
    });
    const {search} = useSelector(({form}) => ({
        search: form.friend.search
    }))
    const [isMore, setMore] = useState(false)

    if (isLoading) {
        return <LoadingRecommendFriendInfo/>
    }

    if (isError) {
        return <ErrorHandler error={error} path={"/logout"}/>
    }

    const onClick = (e) => {
        e.preventDefault()
        setMore(!isMore)
    }

    const handleContextMenu = (e) => {
        e.preventDefault()
        console.log('우클릭')
    }

    const resource = data.data.data
    const filterData = searchServiceToFriend(resource, search)

    return <RecommendFriendInfoComponent data={filterData} isMore={isMore} onClick={onClick} onAuxClick={handleContextMenu}/>
}

export default RecommendFriendList