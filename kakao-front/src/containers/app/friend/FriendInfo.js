import React, {useState} from "react";

import FriendInfoComponent from "../../../component/app/friend/FriendInfo";
import {useQuery} from "react-query";
import {selectFriendList} from "../../../lib/api/friend";
import LoadingFriendInfo from "../../../component/app/friend/LoadingFriendInfo";
import {useSelector} from "react-redux";
import ErrorHandler from "../../handler/ErrorHandler";
import searchServiceToFriend from "../../../services/searchService";
import {Item, Menu, Separator, useContextMenu} from "react-contexify";

export const queryName = "selectFriendList"
export const menuId = "FriendInfoMenuId"

const FriendInfo = () => {
    const {data, isLoading, isError, error} = useQuery(queryName, async () => {
        return selectFriendList()
    }, {
        retry: false, cacheTime: 0
    });
    const {search} = useSelector(({form}) => ({
        search: form.friend.search
    }))
    const [isMore, setMore] = useState(true)
    const {show} = useContextMenu({
        id: menuId
    })

    if (isLoading) {
        return <LoadingFriendInfo/>
    }

    if (isError) {
        return <ErrorHandler error={error} path={"/logout"}/>
    }


    const onClick = (e) => {
        e.preventDefault()
        setMore(!isMore)
    }

    const handleContextMenu = (e, email) => {
        e.preventDefault()
        show(e, {
            props: () => ({
                email
            })
        })
    }

    const resource = data.data.data
    const filterData = searchServiceToFriend(resource, search)

    return (<>
            <FriendInfoComponent data={filterData} isMore={isMore} onClick={onClick} onContextMenu={handleContextMenu}/>
            <Menu id={menuId} animation={false}>
                <Item>채팅하기</Item>
                <Separator/>
                <Item>프로필 보기</Item>
                <Item>이름 변경</Item>
                <Separator/>
                <Item>차단</Item>
            </Menu>
        </>
    )
}

export default FriendInfo
