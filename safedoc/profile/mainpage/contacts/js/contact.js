function back_button()
{
  history.pushState('null','null',location.href);
  window.onpopstate=function()
  {
    history.forward();
  }
}
back_button();

window.onload = function()
{
  var chld = document.getElementById("contacts").children.length;
  if(chld == 0)
  {
    document.getElementById("contact_text").innerHTML="No Contact Found";
  }
}

function contact_pic()
{
  var c_pic = document.getElementById("contact_pic");
  var pic_data = localStorage.getItem(sessionStorage.getItem("user_mail")+"img_url");
  c_pic.style.background="url("+pic_data+")";
  c_pic.style.backgroundRepeat="no-repeat";
  c_pic.style.backgroundSize="cover";
}
contact_pic();

function check_input_field()
{
  var f_data = document.getElementById("fullname").value;
  var p_data = document.getElementById("contact_input1").value;
  var s_data = document.getElementById("contact_input2").value;
  if(f_data != "" && p_data != "" && s_data != "" )
  {
       if(p_data.length != 10)
       {
        alert("please enter valid primary no");
       }
       else if(s_data.length != 10)
       {
        alert("please enter valid secondary no");
       }
       else if((p_data.charAt(0) == 7 || p_data.charAt(0) == 8 || p_data.charAt(0) == 9)&&
        (s_data.charAt(0) == 7 || s_data.charAt(0) == 8 || s_data.charAt(0) == 9))
       {
        var c_input = {f_data:f_data,p_data:p_data,s_data:s_data};
        var c_details = JSON.stringify(c_input);
        localStorage.setItem(f_data+"contact",c_details);
        document.getElementById("cont_success").style.display="block";
        document.getElementById("reset_data").reset();
        setTimeout(function(){ document.getElementById("cont_success").style.display="none";},2000);
           window.location=location.href;
       }
       else
       {
        alert("starting no should be either 7 or 8 or 9");
       }
  }
  else
  {
    alert("some fields are empty");
  }
}


function show_contact()
{
      var i;
      for(i=0;i<localStorage.length;i++)
      {
        var keys=localStorage.key(i);
        if(keys.match("contact"))
        {
          var json_text = localStorage.getItem(keys);
          var json_extract = JSON.parse(json_text);
          var con = document.getElementById("contacts");
          var fieldset = document.createElement("FIELDSET");
          var legend = document.createElement("LEGEND");
          var ol = document.createElement("OL");
          ol.setAttribute("id","ol_design");
          var li_first = document.createElement("LI");
          var li_second = document.createElement("LI");
          var trash_del = document.createElement("I");
          var trash_edit = document.createElement("I");
          var saved_text = document.createElement("SPAN");
          var save = document.createElement("I");
          trash_del.setAttribute("class","fa fa-trash");
          trash_del.setAttribute("id","del_icon");
          trash_del.setAttribute("title","DELETE CONTACT");
          trash_edit.setAttribute("class","fa fa-edit");
          trash_edit.setAttribute("id","edit_icon");
          trash_edit.setAttribute("title","EDIT CONTACT");
          save.setAttribute("class","fa fa-save");
          save.setAttribute("id","save_icon");
          save.setAttribute("title","SAVE CONTACT");
          save.style.display="none";
          con.appendChild(fieldset);
          fieldset.appendChild(legend);
          fieldset.appendChild(ol);
          ol.appendChild(li_first);
          ol.appendChild(li_second);
          ol.appendChild(trash_del);
          ol.appendChild(trash_edit);
          ol.appendChild(save);
          ol.appendChild(saved_text);
          saved_text.appendChild(document.createTextNode("successfully saved"));
          saved_text.style.color="green";
          saved_text.style.display="none";
          legend.appendChild(document.createTextNode(json_extract.f_data));
          li_first.appendChild(document.createTextNode(json_extract.p_data));
          li_second.appendChild(document.createTextNode(json_extract.s_data));
          del_contact(keys,trash_del);
          edit_contact(keys,trash_edit,save,saved_text);
        }
      }
}
show_contact();

