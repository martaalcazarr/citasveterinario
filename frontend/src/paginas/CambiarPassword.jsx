import AdminNav from "../components/AdminNav"

const CambiarPassword = () => {
  return (
    <>
        <AdminNav/>

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Contraseña</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu contraseña {''} 
        <span  className="text-indigo-600 font-bold">
            aquí
        </span>
        </p>
    </>
  )
}

export default CambiarPassword