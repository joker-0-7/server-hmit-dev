var express = require("express");
var router = express.Router();
const multer = require("multer");
const userControll = require("../controllers/user.controll");
const removeBg = require("../middlewares/removebg");
/* GET users listing. */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/students/");
  },
  filename: function (req, file, cb) {
    const mimetype = file.mimetype.split("/")[1];
    const uniqueSuffix = `user-${Date.now()}.${mimetype}`;
    req.uniqueSuffix = uniqueSuffix;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

router.post("/login", userControll.Login);
router.get("/students", userControll.getStudents);
router.post("/add-new-user", upload.single("img"), userControll.addNewStudent);
router.post("/update-student/:id", userControll.updateStudent);
router.post("/update-data/:id", upload.single("img"), userControll.updateData);
router.get("/get-student/:id", userControll.getStudent);
router.delete("/delete-student/:id", userControll.deleteStudent);
router.put("/add-seating-numbers", userControll.addSeatingNumbers);
module.exports = router;
