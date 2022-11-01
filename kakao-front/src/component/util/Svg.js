import React from "react";
import styled from 'styled-components'

const Svg = ({children}) => {
    const Svg = styled.svg`
    `
    return (<svg>
        <foreignObject style={{width: '100%', height: '100%'}}>
            {children}
        </foreignObject>
    </svg>)
}

export default Svg