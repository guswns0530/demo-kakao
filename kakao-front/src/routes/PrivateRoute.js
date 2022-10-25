import {Navigate} from 'react-router-dom'
import { useSelector} from "react-redux";

const PrivateRoute = ({children, isLogin}) => {
    const {user, checkError} = useSelector(({auth, user}) => ({
        user: user.user,
        checkError: user.checkError
    }))

    if(isLogin) {
        if(user) {
            return children
        }
    } else {
        if(user) {
            return <Navigate to={"/"} />
        }
        return children
    }

    return <Navigate to={"/login"}/>
}

export default PrivateRoute
