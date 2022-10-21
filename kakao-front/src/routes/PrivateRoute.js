import {Navigate} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux";
import {check} from "../modules/user";
import {useEffect} from "react";

const PrivateRoute = ({children, isLogin}) => {
    const dispatch = useDispatch()
    const {auth, user, checkError} = useSelector(({auth, user}) => ({
        auth: auth.auth,
        user: user.user,
        checkError: user.checkError
    }))



    // useEffect(() => {
    //     if (!user) {
    //         dispatch(check())
    //     }
    // })
    //
    // useEffect(() => {
    //     if (checkError) {
    //         console.log(checkError)
    //
    //         return <Navigate to={"/login"}/>
    //     }
    // }, [dispatch, user, checkError])

    if(isLogin) {
        return children
    }

    return children
}

export default PrivateRoute
