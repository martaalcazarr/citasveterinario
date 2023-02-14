import mongoose from "mongoose";

const pacienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    propietario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        required:true,
        default: Date.now()
    },
    sintomas:{
        type: String,
        required:true
    },
    //para asignarle un veterinario
    veterinario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinario'
    }
},
{
    //para crear las columnas de editado y creado
    timestamps: true,
});

const Paciente = mongoose.model("Paciente", pacienteSchema);

export default Paciente;