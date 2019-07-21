//start of play pause coding
var main_page = document.getElementById("playlist_fixed_page");
var video_player = document.getElementById("video");
var play_icon = document.getElementById("play");
play_icon.onclick=function()
{
	if(this.className == 'fa fa-play')
	{
		video_player.play();
		this.className="fa fa-pause";
		this.title="pause";
	}
	else
	{
		video_player.pause();
		this.className="fa fa-play";
		this.title="play";
	}
}

// start of progressbar coding
var progress_box = document.getElementById("progress");
video_player.ontimeupdate = function()
{
	var current_duration = this.currentTime/60;
	var full_duration = this.duration/60;
	progress_box.style.width = (current_duration/full_duration)*100+"%";
}

// start of bufferd coding

var bfr = document.getElementById("buffer");
video_player.onprogress=function()
{
   var end_bfr = video_player.buffered.end(0);
   var v_duration = video_player.duration;
   var percent = (end_bfr/v_duration)*100;
   bfr.style.width=percent+"%";
   if(bfr.offsetWidth == "100%")
   {
    bfr.style.width="0";
   }
}
// start of stop coding
var stop_icon = document.getElementById("stop");
stop_icon.onclick=function()
{
  video_player.currentTime=0;
  video_player.pause();
  play_icon.className="fa fa-play";
  play_icon.title="play";
}

// start of replay coding

var r_play = document.getElementById("replay");
r_play.onclick=function()
{
 video_player.currentTime=0;
}
 
 video_player.onended = function()
 {
 	if(video_player.currentTime == video_player.duration)
 	{
 		video_player.pause();
 		play_icon.className="fa fa-play";
 		play_icon.title="play";
 		video_player.currentTime=0;
 	}
 	else
 	{
 	video_player.play();
   }
 }

var p_bar=document.getElementById("progress_bar");
p_bar.onclick=function(event)
{
   progress_box.style.width=(event.offsetX/this.offsetWidth)*100+"%";
   video_player.currentTime=(event.offsetX/this.offsetWidth)*video_player.duration;
}

// start of volume coding

var vol_icon = document.getElementById("volume");
vol_icon.onclick=function()
{
	var r_slider=document.getElementById("range_slider");
	if(r_slider.style.display == "none")
	{
	r_slider.style.display="block";
	r_slider.oninput = function()
	{
		video_player.volume=this.value;
        vol_icon.title=this.value*100+"%";
        if(video_player.volume == 0)
        {
        	vol_icon.className="fa fa-volume-off";
        }
        else
        {
        	vol_icon.className="fa fa-volume-up";
        }
	}
}
else
{
	r_slider.style.display="none";
}
}

// start coding of fullscreen

var f_screen = document.getElementById("fullscreen");
f_screen.onclick=function()
{
	if(video_player.requestFullscreen)
	{
		video_player.requestFullscreen();
	}
	else if(video_player.webkitRequestFullscreen)
	{
		video_player.webkitRequestFullscreen();
	}
	else if(video_player.mozRequestFullscreen)
	{
		video_player.mozRequestFullscreen();
	}
    else if(video_player.msRequestFullscreen)
	{
		video_player.msRequestFullscreen();
	}
}

// start of downloading coding

var v_down = document.getElementById("download");
v_down.onclick=function()
{
	var v_src=document.getElementById("video_source").src;
	var a_tag = document.createElement("A");
	a_tag.href=v_src;
	a_tag.download="aftab";
	document.body.appendChild(a_tag);
	 a_tag.click();
}


