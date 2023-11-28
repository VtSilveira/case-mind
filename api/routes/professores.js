import express from "express";
import { getProfessores } from "../controllers/professoresController.js"

const professoresRouter = express.Router()

professoresRouter.get("/professores", async function(rec, res){
  return res.status(200).json( {
    teste: "teste"
  })
})

export default professoresRouter