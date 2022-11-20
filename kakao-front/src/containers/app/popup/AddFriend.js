import React, {useCallback, useEffect, useState} from "react";
import AddFriendComponent from "../../../component/app/popup/AddFriend"
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {useSelector} from "react-redux";
import {selectUserToEmail, selectUserToId} from "../../../lib/api/user";
import {toast} from "react-toastify";

import Popup from "../../../component/util/Popup";
import {useInsertFriend} from "../../../lib/query";

const AddFriend = () => {
    const {type} = useParams()
    const navigate = useNavigate()
    const matchType = ['id', 'email']
    const typeLength = {id: 20, email: 40}
    const [id, setId] = useState('');
    const {user} = useSelector(({user}) => ({
        user: user.user
    }))

    const {isLoading: isLoadingSearch, data, error, refetch} = useQuery(["selectUser", type, id], async () => {
        if (type === matchType[0]) {
            return selectUserToId(id)
        }

        if (type === matchType[1]) {
            return selectUserToEmail(id)
        }

    }, {
        enabled: false, suspense: false, useErrorBoundary: false, retry: false,
    })
    const {isLoading: isLoadingInsertFriend, mutate} = useInsertFriend(() => {
        onSubmit()
    }, () => {
        const {response: {data: {data: {error_description}}}} = error

        toast.error(error_description)
    })

    const onSubmit = useCallback((e = {
        preventDefault: () => {
        }
    }) => {
        e.preventDefault()

        if (!id.trim()) {
            return
        }

        refetch().then()
    }, [id, refetch])

    useEffect(() => {
        setId('')
    }, [type]);

    if (!type) {
        return <Navigate to={"/app/add-friend/id"}/>
    }
    if (matchType.indexOf(type) < 0) {
        return <Navigate to={"/app/add-friend/id"}/>
    }

    const onClose = () => {
        navigate("/app")
    }
    const onChange = (e) => {
        const {target: {value}} = e

        if (value.length <= typeLength[type]) {
            setId(e.target.value)
        }
    }
    const onClick = (e) => {
        e.preventDefault()

        mutate({id, type})
        onSubmit({
            preventDefault: () => {
            }
        })
    }

    return (<Popup>
            <AddFriendComponent
                onClose={onClose}
                onChange={onChange}
                id={id}
                onSubmit={onSubmit}
                isLoadingSearch={isLoadingSearch}
                isLoadingInsertFriend={isLoadingInsertFriend}
                data={data}
                error={error}
                onClick={onClick}
                user={user}/>
        </Popup>)
}

export default AddFriend




