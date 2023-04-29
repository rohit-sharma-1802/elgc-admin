const {
  checkLogin,
  addNewProjectRequisition,
  addMaterialDetailsController,
  updateProjectStatus,
  getAllRequisitions,
} = require("./Admin.controller");

const router = require("express").Router();

router.post("/login", checkLogin);
router.post("/addProjectRequisition", addNewProjectRequisition);
router.post("/addMaterialDetails", addMaterialDetailsController);
router.put("/updateStatus/:projectId", updateProjectStatus);
router.get("/getRequisitions/:requisitionId", getAllRequisitions);

module.exports = router;
