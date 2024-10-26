import { useState, useMemo } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Navigate, redirect } from 'react-router-dom';
import { createRoutes } from './routes';
import { useAuth } from './utils/useAuth';

import { Root } from './Pages/Root/Root'
import { Profile } from './Pages/Profile/Profile'
import { Login } from './Pages/Login/Login'
import { SignUp } from './Pages/Signup/Signup'
import { Error } from './Pages/ErrorPage/Error'
import { Home } from './Pages/Home/Home'
import { BlogView } from './Pages/Blog/BlogView'
import { BlogDash } from './Pages/BlogDash/BlogDash'
import { CreateBlog } from './Pages/CreateBlog/CreateBlog'
import { EditBlog } from './Pages/EditBlog/EditBlog';

import { getPublicPosts, getSinglePost, getAllPosts } from './utils/loaders';

// function AppRoutes() {
  
//   const routes = createRoutes(userData, logout);
//   return useRoutes(routes)
// }


function App() {
  const { logout, userData } = useAuth();
  const [currentUser, changeUser] = useState(userData)

  // const router = useMemo(() => 
  //   createBrowserRouter(createRoutes(userData, logout)),
  //   [userData, logout]
  // );

  // return (
  //   <>
  //     <RouterProvider router={router} />
  //   </>
  // )

  // const { logout, userData } = useAuth();
  // // const userData = JSON.parse(localStorage.getItem('user'))
  // console.log('user data in App:', userData)

  console.log('re-rendering App')
  const routes = [
    {
      path: "/",
      element: <Root />,
      id: "root",
      // errorElement: <Error />,
      children: [
        {
          index: true, 
          element: currentUser ? <Navigate to="/home" replace /> : <Navigate to="/profile" replace />
          // loader: () => {
          //   return currentUser ? redirect('/home') : redirect('/profile')
          // }
        },
        {
          path: "profile",
          element: <Profile />,
          // errorElement: <Error />,

          children: [
            {
              path: "login",
              element: <Login 
                changeUser={changeUser}
              />,
            },
            {
              path: "signup",
              element: <SignUp />
            }
          ]
        },
        {
          path: "home",
          id: "homeData",
          element: <Home />,
          loader: () => getPublicPosts({ logout })
        },
        {
          path: "viewBlog/:postId",
          element: <BlogView />,
          loader: ({ params }) => getSinglePost({ params, logout })
        },
        {
          path: "blogDash",
          element: <BlogDash />,
          loader: () => getAllPosts({ logout })
        },
        {
          path: "createBlog",
          element: <CreateBlog />
        },
        {
          path: "editBlog/:postId",
          element: <EditBlog />,
          loader: ({ params }) => getSinglePost({ params, logout })
        }
      ]
    }
    
  ]
  const router = createBrowserRouter(routes)

  return (
  <>
    <RouterProvider router={router} />
  </>
  )

  
}

export default App
