import React, {useState} from "react";

import FriendInfoComponent from "../../../component/app/friend/FriendInfo";
import {useQuery} from "react-query";
import {selectFriendList} from "../../../lib/api/friend";
import LoadingFriendInfo from "../../../component/app/friend/LoadingFriendInfo";
import {useSelector} from "react-redux";
import ErrorHandler from "../../handler/ErrorHandler";
import searchServiceToFriend from "../../../services/searchService";

export const queryName = "selectFriendList"

const FriendInfo = () => {
    const {data, isLoading, isError, error} = useQuery(queryName, async () => {
        return selectFriendList()
    }, {
        retry: false,
        cacheTime: 0
    });
    const {search} = useSelector(({form}) => ({
        search: form.friend.search
    }))
    const [isMore, setMore] = useState(true)

    if (isLoading) {
        return <LoadingFriendInfo/>
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

    return <FriendInfoComponent data={filterData} isMore={isMore} onClick={onClick}/>
}

export default FriendInfo
