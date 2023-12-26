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
  // will check for the jwt first and proceed to next()
  // will do like this or we can move it to server.js so that it will apply for every route.
  // .get(verifyJWT, getAllEmployees)
  .get(getAllEmployees)
  .post(createNewEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

// the :id is the named parameter.
router.route("/:id").get(getEmployee);
module.exports = router;
