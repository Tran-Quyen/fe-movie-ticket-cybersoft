import React from 'react'
import {Route, Redirect} from "react-router-dom";
import NavBar from "../Components/Admin/NavigationAdminTemplate";
import SideBar from "../Components/Admin/TableandSideBar/Sidebar"
const AdminLayout =(props)=>{
    return (
      
      <div id="wrapper">
      <NavBar /> 
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
       
        <div id="content">
        {props.children}
        </div>
        </div>

    </div>)
}
export default function AdminTemplate({Component,component,...props}) {
   return (<Route 
       {...props}
       render ={(propsComponent)=>{
         if( localStorage.getItem("UserAdmin")){
             return( 
            <AdminLayout>
            <Component {...propsComponent}  />
           </AdminLayout>
           )
         }
         else{
           return  <Redirect to="/admin" />
         }
       }
       }
   />
   );
}
