import React from "react";
import styled from "styled-components";

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

const Popup = ({children}) => {

    return (<PopupStyled>
        {children}
    </PopupStyled>)
}

export default Popup