import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import PasswordOlvidada from './paginas/PasswordOlvidada';

function App() {
  console.log(import.meta.env.VITE_BACKEND_URL)
  return(
    <BrowserRouter>
    <Routes>
      {/*pagina del diseño*/}
      <Route path='/' element={<AuthLayout/>}>
        {/*ruta indice dentro de la pagina del diseño*/}
        <Route index element={<Login/>}/>
        {/*para agregar paginas hijo a la principal*/}
        <Route path='registrar' element={<Registrar/>}/>
        <Route path='password-olvidada' element={<PasswordOlvidada/>}/>
        <Route path='confirmar/:id' element={<ConfirmarCuenta/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
