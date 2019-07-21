$(document).ready(function(){
		$("#go_link").on("tap",function(){
			if(localStorage.getItem("app_user") == null)
			{
				$(this).attr("href","#go");
			}
			else
			{
				$(this).removeAttr("data-rel");
				$(this).removeAttr("data-position-to");
				$(this).attr("href","#welcome");
			}
		})
});
// swipe up and down coding
$(document).ready(function(){
	$("#homepage").on("swipeup",function(){
	$("#footer").slideDown(100,function(){
		$("#homepage").on("swipedown",function(){
			$("#footer").slideUp(100);
		})
	});
	});
});

$(document).ready(function(){
  $("#form-submit").on("submit",function(){
   if($("#firstname").val() != "" && $("#lastname").val() != "")
 {
 	var user = $("#firstname").val()+" "+$("#lastname").val();
 	localStorage.setItem("app_user",user);
 	$.mobile.navigate("#welcome",{transition:"turn"});
 	
 }

   });
});
//youtube search api
$(document).ready(function(){
	$("#search_youtube_data").submit(function(){
		$("#list_video_item").html('');
		var s_data = $("#search_video").val();
		$.ajax(
		{
			type:'get',
			url:'https://www.googleapis.com/youtube/v3/search',
			data:{
	            part:"snippet,id",
				q:s_data,
				type:"video",
				key:"AIzaSyA_1_-1E-Be5hMU8CVjYB7c_J-DcX9OQzg",
			},
			beforeSend:function(){
             $("#fa_spinner").fadeIn();
			},
			  success: function(data)	
			   {
			   	$("#fa_spinner").css("display","none");
			   	var next_token = data.nextPageToken;
			   	var prev_token = data.prevPageToken;
			   	   console.log(data);
			     	$(data.items).each(function(){
			   		var thumb_pic = "<img src='"+this.snippet.thumbnails.high.url+"' width='80' height='80'>"
			   		var video_name = "<h4>"+this.snippet.title+"</h4>"
			   		var video_desc = "<p>"+this.snippet.channelTitle+"</p>"
			   		var video_link = "https://m.youtube.com/watch?v="+this.id.videoId;
			   		$("#list_video_item").append("<li><a href='#'>"+thumb_pic+video_name+video_desc+"</a></li>");
			   		$("#list_video_item").listview('refresh');
			   		$("#list_video_item li a").click(function
			   			(){
			   				window.location = video_link;
			   			});
			   	});
                if(prev_token == undefined || !prev_token)
                {
                    $("#next").css("display","block");
                    $("#next").attr("mytoken",next_token);
                    $("#next").attr("mykeyword",s_data);
                     $("#prev").css("display","none");
                }
                else{
                $("#next").css("display","block");
                $("#prev").css("display","block");
                $("#next").attr("mytoken",next_token);
                $("#next").attr("mykeyword",s_data);
                $("#prev").attr("mytoken",prev_token);
                $("#prev").attr("mykeyword",s_data);
                }
			   }
			});
		return false;
	});
});

