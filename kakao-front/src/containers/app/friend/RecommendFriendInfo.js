import React, {Suspense, useState} from "react";

import RecommendFriendInfoComponent from "../../../component/app/friend/RecommendFriendInfo";
import {useQuery} from "react-query";
import {selectRecommendFriendList} from "../../../lib/api/friend";
import LoadingRecommendFriendInfo from "../../../component/app/friend/LoadingRecommendFriendInfo";
import {useSelector} from "react-redux";
import getConstantVowels from "../../../services/createHangulString";

const RecommendFriendInfoFetching = () => {
    const {data: {data: {data}}} = useQuery("selectRecommendFriendList", async () => {
        return selectRecommendFriendList()
    }, {
        suspense: true,
        enabled: true
    });
    const {search} = useSelector(({form}) => ({
        search: form.friend.search
    }) )
    const [isMore, setMore] = useState(false)

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

    return <RecommendFriendInfoComponent data={filterData} isMore={isMore} onClick={onClick}/>
}

const RecommendFriendInfo = () => {
    return (
        <Suspense fallback={<LoadingRecommendFriendInfo/>}>
            <RecommendFriendInfoFetching />
        </Suspense>
    )
}

export default RecommendFriendInfo