import { useContext } from "react"
import { UserContext } from "../Components/UserContext"
import { Navigate } from "react-router-dom"

const PublicRoute = ({children}) => {
    const {user}=useContext(UserContext)

    return user ? <Navigate to="/page/jobpage" replace /> : children;
}

export default PublicRoute
