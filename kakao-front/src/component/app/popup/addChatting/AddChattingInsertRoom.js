import React from "react";
import style from "../../../../css/MainPage.module.css";

const AddChattingInsertRoom = ({onClose, onSubmit, onChange, name, profileImageList, isLoading, roomNamePlaceholder}) => {
    return (
        <div id={style.add_chatting_popup} className={`${style.popup} ${style.focus}`}>
            <div className={style.tab}>
                <div className={style.exit} onClick={onClose}>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <header>그룹채팅방 정보 설정</header>
            <section id={style.add_chatting_second_page}>
                <div className={style.main_image}>
                    <div className={style.image}>
                        {profileImageList}
                    </div>
                </div>
                <div className={style.spp_input}>
                    <input type="text" name={"name"} placeholder={roomNamePlaceholder} disabled={isLoading} value={name} onChange={onChange}/>
                    <span className={style.counter}>0/20</span>
                </div>
                <div className={style.info}>
                    채탱시작 전 설정한 그룹채팅방의 사진과 이름은 다른 모든 대화상대에게도 동일하게 보입니다.
                </div>
                <div className={style.aff_buttons} style={{flex: '0 0 auto'}}>
                    <button onClick={onSubmit} className={isLoading ? style.disable : style.active}>확인</button>
                    <button onClick={onClose}>취소</button>
                </div>
            </section>
        </div>
    )
}

export default AddChattingInsertRoom