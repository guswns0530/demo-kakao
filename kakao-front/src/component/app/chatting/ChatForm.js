import React from "react";
import style from "../../../css/MainPage.module.css";

const ChatForm = ({inputRef, onChange, input, onSubmit, isLoading, onKeyDown, block}) => {
    return <form onSubmit={onSubmit} onKeyDown={onKeyDown}>
            <textarea ref={inputRef} onChange={onChange} value={input} disabled={block} placeholder={block ? '차단친구와는 대화가 불가능합니다.' : ''}></textarea>
            <button className={isLoading || input.trim() === '' ? style.disable : style.able}>전송</button>
        </form>
}

export default ChatForm