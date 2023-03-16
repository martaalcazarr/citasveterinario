import express from "express";
import {registrar, perfil, confirmar, autenticar, passwordOlvidada, comprobarToken, nuevoPassword, actualizarPerfil, actualizarPassword}  from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';
const router = express.Router();

//rutas públicas
router.post('/', registrar);
//con express puedo agregar un parámetro dinámico con /:
router.get('/confirmar/:token', confirmar);

router.post('/login', autenticar);

//para validar el email del usuario
router.post('/password-olvidada', passwordOlvidada);
//para leer el token
router.get('/password-olvidada/:token', comprobarToken);
//para almacenar el nuevo password
router.post('/password-olvidada/:token', nuevoPassword);
//también se puede hacer en modo chain
//router.route('/password-olvidada/:token/).get(comprobarToken).post(nuevoPassword);

//rutas privadas
router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil)
router.put('/actualizar-password', checkAuth, actualizarPassword)

export default router;