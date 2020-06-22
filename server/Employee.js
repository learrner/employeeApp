const mongoose = require('mongoose')
const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    position: String,
    salary: String,
    picture: String
})

mongoose.model("employee", EmployeeSchema)