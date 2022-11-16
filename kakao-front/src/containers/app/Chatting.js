import React, {useEffect, useRef, useState} from "react";
import ChattingComponent from "../../component/app/Chatting";
import {useContextMenu} from "react-contexify";

const Chatting = () => {
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


    const onClick = (e) => {
        e.preventDefault()
        setOpen(!isOpen)
    }
    const onScroll = () => {
        hideAll()
    }

    return <ChattingComponent header={header} section={section} onClick={onClick} onScroll={onScroll} isOpen={isOpen}/>
}

export default Chatting