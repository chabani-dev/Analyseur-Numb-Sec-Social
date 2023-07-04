function ssnParser1(ssn) {
  // Valider le format du SSN
  const ssnRegex = /^[0-9]{3}[-\s]?[0-9]{2}[-\s]?[0-9]{4}$/;
  if (!ssnRegex.test(ssn)) {
    throw new Error("Le numéro de sécurité sociale est invalide.");
  }

  // Extraire les informations du SSN
  const sanitizedSsn = ssn.replace(/[-\s]/g, "");
  const genderCode = parseInt(sanitizedSsn.charAt(0), 10);
  const birthYear = parseInt(sanitizedSsn.substr(1, 2), 10);
  const birthMonth = parseInt(sanitizedSsn.substr(3, 2), 10);
  const birthDay = parseInt(sanitizedSsn.substr(5, 2), 10);
  const frenchDepartment = parseInt(sanitizedSsn.substr(7, 2), 10);

  // Vérifier les valeurs extraites et déterminer le genre
  let gender;
  if (genderCode === 1 || genderCode === 3) {
    gender = "Homme";
  } else if (genderCode === 2 || genderCode === 4) {
    gender = "Femme";
  } else {
    throw new Error("Le genre du numéro de sécurité sociale est invalide.");
  }

  // Construire l'objet contenant les informations extraites
  const ssnInfo = {
    gender,
    birth: new Date(birthYear, birthMonth - 1, birthDay),
    frenchDepartment,
  };

  return ssnInfo;
}

export default ssnParser1;
