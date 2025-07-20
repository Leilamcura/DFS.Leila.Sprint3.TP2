// Define los endpoints y mapea cada uno a su respectivo controlador
// Define las rutas necesarias para cada operación del controlador

import express from 'express';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    crearSuperheroeController,
    editarSuperheroeController,
    eliminarSuperheroePorIdController,
    eliminarSuperheroePorNombreController
} from '../controllers/superheroesController.mjs';

// Para cumplir con los requerimientos del Sprint3 TP2 validar y sanitizar
import { heroesValidationRules } from "../middlewares/validationRules.mjs";
import { heroesHandleValidationErrors } from "../middlewares/errorMiddleware.mjs";

const router = express.Router();

router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller); 
router.get('/heroes/:id', obtenerSuperheroePorIdController); 
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);  
router.get('/heroes', obtenerTodosLosSuperheroesController);

// Agregado de middlewares de validacion y manejo de errores solicitados en Trello para Sp3TP2
router.post('/heroes', heroesValidationRules(), heroesHandleValidationErrors, crearSuperheroeController);
router.put('/heroes/editar/:nombreSuperheroe', heroesValidationRules(), heroesHandleValidationErrors, editarSuperheroeController);
// --

router.delete('/heroes/eliminar/:id', eliminarSuperheroePorIdController);
router.delete('/heroes/eliminar-nombre/:nombreSuperheroe', eliminarSuperheroePorNombreController);

export default router;


