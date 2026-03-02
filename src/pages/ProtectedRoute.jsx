import { getData } from "@/context/userContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const { user } = getData()
    return user?.email ? children : <Navigate to="/Login" />
}

export const GuestRoute = ({ children }) => {
    const { user } = getData()
    return user?.email ? <Navigate to="/" /> : children
}

export default ProtectedRoute