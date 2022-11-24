import {createAction, handleActions} from "redux-actions";

export const FRIENDS = "FRIENDS"
export const BLOCK_FRIENDS = "BLOCK_FRIENDS"
export const RECOMMEND_FRIENDS = "RECOMMEND_FRIENDS"

export const friends = createAction(FRIENDS, (payload) => payload)
export const blockFriends = createAction(BLOCK_FRIENDS, (payload) => payload)
export const recommendFriends = createAction(RECOMMEND_FRIENDS, (payload) => payload)

const initialState = {
    friends: [],
    blockFriends: [],
    recommendFriends: []
}

const friend = handleActions({
    [FRIENDS]: (state, {payload: friends}) => {
        return {...state, friends}
    },
    [BLOCK_FRIENDS]: (state, {payload: blockFriends}) => {
        return {...state, blockFriends}
    },
    [RECOMMEND_FRIENDS]: (state, {payload: recommendFriends}) => {
        return {...state, recommendFriends}
    }
}, initialState)

export default friend