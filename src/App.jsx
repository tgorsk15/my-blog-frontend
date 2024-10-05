import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Root } from './Pages/Root/Root'


function App() {
  // const [count, setCount] = useState(0)
  const routes = [
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Profile />,
          errorElement: <Error />,
          children: [
            {
              path: "login",
              element: <Login />,

            },
            {
              path: "signup",
              element: <Signup />
            }
          ]
        },
      ]
    }
    
  ]

  // start building the route sytem out, AFTER creating the shells of
  // the needed components... so thta thye can be linked/referenced to here

  return (
  <></>
  )
}

export default App
