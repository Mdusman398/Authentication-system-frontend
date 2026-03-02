import api from "@/pages/api/api"
import { createContext, useContext, useState, useEffect, useRef } from "react"

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const hasFetched = useRef(false)

    useEffect(() => {
        if (hasFetched.current) return
        hasFetched.current = true

        const fetchUser = async () => {
            try {
                const res = await api.get("/me")
                if (res.data.success) setUser(res.data.user)
                else setUser(null)
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export const getData = () => useContext(UserContext)