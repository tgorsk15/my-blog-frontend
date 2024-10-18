import { useLoaderData } from "react-router-dom"

import blogStyles from "./blogEditor.module.css";

export const EditBlog = () => {
    const post = useLoaderData()
    console.log(post)

    // TMW 10/16: start building this out, implement another Editor
    // make sure initial values of the editor are what is already stored in the
    // post
    // ...might be an issue in being able to view the original HTML script inside
    // of the MCE Editor
    // ^^ maybe set up some sort of conditional that checks if editor is in "edit"
    // mode as opposed to "create" mode -> can set up a state variable for this,
    // then pass down as a prop

    function handleSubmitChanges() {

    }

    return (
        <>
            Edit Me
        </>
    )
}