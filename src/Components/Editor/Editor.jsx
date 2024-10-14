import { Editor } from '@tinymce/tinymce-react'

export const PostEditor = () => {

    return (
        <Editor 
            apiKey = {import.meta.env.VITE_TINY_API_KEY}
            init={{
                plugins:[
                    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 
                    'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                content_style: ''
            }}
            
        />
    )
}