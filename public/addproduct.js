let pname=document.getElementById('pname');
 let pdescription=document.getElementById('pdescription');
 let pprice=document.getElementById('pprice');
 let pquantity=document.getElementById('pquantity');
 let pimage=document.getElementById('pimage');
 var text=document.getElementById("text"); 
function validation(){
    console.log(pimage);
    if(pname.value ==''||pprice.value==''||pimage.value==''||pquantity.value ==''||pdescription.value=='')
    { 
        text.innerHTML="please fill details"
        return false;
    }
}