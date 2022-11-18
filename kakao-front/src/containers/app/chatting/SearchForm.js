import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeField} from "../../../modules/form";
import SearchFormComponent from "../../../component/app/SearchForm";

const SearchForm = ({onClick}) => {
    const dispatch = useDispatch();
    const {form} = useSelector(({form}) => ({
        form: form,
    }))

    const onChange = e => {
        const {value, name} = e.target
        dispatch(
            changeField({
                form: 'chatting',
                key: name,
                value
            })
        )
    }

    const onClose = () => {
        dispatch(changeField({
            form: 'chatting',
            key: 'search',
            value: ''
        }))
        onClick()
    }

    useEffect(() => {
        dispatch(changeField({
            form: 'chatting',
            key: 'search',
            value: ''
        }))
    }, [dispatch]);

    return <SearchFormComponent onChange={onChange} onClick={onClick} value={form.chatting.search.value} onClose={onClose}/>
}

export default SearchForm