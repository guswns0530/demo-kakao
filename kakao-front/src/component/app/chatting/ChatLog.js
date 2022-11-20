import React from "react";
import style from "../../../css/MainPage.module.css"

const ChatLog = ({children, chats, content, onScroll}) => {

    return <div className={style.chat_log} ref={content} onScroll={onScroll}>

        {/*{chats.map(chat => {*/}
        {/*    const {chat_id, chat_status, chat_type, content, create_at, email} = chat*/}

        {/*    return (<div className={`${style.chat} ${style.you}`} key={chat_id}>*/}
        {/*        <div className={style.c_pro}>*/}
        {/*            <div className={style.image}>*/}
        {/*                <img src="./image/profile.png" alt=""/>*/}
        {/*            </div>*/}
        {/*            <div className={style.name}>현준</div>*/}
        {/*        </div>*/}
        {/*        <div className={style.chat_block}>*/}
        {/*            <div className={style.chat_content}>*/}
        {/*                <span> {content} </span>*/}
        {/*                <div className={style.chat_info}>*/}
        {/*                    <div className={style.chat_read}>1</div>*/}
        {/*                    <div className={style.chat_data}>오후 5:29</div>*/}
        {/*                </div>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>)*/}
        {/*})}*/}

        {chats?.pages?.map((page, i) => (
            <React.Fragment key={i}>
                {page.result.map((project) => (
                    <p
                        style={{
                            border: '1px solid gray',
                            borderRadius: '5px',
                            padding: '1rem 1rem',
                            background: `hsla(${project.id * 30}, 60%, 80%, 1)`,
                        }}
                        key={project.chat_id}
                    >
                        {project.chat_id}: {project.content}
                    </p>
                ))}
            </React.Fragment>
        ))}

        {children}
    </div>
}

export default ChatLog
