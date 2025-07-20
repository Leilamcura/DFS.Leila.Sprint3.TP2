import { body } from "express-validator";

export const heroesValidationRules = () => [
  body("nombreSuperHeroe")
    .notEmpty()
    .withMessage("El nombre del superheroe es requerido, no puede estar vacío")
    .trim()
    .isLength({ min: 3 })
    .withMessage("El nombre del superheroe debe tener como mínimo 3 caracteres")
    .isLength({ max: 60 })
    .withMessage(
      "El nombre del superheroe debe tener como máximo 60 caracteres"
    ),
  ,
  body("nombreReal")
    .notEmpty()
    .withMessage("El nombre real es requerido, no puede estar vacío")
    .trim()
    .isLength({ min: 3 })
    .withMessage("El nombre real debe tener como mínimo 3 caracteres")
    .isLength({ max: 60 })
    .withMessage("El nombre real debe tener como máximo 60 caracteres"),
  body("edad")
    .notEmpty()
    .withMessage("La edad es requerida, no puede estar vacía")
    .trim()
    .isInt({ min: 0 })
    .withMessage("La edad debe ser mayor o igual a 0"),
  body("poderes")
    .notEmpty()
    .withMessage("Poder es requerido, no puede estar vacío")
    .isArray({ min: 1 })
    .withMessage("Debe ingresar un array de al menos un poder"),
  body("poderes.*")
    .notEmpty()
    .withMessage("Debe indicar al menos un poder, no puede estar vacío")
    .isLength({ min: 3 })
    .withMessage("El poder debe tener como mínimo 3 caracteres")
    .isLength({ max: 60 })
    .withMessage("El poder debe tener como máximo 60 caracteres")
    .isString()
    .withMessage("El poder debe ser un string (NO: numeros: decimal, entero, fechas,booleanos, arrays, objetos)")
    .trim(),
];