$(document).ready(function(){
	$("#next").click(function(){
		var mytoken = $("#next").attr("mytoken");
		var mykeyword = $("#next").attr("mykeyword");
		$("#list_video_item").html('');
		//var s_data = $("#search_video").val();
		$.ajax(
		{
			type:'get',
			url:"https://www.googleapis.com/youtube/v3/search",
			data:{
	            part:"snippet,id",
				q:mykeyword,
				type:"video",
				key:"AIzaSyA_1_-1E-Be5hMU8CVjYB7c_J-DcX9OQzg",
				pageToken:mytoken
			},
			beforeSend:function(){
             $("#fa_spinner").fadeIn();
			},
			  success: function(data)	
			   {
			   	$("#fa_spinner").css("display","none");
			   	var next_token = data.nextPageToken;
			   	var prev_token = data.prevPageToken;
			   	   console.log(data);
			     	$(data.items).each(function(){
			   		var thumb_pic = "<img src='"+this.snippet.thumbnails.high.url+"' width='80' height='80'>"
			   		var video_name = "<h4>"+this.snippet.title+"</h4>"
			   		var video_desc = "<p>"+this.snippet.channelTitle+"</p>"
			   		var video_link = "https://m.youtube.com/watch?v="+this.id.videoId;
			   		$("#list_video_item").append("<li><a href='#'>"+thumb_pic+video_name+video_desc+"</a></li>");
			   		$("#list_video_item").listview('refresh');
			   		$("#list_video_item li a").click(function
			   			(){
			   				window.location = video_link;
			   			});
			   	});
                if(prev_token == undefined || !prev_token)
                {
                    $("#next").css("display","block");
                    $("#next").attr("mytoken",next_token);
                    $("#next").attr("mykeyword",mykeyword);
                     $("#prev").css("display","none");
                }
                else{
                $("#next").css("display","block");
                $("#prev").css("display","block");
                $("#next").attr("mytoken",next_token);
                $("#next").attr("mykeyword",mykeyword);
                $("#prev").attr("mytoken",prev_token);
                $("#prev").attr("mykeyword",mykeyword);
                }
			   }
			});

		return false;
	});
});
$(document).ready(function(){
	$("#prev").click(function(){
		var mytoken = $("#prev").attr("mytoken");
		var mykeyword = $("#prev").attr("mykeyword");
		$("#list_video_item").html('');
		//var s_data = $("#search_video").val();
		$.ajax(
		{
			type:'get',
			url:"https://www.googleapis.com/youtube/v3/search",
			data:{
	            part:"snippet,id",
				q:mykeyword,
				type:"video",
				key:"AIzaSyA_1_-1E-Be5hMU8CVjYB7c_J-DcX9OQzg",
				pageToken:mytoken
			},
			beforeSend:function(){
             $("#fa_spinner").fadeIn();
			},
			  success: function(data)	
			   {
			   	$("#fa_spinner").css("display","none");
			   	var next_token = data.nextPageToken;
			   	var prev_token = data.prevPageToken;
			   	   console.log(data);
			     	$(data.items).each(function(){
			   		var thumb_pic = "<img src='"+this.snippet.thumbnails.high.url+"' width='80' height='80'>"
			   		var video_name = "<h4>"+this.snippet.title+"</h4>"
			   		var video_desc = "<p>"+this.snippet.channelTitle+"</p>"
			   		var video_link = "https://m.youtube.com/watch?v="+this.id.videoId;
			   		$("#list_video_item").append("<li><a href='#'>"+thumb_pic+video_name+video_desc+"</a></li>");
			   		$("#list_video_item").listview('refresh');
			   		$("#list_video_item li a").click(function
			   			(){
			   				window.location = video_link;
			   			});
			   	});
                if(prev_token == undefined || !prev_token)
                {
                    $("#next").css("display","block");
                    $("#next").attr("mytoken",next_token);
                    $("#next").attr("mykeyword",mykeyword);
                     $("#prev").css("display","none");
                }
                else{
                $("#next").css("display","block");
                $("#prev").css("display","block");
                $("#next").attr("mytoken",next_token);
                $("#next").attr("mykeyword",mykeyword);
                $("#prev").attr("mytoken",prev_token);
                $("#prev").attr("mykeyword",mykeyword);
                }
			   }
			});
		return false;
	});
}); 


$(document).ready(function(){
	if(localStorage.getItem("app_user") != null)
	{
		$("#app_user_data").html(localStorage.getItem('app_user'));
	}
});

$(document).ready(function(){
	if(localStorage.getItem("app_key") == null)
	{
		localStorage.setItem("app_key","new song");
	}
	else
	{
         setTimeout(function(){
         $("#list_video_item").html('');
		var s_data = localStorage.getItem("app_key");
		$.ajax(
		{
			type:'get',
			url:'https://www.googleapis.com/youtube/v3/search',
			data:{
	            part:"snippet,id",
				q:s_data,
				type:"video",
				key:"AIzaSyA_1_-1E-Be5hMU8CVjYB7c_J-DcX9OQzg",
			},
			beforeSend:function(){
             $("#fa_spinner").fadeIn();
			},
			  success: function(data)	
			   {
			   	$("#fa_spinner").css("display","none");
			   	var next_token = data.nextPageToken;
			   	var prev_token = data.prevPageToken;
			   	   console.log(data);
			     	$(data.items).each(function(){
			   		var thumb_pic = "<img src='"+this.snippet.thumbnails.high.url+"' width='80' height='80'>"
			   		var video_name = "<h4>"+this.snippet.title+"</h4>"
			   		var video_desc = "<p>"+this.snippet.channelTitle+"</p>"
			   		var video_link = "https://m.youtube.com/watch?v="+this.id.videoId;
			   		$("#list_video_item").append("<li><a href='#'>"+thumb_pic+video_name+video_desc+"</a></li>");
			   		$("#list_video_item").listview('refresh');
			   		$("#list_video_item li a").click(function
			   			(){
			   				window.location = video_link;
			   			});
			   	});
                if(prev_token == undefined || !prev_token)
                {
                    $("#next").css("display","block");
                    $("#next").attr("mytoken",next_token);
                    $("#next").attr("mykeyword",s_data);
                     $("#prev").css("display","none");
                }
                else{
                $("#next").css("display","block");
                $("#prev").css("display","block");
                $("#next").attr("mytoken",next_token);
                $("#next").attr("mykeyword",s_data);
                $("#prev").attr("mytoken",prev_token);
                $("#prev").attr("mykeyword",s_data);
                }
			   }
			});
         },2000);
	}
});

