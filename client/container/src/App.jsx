import React, { lazy, Suspense, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

//import StructureOne from './components/StructureOne'
//import SidebarApp from 'sidebar/SidebarApp'
//import ProductsApp from './components/ProductsApp'
import HeaderApp from 'header/HeaderApp'
import ProfileApp from 'profile/ProfileApp'
import CheckoutApp from 'checkout/CheckoutApp'
import CartApp from 'cart/CartApp'

import { BrowserRouter, useLocation, NavLink, Routes, Route } from 'react-router-dom';
import StructureOne from './components/StructureOne';

const AuthApp = lazy(() => import('./components/AuthApp'))
const ProductsApp = lazy(() => import('./components/ProductsApp'))
const SidebarApp = lazy(() => import('./components/SidebarApp'))

import "./index.scss";

const App = () => {

  const location = useLocation()

  return (
      <div className="">

          

          {
            location.pathname.includes('auth/') ? (
              <Suspense fallback={<div>Loading...</div>}>
                <HeaderApp />
                <AuthApp />
              </Suspense>
            ) :
            <Routes>
              <Route path="/me/profile/settings" element={
                <ProfileApp />
              } />
              <Route path="/new/order" element={
                <CheckoutApp />
              } />
            
              <Route path="*" element={
                <Suspense fallback={<div>loading..</div>}>
              
                  <StructureOne 
                    header={
                 
                      <HeaderApp />
                        
                    }

                    sidebar={                             
                      <SidebarApp />
                    }
                    content={
                      <ProductsApp />
                    }
                  />                              
    
              </Suspense>
              }  />
            </Routes>
          }
          
      </div>
  )
}
ReactDOM.render(
<BrowserRouter>
  <App />
</BrowserRouter>

, document.getElementById("container"));
