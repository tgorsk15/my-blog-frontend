import { useOutletContext, useNavigate, useLoaderData } from "react-router-dom"
import { useState } from "react"

export const Home = () => {
    const { token } = useOutletContext();
    const postsList = useLoaderData
    console.log(token)

    // call upon useLoaderData to load published posts in

    return (
        <div>
            hi Home
        </div>
    )
}