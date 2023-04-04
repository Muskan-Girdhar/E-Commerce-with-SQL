
let loadmore=document.getElementById("loadmore");
let Productarray=[];
let count=0;
let para;

loadmore.addEventListener("click",loadmoreproducts);

window.addEventListener("load",()=> 
{
    Productarray=[];
    let request= new XMLHttpRequest();
    request.open('post','/getdata',true);
    request.setRequestHeader('Content-Type','application/json');
     para={id:1};
    
    request.send(JSON.stringify(para));
    request.addEventListener('load',function(){
        if(request.status==200)
        {
            let data=JSON.parse(request.responseText);
            console.log("data");

            if(data.length!=0)
             {
           
            data.forEach(function(obj) 
            {
                addproducttohome(obj);
            });
        }
        else
        {
            alert("no more product found");
        }
    }
    });

});

 function loadmoreproducts()
{
    
    let request= new XMLHttpRequest();
    request.open('post','/getdata');
    request.setRequestHeader('Content-Type','application/json');
    para={id:0};
    request.send(JSON.stringify(para));
    

    request.addEventListener('load',function(){
        if(request.status==200)
        {
            let data=JSON.parse(request.responseText);
        

            if(data.length!=0)
             {
            
            // console.log("Productarray");
            // console.log(Productarray);
            data.forEach(function(obj) 
            {
                addproducttohome(obj);
            });
        }
        else
        {
            alert("no more product found");
        }
    }
    });
    
 }

 function addproducttohome(obj)
    {

    let products=document.getElementById("products");

    let newproductitem = document.createElement('div');
    newproductitem.setAttribute("class","productitem");

    newproductitem.innerHTML = 
    `<img  class="myimage" src="${obj.pimage}">
   <h4> ${obj.pname} </h4>
   <h4> ${obj.pprice}</h4>

   <div class="details hide" id=${obj.pid}>
    <h4>no_of_pieces:${obj.pdescription}</h4>
   </div>

    
    <div class="buttongroup">
         <button  class="btn"  onclick="cart(${obj.pid})" id="cart-${obj.pid}"> AddToCart</button> 
        <button   class="btn" onclick="showdescription(${obj.pid})" id="details-${obj.pid}">ShowDetails</button>
    </div>`
    products.appendChild(newproductitem);

 }
   

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
    
    
   
 

 function cart(myid)
 {
    let para={id:myid};
    let request= new XMLHttpRequest();
    request.open('post','/addDataToCart');
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify(para));
    request.addEventListener('load',function()
    {
    });
    
 }