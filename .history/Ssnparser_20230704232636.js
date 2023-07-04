import mongoose from "mongoose";

const ssnSchema = new mongoose.Schema({
  genderCode: String,
  birth: Date,
  frenchDepartment: Number,
});

const Ssn = mongoose.model("Ssn", ssnSchema);

export default Ssn;
