function contact_pic()
{
  var c_pic = document.getElementById("contact_pic");
  var pic_data = localStorage.getItem(sessionStorage.getItem("user_mail")+"img_url");
  c_pic.style.background="url("+pic_data+")";
  c_pic.style.backgroundRepeat="no-repeat";
  c_pic.style.backgroundSize="cover";
}
contact_pic();

function asset_logo()
{
 var c_logo = localStorage.getItem("company_logo");
  var logo = document.getElementById("asset_logo");
  logo.style.background="url("+c_logo+")";
  logo.style.backgroundSize="cover";
}
asset_logo();

function company_name()
{
  var c_name=document.getElementById("company_name");
  var c_data =localStorage.getItem("company");
  var c_text = JSON.parse(c_data);
  c_name.innerHTML=c_text.cmp_name;
}
company_name();
var p_con = document.getElementById("primary_content");
var s_con = document.getElementById("secondary_content");
var u_meas = document.getElementById("u_measure");
 u_meas.onclick=function()
 {
 this.style.webkitTransform="rotateX(180deg)";
 this.style.transform="rotateX(180deg)";
 this.style.transition="1s";
 this.style.webkitTransition="1s";
 p_con.style.transform="rotateX(-180deg)";
  s_con.style.transform="rotateX(-180deg)";
  p_con.style.display="none";
 s_con.style.display="block";
 var set_data = document.getElementById("set");
 set_data.onclick=function()
 {
  var sub = document.getElementById("form_sub");
  sub.onsubmit=function()
  {
  var data = s_con.getElementsByTagName("INPUT");
  var symbol = data[0].value;
  var formal_name = data[1].value;
  var input = {symbol:symbol,formal_name:formal_name};
  var unit_data = JSON.stringify(input);
  localStorage.setItem("unit_of_measure_"+symbol,unit_data);
}
}
 }

// start of close coding

var cls = document.getElementById("close_icon");
cls.onclick=function()
{
    u_meas.className="animated flipInX";
    u_meas.innerHTML=" <div id='primary_content'><i class='fa fa-balance-scale'></i>&nbsp&nbsp&nbspUnit of measures</div>";
    setTimeout(function(){ window.location=location.href;},1000);
   
}

