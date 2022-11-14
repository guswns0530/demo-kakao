import React, {useState} from "react";
import ProfilePopupComponent from "../../../component/app/popup/ProfilePopup";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {selectUserToId} from "../../../lib/api/user";
import {useSelector} from "react-redux";
import ErrorHandler from "../../handler/ErrorHandler";
import {useInsertFriend} from "../../../lib/query";

export const queryName = "selectUserToId"

const ProfilePopup = () => {
    const {id} = useParams()
    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery([queryName, id], async () => selectUserToId(id), {
        suspense: false,
        useErrorBoundary: false,
        retry: false,
    })
    const navigate = useNavigate()
    const {user} = useSelector(({user}) => ({
        user: user.user
    }))
    const {mutate, isLoading: isInsertLoading, isError: isInsertError, error: insertError} = useInsertFriend()
    const [{x, y}, setPosition] = useState({x: 0, y: 0})


    const onInsertFriend = () => mutate({id, type: 'id'});
    const onClose = () => {
        navigate("/app")
    }
    const trackPos = (e, data) => {
        if (x < 0 || y < 0) {
            e.preventDefault()
            return
        }
        setPosition({x: data.x, y: data.y})
    }

    if (isError) {
        return <ErrorHandler error={error} path={"/app"}/>
    }

    if (isInsertError) {
        return <ErrorHandler error={insertError} path={"/app"}/>
    }

    const resource = data?.data?.data

    const isMe = user?.id === resource?.id
    const isFriend = resource?.friend_status === "FRIEND";

    const button = ((isMe, isFriend) => {
        if(isLoading || isInsertLoading) {
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            return <a>
                <i className="material-icons">refresh</i>
                <span>로딩중..</span>
            </a>
        }
        if (isMe) {
            return (<Link to={"/app"}>
                <i className="material-icons">edit</i>
                <span>프로필 관리</span>
            </Link>)
        }

        if (isFriend) {
            return (<Link to={"/app"}>
                <i className="material-icons">chat_bubble</i>
                <span>1:1 채팅</span>
            </Link>)
        }
        if (!isFriend && !isMe) {
            return (
                < Link onClick={onInsertFriend}>
                    <i className="material-icons">person_add</i>
                    <span>친구 추가</span>
                </Link>
            )
        }
    })(isMe, isFriend)


    return (
        <ProfilePopupComponent resource={resource} onClose={onClose} button={button} trackPos={trackPos}
                               isLoading={isInsertLoading || isLoading}/>
    )
}


export default ProfilePopup