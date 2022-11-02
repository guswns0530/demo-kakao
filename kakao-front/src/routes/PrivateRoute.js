import {Navigate, useLocation} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {setRedirectPath} from "../modules/auth";

const notSavePath = ['/login', '/register']

const PrivateRoute = ({children, redirectPath, isAllowed}) => {
    const dispatch = useDispatch()
    const location = useLocation()

    const {pathname} = location

    if(!isAllowed) {
        if(notSavePath.indexOf(pathname) < 0) {
            dispatch(setRedirectPath(pathname))
        }
        return <Navigate to={redirectPath} replace />
    }

    return children
}

export default PrivateRoute
