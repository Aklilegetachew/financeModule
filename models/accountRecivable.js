const { default: axios } = require("axios");
const db = require("../utils/db");
const salesAxios = require("../midelware/salesaxios")

module.exports = class accountRecivable {
  static uniqueId() {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  }

  static showall() {
    return db
      .execute("SELECT * FROM account_recevable")
      .then((respo) => {
        return [true, respo[0]];
      })
      .catch((err) => {
        return [false, err];
      });
  }

  static async addtoReason(materialData) {
    const GID = this.uniqueId();
    return db
      .execute(
        "INSERT INTO finacial_reason(material_type, material_quantity, material_unit, material_desc, material_name, material_spec, GENID)VALUES(?, ?, ?, ?, ?, ?, ?)",
        [
          materialData.req_materialtype,
          materialData.mat_quantity,
          materialData.mat_unit,
          materialData.mat_description,
          materialData.mat_requestname,
          materialData.mat_spec,
          GID,
        ]
      )
      .then((respo) => {
        return GID;
      });
  }

  static async addtoReasonrequ(materialData) {
    console.log("material Data", materialData)
    const GID = this.uniqueId();
    return db
      .execute(
        "INSERT INTO finacial_reason(material_type, material_quantity, material_unit, material_desc, material_name, material_spec, GENID)VALUES(?, ?, ?, ?, ?, ?, ?)",
        [
          materialData.materialtype,
          materialData.fin_quantity,
          materialData.mat_unit || "Kg",
          materialData.fin_description,
          materialData.fin_name,
          materialData.mat_spec || "Spoecification",
          GID,
        ]
      )
      .then((respo) => {
        return GID;
      });
  }
  static async selectfromSales(newData) {
    return await salesAxios
      .post("/selectSalesOrder", { Id: newData })
      .then((respo) => {
        return respo.data[0];
      })
      .catch((err) => {
        return err;
      });
  }

  static async addToRecivable(salesData, GID, salesID) {
    return await db
      .execute(
        "INSERT INTO account_recevable(recevable_name, recevable_tin, recevable_amount, recevable_status, recivable_stdate, recevable_endate, reason, reasonID, salesID)VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          salesData.customer_name,
          salesData.cust_tinNumber,
          salesData.paymentTotal,
          salesData.payment_status,
          salesData.order_date,
          " ",
          " FINSHED ",
          GID,
          salesID || ""

        ]
      )
      .then((resp) => {
        return [true, GID];
      })
      .catch((err) => {
        return [false, err];
      });
  }
};
