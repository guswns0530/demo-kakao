import {useMutation} from "react-query";
import queryClient from "../../services/queryClient";

import {blockFriendToEmail, insertFriendToEmail, insertFriendToId, updateFriendName} from "../api/friend";

import {queryName as myInfoQueryName} from "../../pages/MainPage";
import {queryName as friendInfoQueryName} from "../../containers/app/friend/FriendList";
import {queryName as recommendFriendInfoQueryName} from "../../containers/app/friend/RecommendFriendList";
import {queryName as selectToUserId} from "../../containers/app/popup/ProfilePopup";
import {updateUserToEmail} from "../api/user";

export const useInsertFriend = (onSuccess, onError) => {
    return useMutation(async ({id, type}) => {
        if (type === 'id') {
            return insertFriendToId(id)
        }
        if (type === 'email') {
            return insertFriendToEmail(id)
        }
    }, {
        onSuccess: (async (data) => {
            if (onSuccess) {
                onSuccess(data)
            }
            await queryClient.refetchQueries(selectToUserId)
            await queryClient.refetchQueries(friendInfoQueryName)
            await queryClient.refetchQueries(recommendFriendInfoQueryName)
        }),
        onError: (error) => {
            if (onError) {
                onError(error)
            }
        }
    }, {})
}


export const useBlockFriend = (onSuccess, onError) => {
    return useMutation(async ({email}) => {
        return blockFriendToEmail(email)
    }, {
        onSuccess: (async (data) => {
            if (onSuccess) {
                onSuccess(data)
            }
            await queryClient.refetchQueries(selectToUserId)
            await queryClient.refetchQueries(friendInfoQueryName)
            await queryClient.refetchQueries(recommendFriendInfoQueryName)
        }),
        onError: (error) => {
            if (onError) {
                onError(error)
            }
        }
    })
}

export const useChangeNickname = (onSuccess, onError) => {
    return useMutation(async ({email, name}) => {
        return updateFriendName(email, name)
    }, {
        onSuccess: (async (data) => {
            if (onSuccess) {
                onSuccess(data)
            }
            await queryClient.refetchQueries(selectToUserId)
            await queryClient.refetchQueries(friendInfoQueryName)
        }),
        onError: (error) => {
            if (onError) {
                onError(error)
            }
        }
    })
}

export const useUpdateUser = (onSuccess, onError) => {
    return useMutation(async (data) => {
        return updateUserToEmail(data)
    }, {
        onSuccess: (async (data) => {
            if (onSuccess) {
                onSuccess(data)
            }

            await queryClient.refetchQueries(myInfoQueryName)
        }),
        onError: (error) => {
            if (onError) {
                onError(error)
            }
        }
    })
}