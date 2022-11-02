import React from "react";
import styled from 'styled-components'



const Svg = ({children}) => {
    const StyledSvg = styled.svg`
      width: 100%;
      height: 100%;

      & > foreignObject {
        width: 100%;
        height: 100%;
      }
      
      & div {
        width: 100%;
        height: 100%;
      }

      & > foreignObject img {
        background-color: inherit;
        width: 100%;
        height: 100%;
      }
    `
    return (<StyledSvg>
        <foreignObject>
            {children}
        </foreignObject>
    </StyledSvg>)
}

export default Svg