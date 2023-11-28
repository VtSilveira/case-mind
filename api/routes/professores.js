import express from "express";
import { getProfessores, addProfessor, updateProfessor, deleteProfessor } from "../controllers/professoresController.js"

const professoresRouter = express.Router()

professoresRouter.get("/", getProfessores)

professoresRouter.post("/", addProfessor)

professoresRouter.put("/:id", updateProfessor)

professoresRouter.delete("/:id", deleteProfessor)

export default professoresRouter