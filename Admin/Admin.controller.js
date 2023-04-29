const {
  adminLogin,
  addProjectRequisition,
  addMaterialsDetails,
  updateStatus,
  getRequisitions,
} = require("./Admin.service");

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
};
