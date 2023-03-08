import { useState, useEffect } from "react";
import {useParams, Link} from 'react-router-dom'
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevaPassword = () => {
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordModificada, setPasswordModificada] = useState(false)

    const params = useParams()
    const {token} = params

    useEffect(()=>{
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/password-olvidada/${token}`)
                setAlerta({
                    msg: 'Coloca tu nueva contraseña'
                })
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error con el enlace',
                    error: true
                })
            }
        }
        comprobarToken()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password.length < 6){
            setAlerta({
            msg: 'La contraseña debe tener más de 6 carácteres',
            error: true
            })
            return
        }
        try {
            const url = `/veterinarios/password-olvidada/${token}`
            const {data} = await clienteAxios.post(url, {password})
            console.log(data)
            setAlerta({
                msg: data.msg
            })
            setPasswordModificada(true)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const {msg} = alerta

    return(
        <>
         <div>
            <h1 className="text-indigo-600 font-black text-6xl">Restablece tu contraseña y no pierdas acceso a tus {""} <span className="text-black">pacientes</span></h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            {msg && <Alerta 
            alerta={alerta}/>} 
            {tokenValido && (
                <>
            <form onSubmit={handleSubmit}>
            
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Nueva Contraseña
                    </label>
                    <input 
                    type="password"
                    placeholder="Tu nueva contraseña"
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                </div>
                       
                <input 
                type="submit"
                value="Guardar nueva contraseña"
                className="bg-indigo-700 w-full py-3 px-10 text-center rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                style={{textAlign: 'center'}}
                />
               
            </form>
              
           
                </>
            )}
            {passwordModificada && 
             <Link className='block text-center my-5 text-gray-500'
             to="/">Iniciar sesión</Link>}
        </div>
        </>
    )
}
export default NuevaPassword;