import React, {useState} from "react";
import styled from "styled-components";

const Body = styled.div`
`

const LayerPopup = ({children, initX = 0, initY = 0}) => {
    const [x, setX] = useState(initX)
    const [y, setY] = useState(initY)
    const [isMove, setMove] = useState(false)
    let clickX, clickY

    const mouseDown =  (e) => {
        if (!(e.target === eventTarget || e.target === header)) return
        setMove(true)

        const { offsetX, offsetY } = e

        clickX = offsetX
        clickY = offsetY

        if (e.target === header) {
            clickX += 15
            clickY += 15
        }
    }

    const mouseUp = (e) => {
        setMove(false)
        clickX = 0
        clickY = 0
    }

    const mousemove = (e) => {
        if (!isMove) return

        const { clientX, clientY } = e

        this.popup.style.left = clientX - clickX + 'px'
        this.popup.style.top = clientY - clickY + 'px'
    }


    return children
}

export default LayerPopup

