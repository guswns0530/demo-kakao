import {Navigate} from 'react-router-dom'

const PrivateRoute = ({children, redirectPath, isAllowed}) => {
    if(!isAllowed) {
        return <Navigate to={redirectPath} replace />
    }

    return children
}

export default PrivateRoute
