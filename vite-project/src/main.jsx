import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import {lazy, Suspense} from 'react'

const Homepage = lazy(()=>import('./components/Homepage.jsx'));
const Videopage = lazy(()=> import('./components/Videopage.jsx'))
const Error = lazy(()=>import('./components/Error.jsx'))
const Createuser = lazy(()=> import('./components/Createuser.jsx'))
const Channelpage = lazy(()=> import('./components/Channelpage.jsx'))
const Loginuser = lazy(()=>import('./components/Loginuser.jsx'))
const Channelform = lazy(()=>import('./components/Channelform.jsx'))
const Createvideo = lazy(()=> import('./components/Createvideo.jsx'))
const Editvideodetails =lazy(()=>import('./components/Editvideodetails.jsx'));


const appRouter = createBrowserRouter([{
  path:'/',
  element:<App/>,
  errorElement:<Error/>,
  children:[
    {
      path:'/',
      element:(
        <Suspense fallback={null}>
          <Homepage/>
        </Suspense>
      ),
      errorElement:<Error/>,
    },{
      path:'/videos/:id',
      element:(
        <Suspense fallback={null}>
          <Videopage/>
        </Suspense>
      ),
      errorElement:<Error/>,
    },{
      path:'/user',
      element:(
        <Suspense fallback={null}>
          <Createuser/>
        </Suspense>
      ),
      errorElement:<Error/>,
    },{
      path:'/channelpage/:channelId',
      element:(
        <Suspense fallback={null}>
          <Channelpage/>
        </Suspense>
      ),
      errorElement:<Error/>,
    },{
      path:'/login',  
      element:(
        <Suspense fallback={null}>
           <Loginuser/>
        </Suspense>
      ),
      errorElement:<Error/>,
    },{
      path:'/channelform',
      element:(
        <Suspense fallback={null}>
          <Channelform/>
        </Suspense>
      )
    },{
      path:'/videoform',
      element:(
        <Suspense fallback={null}>
          <Createvideo/>
        </Suspense>
      )
    },{
      path:'/videoform/:id',
      element:(
        <Suspense fallback={null}>
          <Editvideodetails/>
        </Suspense>
      )
    }
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
  </StrictMode>,
)
