import React from "react";
import styled from "styled-components";
import style from "../../css/MainPage.module.css";

const PopupStyled = styled.div`
    width: 100%;
    height: 100%;

    position: fixed;
    top: 0;
    left: 0;

    background-color: rgb(0, 0, 0, 0.2);

    z-index: 6;
    
    & > div {
        position: absolute;
        top: 50%;
        left: 50%;
    
        transform: translate(-50%, -50%);
    }
`

const LayerPopup = ({children, onClose, onSubmit}) => {

    return (
        <PopupStyled>
            <div id={style.layer_popup} className={`${style.popup} ${style.focus}`}>
                <div className={style.tab} onClick={onClose}>
                    <div className={style.exit}>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                {children}
                <div className={style.btns}>
                    <button onClick={onSubmit}>확인</button>
                    <button onClick={onClose}>취소</button>
                </div>
            </div>
        </PopupStyled>
    )
}

export default LayerPopup