import express from "express";
import { getProfessores, addProfessor, updateProfessor, deleteProfessor, Login } from "../controllers/professoresController.js"

const professoresRouter = express.Router()

professoresRouter.get("/", getProfessores)

professoresRouter.post("/", addProfessor)

professoresRouter.put("/:id", updateProfessor)

professoresRouter.delete("/:id", deleteProfessor)

professoresRouter.post("/Login", Login)

export default professoresRouter