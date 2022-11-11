import React from "react";
import ProfilePopupComponent from "../../../component/app/popup/ProfilePopup";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "react-query";
import {selectUserToId} from "../../../lib/api/user";
import {useSelector} from "react-redux";
import ErrorHandler from "../../handler/ErrorHandler";
import {insertFriendToId} from "../../../lib/api/friend";
import queryClient from "../../../services/queryClient";
import {queryName as friendInfoQueryName} from "../friend/FriendInfo";
import {queryName as recommendFriendInfoQueryName} from "../friend/RecommendFriendInfo";

const ProfilePopup = () => {
    const {id} = useParams()
    const {
        data,
        isLoading,
        isError,
        error,
        refetch
    } = useQuery(["selectUserToId", id], async () => selectUserToId(id), {
        suspense: false,
        useErrorBoundary: false,
        retry: false,
    })
    const navigate = useNavigate()
    const {user} = useSelector(({user}) => ({
        user: user.user
    }))
    const {mutate, isLoading: isInsertLoading, isError: isInsertError, error: insertError} = useMutation(async () => {
        return insertFriendToId(id)
    }, {
        onSuccess: async (data) => {
            await refetch()

            await queryClient.refetchQueries(friendInfoQueryName)
            await queryClient.refetchQueries(recommendFriendInfoQueryName)
        }
    })


    if (isLoading || isInsertLoading) {
        return <div></div>
    }

    if (isError) {
        return <ErrorHandler error={error} path={"/app"}/>
    }
    if (isInsertError) {
        return <ErrorHandler error={insertError} path={"/app"}/>
    }

    const onInsertFriend = () => mutate();
    const onClose = () => {
        navigate("/app")
    }

    const resource = data.data.data

    const isMe = user?.id === resource?.id
    const isFriend = resource?.friend_status === "FRIEND";

    const button = ((isMe, isFriend) => {
        if (isMe) {
            return (<Link to={"/app"}>
                <i className="material-icons">edit</i>
                <span>프로필 관리</span>
            </Link>)
        }

        if (isFriend) {
            return (<Link to={"/app"} >
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

    return <ProfilePopupComponent resource={resource} onClose={onClose} button={button}/>
}


export default ProfilePopup