const express = require("express");
const router = express.Router();
const path = require("path");

const {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
} = require("../../controllers/employeesControler");

// ** this will come from EmployeeController
// const data = {};
// // this is like connecting a database for now!
// data.employees = require("../../data/employee.json");

// instead of specifying each http route like route.get, router.post we can do like this.

router
  .route("/")
  .get(getAllEmployees)
  .post(createNewEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

// the :id is the named parameter.
router.route("/:id").get(getEmployee);
module.exports = router;
