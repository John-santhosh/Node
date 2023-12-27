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
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middlewares/verifyRoles");
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
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

// the :id is the named parameter.
router.route("/:id").get(getEmployee);
module.exports = router;
