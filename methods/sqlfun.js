const { newConnectionSQL } = require("./sqlDataBase");
let querypara;
let myresult;

async function userread()
{
   querypara= `select * from users`;
   myresult =await newConnectionSQL(querypara);
   return myresult;
}

async function userwrite(obj)
{
    try {

        querypara =`insert into users(uname,uemail,upassword,uphno)  values('${obj.uname}','${obj.uemail}','${obj.upassword}','${obj.uphno}')`;
      await newConnectionSQL(querypara);
        return true;
    }
    catch(err){
        console.log("error occured"+err)
        return false;
    }

}

async function productsread()
{
   querypara= `select * from products`;
   myresult =await newConnectionSQL(querypara);
//   console.log(myresult);
   return myresult;
}
async function userlogin(name,password)
{

    querypara=`select * from users where uname ='${name}' and upassword ='${password}'`;
    myresult=await newConnectionSQL(querypara);
        return myresult;
}
async function alterpassword(email,newpassword)
{

    try {

        querypara = `UPDATE users SET upassword = '${newpassword}' WHERE uemail = '${email}'`;
       
      await newConnectionSQL(querypara);
        return true;
    }
    catch(err){
        console.log("error occured"+err)
        return false;
    }
}
async function useremail(email)
{
    
    querypara=`select * from users where uemail ='${email}'`;
    myresult=await newConnectionSQL(querypara);
        return myresult;
}

async function insertdatatocart(uid,pid)
{
    querypara=`select * from cart where uid='${uid}' and pid='${pid}'`;
    myresult=await newConnectionSQL(querypara);
    myresult=myresult.recordset;
    if(myresult.length==0)
    {

        querypara =`insert into cart(uid,pid) values('${uid}','${pid}')`;
      await newConnectionSQL(querypara);
        return true;
    }
    else{
        console.log("error occured")
        return false;
    }

}

async function readproducts(uid)
{
   
    querypara=`select products.*,cart.quantity from products INNER JOIN cart on products.pid=cart.pid where  uid='${uid}'`;
    myresult=await newConnectionSQL(querypara);
    myresult=myresult.recordset;
    
    if(myresult.length!=0)
    {
       
       return myresult;
    }
    else
    {
        return ("error");
    }
    
  
}
async function addone(quan,pid,uid)
{

    querypara = `UPDATE cart SET quantity = ('${quan}'+${1}) WHERE uid = '${uid}' and pid='${pid}'`;  
      myresult=await newConnectionSQL(querypara);
      if(myresult.length!=0)
      {
         
         return myresult;
      }
       
}
async function subone(quan,pid,uid)
{

    querypara = `UPDATE cart SET quantity = ('${quan}'-${1}) WHERE uid = '${uid}' and pid='${pid}'`; 
    myresult=await newConnectionSQL(querypara);
    
    if(myresult.length!=0)
    {
       
       return myresult;
    }
     
}

async function deleteitem(pid,uid)
{
    querypara = `Delete from cart WHERE uid = '${uid}' and pid='${pid}'`; 
    myresult=await newConnectionSQL(querypara);
    if(myresult.length!=0)
    {
       
       return myresult;
    }
}

async function deletefromproduct(pid)
{
    try{
        querypara = `Delete from cart WHERE  pid='${pid}'`; 
        myresult=await newConnectionSQL(querypara);
        myresult= true;
    } 
    catch
    {
        myresult=false;
    }


if(myresult)
{
    querypara = `Delete from products WHERE  pid='${pid}'`; 
    myresult=await newConnectionSQL(querypara);
    if(myresult.length!=0)
    {
       
       return myresult;
    }
}
    
}

async function addproduct(obj)
{
    try {
       
     querypara =`insert into products(pname,pdescription,pprice,pquantity,pimage) values('${obj.pname}','${obj.pdescription}','${obj.pprice}','${obj.pquantity}','${obj.pimage}')`;
      await newConnectionSQL(querypara);
        return true;
    }
    catch(err){
        console.log("error occured"+err)
        return false;
    }

}
async function updatewithoutimage(obj)
{
    try{
    querypara = `UPDATE  products SET pname = '${obj.pname}', pdescription='${obj.pdescription}', pprice='${obj.pprice}', pquantity='${obj.pquantity}' WHERE pid = '${obj.pid}'`;
       
    await newConnectionSQL(querypara);
      return true;
  }
  catch(err){
      console.log("error occured"+err)
      return false;
}
}
async function updatewithimage(obj)
{
    console.log("object")
   
    try{
        querypara = `UPDATE  products SET pname = '${obj.pname}', pdescription='${obj.pdescription}' ,  pprice='${obj.pprice}', pquantity='${obj.pquantity}', pimage='${obj.pimage}' WHERE pid = '${obj.pid}'`;
           
        await newConnectionSQL(querypara);
          return true;
      }
      catch(err){
          console.log("error occured"+err)
          return false;
    }
}

module.exports = {userread,userwrite,userlogin,productsread,alterpassword,useremail,insertdatatocart,readproducts,addone,subone,deleteitem,addproduct,deletefromproduct,updatewithimage,updatewithoutimage}