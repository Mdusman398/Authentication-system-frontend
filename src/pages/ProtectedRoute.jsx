import { getData } from "@/context/userContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const { user, loading } = getData()
    
    if (loading) return null  // loading mein kuch mat karo
    
    return user ? children : <Navigate to="/Login" replace />
}

export const GuestRoute = ({ children }) => {
    const { user, loading } = getData()
    
    if (loading) return null  // loading mein kuch mat karo
    
    return user ? <Navigate to="/" replace /> : children
}

export default ProtectedRoute