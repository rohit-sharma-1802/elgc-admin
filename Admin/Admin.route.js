const { checkToken } = require("../auth/token_validation");
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
  tokenValidationSuccessful,
  getCurrentSupplier,
  getAllRequisitionsData,
  deleteRequisition,
  supplierQuoteDetailsController,
  submitQuoteController,
  getQuotationProjectController,
  getQuotationItemController,
  getCompanyDetails,
  createOrderController,
  orderDetailsController,
  getOrdersController,
  getOrderProjectDetails,
  getOrderedMaterials,
} = require("./Admin.controller");

const router = require("express").Router();

router.post("/login", checkLogin);
router.post("/addProjectRequisition", addNewProjectRequisition);
router.post("/addMaterialDetails", addMaterialDetailsController);
router.post("/updateStatus/:projectId", updateProjectStatus);
router.get("/getRequisitions/:projectId", getAllRequisitions);
router.post("/getAllRequisitions", getAllRequisitionsData);
router.post("/deleteRequisition/:projectId", deleteRequisition);
router.post("/addNewSupplier", addNewSupplier);
router.get("/getSupplierDetails", getSupplierDetails);
router.get("/getSupplierCompanyFile/:fileName", getSupplierCompanyFile);
router.get("/getSupplierEmails", getSupplierEmails);
router.post("/deleteSupplierDetails", deleteSupplierDetails);
router.post("/updateSupplierDetails", updateSupplierDetails);
router.get("/getSupplier/:supplierId", getCurrentSupplier);
router.post("/sentEmails", sentEmail);
router.post("/supplierQuoteDetails", supplierQuoteDetailsController);
router.post("/submitQuote", submitQuoteController);
router.post("/validateToken", checkToken, tokenValidationSuccessful);
router.get("/getQuotationProjects", getQuotationProjectController);
router.get("/getQuotationItems/:projectId", getQuotationItemController);
router.get("/getCompanyDetails/:id", getCompanyDetails);
router.post("/createOrder", createOrderController);
router.post("/orderDetails", orderDetailsController);
router.get("/getOrders", getOrdersController);
router.get("/orderProjectDetails/:id", getOrderProjectDetails);
router.get("/getOrderedMaterial/:orderId", getOrderedMaterials);
//add Quote person details, add quote details.

module.exports = router;
