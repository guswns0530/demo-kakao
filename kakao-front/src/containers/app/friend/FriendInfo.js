import React, {Suspense, useState} from "react";

import FriendInfoComponent from "../../../component/app/friend/FriendInfo";
import {useQuery} from "react-query";
import {selectFriendList} from "../../../lib/api/friend";
import LoadingFriendInfo from "../../../component/app/friend/LoadingFriendInfo";
import {useSelector} from "react-redux";
import getConstantVowels from "../../../services/createHangulString";

const FriendInfoFetching = () => {
    const {data:{data: {data}}} = useQuery("selectFriendList", async () => {
        return selectFriendList()
    }, {
        suspense: true,
        enabled: true
    });
    const {search} = useSelector(({form}) => ({
        search: form.friend.search
    }) )
    const [isMore, setMore] = useState(true)

    const onClick = (e) => {
        e.preventDefault()
        setMore(!isMore)
    }

    const searchArr = getConstantVowels(search.value.replace(/\s/g, ""))
    const filterData = data.filter(user => {
        const name = getConstantVowels(user.name)

        const consonantVowelName = name.join('').replace(' ', '')
        const consonantVowelSearch = searchArr.join('').replace(' ', '')

        const consonantName = name.map(name => name[0]).join('').replace(' ', '')
        const consonantSearch = searchArr.map(search => search[0]).join('').replace(' ', '')

        return consonantName.includes(consonantSearch) || consonantVowelName.includes(consonantVowelSearch)
    })

    return <FriendInfoComponent data={filterData} isMore={isMore} onClick={onClick}/>
}

const FriendInfo = () => {
    return (
        <Suspense fallback={<LoadingFriendInfo/>}>
            <FriendInfoFetching/>
        </Suspense>
    )
}

export default FriendInfo