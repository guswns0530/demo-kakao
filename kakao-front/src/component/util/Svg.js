import React from "react";
import styled from 'styled-components'

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;

  & > foreignObject {
    display: inline;
    width: 100%;
    height: 100%;
  }

  & > foreignObject img {
    background-color: ${(props) => props.color};
    width: 100%;
    height: 100%;
  }
`

const Svg = ({children, backgroundColor}) => {
    return ( <StyledSvg color={backgroundColor}>
        <foreignObject>
            {children}
        </foreignObject>
    </StyledSvg> )
}

export default Svg