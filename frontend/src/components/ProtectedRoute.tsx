/// Wrapper for a protected route, we need auth token before accessin route
import { useState, useEffect, ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"

interface ProtectedRouteProps {
    children: ReactNode;
}

interface DecodedToken {
    exp: number;
}

function ProtectedRoute({ children } : ProtectedRouteProps) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

    useEffect(() => {
        const auth = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN)
            if (!token) {
                setIsAuthorized(false)
                return
            }
            const decoded : DecodedToken = jwtDecode(token)
            const tokenExpiration = decoded.exp
            const now = Date.now() / 1000
    
            if (tokenExpiration < now) {
                await refreshToken()
            } else {
                setIsAuthorized(true)
            }
    
        }
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children: <Navigate to="/login" />
}