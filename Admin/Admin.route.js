const {
  checkLogin,
  addNewProjectRequisition,
  addMaterialDetailsController,
  updateProjectStatus,
  getAllRequisitions,
  addNewSupplier,
  getSupplierDetails,
  getSupplierCompanyFile,
  getSupplierEmails,
  deleteSupplierDetails,
  updateSupplierDetails,
  sentEmail,
} = require("./Admin.controller");

const router = require("express").Router();

router.post("/login", checkLogin);
router.post("/addProjectRequisition", addNewProjectRequisition);
router.post("/addMaterialDetails", addMaterialDetailsController);
router.put("/updateStatus/:projectId", updateProjectStatus);
router.get("/getRequisitions/:requisitionId", getAllRequisitions);
router.post("/addNewSupplier", addNewSupplier);
router.get("/getSupplierDetails", getSupplierDetails);
router.get("/getSupplierCompanyFile/:fileName", getSupplierCompanyFile);
router.get("/getSupplierEmails", getSupplierEmails);
router.post("/deleteSupplierDetails", deleteSupplierDetails);
router.put("/updateSupplierDetails", updateSupplierDetails);
router.post("/sentEmails", sentEmail);

module.exports = router;
