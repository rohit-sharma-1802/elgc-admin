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
      `Select * From Project,Requisitions where Project.requisitionId=? and Requisitions.requisitionId=?`,
      [data.requisitionId, data.requisitionId],
      (err, results, fields) => {
        if (err) return getAllRequisitionsCallback(err);
        return getAllRequisitionsCallback(null, results);
      }
    );
  },

  addSupplier: (data, addNewSupplierCallback) => {
    pool.query(
      `Insert into Supplier values(?,?,?,?,?,?,?,?)`,
      [
        data.name,
        data.email,
        data.phone,
        data.company_name,
        data.country_name,
        data.address,
        data.supplierId,
        data.fileName,
      ],
      (err, results, fields) => {
        if (err) return addNewSupplierCallback(err);
        return addNewSupplierCallback(null, results);
      }
    );
  },

  supplierDetails: (getSupplierDetailsCallback) => {
    pool.query(`Select * From Supplier`, [], (err, results, fields) => {
      if (err) return getSupplierDetailsCallback(err);
      return getSupplierDetailsCallback(null, results);
    });
  },

  supplierEmails: (getSupplierEmailsCallback) => {
    pool.query(`Select email from Supplier`, [], (err, results, fields) => {
      if (err) return getSupplierEmailsCallback(err);
      return getSupplierEmailsCallback(null, results);
    });
  },

  deleteSupplier: (supplierId, deleteSupplierCallback) => {
    pool.query(
      `Delete from Supplier where supplierId = ?`,
      [supplierId],
      (err, results, fields) => {
        if (err) return deleteSupplierCallback(err);
        return deleteSupplierCallback(null, results);
      }
    );
  },

  updateSupplier: (data, updateSupplierDetailsCallback) => {
    pool.query(
      `Update Supplier set name = ?, email = ?, phone = ?, company_name = ?, country_name = ?, address=? where supplierId = ?`,
      [
        data.name,
        data.email,
        data.phone,
        data.company_name,
        data.country_name,
        data.address,
        data.supplierId,
      ],
      (err, results, fields) => {
        if (err) updateSupplierDetailsCallback(err);
        updateSupplierDetailsCallback(null, results);
      }
    );
  },
};