function del_contact(contact_name,del_btn)
{
  del_btn.onclick = function()
  {
    if(confirm("DO U WANT TO DELETE ?"))
    {
    var ol = this.parentElement;
    var olparent=ol.parentElement;
     olparent.remove();

  document.cookie=contact_name+"="+localStorage.getItem(contact_name)+";max-age:259200";
     localStorage.removeItem(contact_name);
     var chld = document.getElementById("contacts").children.length;
  if(chld == 0)
  {
    document.getElementById("contact_text").innerHTML="No Contact Found";
  }
  }
   }
}

function edit_contact(contact_name,edit_btn,save_btn,saved_text)
{
  edit_btn.onclick = function()
  {
    save_btn.style.display="block";
    var ol_text = this.parentElement;
    var f_text = ol_text.parentElement;
    var legend = f_text.getElementsByTagName("LEGEND");
    var li = f_text.getElementsByTagName("LI");
    var legend_recent;
    var legend_current;
    var li_recent = [];
     var li_current = [];
    legend[0].setAttribute("contentEditable","true");
    legend[0].focus();
    legend[0].style.backgroundColor="yellow";
    legend[0].style.color="black";
    for(var i=0;i<li.length;i++)
    {
    li[i].setAttribute("contentEditable","true");
     }
    legend[0].onclick = function()
    {
      legend_recent = legend[0].innerHTML;
    }
    legend[0].onblur=function()
    {
       legend_current = this.innerHTML;
    }
    li[0].onclick = function()
    {
      li_recent[0]=this.innerHTML;
    }
    li[0].onblur = function()
    {
      li_current[0]=li[0].innerHTML;
    }
    li[1].onclick = function()
    {
     li_recent[1] = li[1].innerHTML;
    }
    li[1].onblur = function()
    {
       li_current[1]=li[1].innerHTML;
    }  
    save_btn.onclick = function()
    {
      var edit_data = {f_data:legend_current == undefined ? li[0].innerHTML
        :legend_current,p_data:li_current[0] == undefined ? li[0].innerHTML : li_current[0],
        s_data:li_current[1] == undefined ? li[1].innerHTML : li_current[1] };
      var final_data = JSON.stringify(edit_data);
      var txt = localStorage.getItem(contact_name);
      var read_txt = JSON.parse(txt);
      if(edit_data.f_data != "" && edit_data.p_data != "" && edit_data.s_data != "")
      {
         if(edit_data.p_data.length == 10 && edit_data.s_data.length == 10 )
         {
          if((edit_data.p_data.charAt(0) == 7 || edit_data.p_data.charAt(0) == 8 || edit_data.p_data.charAt(0) == 9)
            &&(edit_data.s_data.charAt(0) == 7 || edit_data.s_data.charAt(0) == 8 || edit_data.s_data.charAt(0) == 9))
     {
      localStorage.setItem(contact_name,txt.replace(txt,final_data));
      saved_text.style.display="block";
      legend[0].style.backgroundColor="inherit";
      legend[0].style.color="white";
      save_btn.style.display="none";
          legend[0].setAttribute("contentEditable","false");
        for(var i=0;i<li.length;i++)
    {
    li[i].setAttribute("contentEditable","false");
     }
      setTimeout(function(){saved_text.style.display="none";},2000);
    } 
    else
    {
      alert('starting digit shold be 7 or 8 or 9');
    }
  }
    else
    {
      alert("contact number should be 10 digit");
    }
  }

    else
    {
      alert("some fields are empty");
    }
  }
}
}


function search_contact(contact_data)
{
  var i;
  var s_contact = contact_data.value.toUpperCase();
  var contact_list = document.getElementById("contacts");
  var legend = contact_list.getElementsByTagName("LEGEND");
    for(i=0;i<legend.length;i++)
    {
      if(legend[i].innerHTML.toUpperCase().indexOf(s_contact) != -1)
      {
        legend[i].parentElement.style.display="";
      }
      else
      {
         legend[i].parentElement.style.display="none";
      }
    }
}

