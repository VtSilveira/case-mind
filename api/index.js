import express from "express";
import professoresRoutes from "./routes/professores.js"
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/professores", professoresRoutes);

// app.get("/professores", async function(rec, res){
//   return res.status(200).json( {
//     teste:
//   })
// })

console.log(app._router.stack);

app.listen(8800);