function add_data()
{
  var table = document.getElementById("voucher_table");
  var tr = document.createElement('TR');
  var td_des = document.createElement("TD");
  var td_price = document.createElement("TD");
  var td_qty = document.createElement("TD");
  var td_amt = document.createElement("TD");
  var td_del = document.createElement("TD");
  var inp_des = document.createElement("INPUT");
  tr.className="animated fadeInDown";
  inp_des.type="text";
  inp_des.placeholder="item description";
  inp_des.className='item_data';
  var inp_price = document.createElement("INPUT");
  inp_price.type="number";
  inp_price.placeholder="0.00";
  inp_price.disabled=true;
  var inp_qty = document.createElement("INPUT");
  inp_qty.disabled=true;
  inp_qty.type="number";
  inp_qty.placeholder="0.00";
  var inp_amt = document.createElement("INPUT");
  inp_amt.type="number";
  inp_amt.placeholder="0.00";
  inp_amt.className="amount";
  var del_icon = document.createElement("I"); 
    del_icon.className="fa fa-trash";
    del_icon.style.fontSize="25px";
    del_icon.style.cursor="pointer";
  table.append(tr);
  tr.append(td_des);
  tr.append(td_price);
  tr.append(td_qty);
  tr.append(td_amt);
  tr.append(td_del);
  tr.setAttribute("id","input_field");
  td_des.append(inp_des);
  td_price.append(inp_price);
  td_qty.append(inp_qty);
  td_amt.append(inp_amt);
  td_del.append(del_icon);
  td_amt.onkeydown=function()
  {
    return false;
  }
  td_amt.oncontextmenu=function()
  {
    return false;
  }
  del_icon.onclick=function()
  {
    var del_par = del_icon.parentElement;
    var tr_par = del_par.parentElement;
     tr_par.className="animated fadeOutUp";
     setTimeout(function(){tr_par.remove();},1000)
  }

  inp_des.oninput=function()
  {
       this.onkeypress=function(event)
       {
        if(event.keyCode == 13)
        {
          var td_par = this.parentElement;
          var tr_par = td_par.parentElement;
          var tr_item = tr_par.getElementsByTagName("INPUT");
          tr_item[1].focus();
        }
       }
    inp_price.disabled=false;
    inp_price.oninput=function()
    {
       this.onkeypress=function(event)
       {
        if(event.keyCode == 13)
        {
          var td_par = this.parentElement;
          var tr_par = td_par.parentElement;
          var tr_item = tr_par.getElementsByTagName("INPUT");
          tr_item[2].focus();
        }
       }
      inp_qty.disabled=false;
      inp_qty.oninput=function(){
      inp_amt.value=(inp_price.value*inp_qty.value);
      var sum=0;
      var final_output=0;
      var output = document.getElementsByClassName("amount");
       var i;
      for(i=0;i<output.length;i++)
      {
        sum=sum+Number(output[i].value);
        document.getElementById("s_total").innerHTML="<i class='fa fa-rupee'>&nbsp</i>"+sum.toFixed(2);
      }
      var reserve=0;
        for(i=0;i<localStorage.length;i++)
        {
          var key_data = localStorage.key(i);
          if(key_data.indexOf('tax') != -1)
          {
            var key_item = localStorage.getItem(key_data);
            var key_result = JSON.parse(key_item);
            reserve=reserve+key_result.tax_percentage+"<br>"
            document.getElementById("td_box2").innerHTML="<span id='percentage' style='display:none;'>"+reserve.replace(0,"")+"</span>";
          }
        }
        var tax_out = document.getElementById("percentage").innerHTML;
        var tax_result = tax_out.split("%<br>");
        for(i=0;i<tax_result.length-1;i++)
        {
         var fixed = (sum*tax_result[i])/100;
         document.getElementById("td_box2").innerHTML+="<i class='fa fa-rupee'></i>  "+fixed.toFixed(2)+"<br>";
          final_output+=fixed; 
        }
        final_output+=sum;
        document.getElementById("total_cost").innerHTML="<i class='fa fa-rupee'></i>  "+final_output.toFixed(2);
        document.getElementById("due").innerHTML="<i class='fa fa-rupee'></i>  "+final_output.toFixed(2);
        var paid = document.getElementById("paid_amount");
        paid.oninput=function()
        {
          var final_payment=final_output-this.value;
        document.getElementById("due").innerHTML=final_payment.toFixed(2);
       }
      this.onkeypress = function(event)
      {
        if(event.keyCode == 13)
        {
          document.getElementById("add_item").click();
          var item_des = document.getElementsByClassName("item_data");
          item_des[item_des.length-1].focus();
        }
      }
    }
    }
  }
}
function add_item()
{
  var add = document.getElementById("add_item");
  add.onclick=function()
  {
    add_data();
  }
}
add_item();
function company_details()
{
    var result = localStorage.getItem("company");
    var data = JSON.parse(result);
    var c_details = document.getElementById("company_details");
    c_details.innerHTML=data.cmp_name+",  "+data.mail_name+"<br>"+"<address>"+data.address+"</address>";
  }
company_details();

function get_company_logo()
{
  var output = document.getElementById("company_logo_details");
  var cmp_logo = localStorage.getItem("company_logo");
   var i_logo = document.getElementById("img_logo");
   i_logo.src=cmp_logo;
   i_logo.style.width="49px";
    output.style.backgroundSize="cover";
    output.style.backgroundRepeat="no-repeat";
}
get_company_logo();
function close_invoices()
{
  var cls = document.getElementById("voucher_icon");
  cls.onclick= function()
  {
    var v_model = document.getElementById("voucher_model");
    // v_model.style.display="none";
    v_model.className="animated fadeOutUp";
     var a_logo = document.getElementById("asset_logo");
    var c_name = document.getElementById("company_name");
    var a_box = document.getElementById("asset_box");
    a_logo.style.display="block";
    c_name.style.display="block";
    a_box.style.display="block";
  }
}
close_invoices();

function sales_voucher()
{
  var sale_voucher = document.getElementById("s_voucher");
  sale_voucher.onclick=function()
  {
    var v_model= document.getElementById("voucher_model");
    v_model.style.display="block";
    v_model.className="animated fadeInDown";
    var a_logo = document.getElementById("asset_logo");
    var c_name = document.getElementById("company_name");
    var a_box = document.getElementById("asset_box");
    a_logo.style.display="none";
    c_name.style.display="none";
    a_box.style.display="none";
    var s_data = document.getElementById("voucher_field");
    var s_field = s_data.getElementsByTagName("INPUT");
    s_field[0].focus();
    s_field[0].style.borderColor="black";
    s_field[0].onkeyup =function(event)
    {
     if(event.keyCode == 13)
     {
      s_field[1].focus();
      s_field[1].style.borderColor="black";
      s_field[0].style.borderColor="#ccc";
     }
    }
    s_field[1].onkeyup =function(event)
    {
     if(event.keyCode == 13)
     {
      s_field[2].focus();
      s_field[2].style.borderColor="black";
       s_field[1].style.borderColor="#ccc";
     }
    }
 s_field[2].onkeyup =function(event)
    {
     if(event.keyCode == 13)
     {
      s_field[3].focus();
      s_field[3].style.borderColor="black";
       s_field[2].style.borderColor="#ccc";
     }
    }
    s_field[3].onkeyup =function(event)
    {
     if(event.keyCode == 13)
     {
       s_field[3].style.borderColor="#ccc";
      var item = document.getElementById("add_item");
       item.click();
       var i_data = document.getElementById("input_field");
       var first_item = i_data.getElementsByClassName("add_item")[0];
       first_item.focus();
     }
    }
  }
}
sales_voucher();

