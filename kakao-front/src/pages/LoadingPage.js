import React from "react";
import styled from "styled-components";
import spinner from "../assets/spinner.png"

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #f1d900; 
`

const SpinnerDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    width: 600px;
    height: 300px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    @keyframes spinner {
        from {
            transform: rotate(0deg); 
        }
        to {
            transform: rotate(-360deg);
        }
    }
    
    & > img {
        margin-top: -75px;
        animation: spinner 1s ease infinite;
        transform-origin: center;
        width: 150px;
        height: 150px;
        background-color: transparent;
    }
`

const LoadingPage = () => {
    return <ContainerDiv>
        <SpinnerDiv>
            <img alt={"spinner"} src={spinner}/>
        </SpinnerDiv>
    </ContainerDiv>
}

export default LoadingPage