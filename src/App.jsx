import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import { Root } from './Pages/Root/Root'
import { Profile } from './Pages/Profile/Profile'
import { Login } from './Pages/Login/Login'
import { SignUp } from './Pages/Signup/Signup'
import { Error } from './Pages/ErrorPage/Error'
import { Home } from './Pages/Home/Home'
import { BlogView } from './Pages/Blog/BlogView'
import { BlogDash } from './Pages/BlogDash/BlogDash'
import { CreateBlog } from './Pages/CreateBlog/CreateBlog'

import { getPublicPosts } from './utils/loaders';

// TMW 10/7:  just imported the above loader function... place this in the
// "loader" parameter below for Hom. and then try running the DB query

function App() {
  // const [token, setToken] = useSate('')

  const routes = [
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          index: true, 
          element: <Navigate to="/profile" replace />, 
        },
        {
          path: "profile",
          element: <Profile />,
          errorElement: <Error />,

          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "signup",
              element: <SignUp />
            }
          ]
        },
        {
          path: "home",
          element: <Home />,
          loader: getPublicPosts,
          children: [
            {
              path: "viewBlog",
              element: <BlogView />,

            }
          ]
        },
        {
          path: "blogDash",
          element: <BlogDash />,
          children: [
            {
              path: "createBlog",
              element: <CreateBlog />
            }
          ]
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
