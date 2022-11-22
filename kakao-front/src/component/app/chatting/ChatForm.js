import React from "react";
import style from "../../../css/MainPage.module.css";

const ChatForm = ({inputRef, onChange, input, onSubmit, isLoading, onKeyDown}) => {
    return <form onSubmit={onSubmit} onKeyDown={onKeyDown}>
            <textarea ref={inputRef} onChange={onChange} value={input}></textarea>
            <button className={isLoading || input.trim() === '' ? style.disable : style.able}>전송</button>
        </form>
}

export default ChatForm