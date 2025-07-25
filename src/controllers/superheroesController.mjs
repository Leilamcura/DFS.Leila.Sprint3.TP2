// Controlador:gestiona las solicitudes hhtp, llamando a los servicios
// correspondientes y utilizando las vistas para presentar los datos

import {
  obtenerSuperheroePorId,
  obtenerTodosLosSuperheroes,
  buscarSuperheroesPorAtributo,
  obtenerSuperheroesMayoresDe30,
  crearSuperheroeService,
  editarSuperheroeService,
  eliminarSuperheroePorIdService,
  eliminarSuperheroePorNombreService,
} from "../services/superheroesService.mjs";

import {
  renderizarSuperheroe,
  renderizarListasSuperheroes,
} from "../views/responseView.mjs";

export async function obtenerSuperheroePorIdController(req, res) {
  try {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);
    if (!superheroe) {
      return res.status(404).send({ mensaje: "Superheroe no encontrado" });
    }

    const superheroeFormateado = renderizarSuperheroe(superheroe);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al obtener el superheroe",
        error: error.message,
      });
  }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
  try {
    const superheroes = await obtenerTodosLosSuperheroes();

    const superheroesFormateados = renderizarListasSuperheroes(superheroes);
    res.status(200).json(superheroesFormateados);
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al obtener los superheroes",
        error: error.message,
      });
  }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
  try {
    const { atributo, valor } = req.params;
    const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
    if (superheroes.length === 0) {
      return res
        .status(404)
        .send({ mensaje: "No se encontraron superheroes con ese atributo" });
    }

    const superheroesFormateados = renderizarListasSuperheroes(superheroes);
    res.status(200).json(superheroesFormateados);
  } catch (error) {
    res
      .status(500)
      .send({ mensaje: "Error al buscar superheroes", error: error.message });
  }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
  try {
    const superheroes = await obtenerSuperheroesMayoresDe30();
    if (superheroes.length === 0) {
      return res
        .status(404)
        .send({ mensaje: "No se encontraron superheroes mayores de 30 años" });
    }
    const superheroesFormateados = renderizarListasSuperheroes(superheroes);
    res.status(200).json(superheroesFormateados);
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al obtener superheroes mayores de 30",
        error: error.message,
      });
  }
}

// Crear Superheroe

export async function crearSuperheroeController(req, res) {
  try {
    const datos = req.body;
    console.log(
      "Estoy en la capa del controlador, en la funcion crearSuperheroeController y llegó esta informacion: ",
      datos
    );
    const superheroe = await crearSuperheroeService(datos);
    if (superheroe) {
      res.send(renderizarSuperheroe(superheroe));
    } else {
      res.status(400).send({ mensaje: "No se pudo crear el superhéroe" });
    }
  } catch (error) {
    console.error("Error en crear SuperheroeController:", error);
    res.status(500).send({ mensaje: "Error interno del servidor" });
  }
}

// Editar/actualizar superheroe

export async function editarSuperheroeController(req, res) {
  try {
    const { nombreSuperheroe } = req.params;
    const datos = req.body;
    console.log(
      "Estoy en la capa del controlador, en la funcion editarSuperheroeController y llegó esta informacion: ",
      datos
    );
    const superheroe = await editarSuperheroeService(nombreSuperheroe, datos);
    if (superheroe) {
      res.send(renderizarSuperheroe(superheroe));
    } else {
      res.status(400).send({ mensaje: "No se pudo editar el superhéroe" });
    }
  } catch (error) {
    console.error("Error en editarSuperheroeController:", error);
    res.status(500).send({ mensaje: "Error interno del servidor" });
  }
}

// Eliminar Superheroe por ID

export async function eliminarSuperheroePorIdController(req, res) {
  try {
    const { id } = req.params;
    const superheroe = await eliminarSuperheroePorIdService(id);
    if (superheroe) {
      res.send(renderizarSuperheroe(superheroe));
    } else {
      res
        .status(400)
        .send({ mensaje: "No se pudo eliminar el superhéroe por id" });
    }
  } catch (error) {
    console.error("Error en eliminarSuperheroePorIdController:", error);
    res.status(500).send({ mensaje: "Error interno del servidor" });
  }
}

// Eliminar Superheroe por nombre

export async function eliminarSuperheroePorNombreController(req, res) {
  try {
    const { nombreSuperheroe } = req.params;
    const superheroe = await eliminarSuperheroePorNombreService(
      nombreSuperheroe
    );
    if (superheroe) {
      res.send(renderizarSuperheroe(superheroe));
    } else {
      res
        .status(400)
        .send({ mensaje: "No se pudo eliminar el superhéroe por nombre" });
    }
  } catch (error) {
    console.error("Error en eliminarSuperheroePorNombreController:", error);
    res.status(500).send({ mensaje: "Error interno del servidor" });
  }
}
