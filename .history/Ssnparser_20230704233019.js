import mongoose from "mongoose";

const ssnSchema = new mongoose.Schema({
  ssnparser: "123-45-678901-23",
  genderCode: String,
  birth: Date,
  frenchDepartment: Number,
});

const Ssn = mongoose.model("Ssn", ssnSchema);

export default Ssn;
