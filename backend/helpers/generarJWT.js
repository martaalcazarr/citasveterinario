import jwt from "jsonwebtoken";

const generarJWT = (id) => {
    //.sing para crear un nuevo jwt, y le paso un objeto({nombre, la secretkey, cuando expira})
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
}

export default generarJWT;