$(document).ready(function(){
	$("#input_keyword").val(localStorage.getItem('app_key'));
	$("#keyword_form").submit(function(){
	  var val = $("#input_keyword").val();
	  localStorage.setItem("app_key",val);
	  $(".ui-input-btn").css({
	  	background:"blue",
	  	color:"red",
	  	textShadow:"none",
	  });
	  $(".ui-input-btn").buttonMarkup({
	  	icon:"check",
	  });
	  setTimeout(function(){
        $("#setting").popup("close");
        $("#list_video_item").html('');
		var s_data = localStorage.getItem("app_key");
		$.ajax(
		{
			type:'get',
			url:'https://www.googleapis.com/youtube/v3/search',
			data:{
	            part:"snippet,id",
				q:s_data,
				type:"video",
				key:"AIzaSyA_1_-1E-Be5hMU8CVjYB7c_J-DcX9OQzg",
			},
			beforeSend:function(){
             $("#fa_spinner").fadeIn();
			},
			  success: function(data)	
			   {
			   	$("#fa_spinner").css("display","none");
			   	var next_token = data.nextPageToken;
			   	var prev_token = data.prevPageToken;
			   	   console.log(data);
			     	$(data.items).each(function(){
			   		var thumb_pic = "<img src='"+this.snippet.thumbnails.high.url+"' width='80' height='80'>"
			   		var video_name = "<h4>"+this.snippet.title+"</h4>"
			   		var video_desc = "<p>"+this.snippet.channelTitle+"</p>"
			   		var video_link = "https://m.youtube.com/watch?v="+this.id.videoId;
			   		$("#list_video_item").append("<li><a href='#'>"+thumb_pic+video_name+video_desc+"</a></li>");
			   		$("#list_video_item").listview('refresh');
			   		$("#list_video_item li a").click(function
			   			(){
			   				window.location = video_link;
			   			});
			   	});
                if(prev_token == undefined || !prev_token)
                {
                    $("#next").css("display","block");
                    $("#next").attr("mytoken",next_token);
                    $("#next").attr("mykeyword",s_data);
                     $("#prev").css("display","none");
                }
                else{
                $("#next").css("display","block");
                $("#prev").css("display","block");
                $("#next").attr("mytoken",next_token);
                $("#next").attr("mykeyword",s_data);
                $("#prev").attr("mytoken",prev_token);
                $("#prev").attr("mykeyword",s_data);
                }
			   }
			});
	  },2000);
	  return false; 
	});
});

$(document).ready(function(){
	$("#menu li").each(function(){
     $(this).click(function()
     	{
     		$("#welcome_header a").click();
		var s_data = $(this).data("keyword");
		if(s_data != "share")
		{
         $("#list_video_item").html('');
		$.ajax(
		{
			type:'get',
			url:'https://www.googleapis.com/youtube/v3/search',
			data:{
	            part:"snippet,id",
				q:s_data,
				type:"video",
				key:"AIzaSyA_1_-1E-Be5hMU8CVjYB7c_J-DcX9OQzg",
			},
			beforeSend:function(){
             $("#fa_spinner").fadeIn();
			},
			  success: function(data)	
			   {
			   	$("#fa_spinner").css("display","none");
			   	var next_token = data.nextPageToken;
			   	var prev_token = data.prevPageToken;
			   	   console.log(data);
			     	$(data.items).each(function(){
			   		var thumb_pic = "<img src='"+this.snippet.thumbnails.high.url+"' width='80' height='80'>"
			   		var video_name = "<h4>"+this.snippet.title+"</h4>"
			   		var video_desc = "<p>"+this.snippet.channelTitle+"</p>"
			   		var video_link = "https://m.youtube.com/watch?v="+this.id.videoId;
			   		$("#list_video_item").append("<li><a href='#'>"+thumb_pic+video_name+video_desc+"</a></li>");
			   		$("#list_video_item").listview('refresh');
			   		$("#list_video_item li a").click(function
			   			(){
			   				window.location = video_link;
			   			});
			   	});
                if(prev_token == undefined || !prev_token)
                {
                    $("#next").css("display","block");
                    $("#next").attr("mytoken",next_token);
                    $("#next").attr("mykeyword",s_data);
                     $("#prev").css("display","none");
                }
                else{
                $("#next").css("display","block");
                $("#prev").css("display","block");
                $("#next").attr("mytoken",next_token);
                $("#next").attr("mykeyword",s_data);
                $("#prev").attr("mytoken",prev_token);
                $("#prev").attr("mykeyword",s_data);
                }
			   }
			});
	}
     	});
	});
});