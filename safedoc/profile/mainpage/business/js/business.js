function contact_pic()
{
  var c_pic = document.getElementById("contact_pic");
  var pic_data = localStorage.getItem(sessionStorage.getItem("user_mail")+"img_url");
  c_pic.style.background="url("+pic_data+")";
  c_pic.style.backgroundRepeat="no-repeat";
  c_pic.style.backgroundSize="cover";
}
contact_pic();

var bs = document.getElementById("business_table_icon");
var cmp = bs.getElementsByTagName("button");
var i;
for(i=0;i<cmp.length;i++)
{
cmp[i].onmouseover=function()
{
     this.className="animated pulse";
     this.transition="0.5s";
     this.webkitTransition="0.5s";
}
}
for(i=0;i<cmp.length;i++)
{
cmp[i].onmouseout=function()
{
     this.className="";
}
}

var c_cmp = document.getElementById("create_cmp");
c_cmp.onclick=function()
{
    var form_box = document.getElementById("business_form_box");
    if(form_box.offsetHeight == 0)
    {
      form_box.style.display="block";
      form_box.style.height="300px";
      form_box.className="animated slideInDown";
      form_box.style.transition="0.5s";
      this.innerHTML="Close company";
    }
    else
    {
      form_box.style.height="0px";
      form_box.className="animated slideOutUp";
      this.innerHTML="Create company";
    }
}

// Start of form validation
function form_validation()
{
var add = document.getElementById("address");
var mob = document.getElementById("mobile");
var web = document.getElementById("website");
var email = document.getElementById("email");
var fax = document.getElementById("fax");
var sel = document.getElementById("select");
var cmp_name = document.getElementById("company_name");
cmp_name.onchange=function()
{
    if(isNaN(this.value))
    {
        var mail_name = document.getElementById("mailing_name");
        mail_name.onchange=function()
        {
            if(mail_name.value.indexOf(cmp_name.value+".pvt.ltd") != -1 || mail_name.value.indexOf(cmp_name.value+".gov.ltd") != -1)
            {
                var f_data = document.getElementById("finance");
                f_data.onchange = function()
                {
                   var date = new Date();
                   var dt = date.getDate();
                   var mon = date.getMonth()+1;
                   var yr = date.getFullYear();
                   var selected_yr =new Date(f_data.value);
                   if(yr <= selected_yr.getFullYear())
                   {
                     if(selected_yr.getMonth()+1 == 4)
                     {
                        if(selected_yr.getDate() == 1)
                        {
                            var s_form = document.getElementById("form");
                            s_form.onsubmit=function()
                            {
                            var data = {cmp_name:cmp_name.value,mail_name:mail_name.value,website:web.value,address:add.value,email:email.value,fax:fax.value,stock_type:sel.value,mobile:mob.value,finance:f_data.value};
                            var input_data = JSON.stringify(data);
                            localStorage.setItem("company",input_data);
                            window.location=location.href;
                            }
                        }
                        else
                        {
                             this.type="text";
                     this.value="financial year start date should be 1st ";
                     this.style.fontSize="12px";
                     this.style.color="red";
                     this.className="animated infinite pulse"; 
                      this.onclick=function()
                     {
                      this.type="date";
                     this.value="";
                     this.style.fontSize="inherit";
                     this.style.color="inherit";
                     this.className="";
                     }
                        }
                     }
                     else
                     {
                       this.type="text";
                     this.value="financial year month should be 4rth ";
                     this.style.fontSize="12px";
                     this.style.color="red";
                     this.className="animated infinite pulse"; 
                      this.onclick=function()
                     {
                      this.type="date";
                     this.value="";
                     this.style.fontSize="inherit";
                     this.style.color="inherit";
                     this.className="";
                     }
                     }
                   }
                   else
                   {
                     this.type="text";
                     this.value="financial yr should be greater or equal to current yr";
                     this.style.fontSize="11px";
                     this.style.color="red";
                     this.className="animated infinite pulse";
                     this.onclick=function()
                     {
                      this.type="date";
                     this.value="";
                     this.style.fontSize="inherit";
                     this.style.color="inherit";
                     this.className="";
                     }
                   }
                }
            }
            else
            {
              this.value="mailing name should be abc.pvt.ltd,.gov.ltd";
              this.style.fontSize="12px";
              this.className="animated infinite pulse";
              this.style.color="red"; 
              this.onclick=function()
            {
            this.value="";
            this.style.fontSize="";
            this.className="";
            this.style.color="inherit";
            }
            }
        }
    }
    else
    {
        this.value="whoops! only number not allowed";
        this.style.fontSize="13px";
        this.className="animated infinite pulse";
        this.style.color="red";
        this.onclick=function()
        {
        this.value="";
        this.style.fontSize="";
        this.className="";
        this.style.color="inherit";
        }
    }
}
}
form_validation();
function company_name()
{
  var local_data = localStorage.getItem("company");
  if(local_data != null)
  {
   var data = localStorage.getItem("company");
   var output = JSON.parse(data);
   c_cmp.innerHTML="<h4 style='padding:0; margin:0; font-family:Rightous; color:red; font-size:22px; font-weight:bold;'>"+output.cmp_name+"</h4>";
  var hm = document.getElementById("home");

  hm.className="fa fa-upload animated infinite flash";
  hm.title="please upload logo of company 60*60";
  hm.onclick=function()
  {
    var input = document.createElement("INPUT");
    input.type="file";
    input.accept="images/*";
    input.click();
    input.onchange=function()
    { 
        if(input.files[0].size < 512000)
        {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload=function()
        {
            var output = reader.result;
            localStorage.setItem("company_logo",output);
            window.location=location.href;
        }
    }
    else
    {
        var upload = document.getElementById("upload_notice");
        upload.className="fa fa-warning";
        upload.innerHTML=" please upload less than 512kb logo size";
        setTimeout(function(){
             upload.className="";
        upload.innerHTML="";
        },3000);
    }
    }
  }
   c_cmp.onclick=function()
   {
    if(localStorage.getItem("company_logo") != null)
    {
    window.location="business_asset/account_only.html";
}
   }
  }
}
company_name();

function company_logo()
{
  var c_logo = localStorage.getItem("company_logo");
  if(c_logo != null)
  {
    var hm = document.getElementById("home");
    var comp_logo = localStorage.getItem("company_logo");
     hm.style.background="url("+comp_logo+")";
     hm.style.backgroundSize="cover";
     hm.className="";
  }
}
company_logo();

var del = document.getElementById("del_cmp");
del.onclick=function()
{
    if(localStorage.getItem("company") != null)
    {
    var del_con = document.getElementById("delete_condition");
    del_con.style.display="block";
    del_con.className="animated fadeInDown";
    var o_btn = document.getElementById("ok_btn");
    o_btn.onclick=function()
    {
     localStorage.removeItem("company");
     localStorage.removeItem("company_logo");
     window.location=location.href;
    }
    var c_btn = document.getElementById("del_btn");
    c_btn.onclick=function()
    {
        del_con.style.display="none";
        del_con.className="animated fadeOutUp";
    }
}
else
{
  var txt = document.getElementById("del_notice");
  txt.style.display="block";
  txt.innerHTML="<i class='fa fa-warning'></i> no company found";
  setTimeout(function(){
 txt.style.display="none";
  txt.innerHTML="";
  },3000)
}
}


// start of logout coding
var log = document.getElementById("logout");
log.onclick=function()
{
 sessionStorage.clear();
 var text = document.getElementById("log_text");
 text.style.display="block";
 setTimeout(function(){window.location="../../../index.html";
  },3000);
}