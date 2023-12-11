import Layout from "@/pages/Layout";
import Login from "@/pages/Login";

import  AuthRoute  from '@/components/AuthRoute'

import { createBrowserRouter } from 'react-router-dom'

// import Home from "@/pages/Home";
// import Article from "@/pages/Article";
// import Publish from "@/pages/Publish";

import { lazy, Suspense } from 'react'

const Publish = lazy(() => import("@/pages/Publish"))
const Article = lazy(() => import("@/pages/Article"))
const Home = lazy( ()=>import("@/pages/Home") )

 const router =  createBrowserRouter([
    {
         path: '/',
         element: <AuthRoute><Layout /></AuthRoute>,
         children: [
            {
                 path: 'home',
               
                 element:
                     <Suspense fallback={'加载中'}>
                         <Home/>
                         </Suspense>
             },
             {
                 path: 'article',
                 element:
                 <Suspense fallback={'加载中'}>
                <Article />
                 </Suspense>
             },
             {
                 path: 'publish',
                 element:
                 <Suspense fallback={'加载中'}>
                <Publish/>
                 </Suspense>
             }
         ]
     },
     {
         path: '/login',
         element:<Login></Login>
     }
 ])
    
 export default router