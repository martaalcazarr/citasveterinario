import React from "react";
import {Outlet} from 'react-router-dom'

const AuthLayout = () =>{
    return (
        <>
        <h1>Administrador de pacientes de Veterinario</h1>
        {/*outlet es un espacio para los hijos del AuthLayout*/}
        <Outlet/>
        
        </>
    );
}

export default AuthLayout;