// start of setting coding
var set = document.getElementById("setting");
set.onclick=function()
{
	var mini_player = document.getElementById("miniplayer");
	if(mini_player.offsetHeight == 0)
	{
      mini_player.style.height="250px";
      mini_player.style.transition="0.5s";

     var s_slider = document.getElementById("speed_slider");
      s_slider.oninput=function()
    {
    	video_player.playbackRate=this.value;
    	document.getElementById("speed_value").value=this.value;
    }

    // start of reset coding
     var r_btn = document.getElementById("reset_btn");
     r_btn.onclick=function()
     {
     	document.getElementById("speed_value").value=1;
     	video_player.playbackRate=1;
     	s_slider.value=1;
     } 
     var m_icon = document.getElementById("mini_icon");
     m_icon.onclick=function()
     {
     	if(play_icon.className == 'fa fa-pause')
     	{
     	  main_page.style.display="none";
     	  video_player.pause();
     	  var v_source = document.getElementById("video_source").src;
     	  var m_video_con = document.getElementById("mini_video");
     	   m_video_con.style.display="block";
     	   var m_source = document.getElementById("mini_video_source");
     	   m_source.src=v_source;
     	  var m_video = document.getElementById("mini_video_player");
     	  m_video.load();
     	  m_video.currentTime=video_player.currentTime;
          m_video.volume=video_player.volume;
     	  m_video.play();
     	  m_video.onmouseover = function()
     	  {
     	  	this.controls=true;
     	  }
           m_video.onmouseout=function()
          {
            this.controls=false;
          }
     	  minivideo_close();
     	}
     	else
     	{
     		main_page.style.display="none";
     	  video_player.pause();
     	   var v_source = document.getElementById("video_source").src;
     	  var m_video_con = document.getElementById("mini_video");
     	   m_video_con.style.display="block";
     	     var m_source = document.getElementById("mini_video_source");
     	   m_source.src=v_source;
     	  var m_video = document.getElementById("mini_video_player");
     	  m_video.load();
     	  m_video.currentTime=video_player.currentTime;
     	  m_video.pause();
     	   m_video.onmouseover = function()
     	  {
     	  	this.controls=true;
     	  }
          m_video.onmouseout=function()
          {
            this.controls=false;
          }
     	  minivideo_close();
     	}

     }
}
   else
	{
      // miniplayer.style.display="none";
      mini_player.style.height="0";
      mini_player.style.transition="0.5s";
	}

    // start of theme coding

     var con_theme = document.getElementById("c_theme");
     c_theme.onchange =function()
     {
       main_page.style.background=this.value;
       localStorage.setItem("c_theme",this.value);
     }
     var icon_theme = document.getElementById("i_theme");
     icon_theme.onchange = function()
     {
        var j;
        var icon_footer = document.getElementById("playlist_footer");
        var icon = icon_footer.getElementsByTagName("I");
        for(j=0;j<icon.length;j++)
        {
           icon[j].style.color=this.value;
        }
        localStorage.setItem("i_theme",this.value);
     }
     var text_theme = document.getElementById("t_theme");
     text_theme.onchange = function()
     {
        var p_text = document.getElementById("playlist_text");
        var fav_song = document.getElementById("favourite_song");
        p_text.style.color=this.value;
        fav_song.style.color=this.value;
        localStorage.setItem("t_theme",this.value);
     }

     // start of reset theme coding
     var r_theme = document.getElementById("reset_theme");
     r_theme.onclick=function()
     {
        localStorage.removeItem("c_theme");
        localStorage.removeItem("i_theme");
        localStorage.removeItem("t_theme");
        location.href=window.location;
     }
}

function minivideo_close()
{
    var m_video = document.getElementById("mini_video_player");
    m_video.onplaying = function()
    {
        var close_icon = document.getElementById("mini_video_close");
        close_icon.onclick=function()
        {
         var m_video_con = document.getElementById("mini_video");
         var mini_player = document.getElementById("miniplayer");
         m_video_con.style.display="none";
         m_video.pause();
         main_page.style.display="block";
         mini_player.style.height="0";
         video_player.load();
         video_player.currentTime=m_video.currentTime;
         video_player.volume=m_video.volume;
            video_player.setAttribute("poster","");
         video_player.play();
            play_icon.className='fa fa-pause';
         play_icon.title="pause";
        }
    }

     m_video.onpause = function()
    {
        var close_icon = document.getElementById("mini_video_close");
        close_icon.onclick=function()
        {
         var m_video_con = document.getElementById("mini_video");
         var mini_player = document.getElementById("miniplayer");
         m_video_con.style.display="none";
         m_video.pause();
         main_page.style.display="block";
         mini_player.style.height="0";
         video_player.load();
         video_player.currentTime=m_video.currentTime;
         video_player.volume=m_video.volume;
         video_player.pause();
         video_player.setAttribute("poster","");
         play_icon.className='fa fa-play';
         play_icon.title="play";
        }
    }

}

function color_theme()
{
  var con_theme = [localStorage.getItem("c_theme"),localStorage.getItem("i_theme"),localStorage.getItem("t_theme")];
  main_page.style.background=con_theme[0];
  var mini_con = document.getElementById("mini_video");
  mini_con.style.background=con_theme[0];

    var p_text = document.getElementById("playlist_text");
        var fav_song = document.getElementById("favourite_song");
        var m_text=document.getElementById("mini_text");
        p_text.style.color=con_theme[2];
        fav_song.style.color=con_theme[2];
        m_text.style.color=con_theme[2];

          var j;
        var icon_footer = document.getElementById("playlist_footer");
        var icon = icon_footer.getElementsByTagName("I");
        for(j=0;j<icon.length;j++)
        {
           icon[j].style.color=con_theme[1];
        }
        var max = document.getElementById("mini_video_close");
        max.style.color=con_theme[1];
}
color_theme();
//start of upload video
   function upload_video()
   {
    if(video_player.networkState == 3)
    {
        video_player.setAttribute("poster","images/upload_pic.jpg");
        video_player.onclick=function()
        {
            var upload=document.getElementById("upload_btn");
            upload.click();
            upload.onchange=function()
            {
                var play_text = document.getElementById("playlist_text");
                play_text.innerHTML=this.files[0].name;
                var blob = URL.createObjectURL(this.files[0]);
                var v_src =document.getElementById("video_source");
                v_src.src=blob;
                video_player.load();
                video_player.play();
                play_icon.className="fa fa-pause";
                play_icon.title="pause";
            }
        }
    }
}
upload_video();