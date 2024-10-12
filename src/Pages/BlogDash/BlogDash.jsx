import { useLoaderData, useRouteLoaderData } from "react-router-dom"

export const BlogDash = () => {
    const message = useLoaderData()
    console.log(message)
    const publicPosts = useRouteLoaderData("root")
    console.log('prev loaded data', publicPosts)


    return (
        <div>
            Welcome to Dash, Author
        </div>
    )
}