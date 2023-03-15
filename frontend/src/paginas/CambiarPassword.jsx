import { useState } from "react"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"

const CambiarPassword = () => {
  
  const [alerta, setAlerta] = useState({})

  const handleSubmit = e=> {
    e.preventDefault()
  }

  const {msg} = alerta


  return (
    <>
        <AdminNav/>

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Contraseña</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu contraseña {''} 
        <span  className="text-indigo-600 font-bold">
            aquí
        </span>
        </p>

        <div className="flex justify-center">
          <div className="w-full md:w-1/2 bg-white shadow ronunded-lg p-5">
            {msg && <Alerta alerta={alerta}/>}
            <form
            onSubmit={handleSubmit}
            >
              <div className="my-3">
                <label className="uppercase font-bold text-gray-600">Contraseña actual</label>
                  <input
                  type="text"
                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                  name="nombre"
                  placeholder="Escribe tu contraseña actual"
                 
                  />
              </div>
              <div className="my-3">
                <label className="uppercase font-bold text-gray-600">Nueva contraseña</label>
                  <input
                  type="text"
                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                  name="nombre"
                  placeholder="Escribe tu nueva contraseña"
                 
                  />
              </div>
              <div className="my-3">
                <label className="uppercase font-bold text-gray-600">Repetir nueva contraseña</label>
                  <input
                  type="text"
                  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                  name="nombre"
                  placeholder="Repite tu nueva contraseña"
                 
                  />
              </div>
            
              <input 
                type="submit"
                value="Actualizar contraseña"
                className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
              />
            </form>
          </div>
        </div>
    </>
  )
}

export default CambiarPassword