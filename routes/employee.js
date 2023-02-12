const express = require("express");
const { route } = require("express/lib/application");

const router = express.Router();
const EmployeeController = require("../controllers/EmployeeController");
const upload = require("../middleware/upload");
const authenticate = require("../middleware/authenticate");

// with authentication
// router.get("/", authenticate, EmployeeController.index);

// without authentication
router.get("/", EmployeeController.index);

router.post("/show", EmployeeController.show);
// to upload single files
// router.post("/store", upload.single("avatar"), EmployeeController.store);
//to upload multiples files
router.post("/store", upload.array("avatar[]"), EmployeeController.store);
router.post("/update", EmployeeController.update);
router.post("/delete", EmployeeController.destroy);

module.exports = router;
