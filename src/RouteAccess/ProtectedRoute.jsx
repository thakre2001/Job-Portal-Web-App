import { useContext } from "react"
import { UserContext } from "../Components/UserContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children, roles}) => {

    const {user, loading}=useContext(UserContext)

    if(loading){
        return <div>Loading...</div>
    }

    if(!user){
        return <Navigate to="/page/login" replace />
    }

    if(roles && !roles.includes(user.role) ){
        return <Navigate to="/page/jobpage" replace />
    }

  return children
}

export default ProtectedRoute
