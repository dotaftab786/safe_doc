/* start coding of pic upload */
function back_button()
{
  history.pushState('null','null',location.href);
  window.onpopstate=function()
  {
    history.forward();
  }
}
back_button();

function upload_pic()
{
	var input = document.getElementById("pic_input");
	var freader = new FileReader();
	if(input.files[0].size < 1000000)
	{
	freader.readAsDataURL(input.files[0]);
	freader.onloadend = function(event)
	{
      var show = document.getElementById("pic_upload");
      var image_url = event.target.result;
      show.style.backgroundImage="url("+event.target.result+")";
      show.style.backgroundRepeat="no-repeat";
      show.style.backgroundSize="cover";
      document.getElementById("next_page").style.display="block";
      document.getElementById("pic_icon").style.display="none";
      document.getElementById("next_page").onclick=function()
      {
      	localStorage.setItem(sessionStorage.getItem("user_mail")+"img_url",image_url);
        location.replace("profile/mainpage/index.html");
       window.location = location.href;
     }
 }
}
 else
 {
 	alert("please upload sizeof 1 mb Image");
 }
}
function profile_name()
{
  var result= document.getElementById("pic_name");
  var session_mail = sessionStorage.getItem("user_mail");
  var local_input = localStorage.getItem(session_mail);
  var local_data = JSON.parse(local_input);
  var fullname = local_data.name;
  result.innerHTML=atob(fullname);
}
profile_name();

function stop_upload()
{
  if(localStorage.getItem(sessionStorage.getItem("user_mail")+"img_url") != null)
  {
    location.replace("mainpage/index.html");
  }
}
stop_upload();

