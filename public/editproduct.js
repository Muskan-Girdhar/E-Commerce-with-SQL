
window.addEventListener("load",()=> 
{
    callproduct();

});

function callproduct()
{
    products.innerHTML="";
    console.log("windowcall");
    let request= new XMLHttpRequest();
    request.open('post','/editproduct',true);
    request.setRequestHeader('Content-Type','application/json');
     
    
    request.send();
    request.addEventListener('load',function(){
        if(request.status==200)
        { 
            let data=JSON.parse(request.responseText);
            data.forEach(function(obj) 
            {
                addproducttohome(obj);
            });
        }
        
    });
}
function addproducttohome(obj)
    {
   let products=document.getElementById("products");

    let newproductitem = document.createElement('div');
    newproductitem.setAttribute("class","productitem");

    newproductitem.innerHTML = 
    ` <form id="${obj.pid}" method="POST"  action="/updateproduct" enctype="multipart/form-data">
    <img  class="myimage" src="${obj.pimage}">
    <input type="text" style="display:none" name="pid" value="${obj.pid}">
    
    <div class="group">
    <label for="pname">  Product Name:</label>
    <input type="text"  id="pname" name="pname" value="${obj.pname}" required>
    </div>
    <div class="group">
    <label for="pdescription">  Product Description:</label>
    <input type="text" id="pdescription"  name="pdescription" value="${obj.pdescription}" required >
   </div>
    <div class="group">
    <label for="pprice">  Product price:</label>
    <input type="text" id="pprice" name="pprice" value="${obj.pprice}"required>
   </div>
     <div class="group">
    <label for="pquantity">  Product quantity:</label>
    <input type="text"  id='pquantity' name="pquantity"value="${obj.pquantity}"required>
    </div>
     <div class="group"> 
        <label for="pimage">  Product image:</label>
        <input type="file" id="pimage" name="pimage"  value="${obj.pimage}" >
    </div>
    
    <div class="buttongroup">
         <input type="submit" class="btn"   value="update" id="update-${obj.pid}" > 
        <button   class="btn" onclick="deleteproduct(${obj.pid})" id="delete-${obj.pid}">Delete</button>
    </div>
    </form>`
    products.appendChild(newproductitem);

    }

    
    function deleteproduct(myid)
    {
       
        let para={id:myid};
    let request= new XMLHttpRequest();
    request.open('post','/deleteproduct');
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify(para));
    request.addEventListener('load',function()
    {
        if(request.status==200)
            {
                console.log("incall");
                callproduct();
            }
    });
    }