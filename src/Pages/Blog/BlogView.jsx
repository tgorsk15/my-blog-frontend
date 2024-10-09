import { useLoaderData } from "react-router-dom"

export const BlogView = () => {
    const post = useLoaderData();
    console.log('here is the loaded post', post)


    return (
        <div>
            hi BlogView
        </div>
    )
}