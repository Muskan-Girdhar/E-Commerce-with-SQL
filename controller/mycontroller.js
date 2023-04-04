const express = require('express');
const app = express();
app.use(express.json());
const multer = require('multer')
const storage=multer.diskStorage({
    
    destination: (req,file,cb)=>{
        cb(null,'../productImages');
    },
    filename: (req,file,cb)=>
    {
        cb(null,path.extname(file.originalname));
    }
});
const upload = multer({storage:storage});

app.use(express.urlencoded({extended:true}));

const bodyParser = require('body-parser');
app.use(bodyParser.json());


let pcount=0;
let tosave;
const fs=require('fs');
const {userread,updatewithoutimage,updatewithimage,userwrite,userlogin,productsread,useremail,alterpassword,insertdatatocart,readproducts,addone,subone,deleteitem,addproduct,deletefromproduct} =require('../methods/sqlfun')
const sendmail= require("../methods/sendEmail");
let myresult;
  let email;
  let text;
  let name;
  let token;
let count;
let isverify=false;


//-------------------------- root page----------------------------- 
const rootpage = async(req,res) =>
{
    if(req.session.isLogedin == true)
    {   
    try{   
        res.render("logout",{loginuser:req.session.loginuser});
       }
     catch(err){
        console.error(err);
     }

     }
   else  
   { 
    erroroccur="";
    res.render("root");
   }
   
}
//---------------------------------forget-----------------
 function forgotget(req,res)
{
    erroroccur="";
    res.render("forgot",{error:erroroccur});
}
const forgotpost=async(req,res)=>
{
   
    req.session.emailhold=req.body.email; 
    tosave=await useremail(req.session.emailhold);
    tosave=tosave.recordset

    if(tosave!={})
    {
        email=req.session.emailhold;
        token="reset";
        text="change password";
        name=tosave.uname;
        sendmail(email,name,token,text);
        erroroccur="";
        res.render('email');
    }
    else
    {
    erroroccur='you have entered wrong email';
    res.render("forgot",{error:erroroccur});
       
    }
}
 //-------------------------getdata---------------------   
const getdata =async(req,res) =>
{
    let para=req.body.id;
    
    if(para === 1)
    {
        pcount=0;
    }
     tosave = await  productsread( );
     tosave=tosave.recordset;

       if(tosave!=null)
       {
        
        data=tosave.slice(pcount*5,(pcount+1)*5);
        pcount++;
       
        res.json(data);
       }
       else
            res.send("error");
    
}

//----------------------logout-----------------------
function logoutbutton(req,res)
{
    req.session.isLogedin=false;
    req.session.loginuser="";
    req.session.emailhold="";
    req.session.loginuserPassword="";
    res.render("root");
}



//--------------------------login page-------------------------------
const loginget=async(req,res)=>
{
    if(req.session.isLogedin==true)
    {
        if(req.session.role=='Admin')
        {
            res.redirect("adminhome");
        }
        else
        {
            res.redirect("home");
        }
        
        
    }
    else
    {
    var erroroccur="";
    res.render("login",{error:erroroccur});
    }
    
}
const loginpost=async(req,res)=>
{
        if(req.session.isLogedin==true)
        {
            res.redirect("home");
        }
        else
        {
        count=0;
        name=req.body.name;
        password=req.body.password;
        tosave=await userlogin(name,password);
        tosave=tosave.recordset
        console.log(tosave);
        //--------------------adminlogin
        if(tosave[0].role=='Admin')
        {
              req.session.emailhold=tosave[0].uemail;
                req.session.isLogedin=true;
                req.session.loginuser=req.body.name;
                req.session.loginuserPassword = req.body.password;
                req.session.uid=tosave[0].uid;
                req.session.role=tosave[0].role;
            res.redirect("adminhome");
        }

      //-------------------userlogin
       
            else if(tosave.length!=0)
            {
                
                
                req.session.emailhold=tosave[0].uemail;
                req.session.isLogedin=true;
                req.session.loginuser=req.body.name;
                req.session.loginuserPassword = req.body.password;
                req.session.uid=tosave[0].uid;
                req.session.role=tosave[0].role;
              
                res.redirect("home");
            }
         
          else
        {
            erroroccur="wrong username and password";
            res.render("login",{error:erroroccur});   
           
            
        }
    }
}

 //------------------------signup-------------------------
