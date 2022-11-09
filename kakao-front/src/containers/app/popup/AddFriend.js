import React, {useEffect, useState} from "react";
import AddFriendComponent from "../../../component/app/popup/AddFriend"
import {Navigate, useNavigate, useParams} from "react-router-dom";
import { useQuery} from "react-query";
import {selectUserToId, selectUserToEmail} from "../../../lib/api/friend";
import {useSelector} from "react-redux";

const AddFriend = () => {
    const {type} = useParams()
    const navigate = useNavigate()
    const matchType = ['id', 'email']
    const typeLength = {id: 20, email: 40}
    const [id, setId] = useState('');
    const {user} = useSelector(({user}) => ({
        user: user.user
    }))
    const {isLoadingSearch, data, error, refetch} = useQuery(["selectUser", type, id], async () => {
        if(type === matchType[0]) {
            return selectUserToId(id)
        }

        if(type === matchType[1]) {
            return selectUserToEmail(id)
        }

    }, {
        enabled: false,
        suspense: false,
    })
    // const {isLoading: isLoadingInsertFriend, datafriendData, friendError, } = useMutation();

    useEffect(() => {
        setId('')
    }, [type]);


    if(!type) {
        return <Navigate to={"/app/add-friend/id"} />
    }
    if(matchType.indexOf(type) < 0) {
        return <Navigate to={"/app/add-friend/id"} />
    }

    const onClose = () => {
        navigate("/app")
    }

    const onChange = (e) => {
        const {target: {value}} = e

        if(value.length <= typeLength[type]) {
            setId(e.target.value)
        }
    }

    const onClick = (e) => {
        e.preventDefault()
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(!id.trim()) {
            return
        }

        refetch()
    }

    return <AddFriendComponent onClose={onClose} onChange={onChange} id={id} onSubmit={onSubmit} isLoadingSearch={isLoadingSearch} data={data} error={error} onClick={onClick} user={user}/>
}

export default AddFriend