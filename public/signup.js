 let signsubmit=document.getElementById('signsubmit');
 let name=document.getElementById('name');
 let email=document.getElementById('email');
 let password=document.getElementById('password');
 let phno=document.getElementById('phno');
 var hlo=document.getElementById("helo"); 
function vl(){
    if(name.value ==''||password.value==''||email.value==''||phno.value =='')
    { 
       
        console.log(hlo);
        hlo.innerHTML="please fill details"
        return false;
    }
}