const  signupget = async(req,res)=>
{
    if(req.session.isLogedin == true)
 {  
 try{   
     res.render("logout",{loginuser:loginuser});
    }
  catch(err)
  {
     console.error(err);
  }

 }
 else
 {
    var erroroccur="";
    res.render("signup",{error:erroroccur});
 }
    
}

const signuppost = async(req,res)=>
{
  count=0; 
 
 tosave=await userread();
 tosave=tosave.recordset
 
    for(let i=0;i<tosave.length;i++)
    {
        if(tosave[i].uemail===req.body.email || tosave[i].upassword === req.body.password)
        {
            count++;  
        }
    }
    if(count==0)
    {
        let obj={
            uname :req.body.name,
            uemail :req.body.email,
            upassword : req.body.password,
            uphno :req.body.phno
        } 
        email=req.body.email;
        text="verify your mail";
        name=req.body.name;
        token="verify";
         await sendmail(email,name,token,text);
         isverify=true;

          let myresult=userwrite(obj);
            if(myresult){
                erroroccur="";   
                res.render("email");   
            }
            else{
                console.log("user not added");
            }
       
        } 
    
    else
    { 
     erroroccur="enter another email or password";
      count=0;
        res.render("signup",{error:erroroccur});
        return;
    }
} 

//--------------------------verify------------------
const verifypage = async(req,res)=>
{
    if(isverify==true)
    res.render("verify");
    else
    erroroccur="";
    res.render("signup",{error:erroroccur});
}
//-------------------------home-----------------------
 const homeget = async(req,res)=>
 {
    if(req.session.isLogedin)
    res.render("home",{loginuser:req.session.loginuser});

    else
    res.redirect("login");
 }
//----------------------------------change password-----------------------
const resetget = async(req,res)=>
 {
    erroroccur="";
    res.render('reset',{error:erroroccur});
 }
 const resetpost = async(req,res)=>
 {
    req.session.isLogedin=false;
 
    if(req.body.newpass==='' ||req.body.conformpass==='')
    {
        erroroccur="password not entered properly";
        res.render("reset",{error:erroroccur});   
    }
    

  else if(req.body.newpass!=req.body.conformpass)
   {
    erroroccur="password don't match";
    res.render('reset',{error:erroroccur});
   }

   else
   {
    
    tosave=await useremail(req.session.emailhold);
    tosave=tosave.recordset[0];
    
     if(tosave!={})
        {  
            let myresult=await alterpassword(tosave.uemail,req.body.newpass); 
            
            if(myresult){ 
                erroroccur="";
                email=tosave.uemail;
              text="verify your mail";
              name=req.body.name;
              token="login";
            
            sendmail(email,name,token,text);
            
             res.redirect("login");
                
            }
            else{
                console.log(" password not changed");
            }            
            
        }
    }  
   
   }
   
 //---------------------------------addDataTocartButton---------------

 const adddatatocart = async(req,res)=>
 {
    tosave=await useremail(req.session.emailhold);
    tosave=tosave.recordset;
    console.log(tosave);
   console.log(tosave[0].uid);
   console.log(req.body.id);
   
   myreturn=await insertdatatocart(tosave[0].uid,req.body.id);
 }

 //--------------------------------MYcart Button------------------------
 const Mycartdata= async(req,res)=>
 {
    
    mycartsave=await readproducts(req.session.uid);
    mycarttosave=tosave.recordset;
    
    if(mycartsave.length!=0)
    {
        res.json(mycartsave);
    }
   
    else
    {
        res.send("no data found");

    }
 }

 //----------------------------------cartpage-----------------------------
 const cartpage=(req,res)=>{
    if(req.session.isLogedin===true)
    {
        res.render("cart");
    }
    else
    {
        erroroccur="",
        res.render("login",{error:erroroccur});
    }
    
}
//----------------------------addquantity-------------------------------
const addquantity= async(req,res)=>
 {
    
   

    mycartsave=await addone(req.body.qvan,req.body.pid,req.session.uid);
    
    if(mycartsave.length!=0)
    {
        res.json(mycartsave);
    }
   
    else
    {
        res.send("no data found");

    }
 }
