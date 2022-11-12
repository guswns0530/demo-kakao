import React, {useState} from "react";

import FriendInfoComponent from "../../../component/app/friend/FriendInfo";
import {useQuery} from "react-query";
import {selectFriendList} from "../../../lib/api/friend";
import LoadingFriendInfo from "../../../component/app/friend/LoadingFriendInfo";
import {useSelector} from "react-redux";
import ErrorHandler from "../../handler/ErrorHandler";
import searchServiceToFriend from "../../../services/searchService";
import {Item, Menu, Separator, Submenu, useContextMenu} from "react-contexify";

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

    const handleContextMenu = (e) => {
        e.preventDefault()
        show(e, {})
    }

    const resource = data.data.data
    const filterData = searchServiceToFriend(resource, search)

    return (<>
            <FriendInfoComponent data={filterData} isMore={isMore} onClick={onClick} onContextMenu={handleContextMenu}/>
            <Menu id={menuId}>
                <Item>Item1</Item>
                <Item>Item 2</Item>
                <Separator/>
                <Item disabled>Disabled</Item>
                <Separator/>
                <Submenu label="Foobar">
                    <Item>Sub Item 1</Item>
                    <Item>Sub Item 2</Item>
                </Submenu>
            </Menu>
        </>
    )
}

export default FriendInfo
