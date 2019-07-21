/* start check browser coding */
function check_browser()
{
	if(navigator.userAgent.indexOf('MSIE') != -1)
	{
		var web = document.getElementById("webpage");
		web.style.display="none";
		document.body.style.background="black";
		document.body.style.innerHTML="<h1 align='center'>please open in chrome</h1>";
	    document.body.style.color="white";
	}
}
check_browser();
/* end of checkbrowser coding */

/* start of checking cookie enabled coding */
function check_cookie()
{
	if(navigator.cookieEnabled == false)
	{
      var web = document.getElementById("webpage");
		web.style.display="none";
		document.body.style.background="black";
		document.body.style.innerHTML="<h1 align='center'>please Enabled Cookie</h1>";
		document.body.style.color="white";
	}
}
check_cookie();
/* end of checking cookie enabled coding */