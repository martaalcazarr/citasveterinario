import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from "./config/db.js";
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();
conectarDB();

const dominiosPermitidos = ['http://localhost:4000', process.env.FRONTEND_URL]
//
const corsOptions = {
    origin: function(origin, callback){
        //si el origen está dentro de los dominios permitidos y !== -1 significa que lo encontró
        if(dominiosPermitidos.indexOf(origin) !== -1){
            //el origen del req está permitido
            //null es para el error, y true que si
            callback(null, true)
        }else{
            callback(new Error('No permitido por Cors'))
        }
    }
}
app.use(cors({ origin: '*' }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions))

app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;
//para escuchar desde el puerto 4000
app.listen(PORT, () =>{
    console.log(`Servidor funcionando en el puerto ${PORT}`)
});
