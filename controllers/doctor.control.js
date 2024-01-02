const Doctor = require("../models/doctor.model");
const User = require("../models/login.model");
const getDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  return res.json(doctors);
};
const addDoctor = async (req, res) => {
  let { fristName, lastName, img } = req.body;
  img = req.uniqueSuffix;
  const doctor = await new Doctor({ fristName, lastName, image: img });
  try {
    doctor.save();
    return res.json({ msg: "done" });
  } catch (error) {
    console.log(error);
  }
};
const getDoctor = async (req, res) => {
  const id = req.params.id;
  const doctor = await Doctor.findById(id);
  res.status(200).json(doctor);
};
const updateDoctor = async (req, res) => {
  let data = req.body;
  data.image = req.uniqueSuffix;
  const id = req.params.id;
  try {
    const newDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    return res.status(200).json({ msg: "done" });
  } catch (err) {
    console.log(err);
  }
};
const updateData = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log(data);
  const fileName = req.file ? req.file : "";
  try {
    const newDoctor = await User.findByIdAndUpdate(id, data);
    console.log(newDoctor);
    return res.json({ msg: "done", newDoctor });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getDoctors,
  addDoctor,
  getDoctor,
  updateDoctor,
  updateData,
};
