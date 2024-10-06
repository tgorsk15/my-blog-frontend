
export function getEnvVariable() {
    let apiUrl;
    console.log('here is mode:', import.meta.env.MODE)
    if (import.meta.env.MODE === 'development') {
        console.log('in develop route')
        apiUrl = import.meta.env.VITE_DEV_API_URL
    } else {
        apiUrl = import.meta.env.VITE_PROD_API_URL
    }
    return apiUrl
}