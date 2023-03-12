import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';

import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import PasswordOlvidada from './paginas/PasswordOlvidada';
import NuevaPassword from './paginas/NuevaPassword';
import AdministrarPacientes from './paginas/AdministrarPacientes';

import {AuthProvider}  from './context/AuthProvider';
import {PacientesProvider} from './context/PacientesProvider'

function App() {
  console.log(import.meta.env.VITE_BACKEND_URL)
  return(
    <BrowserRouter>
    <AuthProvider>
    <PacientesProvider>
    <Routes>
      {/*pagina del diseño*/}
      <Route path='/' element={<AuthLayout/>}>
        {/*ruta indice dentro de la pagina del diseño*/}
        <Route index element={<Login/>}/>
        {/*para agregar paginas hijo a la principal*/}
        <Route path='registrar' element={<Registrar/>}/>
        <Route path='password-olvidada' element={<PasswordOlvidada/>}/>
        <Route path='password-olvidada/:token' element={<NuevaPassword/>}/>
        <Route path='confirmar/:id' element={<ConfirmarCuenta/>}/>
      </Route>

      <Route path='/admin' element={<RutaProtegida/>}>
        <Route index element={<AdministrarPacientes/>} />
      </Route>
    </Routes>
    </PacientesProvider>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
