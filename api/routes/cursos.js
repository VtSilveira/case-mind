import express from "express";
import { getCursos, addCurso, updateCurso, deleteCurso, getCursosPorProfessor, changeVisibility } from "../controllers/cursosController.js"
import { autenticacao } from "../middlewares/auth.js"
import { acesso } from "../middlewares/admin.js"

const cursosRouter = express.Router()

cursosRouter.get("/", acesso, getCursos)

cursosRouter.get("/professor", autenticacao, getCursosPorProfessor)

cursosRouter.post("/", autenticacao, addCurso)

cursosRouter.put("/:id", updateCurso)

cursosRouter.put("/visibilidade/:id", changeVisibility)

cursosRouter.delete("/:id", deleteCurso)

export default cursosRouter