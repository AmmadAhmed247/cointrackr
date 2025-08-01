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
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient=new QueryClient();
import axios from "axios";

axios.defaults.withCredentials = true;

const router=createBrowserRouter([
  {
    element:<Mainlayout/>,
    children:[
      {
        path:"/",element:<Mainpage/>
      },{
        path:"/register",element:<Register/>
      },{
        path:"/about",element:<About/>
      },{
        path:"/coins/:slug",element:<Singlepage/>
      },
      
    ]
  }

])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <ToastContainer position="bottom-right" autoClose={3000} />
    <RouterProvider router={router}/>
    </QueryClientProvider >
  </StrictMode>,
)
