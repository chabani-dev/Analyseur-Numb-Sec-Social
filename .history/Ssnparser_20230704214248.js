import mongoose from "mongoose";

const ssnSchema = new mongoose.Schema({
  gender: String,
  birth: Date,
  frenchDepartment: Number,
});

const Ssn = mongoose.model("Ssn", ssnSchema);

export default Ssn;