//-----------------------------subquantity-------------------------------

const subquantity= async(req,res)=>
 {
    console.log(req.body)
    mycartsave=await subone(req.body.qvan,req.body.pid,req.session.uid);
   
    if(mycartsave.length!=0)
    {
        res.json(mycartsave);
    }
   
    else
    {
        res.send("no data found");

    }
 }
 //--------------------------------------------remoceitem from cart------------
 const removeitem= async(req,res)=>
 {
    mycartsave=await  deleteitem(req.body.pid,req.session.uid);
    mycarttosave=tosave.recordset;
    if(mycartsave.length!=0)
    {
        res.json(mycartsave);
    }
   
    else
    {
        res.send("no data found");

    }
   
}
//--------------------------------Adminhome-------------------------------------
const adminhomeget= async(req,res)=>
 {
        if(req.session.isLogedin)
        res.render("adminhome",{loginuser:req.session.loginuser});
    else
    res.redirect("login");
    
 }
//-----------------------addproductbutton-------------------------------------
 const addproductget= async(req,res)=>
 {
    if(req.session.isLogedin)
    {
        erroroccur="";
    res.render("addproduct",{error:erroroccur});
    }
    else
    res.redirect("login");
 }
 const addproductpost= async(req,res) =>
 {
    let obj={
        pname :req.body.pname,
        pdescription :req.body.pdescription,
        pprice : req.body.pprice,
        pquantity :req.body.pquantity,
        pimage: req.file.filename
    } 
    console.log(obj);
    myproduct=addproduct(obj);
    if(myproduct)
    {
        res.redirect("adminhome");
    }
 }
 //--------------------editproduct---------------
 const editproductget= async(req,res)=>
 {
    if(req.session.isLogedin)
    {
        erroroccur="";
    res.render("editproduct",{error:erroroccur});
    }
    else
    res.redirect("login");   
 }

 const editproductpost= async(req,res)=>
 {
    // console.log("editcalled");
    tosave = await  productsread( );
    tosave=tosave.recordset;
    // console.log(tosave);
      if(tosave!=null)
      {
       res.json(tosave);
      }
      else
           res.send("error");
  
 }

 const removeproduct= async(req,res)=>
 {
    mycartsave=await  deletefromproduct(req.body.id);
    mycarttosave=tosave.recordset;
    if(mycartsave.length!=0)
    {
        res.json(mycartsave);
    }
   
    else
    {
        res.send("no data found");

    }
   
}
const updateproduct= async(req,res)=>
 {
    console.log(req.body);
    if(req.body.pimage!=undefined)
    {
        mycarttosave=updatewithimage(req.body);
       
    if(mycarttosave)
    {
        res.rendirect("editproduct");
    }
    }
    else
    {
        mycarttosave=updatewithoutimage(req.body);
       
        if(mycarttosave)
        {
            res.redirect("editproduct");
        }
    }
 }
 


module.exports = {rootpage, loginget,loginpost,signupget,signuppost,logoutbutton,forgotget,forgotpost,getdata,verifypage,homeget,resetget,resetpost,adddatatocart,cartpage,Mycartdata,addquantity,subquantity,removeitem,adminhomeget,addproductget,addproductpost,editproductget,editproductpost,removeproduct,updateproduct}