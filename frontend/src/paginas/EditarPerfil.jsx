import AdminNav from "../components/AdminNav"

const EditarPerfil = () => {
  return (
    <>
        <AdminNav/>

        <h2 className="font-black text-3xl text-center mt-10">Editar perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu información {''} 
        <span  className="text-indigo-600 font-bold">
            aquí
        </span>
        </p>
        <div className="flex justify-center">
          <div className="w-full md:w-1/2 bg-white shadow ronunded-lg p-5">
            <form>
              <div className="my-3">
                <label className="uppercase font-bold text-gray-600">Nombre</label>
                  <input
                  />
              </div>
            </form>
          </div>
        </div>
    </>
  )
}

export default EditarPerfil