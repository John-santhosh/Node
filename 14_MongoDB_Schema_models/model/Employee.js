const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

// we are creating a data model here.
// the Model name 'Employee' is by default set to 'employees' by mongoose and it will look for 'employees' collection in MongoDb
// Ref https://mongoosejs.com/docs/models.html
// Mongoose automatically looks for the plural, lowercased version of your model name.
module.exports = mongoose.model("Employee", employeeSchema);
