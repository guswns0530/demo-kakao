import React, {Suspense} from "react";

import FriendInfoComponent from "../../../component/app/friend/FriendInfo";
import {useQuery} from "react-query";
import {selectFriendList} from "../../../lib/api/friend";

const FriendInfo = () => {
    const {data} = useQuery("selectFriendList", () => selectFriendList(), {
        suspense: true
    });

    return (<>
            <Suspense fallback={<div> loading... </div>}>
                <FriendInfoComponent resource={data}/>
            </Suspense>
        </>
    )
}

export default FriendInfo