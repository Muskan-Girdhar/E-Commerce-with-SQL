const express = require('express');
let ejs = require('ejs');
const fs=require('fs');
const path = require('path')
const  session = require('express-session');
const bodyParser = require('body-parser');
const products=require("./route/myroute.js");
const multer = require('multer')
const storage=multer.diskStorage({
    
    destination: (req,file,cb)=>{
        cb(null,'products');
    },
    filename: (req,file,cb)=>
    {
        cb(null,path.extname(file.originalname));
    }
});
const upload = multer({storage:storage})



const port =3000;
var count=0;

var erroroccur="";

const app = express();
var loginuser;
var pcount=0;
let newdata=[];
var data;
var emailhold='';

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("productImages"));

app.set('view engine','ejs');
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
let tosave=[];


const newConnectionSQL =require("./methods/sqlDatabase.js");

app.use(session({
    
    secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      isLogedin:false,
      username:"",    
}))

app.use("/",products);

// //------------------------------listen---------------------------------------------------
// app.get("/abc",function (req,res){
//   res.end("hiii");
// })
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

