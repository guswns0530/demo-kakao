import React, {useState} from "react";
import FriendSettingComponent from "../../../component/app/setting/FriendSetting";
import {useQuery} from "react-query";
import {selectBlockFriendList} from "../../../lib/api/friend";
import ErrorHandler from "../../handler/ErrorHandler";
import {useInsertFriend} from "../../../lib/query";
import {openPopup} from "../../../modules/popup";
import style from "../../../css/MainPage.module.css";
import {useDispatch} from "react-redux";

export const queryName = "blockFriendList"

const FriendSetting = () => {
    const dispatch = useDispatch()
    const [isMore, setMore] = useState(false)
    const {data, isLoading, isError, error} = useQuery(queryName, async ()  => selectBlockFriendList())
    const {mutate} = useInsertFriend()

    if(isError) {
        return <ErrorHandler error={error} path={"/app"}/>
    }

    if(isLoading) {
        return <div></div>
    }

    const onClick = () => {
        setMore(!isMore)
    }
    const noneBlockFriend = (id) => {
        const action = openPopup({
            element: (<>
                <header className={style.center}>
                    차단을 해제하겠습니까?
                </header>
                <div className={style.info} style={{width:'300px'}}></div>
            </>),
            submit: () => {
                mutate({
                    id,
                    type: 'email'
                })

                return true
            }
        })

        dispatch(action)
    }

    return <FriendSettingComponent isMore={isMore} onClick={onClick} data={data.data.data} noneBlockFriend={noneBlockFriend}/>
}

export default FriendSetting