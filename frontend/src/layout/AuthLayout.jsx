import React from "react";
import {Outlet} from 'react-router-dom'

const AuthLayout = () =>{
    return (
        <>
        
        <main className="container mx-auto md:grid grid-cols-2 mt-12 gap-10 p-5 items-center">
        {/*outlet es un espacio reservado para los componentes de los hijos del AuthLayout*/}
        <Outlet/>
        </main>
        </>
    );
}

export default AuthLayout;