const pool = require("../config/database");

module.exports = {
  adminLogin: (data, adminLoginCallback) => {
    pool.query(
      `Select * From Admin where email = ?`,
      [data.email],
      (err, results, fields) => {
        if (err) return adminLoginCallback(err);
        return adminLoginCallback(null, results);
      }
    );
  },

  addProjectRequisition: (data, addRequisitionCallback) => {
    pool.query(
      `Insert into Project(projectId, toName, name, subject, remarks, requisitionId, status) values(?,?,?,?,?,?,?)`,
      [
        data.projectId,
        data.toName,
        data.name,
        data.subject,
        data.remarks,
        data.requisitionId,
        "Pending",
      ],
      (err, results, fields) => {
        if (err) return addRequisitionCallback(err);
        return addRequisitionCallback(err, results);
      }
    );
  },

  addMaterialsDetails: (data, addMaterialDetailsCallback) => {
    pool.query(
      `Insert into Requisitions(description, size, quantity, requisitionId) values ?`,
      [
        data.map((requisition) => [
          requisition.description,
          requisition.size,
          requisition.quantity,
          requisition.requisitionId,
        ]),
      ],
      (err, results, fields) => {
        if (err) return addMaterialDetailsCallback(err);
        return addMaterialDetailsCallback(null, results);
      }
    );
  },

  updateStatus: (data, updateStatusCallback) => {
    pool.query(
      `Update Project set status = ? where projectId = ? `,
      [data.status, data.projectId],
      (err, results, fields) => {
        if (err) return updateStatusCallback(err);
        return updateStatusCallback(null, results);
      }
    );
  },

  getRequisitions: (data, getAllRequisitionsCallback) => {
    pool.query(
      `Select * From Requisitions where requisitionId = ?`,
      [data.requisitionId],
      (err, results, fields) => {
        if (err) return getAllRequisitionsCallback(err);
        return getAllRequisitionsCallback(null, results);
      }
    );
  },
};
