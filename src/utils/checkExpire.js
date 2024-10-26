import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000;
        if (currentTime > decodedToken.exp) {
            return true
        } else {
            return false
        }
    } catch(err) {
        console.error('Error decoding token:', err)
    }
}