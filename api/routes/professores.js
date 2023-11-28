import express from "express";
import { getProfessores } from "../controllers/professoresController.js"

const professoresRouter = express.Router()

professoresRouter.get("/", getProfessores)

export default professoresRouter