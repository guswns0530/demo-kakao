import React, { useState} from "react";

import RecommendFriendInfoComponent from "../../../component/app/friend/RecommendFriendList";
import {selectRecommendFriendList} from "../../../lib/api/friend";
import {useSelector} from "react-redux";
import searchServiceToFriend from "../../../services/searchService";

export const queryName = "selectRecommendFriendList"

const RecommendFriendList = () => {
    const {search, recommendFriends} = useSelector(({form, friend}) => ({
        search: form.friend.search,
        recommendFriends: friend.recommendFriends
    }))
    const [isMore, setMore] = useState(false)

    const onClick = (e) => {
        e.preventDefault()
        setMore(!isMore)
    }

    const handleContextMenu = (e) => {
        e.preventDefault()
    }

    const filterData = searchServiceToFriend(recommendFriends, search)

    return <RecommendFriendInfoComponent data={filterData} isMore={isMore} onClick={onClick} onAuxClick={handleContextMenu}/>
}

export default RecommendFriendList