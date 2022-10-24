import {Navigate} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux";

const PublicRoute = ({children, isLogin}) => {
    if(isLogin) {
        return children
    }



    return children
}

export default PublicRoute
