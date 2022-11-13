import React, {useEffect, useRef, useState} from "react";
import FriendComponent from "../../component/app/Friend";
import {useContextMenu} from "react-contexify";

const Friend = () => {
    const [isOpen, setOpen] = useState(false)
    const header = useRef()
    const section = useRef()
    const {hideAll} = useContextMenu()

    useEffect(() => {
        if (header) {
            const {clientHeight} = header.current

            section.current.style.marginTop = clientHeight + 'px'
            section.current.style.height = `calc(100% - ${clientHeight}px)`
        }
    }, [header, section, isOpen])


    const onClick = () => setOpen(!isOpen)
    const onScroll = () => {
        hideAll()
    }

    return <FriendComponent header={header} section={section} onClick={onClick} onScroll={onScroll} isOpen={isOpen}/>
}

export default Friend