function billdate()
{
  var date = new Date();
  var dt = date.getDate();
  var mt = date.getMonth()+1;
  var yr = date.getFullYear();
  document.getElementById("dte").innerHTML+=dt+"-"+mt+"-"+yr;
}
billdate();

function tax_setup()
{
  var tax_text=document.getElementById('tax_setup');
  var tax_frm = document.getElementById("tax_form");
  var t_link=document.getElementById("tax_link");
  t_link.onclick=function()
  {
    if(tax_text.offsetHeight == '43')
    {
      tax_text.style.height="200";
      tax_text.className="animated bounce";
      tax_form.style.display="block";
      var t_value=document.getElementById("tax_value");
      t_value.onchange=function()
      {
        if(this.value.indexOf('tax') != -1)
        {
           var t_per = document.getElementById("tax_percentage");
            t_per.oninput=function()
            {
              if(this.value.charAt(0).indexOf("%") == -1)
              {
                tax_frm.onsubmit=function()
                {
                  if(t_per.value.indexOf("%") != -1)
                  {
                   var regex = /[a-z!=@#+$_^&*({;:"'|\][?/<,.>})-]/i; 
                   var mth = t_per.value.match(regex);
                   if(mth == null)
                   {
                    var tax_data = {tax_name:t_value.value,tax_percentage:t_per.value};
                    var tax_string = JSON.stringify(tax_data);
                    localStorage.setItem(t_value.value,tax_string);
                   }
                  }
                  else
                  {
                    t_per.value="0-9 and % are allowed only";
                    t_per.className="animated infinite pulse";
                    t_per.style.borderColor="red";
                    t_per.style.color="red";
                    t_per.onclick=function()
                    {
                    t_per.value="";
                    t_per.className="";
                    t_per.style.borderColor="";
                    t_per.style.color="";
                    }
                    return false;
                  }
                }
                
              
              }
              else
              {
                t_per.value="% not allowed at first place";
                t_per.style.color="red";
                t_per.style.borderColor="red";
                t_per.className="animated infinite pulse";
                t_per.onclick=function(){
                t_per.value="";
                t_per.style.color="";
                t_per.style.borderColor="";
                t_per.className="";
                }
              }
            }
        }
        else
        {
          this.style.borderColor="red";
          this.value="tax term not found";
          this.style.color="red";
          this.className="animated infinite pulse";
          this.onclick=function()
          {
          this.style.borderColor="";
          this.value="";
          this.className="";
          this.style.color="";
          }
        }
      }
    }
    else
    {
      tax_text.style.height="43";
      tax_text.className="";
      tax_form.style.display="none";
    }
  }
}
tax_setup();

function get_tax_details()
{
  var tax_box = document.getElementById("td_box");
  var sub_total = document.getElementById("s_total").innerHTML;
 var i;
 for(i=0;i<localStorage.length;i++)
 {
   var l_data = localStorage.key(i);
   if(l_data.indexOf('tax') != -1)
   {
    var result= localStorage.getItem(l_data);
    var tax_data=JSON.parse(result);
    tax_box.innerHTML+=tax_data.tax_name+"("+tax_data.tax_percentage+")"+"<br>";
    td_box2.innerHTML+=sub_total+"<br>";
   }
 }
}
get_tax_details();

function get_bill()
{
  var g_bill = document.getElementById("get_bill");
  g_bill.onclick=function()
  {
    var v_model = document.getElementById("voucher_model");
    v_model.style.width="100%";
    v_model.style.top="0";
    v_model.style.left="0";
    document.getElementById("voucher_icon").style.display="none";
    this.style.display="none";
    document.getElementById("business_box").style.display="none";
    document.getElementById("add_item").style.display="none";
    var i_field = document.getElementById("voucher_field");
    var v_field = i_field.getElementsByTagName("INPUT");
    var i;
    for(i=0;i<v_field.length;i++)
    {
     v_field[i].style.display="none";
    }
    var t_box=document.getElementById("tax_right_box");
    var td_box = t_box.getElementsByTagName("TD");
    for(i=0;i<td_box.length;i++)
    {
      td_box[i].style.border="1px solid #ccc";
    }
  }

}
get_bill();