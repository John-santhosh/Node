const express = require("express");
const router = express.Router();
const path = require("path");

const data = {};
// this is like connecting a database for now!
data.employees = require("../../data/employee.json");

// instead of specifying each http route like route.get, router.post we can do like this.

router
  .route("/")
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    res.json({ firstName: req.body.firstName, lastName: req.body.lastName });
  })
  .put((req, res) => {
    res.json({ firstName: req.body.firstName, lastName: req.body.lastName });
  })
  .delete((req, res) => {
    // console.log();
    res.json({ id: req.body.id });
  });

// the :id is the named parameter.
router.route("/:id").get((req, res) => {
  res.json({ id: req.param.id });
});
module.exports = router;
