import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailPasswordOlvidada from "../helpers/emailPasswordOlvidada.js";

const registrar = async (req, res)=> {
    
    //const {nombre, email, password} = req.body
    //prevenir usuarios duplicados
    const {email, nombre} = req.body;
    //findone para buscar por los diferentes atributos
    const existeUsuario = await Veterinario.findOne({email});
    if(existeUsuario){
        //creo una nueva instancia de error y su argumento se lo doy en mensaje
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({msg: error.message});
    }
    try{
        //guardar nuevo veterinario
        const veterinario = new Veterinario(req.body);
        //.save() es de mongoose
        const veterinarioGuardado = await veterinario.save()
        //enviar email
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        });

        res.json(veterinarioGuardado)
    }catch(error){
        console.log(error)
    }
    
}
const perfil = (req, res) =>{
    const {veterinario} = req
    res.json(veterinario)
}

const confirmar = async (req,res) => {
    //para leer el parámetro dinámico se usa req.params
    const {token} = req.params;
    const usuarioConfirmar = await Veterinario.findOne({token});
    
    //mensje de error si existe usuarioconfirmar
    if(!usuarioConfirmar){
        const error = new Error('Token no válido');
        return res.status(404).json({msg: error.message})
    }
    
    console.log(usuarioConfirmar)
    try {
        //para eliminar el token y cambiar el estado confirmado a true, guardar
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.json({msg: "Usuario confirmado correctamente"});
    } catch (error) {
       console.log(error) 
    }  
}

const autenticar = async (req, res)=>{
    const {email, password} = req.body;
    //comprobar si el usuario existe
    const usuario = await Veterinario.findOne({email});
    if(!usuario){
        const error = new Error('El usuario no existe');
        return res.status(403).json({msg: error.message});
    }
     //comprobar si el usuario está confirmado
     if(!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido validada');
        return res.status(403).json({msg: error.message})
    }
    //revisar el password
    if (await usuario.comprobarPassword(password)){
        console.log(usuario)
        //autenticar
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id)
        });
        console.log("Password correcto")
    }else{
        const error = new Error('El password es incorrecto');
        return res.status(403).json({msg: error.message})
        
    }
    
}

const passwordOlvidada = async (req, res) =>{
    const {email} = req.body
    const existeVeterinario = await Veterinario.findOne({email})
    if(!existeVeterinario){
        const error= new Error('El usuario no existe');
        return res.status(400).json({msg: error.message});
    }
    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        //enviar email con instrucciones
        emailPasswordOlvidada({
            email,
            nombre: existeVeterinario.nombre,
            token: existeVeterinario.token
        });
        res.json({msg: "Se ha enviado un email con las instrucciones para cambiar la contraseña"})
    } catch (error) {
        console.log(error)
        
    }

}
const comprobarToken = async (req, res) =>{
    const {token} = req.params;
    const tokenValido = await Veterinario.findOne({token});
    if(tokenValido){
        //el token es valido, el usuario existe
        res.json({msg: 'Token válido, el usuario existe'})
    }else{
        const error = new Error('Token no válido');
        return res.status(400).json({msg: error.message});
    }
}
const nuevoPassword = async (req, res) =>{
    const {token} = req.params;
    const {password} = req.body; 
    const veterinario = await Veterinario.findOne({token});
    console.log()
    if(!veterinario){
        const error = new Error('Hubo un error');
        res.status(400).json({msg: error.message});
    }
    try {
        //desaparece el token y cambia la contraseña por la actualizada
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({msg: "Password modificado correctamente"});
    } catch (error) {
        console.log(error)
    }
}

const actualizarPerfil = async (req, res) => {
    const veterinario = await Veterinario.findById(req.params.id);
    if(!veterinario){
        const error = new Error('Hubo un error')
        return res.status(400).json({msg: error.message})
    }
    const {email} = req.body
    if(veterinario.email !== req.body.email){
        const existeEmail = await Veterinario.findOne({email})
        if(existeEmail){
            const error = new Error('Este email ya está en uso');
            return res.status(400).json({msg: error.message})
        }
    }
    try {
        veterinario.nombre = req.body.nombre;
        veterinario.email = req.body.email;
        veterinario.web = req.body.web;
        veterinario.telefono = req.body.telefono;

        const veterinarioActualizado = await veterinario.save()
        res.json(veterinarioActualizado)
    } catch (error) {
        console.log(error)
    }
}

const actualizarPassword = async (req, res) =>{
    //leer los datos
    const {id} = req.veterinario
    const {pwd_actual, pwd_nuevo} = req.body

    //comprobar que el vet existe
    const veterinario = await Veterinario.findById(id);
    if(!veterinario){
        const error = new Error('Hubo un error')
        return res.status(400).json({msg: error.message})
    }
    
    //comprobar pass
    if(await veterinario.comprobarPassword(pwd_actual)){
        veterinario.password = pwd_nuevo
        await veterinario.save()
        res.json({msg: 'Contraseña guardada correctamente'})
    }else{
        const error = new Error('La contraseña actual no es correcta')
        return res.status(400).json({msg: error.message})
    }
    //almacenar nuevo pass
}

export {
    registrar, perfil, confirmar, autenticar, passwordOlvidada, comprobarToken, nuevoPassword, actualizarPerfil, actualizarPassword
}