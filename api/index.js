import express from "express";
import professoresRoutes from "./routes/professores.js"
import cursosRoutes from "./routes/cursos.js";
import cors from "cors";
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/professores", professoresRoutes);
app.use("/cursos", cursosRoutes);

app.listen(8800);