const express = require("express");

const accountPayable = require("../controllers/accountPayable");
const assetMangment = require("../controllers/assetManagment");
const accountRecivable = require("../controllers/accountRecivable");
const pettyCash = require('../controllers/pettyCash')

const router = express.Router();

router.post("/accountPayable", accountPayable.addaccountPayable);
router.post("/accountPayed", accountPayable.responsPayable);
router.get("/showaccountpayable", accountPayable.showAllPayable);
router.post("/showReasonById", accountPayable.showReasonById)

// change the cash managment part updating the value

router.post("/accountRecivable", accountRecivable.addRecivable);
router.get("/showaccountRecivable", accountRecivable.showRecivable)
router.post("/completeSalesOrder", accountPayable.makeCompelte)

router.post("/subAsset", assetMangment.subAsset);
router.post("/addAsset", assetMangment.addAsset);

router.post("/addPettyCash", pettyCash.addcash);
router.get("/showPettyCash", pettyCash.showCash);

router.get("/showAssetMang", assetMangment.showAll);
router.post("/showAssetByType", assetMangment.showAllType);



router.get("/", (req, res, then) => {
  console.log("finance module running");
  res.status(200).json({ message: "finance module" });
});

module.exports = router;
