
/* start of sidebar coding */
function back_button()
{
  history.pushState('null','null',location.href);
  window.onpopstate=function()
  {
    history.forward();
  }
}
back_button();

  function loginclose()
 {
	var login = document.getElementById("login-page");
	login.style.display="none";
 }

function loginpage()
{
    var loginpg = document.getElementById("login-page");
    loginpg.style.display="block";
    loginpg.style.animation="aftab 0.1s";
    loginpg.style.fillMode="forwards";
}
/* end of sidebar coding */
/* start of form validation */
//start of email validation
   	var upper = /[A-Z]/g;
   	var lower = /[a-z]/g;
   	var num = /[0-9]/g;
   var eval = document.getElementById("email");
   eval.onchange = function validation()
   {
      var e_value=document.getElementById("email").value;
      if((e_value.match("@gmail.com")) || (e_value.match("@yahoo.com")) )
      {
      	if(e_value.charAt(0).match(upper) || e_value.charAt(0).match(lower) || e_value.charAt(0).match(num))
      	{
	  document.getElementById("email").style.border="1px solid #ccc";
      	}
      	else
      	{
      		document.getElementById("email").style.border="1px solid red";
      		alert("please write atleast on character before @");
      		document.getElementById("email").value="";
      		}
      	}
       else
       {
       	alert("please enter valid mail id");
         document.getElementById("email").value="";
       }
   }
// end of email validation

// start of password validation
  var pass = document.getElementById("password");
   pass.onchange = function(){
   	var pvalue=document.getElementById("password").value;
   	if(pvalue.length >= 6)
   	{
   		if(pvalue.match(upper) && pvalue.match(lower) && pvalue.match(num))
   		{

   		}
   		else
   		{
   			alert("password must contain atleast one uppercase,lowercase,number and special character");
   			document.getElementById("password").value="";
   		}
   	}
   else
   {
   	alert("password length should be more than 5 character");
   	document.getElementById("password").value="";
   }
   }

// end of password validation
// start of mobile validation 
  var mob = document.getElementById("mobile");
  mob.onchange = function()
  {
  	var mvalue = document.getElementById("mobile").value;
  	if(mvalue.length != 10)
  	{
  		alert("not a valid mobile no");
  	}
  	else
  	{
  		if(mvalue.charAt(0) == 8 || mvalue.charAt(0) == 9 || mvalue.charAt(0) == 7 )
  		{
  			
  		}
  		else
  		{
  			alert("starting no should be 7 or 8 or 9");
  		}
  	}
  }
// end of mobile validation
/* end of form validation */