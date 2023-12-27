const User = require("../models/login.model");
const Student = require("../models/students.model");
const Login = async (req, res) => {
  const exist = await User.exists({ num: req.body.num });
  if (!exist) return res.status(404).json({ msg: "User Not Found" });
  const user = await User.findById(exist);
  if (user.password !== req.body.password)
    return res.status(404).json({ msg: "Wrong Password" });
  return res.status(200).json({ user });
};

const addNewStudent = async (req, res) => {
  const student = req.body;
  const newStudent = await Student(student);
  req.file ? (newStudent.image = req.file.filename) : "";
  try {
    newStudent.save();
  } catch (err) {
    console.log(err);
  }
};
const getStudents = async (req, res) => {
  const students = await Student.find();
  return res.status(200).json(students);
};
const getStudent = async (req, res) => {
  const id = req.params.id;
  const student = await Student.findById(id);
  res.status(200).json(student);
};
const updateStudent = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  try {
    const newStudent = await Student.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
};
const deleteStudent = async (req, res) => {
  const user = await User.findById(req.params.id);
  try {
    // fs.unlinkSync(`../public/images/${user.image}`);
    const del = await Student.findByIdAndDelete(req.params.id);
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ msg: "Done" });
};
const addSeatingNumbers = async (req, res) => {
  const data = req.body;
  const addNum = async (student) => {
    await Student.findByIdAndUpdate(student._id, student);
  };
  data.map((student) => addNum(student));
  console.log(data);
};
module.exports = {
  Login,
  addNewStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  addSeatingNumbers,
};
