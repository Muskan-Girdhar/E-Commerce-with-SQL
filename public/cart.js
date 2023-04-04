
let count=0;
let i=0;
let products=document.getElementById("cartproducts");

window.addEventListener("load",()=> 
{

   ourproduct();
 

});

 function ourproduct()
{
    products.innerHTML="";
    let productdata=[];
    let request= new XMLHttpRequest();
    request.open('post','/cartdata',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send();   
    request.addEventListener('load',function(){
        if(request.status==200)
        {
             productdata=JSON.parse(request.responseText);
           
            if(productdata.length!=0)
             {
            productdata.forEach(function(obj) 
            {
                addproducttocart(obj);
            });
        }
        
        // else
        // {
        //     alert("no more product found");
        // }
    }
    });
    
}

function addproducttocart(obj)
    { 
     
    let newcartproductitem = document.createElement('div');
    newcartproductitem.setAttribute("class","cartproductitem");
        console.log(obj);
    newcartproductitem.innerHTML = 
    `<img  id="myimg" src="${obj.pimage}">
    <div class="productname"> <h4> ${obj.pname} </h4>
    <h4>price:${obj.pprice}</h4> </div>
    <div class="quantity">
    <h4 id="qvantext-${obj.id}" >Quantity:${obj.quantity}</h4>
        <button  class="btn"  onclick="addquantity(${obj.quantity},${obj.pid},${obj.pquantity})" id="add"> + </button> 
        <button   class="btn" onclick="subquantity(${obj.quantity},${obj.pid})" id="sub"> - </button>
    </div>

    <div class="details hide" id=${obj.pid}>
    
    <h4>${obj.pdescription}</h4>
    </div>

    <div class="buttongroup">
         <button  class="btn" onclick="removefromcart(${obj.pid})" id="cart-${obj.pid}"> delete</button> 
        <button   class="btn" onclick="showdescription(${obj.pid})" id="details-${obj.pid}">ShowDetails</button>
    </div>`
    products.appendChild(newcartproductitem);
    
 }

 function subquantity(qvan,pid)
 {
    
    if(qvan>1)
    {
        let request= new XMLHttpRequest();
    request.open('post','/subquantity',);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({qvan:qvan,pid:pid}));   
    request.addEventListener('load',function(){
        if(request.status==200)
        {
        //      productdata=JSON.parse(request.responseText);
          
        //     if(productdata.length!=0)
        //      {
        //     productdata.forEach(function(obj) 
        //     {
                
        //         addproducttocart(obj);
        //     });
        // }
        ourproduct();
    }
    });   
 }
 else
 {
    removefromcart(pid);
 }
}

 function addquantity(qvan,pid,pquan)
 {  
    console.log(pquan);
    if(qvan<pquan)
    {
    let request= new XMLHttpRequest();
    request.open('post','/addquantity');
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({qvan:qvan,pid:pid}));   
    request.addEventListener('load',function(){
            if(request.status==200)
            {
                //  productdata=JSON.parse(request.responseText);
              
                // if(productdata.length!=0)
                //  {
                // productdata.forEach(function(obj) 
                // {
                //     addproducttocart(obj);
                // });

                ourproduct();
            }
        });
           
     }
    
     
    }
  
   
 

//---------------------------------------------------------
 function showdescription(myid)
 {
    mydetails=document.getElementById(myid);
    
    
    if(count==0)
    { mydetails.classList.remove("hide");
        mydetails.classList.add("show");
        
        count=1;
    }
   else
    {
        mydetails.classList.remove("show");
        mydetails.classList.add("hide");
        
        count=0;
    }
        
    }
//------------------------------------

function removefromcart(pid)
 {
   
    let request= new XMLHttpRequest();
    request.open('post','/removeitem');
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({pid:pid}));   
    request.addEventListener('load',function(){
            if(request.status==200)
            {
                ourproduct();
            }
        });
 }
