const express=require ("express");
const router = express.Router();

const controller =require("../controller/mycontroller.js")
const multer = require('multer')

const storage=multer.diskStorage({
    
    destination: (req,file,cb)=>{
        cb(null,'./productImages');
    },
    filename: (req,file,cb)=>
    {
        cb(null,file.originalname);
    }
});
const upload = multer({storage:storage});
console.log(router);

router.route("/").get(controller.rootpage);

router.route("/signup").get(controller.signupget)
.post(controller.signuppost);

router.route("/verify").get(controller.verifypage);

router.route("/login").get(controller.loginget)
.post(controller.loginpost);

router.route("/home").get(controller.homeget);

router.route("/adminhome").get(controller.adminhomeget);

router.route("/addproduct").get(controller.addproductget)
.post(upload.single('pimage'),controller.addproductpost);

router.route("/editproduct").get(controller.editproductget)
.post(controller.editproductpost);


router.get("/root",controller.logoutbutton);

router.post('/getdata',controller.getdata);

router.route('/forgot').get(controller.forgotget)
.post(controller.forgotpost);

router.route('/reset').get(controller.resetget)
.post(controller.resetpost);

router.route('/addDataToCart').post(controller.adddatatocart);
router.get("/cart",controller.cartpage);

router.post("/cartdata",controller.Mycartdata);
router.post("/addquantity",controller.addquantity);
router.post("/subquantity",controller.subquantity);
router.post("/removeitem",controller.removeitem);
router.post("/deleteproduct",controller.removeproduct);



router.post("/updateproduct",upload.single('pimage'),controller.updateproduct);


module.exports = router;
