const Student = require("../models/students.model");
const jwt = require("jsonwebtoken");
const Login = async (req, res) => {
  const { num, password } = req.body;
  const user = await Student.findOne({ num: num });
  if (!user) return res.status(404).json({ msg: "User Not Found" });
  if (user.password !== password)
    return res.status(404).json({ msg: "Wrong Password" });
  const id = user._id;
  const token = jwt.sign({ num, id }, process.env.SECRET_TOKEN);
  user.password = undefined;
  return res.status(200).json({ user, token });
};
const getData = (req, res) => {
  return res.status(200).json({ msg: "done" });
};
const getDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  return res.json(doctors);
};
module.exports = {
  Login,
  getData,
  getDoctors,
};
