import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeField} from "../../../modules/form";
import SearchFormComponent from "../../../component/app/friend/SearchForm";

const SearchForm = ({onClick}) => {
    const dispatch = useDispatch();
    const {form} = useSelector(({form}) => ({
        form: form,
    }))

    const onChange = e => {
        const {value, name} = e.target
        dispatch(
            changeField({
                form: 'friend',
                key: name,
                value
            })
        )
    }

    const onClose = () => {
        dispatch(changeField({
            form: 'friend',
            key: 'search',
            value: ''
        }))
        onClick()
    }

    useEffect(() => {
        dispatch(changeField({
            form: 'friend',
            key: 'search',
            value: ''
        }))
    }, [dispatch]);

    return <SearchFormComponent onChange={onChange} onClick={onClick} form={form} onClose={onClose}/>
}

export default SearchForm