function back_button()
{
  history.pushState('null','null',location.href);
  window.onpopstate=function()
  {
    history.forward();
  }
}
back_button();

var con = document.getElementById("cnt");
con.onclick=function()
{
  location.href="contacts/contact.html";
  setTimeout(function(){alert();},2000);
}
function upload_main_page_pic(){
  var pic_name = document.getElementById("main-page-name");
   var main_pic = document.getElementById("main-page-pic");
  var session_data = sessionStorage.getItem("user_mail");
  var local_data = localStorage.getItem(session_data);
  var local_input = JSON.parse(local_data);
  pic_name.innerHTML=atob(local_input.name);
  var pic_box=localStorage.getItem(sessionStorage.getItem("user_mail")+"img_url");
 main_pic.style.backgroundImage="url("+pic_box+")";
 main_pic.style.backgroundRepeat="no-repeat";
 main_pic.style.backgroundSize="cover";
 }
upload_main_page_pic();

/* end of coding of pic upload */
// start of logout coding 
 function logout()
 {
  sessionStorage.clear();
  var txt = document.getElementById("main_page_text");
  txt.style.display="block";
 setTimeout(function(){window.location="../../index.html";},2000);
 }

//end of logout coding