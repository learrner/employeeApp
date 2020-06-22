const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require("./Employee")


app.use(bodyParser.json())

const Employee = mongoose.model("employee")

app.get('/', (req, res) => {
    Employee.find({})
        .then(data => {
            res.send(data)
        }).catch(e => {
            console.log(e)
        })
})
const url = "mongodb+srv://cnq:xRXpHYqnSELh5W2n@cluster0-hflzo.mongodb.net/employeeApp?retryWrites=true&w=majority"

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("Connected", () => {
    console.log("Mongoose is connected ")
})

mongoose.connection.on("error", (err) => {
    console.log("Mongoose is not connected", err)
})

app.post('/send-data', (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        position: req.body.position,
        salary: req.body.salary,
        picture: req.body.picture

    })
    employee.save()
        .then(data => {
            console.log(data)
            res.send(data)
        }).catch(e => {
            console.log(e)
        })
})

app.post('/delete', (req, res) => {
    Employee.findByIdAndRemove(req.body.id)
        .then(data => {
            console.log(data)
            res.send(data)
        }).catch(e => {
            console.log(e)
        })
})

app.post('/update', (req, res) => {
    Employee.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        position: req.body.position,
        salary: req.body.salary,
        picture: req.body.picture
    })
        .then(data => {
            console.log(data)
            res.send(data)
        }).catch(e => {
            console.log(e)
        })
})

app.listen(3000, () => {
    console.log("listening to port 3000")
})


// "name": "Alice",
// "phone": "6826868298",
// "email": "alice@g.com",
// "position": "worker",
// "salary": "5 LPA",
// "picture": ""