let name=document.getElementById('name');
let password=document.getElementById('password');
var perror=document.getElementById("perror"); 

function vl()
{ 
   if(name.value ==''||password.value=='')
   { 
       perror.innerHTML="please fill details";
       return false;
   }
}