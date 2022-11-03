import {useLocation, Navigate} from 'react-router-dom'

const PrivateRoute = ({children, redirectPath, isAllowed}) => {
    const {pathname} = useLocation()

    if (!isAllowed) {
        return <Navigate to={redirectPath} state={pathname} />
    }

    return children
}

export default PrivateRoute
