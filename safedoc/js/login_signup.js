/*checking for same emai */
	function check_email()
	{
	 var email = btoa(document.getElementById("email").value);
	if(localStorage.getItem(email) != null)
	{
		if(password != "" || mobile != "")
		{
			document.getElementById("password").value="";
      	document.getElementById("mobile").value="";
        }
        	var email_box=document.getElementById("email");
		email_box.style.background="black";
		email_box.classList.add("pulse");
		setTimeout(function(){document.getElementById("checkmail").innerHTML="USER ALREADY EXISTS"},1000);

	document.getElementById("password").disabled=true;
	document.getElementById("mobile").disabled=true;
	document.getElementById("submit").disabled=true;
	document.getElementById("email").onclick=function()
	{
		 document.getElementById("checkmail").innerHTML="";
		email_box.style.background="";
	   document.getElementById("email").value="";
		document.getElementById("password").disabled=false;
	  document.getElementById("mobile").disabled=false;
	  document.getElementById("submit").disabled=false;
	}
	}
      else
      {
      	document.getElementById("password").disabled=false;
	document.getElementById("mobile").disabled=false;
	document.getElementById("submit").disabled=false;
      }
}
/* end of same email */
/* start of signup data entry */
function signup(){
	var name = btoa(document.getElementById("name").value);
    var email = btoa(document.getElementById("email").value);
	var password = btoa(document.getElementById("password").value);
	var mobile = btoa(document.getElementById("mobile").value);

	var user_input = {name:name,email:email,password:password,mobile:mobile};
	var user_data = JSON.stringify(user_input);
	if(name != "" && email != "" && password != "" && mobile != "")
	{
		setTimeout(function(){document.getElementById("signsuccess").innerHTML="sign up success";
			  document.getElementById("name").value="";
	     document.getElementById("email").value="";
		document.getElementById("password").value="";
      	document.getElementById("mobile").value="";
	},1000);
		setTimeout(function(){document.getElementById("signsuccess").innerHTML="";},3000);
	localStorage.setItem(email,user_data);
     }
      return false;
}
/* end of signup data entry */
/* start of login entry*/
function login()
{
var email=btoa(document.getElementById("login_email").value);
var password=btoa(document.getElementById("login_password").value);
var login_input={email:email,password:password};
var login_data = JSON.stringify(login_input);
 sessionStorage.setItem(email,login_data);
 var session_data = sessionStorage.getItem(email);
 var read_data = JSON.parse(session_data);
 if(localStorage.getItem(read_data.email) != null)
 {
    if(localStorage.getItem(read_data.email).match(read_data.password))
    {
    	location.replace("profile/index.html");
    	sessionStorage.setItem("user_mail",email);
    	return false;
    }
    else
    {
    	alert("password not found");
    }
 }
 else
 {
 	alert("user not found");
 }
}


/* end of login entry */