import express from "express";
import professoresRoutes from "./routes/professores.js"
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/professores", professoresRoutes);

app.listen(8800);