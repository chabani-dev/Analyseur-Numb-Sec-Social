import express from "express";
import mongoose from "mongoose";
import Ssn from "./Ssnparser.js";

const app = express();

// Connexion à MongoDB
mongoose
  .connect(
    "mongodb+srv://Dev-chabani:Zarga0703@cluster0.rhrdope.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à la base de données établie"))
  .catch((error) => console.log(error));

async function createSsn(gender, birth, frenchDepartment) {
  try {
    let ssn = await Ssn.create({ gender, birth, frenchDepartment });
    console.log(ssn);
  } catch (err) {
    console.log(err);
  }
}

createSsn("women", new Date("2023-01-01"), 94);

const port = 3000;
app.listen(port || process.env.PORT, () =>
  console.log(`Le serveur tourne bien sur le port ${port}`)
);
