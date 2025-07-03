import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Mainlayout from './mainlayout/mainlayout.jsx'
import Mainpage from './routes/mainpage.jsx'
import Singlepage from './routes/singlepage.jsx'
import Register from './routes/register.jsx'
import About from './routes/About.jsx'
import Login from './routes/login.jsx'


const router=createBrowserRouter([
  {
    path:'/',element:<Mainlayout/>,
    children:[
      {
        path:"/",element:<Mainpage/>
      },{
        path:"/:slug",element:<Singlepage/>
      },{
        path:"/login",element:<Login/>
      },{
        path:"/register",element:<Register/>
      },{
        path:"/about",element:<About/>
      }
    ]
  }

])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    
  </StrictMode>,
)
