import jwt from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js';

const checkAuth = async (req, res, next) => {
    let token;
    //para acceder al bearer token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //para eliminar el bearer antes del token
            token = req.headers.authorization.split(" ")[1];
            //para obtener lo que dice el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //con select para no traerme todo el objeto
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado")
            //para que vaya al siguiente middleware
            return next();
        } catch (error) {
            const e = new Error('Token no válido');
            res.status(403).json({msg:e.message})
        }
    }
    //si no está el token
    if(!token){
        const error = new Error('Token no válido o inexistente')
        res.status(403).json({msg: error.message})
    }
    
    next();
}

export default checkAuth;