function logout()
{
  var dates = new Date();
  var dt = dates.getDate();
  var mon = dates.getMonth()+1;
  var yr = dates.getFullYear();
  var tm = dates.toLocaleTimeString();
  var login = {date:dt,month:mon,year:yr,time:tm};
  var login_data = JSON.stringify(login);
  localStorage.setItem("last_login",login_data);
  // document.cookie="last_login="+dt+"-"+mon+"-"+yr+ "="+tm+";max-age:2592000";
  window.location="../../index.html";
}

function cross_btn()
{
  var cross_parent = document.getElementById("restore");
  var pic = document.getElementById("main_pic");
  var con_box = document.getElementById("contact_input_box");
  var con = document.getElementById("private_con");
  var c_pic = document.getElementById("contact_pic");
   cross_parent.style.height="0";
   pic.style.display="block";
   con_box.style.display="block";
   con.style.display="block";
   c_pic.style.display="block";
}

function restore()
{
  var restore_box = document.getElementById("restore");
  var d_text = document.getElementById("del_text");
   var pic = document.getElementById("main_pic");
  var con_box = document.getElementById("contact_input_box");
  var con = document.getElementById("private_con");
  var c_pic = document.getElementById("contact_pic");
  restore_box.style.height="100vh";
  restore_box.style.display="block";
  restore_box.style.transition="0.5s";
   pic.style.display="none";
   con_box.style.display="none";
   con.style.display="none";
   c_pic.style.display="none";
   if(document.cookie.length != 0)
   {
    d_text.innerHTML="Deleted Contact";
    var len = document.cookie.split(";");
    var i,j;
    for(i=0;i<len.length;i++)
    {
      var spl = len[i].split("=");
       for(j=0;j<spl.length;j++)
       {
        if(spl[j].indexOf("contact") == -1)
        {
          var extract = JSON.parse(spl[j]);
          var tbl = document.getElementById("restore_table");
           var tr = document.createElement("TR");
           var td_f_data = document.createElement("TD");
           var td_p_data = document.createElement("TD");
           var td_s_data = document.createElement("TD");
           var td_icon = document.createElement("TD");
           tr.appendChild(td_f_data);
           tr.appendChild(td_p_data);
           tr.appendChild(td_s_data);
           tr.appendChild(td_icon);
           td_f_data.appendChild(document.createTextNode(extract.f_data));
           td_p_data.appendChild(document.createTextNode(extract.p_data));
           td_s_data.appendChild(document.createTextNode(extract.s_data));
           var restore_icon = document.createElement("I");
           restore_icon.style.cursor="pointer";
           restore_icon.setAttribute("class","fa fa-refresh");
           td_icon.appendChild(restore_icon);
           tbl.appendChild(tr);
           restore_icon.onclick = function()
           {
            var td = this.parentElement;
            var tr = td.parentElement;
            tr.remove();
            var data = tr.getElementsByTagName("TD");
            var local_data = {f_data:data[0].innerHTML,p_data:data[1].innerHTML,s_data:data[2].innerHTML};
            var put_data = JSON.stringify(local_data);
            localStorage.setItem(data[0].innerHTML+"contact",put_data);
             document.cookie=data[0].innerHTML+"contact=; expires=Tue,2 Dec 2017 12:00:00 UTC";
            window.location=location.href;
           }
        }
       }
     }
   }
   else
   {
    d_text.innerHTML="No Deleted Contact";
   }
}
function check_last_login()
{
   var log = document.getElementById("login_box");
   var data=localStorage.getItem("last_login");
   var result = JSON.parse(data);
   if(data != null)
  {
  var log_text = document.getElementById("last_login_text");
  log.style.display="block";
  log.className="animated infinite bounce";
  log_text.innerHTML="last-login<br>"+result.date+"-"+result.month+"-"+result.year+"<br>"+result.time;
  setTimeout(function(){
  log.className="animated fadeOutUp";
  log.style.display="none";
  localStorage.removeItem("last_login");
  },5000);
}
}

check_last_login();

