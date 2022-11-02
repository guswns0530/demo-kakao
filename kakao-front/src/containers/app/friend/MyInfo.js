import React from "react";

import MyInfoComponent from "../../../component/app/friend/Profile";
import {useSelector} from "react-redux";

const MyInfo = () => {
    const { user } = useSelector(({user}) => ({
        user: user.user
    }))

    return (
        <>
            <MyInfoComponent user={user}/>
        </>
    )
}

export default MyInfo