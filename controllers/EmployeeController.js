const Employee = require("../models/Employee");

// show the list of Employee

const index = (req, res, next) => {
  // without pagination form

  // Employee.find()
  //   .then((response) => {
  //     res.json({
  //       response,
  //     });
  //   })
  //   .catch((error) => {
  //     res.json({
  //       message: "An error Occured!",
  //     });
  //   });

  // with pagination form

  if (req.query.page && req.query.limit) {
    Employee.paginate({}, { page: req.query.page, limit: req.query.limit })
      .then((data) => {
        res.json({
          data,
        });
      })
      .catch((error) => {
        res.json({
          message: "An error occured! " + error,
        });
      });
  } else {
    Employee.find()
      .then((data) => {
        res.json({
          data,
        });
      })
      .catch((error) => {
        res.json({
          message: "An error Occured!",
        });
      });
  }
};
// show single employee
const show = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findById(employeeID)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured!",
      });
    });
};

// to add an employee

const store = (req, res, next) => {
  let employee = new Employee({
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  });
  // to handle single file upload
  // if (req.file) {
  //   employee.avatar = req.file.path;
  // }

  //to handle multiple files upload
  if (req.files) {
    let path = "";
    req.files.forEach(function (files, index, arr) {
      path = path + files.path + ",";
    });
    path = path.substring(0, path.lastIndexOf(","));
    employee.avatar = path;
  }
  employee
    .save()
    .then((response) => {
      res.json({
        message: "Employee added successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};

// to update employee data

const update = (req, res, next) => {
  let employeeID = req.body.employeeID;
  let updatedData = {
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  };

  Employee.findByIdAndUpdate(employeeID, { $set: updatedData })
    .then(() => {
      res.json({
        message: "Employee updated successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};

// to delete an employee

const destroy = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findByIdAndRemove(employeeID)
    .then(() => {
      res.json({
        message: "Employee  deleted successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured",
      });
    });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
