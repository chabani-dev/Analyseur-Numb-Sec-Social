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

Create;
async function createSsn(gender, birth, frenchDepartment) {
  try {
    let ssn = await Ssn.create({ gender, birth, frenchDepartment });
    console.log(ssn);
  } catch (err) {
    console.log(err);
  }
}

createSsn("women", new Date("2023-01-01"), 94);
createSsn("men", new Date("2022-07-08"), 92);

//Read
// async function getAllSsns() {
//   try {
//     let ssns = await Ssn.find();
//     console.log(ssns);
//   } catch (err) {
//     console.log(err);
//   }
// }
// getAllSsns();

// "find" cherchera tout document ayant un "nom"="frenchDepartment".
// async function getSsnByName(frenchDepartment) {
//   try {
//     let ssn = await Ssn.find({ frenchDepartment });
//     console.log(ssn);
//   } catch (err) {
//     console.log(err);
//   }
// }

// getSsnByName("94");

// Update

// async function changeSsnName(id, newName) {
//   try {
// findById retourne un document et pas un tableau de documents
//     let ssn = await Ssn.findById(id);
//     ssn.gender = newName;
//     await ssn.save();
//     console.log(ssn);
//   } catch (err) {
//     console.log(err);
//   }
// }
// changeSsnName("64a4808f3cda802558e3dab7", "men");

// la fonction .delete().
// async function deleteSsn(id) {
//   try {
//     let ssn = await Ssn.findById(id);
//     await ssn.deleteOne();
//     console.log(ssn);
//   } catch (err) {
//     console.log(err);
//   }
// }

// deleteSsn("64a4802c847a3676cd03c573");

const port = 3000;
app.listen(port || process.env.PORT, () =>
  console.log(`Le serveur tourne bien sur le port ${port}`)
);
