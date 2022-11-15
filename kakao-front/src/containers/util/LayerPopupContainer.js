import React from "react";
import LayerPopup from "../../component/util/LayerPopup";
import {useDispatch, useSelector} from "react-redux";
import {closePopup} from "../../modules/popup";


const LayerPopupContainer = () => {
    const dispatch = useDispatch()
    const {popup: {isOpen, element, submit}} = useSelector(({popup}) => ({
        popup: popup
    }))

    if(!isOpen) {
        return undefined
    }

    const onClose = () => {
        dispatch(closePopup())
    }

    const onSubmit = () => {
        if(submit && submit()) {
            onClose()
        }
    }

    return <LayerPopup onClose={onClose} onSubmit={onSubmit}>
        {element}
    </LayerPopup>
}

export default LayerPopupContainer