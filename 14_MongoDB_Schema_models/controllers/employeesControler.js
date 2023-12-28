const { response } = require("express");
const Employee = require("../model/Employee");

async function getAllEmployees(req, res) {
  // by calling find with like this it will return everything
  const employees = await Employee.find();
  if (!employees)
    return res.status(204).json({ message: "No employees found" });
  res.json(employees);
}

// create new
const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstName || !req?.body?.lastName) {
    // bad req
    res.status(400).json({ message: "FirstName and lastName are required!" });
  }
  try {
    const newEmployee = {
      // id: data.employees[data.employees.length - 1].id + 1 || 1, // will automatically be created by DB
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    const result = await Employee.create(newEmployee);
    console.log({ result });
    res.status(201).json({ result });
  } catch (error) {
    console.log({ creUsrErr: error.message });
  }
};

// update
const updateEmployee = async (req, res) => {
  // const employee = data.employees.find(
  //   (emp) => emp.id === parseInt(req.body.id)
  // );
  if (!req?.body?.id) {
    res.status(400).json({ message: "UserId Required" });
  }

  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  // const findEmp = await Employee.findOne({ userName });
  if (!employee) {
    // 204 - requested id does not exist
    return res
      .status(204)
      .json({ message: `No Employee Matches ID ${req.body.id}. ` });
  }
  if (req.body.firstName) employee.firstName = req.body.firstName;
  if (req.body.lastName) employee.lastName = req.body.lastName;

  const result = await employee.save();
  console.log({ empUpdated: result });
  res.json({ result });
};

// delete
const deleteEmployee = async (req, res) => {
  if (!req?.body?.id)
    return res
      .status(400)
      .json({ message: `Employee ID ${res.body.id} not found` });
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res.status(404).json({ message: `No emp matches ${req.body.id}` });
  }

  const response = await Employee.deleteOne({ _id: req.body.id });
  res.json(response);
};

const getEmployee = async (req, res) => {
  const id = req?.params?.id;
  if (!id)
    return res.status(400).json({ message: `Employee ID ${id} not found` });
  const employee = await Employee.findOne({ _id: id }).exec();
  console.log({ employee });
  if (!employee) {
    return res.status(404).json({ message: `No emp matches ${req.params.id}` });
  }

  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
