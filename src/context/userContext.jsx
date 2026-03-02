import { createContext, useContext, useState, useEffect } from "react"
import api from "@/pages/api/api"

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)  

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/me");
                if (res.data.success) setUser(res.data.user)
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    if (loading) return null

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const getData = () => useContext(UserContext)