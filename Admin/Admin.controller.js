const {
  adminLogin,
  addProjectRequisition,
  addMaterialsDetails,
  updateStatus,
  getRequisitions,
  addSupplier,
  supplierDetails,
  supplierEmails,
  deleteSupplier,
  updateSupplier,
} = require("./Admin.service");
const fs = require("fs");

module.exports = {
  checkLogin: (req, res) => {
    const data = req.body;
    adminLogin(data, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Invalid Request",
        });
      }
      if (results.length === 0) {
        return res.status(300).json({
          success: 0,
          message: "Invalid Email",
        });
      }
      if (data.password === results[0].password) {
        return res.status(200).json({
          success: 1,
          message: "Logged In Successfully",
        });
      }
      return res.status(500).json({
        success: 0,
        message: "Invalid Password",
      });
    });
  },

  addNewProjectRequisition: (req, res) => {
    const data = req.body;
    addProjectRequisition(data, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Bad Request",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Added Successfully",
      });
    });
  },

  addMaterialDetailsController: (req, res) => {
    const data = req.body.materials;
    console.log(data);
    addMaterialsDetails(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Bad Request",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Added Successfully",
      });
    });
  },

  updateProjectStatus: (req, res) => {
    const data = req.params;
    updateStatus({ ...data, status: req.body.status }, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Bad Request",
        });
      }
      console.log(results);
      return res.status(200).json({
        success: 1,
        message: "Updated Successfully",
      });
    });
  },

  getAllRequisitions: (req, res) => {
    const data = req.params;
    getRequisitions(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Bad Request",
        });
      }
      return res.status(200).json({
        success: 1,
        results,
      });
    });
  },

  addNewSupplier: (req, res) => {
    console.log("Request comes");
    var today = new Date();
    var date =
      today.getFullYear() + "" + (today.getMonth() + 1) + "" + today.getDate();
    var time =
      today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
    var dateTime = date + "" + time + "" + Math.floor(Math.random() * 100 + 1);
    const supplierId = dateTime;
    const fileName = supplierId + req.files.company_details.name;
    const file = req.files.company_details;
    console.log(req.files.company_details.type);
    let uploadPath = __dirname + "/uploads/" + fileName;
    file.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Unable to Upload File",
        });
      }
      const data = { ...req.body, fileName: fileName, supplierId: supplierId };
      console.log(data);
      addSupplier(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Bad Request",
          });
        }
        return res.status(200).json({
          success: 1,
          supplierId,
          fileName,
        });
      });
    });
  },

  getSupplierDetails: (req, res) => {
    supplierDetails((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Bad Request",
        });
      }
      console.log(results[0].company_detail.text + "Hello");
      return res.status(200).json({
        success: 1,
        suppliers: results,
      });
    });
  },

  getSupplierCompanyFile: (req, res) => {
    const data = req.params;
    const path = __dirname + "/uploads/" + data.fileName;
    if (fs.existsSync(path)) {
      return res.sendFile(path);
    }
    return res.status(500).json({
      success: 0,
      message: "FileName not exist",
    });
  },

  getSupplierEmails: (req, res) => {
    supplierEmails((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Server Error",
        });
      }
      return res.status(200).json({
        success: 1,
        emails: results,
      });
    });
  },

  deleteSupplierDetails: (req, res) => {
    const { supplierId, fileName } = req.body;
    const path = __dirname + "/uploads/" + fileName;
    if (fs.existsSync(path)) {
      fs.unlink(path, (err) => {
        if (err)
          return res.status(500).json({
            success: 0,
            message: "File Not Exists",
          });
        console.log("File Deleted Successfully");
        deleteSupplier(supplierId, (err, results) => {
          if (err) {
            return res.status(500).json({
              success: 0,
              message: "Bad Request",
            });
          }
          return res.status(200).json({
            success: 0,
            message: "Supplier Deleted Successfully",
          });
        });
      });
    }
    return res.status(500).json({
      success: 0,
      message: "File Not Exist",
    });
  },

  updateSupplierDetails: (req, res) => {
    const data = req.body;
    updateSupplier(data, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Bad Request",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Updated Record Successfully",
      });
    });
  },
};
