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

//Create
// async function createSsn(gender, birth, frenchDepartment) {
//   try {
//     let ssn = await Ssn.create({ gender, birth, frenchDepartment });
//     console.log(ssn);
//   } catch (err) {
//     console.log(err);
//   }
// }

// createSsn("women", new Date("2023-01-01"), 94);
// createSsn("men", new Date("2022-07-08"), 92);

function ssnParser(ssn) {
  // Vérification de la longueur du SSN
  if (ssn.length !== 13) {
    throw new Error(
      "Numéro de sécurité sociale invalide. Le SSN doit contenir 13 caractères."
    );
  }

  // Extraction des informations utiles
  const genderDigit = parseInt(ssn.substring(0, 1), 10);
  const birthYear = parseInt(ssn.substring(1, 3), 10);
  const birthMonth = parseInt(ssn.substring(3, 5), 10);
  const birthDay = parseInt(ssn.substring(5, 7), 10);
  const frenchDepartment = parseInt(ssn.substring(7, 10), 10);

  // Validation des informations extraites
  if (isNaN(genderDigit) || genderDigit < 1 || genderDigit > 4) {
    throw new Error(
      "Numéro de sécurité sociale invalide. Le chiffre de genre doit être compris entre 1 et 4."
    );
  }

  if (isNaN(birthYear) || birthYear < 0 || birthYear > 99) {
    throw new Error(
      "Numéro de sécurité sociale invalide. L'année de naissance doit être comprise entre 00 et 99."
    );
  }

  if (isNaN(birthMonth) || birthMonth < 1 || birthMonth > 12) {
    throw new Error(
      "Numéro de sécurité sociale invalide. Le mois de naissance doit être compris entre 01 et 12."
    );
  }

  if (isNaN(birthDay) || birthDay < 1 || birthDay > 31) {
    throw new Error(
      "Numéro de sécurité sociale invalide. Le jour de naissance doit être compris entre 01 et 31."
    );
  }

  if (
    isNaN(frenchDepartment) ||
    frenchDepartment < 1 ||
    frenchDepartment > 976
  ) {
    throw new Error(
      "Numéro de sécurité sociale invalide. Le département français doit être compris entre 001 et 976."
    );
  }

  // Conversion du chiffre de genre en texte
  let gender = "";
  switch (genderDigit) {
    case 1:
      gender = "Homme";
      break;
    case 2:
      gender = "Femme";
      break;
    case 3:
      gender = "Homme (étranger)";
      break;
    case 4:
      gender = "Femme (étrangère)";
      break;
  }

  // Conversion de l'année de naissance en format complet
  const currentYear = new Date().getFullYear();
  const birthFullYear = currentYear - (currentYear % 100) + birthYear;

  // Retour des informations extraites
  return {
    gender,
    birth: new Date(birthFullYear, birthMonth - 1, birthDay),
    frenchDepartment,
  };
}

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
