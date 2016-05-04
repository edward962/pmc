$(document).ready(function(){
	$("#pages .tab-content, .pmc-tab-contents .section-tab-content, .settings-tab-contents .section-tab-content, .playlists-tab-contents .section-tab-content").hide();
	var active = $("#menu > .active").index();
	$("#pages .tab-content").eq(active).fadeIn();
	
	var active_pmc_tab = $(".pmc-tab-items > .active").index();
	$(".pmc-tab-contents .section-tab-content").eq(active_pmc_tab).fadeIn();
	var active_setting_tab = $(".settings-tab-items > .active").index();
	$(".settings-tab-contents .section-tab-content").eq(active_setting_tab).fadeIn();
	var active_playlist_tab = $(".playlists-tab-items > .active").index();
	$(".playlists-tab-contents .section-tab-content").eq(active_playlist_tab).fadeIn();

	$(".refresh_download").click(function(){
		$("#download").click();
		$(this).hide();
	});

	$("div.lazy, img.lazy").lazyload({
		effect : "fadeIn",
		threshold: "300"
	});

	$("#app").on("click", ".tab-item:not(.active)", function(){
		$(".button-options").hide();
		$(".ajax_page,.setting_page").hide();
		$("#pages .tab-content").hide();
		
		$("#menu .tab-item").removeClass("active");
		$(this).addClass("active");
		
		var id = $(this).index();
		
		$("#pages .tab-content").eq(id).show();
		
		var post_data = $("#pages .tab-content").eq(id).attr("data-post");
		
		if (post_data)
		{
			$.post(post_data, {uuid: ""+device.uuid+""}, function(data) {
				$("#pages .tab-content").eq(id).find(".posted-data").html(data);
				$("#pages .tab-content").eq(id).attr("data-post", "");
			});
		}
		
		if (id == 6)
		{
			$(".playlists-tab-items .active").click();
			
			$.post("http://pmc.tv/tablet-app/pmc-royale.html", {}, function(data) {
				$("#royale").html(data);
			});
		}
		
		$(".ajax_page, .playlist-section .posted-data").html("");
		
		$("div.lazy,img.lazy").trigger("scroll");
		
		if ($(".burger-menu").hasClass("bactive"))
		{
			$("#pages").show();
			$("#menu").css("position", "fixed");
			$("#menu").css("height", "80px");
			$("#menu").css("min-height", "10px");
			$(".tab-pad").css("display", "none");
			$(".burger-menu").removeClass("bactive");
		}
	});
	
	$("#qr").on("click", ".go-to-downloads", function(){
		$(".playlists-item").click();
		
		setTimeout(function(){
			$("#download").click();
			
			getDownloads()
		},1000);
	});
	
	$("#playlists").on("click", ".add-icon", function(){
		var track = $(this).attr("data-info");

   		$.post("http://pmc.tv/tablet-app/ajax/tablet-myplaylist-2.html", {track: ""+track+"", uuid: ""+device.uuid+"" }, function(data) {
   			//alert("Added to Playlist");
   			alert(data);
   		});
	});
	
	function getDownloads(){
		console.log('listing');
					        
		mp3Folder = "Music/Persian music channel";
	    result = document.querySelector("#results");
	
	    window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory + mp3Folder,
	    function(dirEntry) {
	            
			// Get a directory reader
			var directoryReader = dirEntry.createReader();
			
			// Get a list of all the entries in the directory
			directoryReader.readEntries(success,fail);
	
			function cut_mp3(string){
				var tm=string;
				string = string.toLowerCase();
				var str= string.search(".mp3");
				string =tm.substring(0,str);
				return string;
			}
	
			function success(entries) {
			    var i;
			    if(entries.length > 0){
			         result.innerHTML ='';
			    for (i=0; i<entries.length; i++) {
			    	var song = cut_mp3(entries[i].name);
					song = song.replace('.mp3','');
					var song_details = song.split("=");
										
			        result.innerHTML += '<div class="downloaded-song '+song_details[2]+'"><div class="caption" onclick="updateMedia(\''+cut_mp3(entries[i].name)+'\',\''+song_details[2]+'\')">'+song_details[1]+'<br/><span>'+song_details[0]+'</span></div></div>';
			    }
			    }else{
			
			       result.innerHTML = '<p class="empty_playlist" >'+"Folder is empty!"+"</p>";
			    }
			}
	
			function fail(error) {
			    result.innerHTML = '<p class="empty_playlist" >'+"Are you sure that such folder exists?!"+"</p>";
			}
	    }); 
	}
	
	$("#playlists").on("click", ".playlist-next", function(){
		
		var post_data = 'http://pmc.tv/tablet-app/tablet-playlist.html';
		
		$.post(post_data, {get: "next", uuid: ""+device.uuid+""}, function(data) {
			$("#playlists").find(".playlist-section .posted-data").html(data);
		});
	});
	
	$(".ajax_page").on("click", ".myplaylist-next", function(){
		
		var post_data = 'http://pmc.tv/tablet-app/my-playlist.html';
		var current = $(this).attr("data-current");
		
		$.post(post_data, {get: "next", current: ""+current+"", uuid: ""+device.uuid+""}, function(data) {
			$(".ajax_page").html(data);
		});
	});
	
	$("#home").on("click", ".section-tab-item:not(.active)", function(){
		$("#home .section-tab-content").hide();
		
		$("#home .section-tab-item").removeClass("active");
		$(this).addClass("active");
		
		var id = $(this).index();
		$("#home .section-tab-content").eq(id).fadeIn();
		
		$("div.lazy,img.lazy").trigger("scroll");
	});
	
	$("#videos").on("click", ".section-tab-item:not(.active)", function(){
		$("#videos .section-tab-content").hide();
		
		$("#videos .section-tab-item").removeClass("active");
		$(this).addClass("active");
		
		var id = $(this).index();
		$("#videos .section-tab-content").eq(id).fadeIn();
		
		var post_data = $("#videos .section-tab-content").eq(id).attr("data-post");
		
		if (post_data)
		{
			$.post(post_data, {get: "test"}, function(data) {
				setTimeout(function(){
					$("#videos .section-tab-content").eq(id).find(".tiles").html(data);
					$("#videos .section-tab-content").eq(id).attr("data-post", "");
				},1000);
			});
		}
		
		$("div.lazy,img.lazy").trigger("scroll");
	});
	
	$("#tracks").on("click", ".section-tab-item:not(.active)", function(){
		$("#tracks .section-tab-content").hide();
		
		$("#tracks .section-tab-item").removeClass("active");
		$(this).addClass("active");
		
		var id = $(this).index();
		$("#tracks .section-tab-content").eq(id).fadeIn();
		
		var post_data = $("#tracks .section-tab-content").eq(id).attr("data-post");
		
		if (post_data)
		{
			$.post(post_data, {get: "test"}, function(data) {
				setTimeout(function(){
					$("#tracks .section-tab-content").eq(id).find(".tiles").html(data);
					$("#tracks .section-tab-content").eq(id).attr("data-post", "");
				},1000);
			});
		}
		
		$("div.lazy,img.lazy").trigger("scroll");
	});
	
	$("#charts").on("click", ".section-tab-item:not(.active)", function(){
		$(this).closest(".chart-tab-items").find(".section-tab-item").removeClass("active");
		$(this).addClass("active");
		
		var when = $("#charts .chart-tab-when .active").attr("data-info");
		var what = $("#charts .chart-tab-what .active").attr("data-info");
		
		$("#charts .posted-data").html("<div class='section loading'><img src='img/load.gif' /></div>");
		
		$.post("http://pmc.tv/tablet-app/charts.html", {when: ""+when+"", what: ""+what+""}, function(data) {
			setTimeout(function(){
				$("#charts .posted-data").html(data);
			},1000);
		});
	});
	
	$("#playlists").on("click", ".section-tab-item", function(){
		$(".playlists-tab-contents .section-tab-content").eq(3).find(".posted-data").html("");
		$(".playlists-tab-contents .section-tab-content").hide();
		$(this).closest(".playlists-tab-items").find(".section-tab-item").removeClass("active");
		$(this).addClass("active");
		
		var p_id = $(this).index();
		
		$("#playlists .playlists-tab-contents .section-tab-content").eq(p_id).show();
		
		var post_data = $(".playlists-tab-items .section-tab-item").eq(p_id).attr("data-post");
		
		if (post_data)
		{
			$.post(post_data, { uuid: ""+device.uuid+""}, function(data) {
				$(".playlists-tab-contents .section-tab-content").eq(p_id).find(".posted-data").html(data);
			});
		}
	});
	
	$("#pmc").on("click", ".section-tab-item:not(.active)", function(){
		$("#pmc .section-tab-content").hide();
		
		$("#pmc .section-tab-item").removeClass("active");
		$(this).addClass("active");
		
		var id = $(this).index();
		$("#pmc .section-tab-content").eq(id).fadeIn();
		
		$("div.lazy,img.lazy").trigger("scroll");
	});
	
	$("#pmc-awards").on("click", ".section-tab-item:not(.active)", function(){
		$("#pmc-awards .section-tab-content").hide();
		
		$("#pmc-awards .section-tab-item").removeClass("active");
		$(this).addClass("active");
		
		var id = $(this).index();
		$("#pmc-awards .section-tab-content").eq(id).fadeIn();
		
		$("div.lazy,img.lazy").trigger("scroll");
	});
	
	$("#settings").on("click", ".section-tab-item:not(.active)", function(){
		$("#settings .section-tab-content").hide();
		
		$("#settings .section-tab-item").removeClass("active");
		$(this).addClass("active");
		
		var id = $(this).index();
		$("#settings .section-tab-content").eq(id).fadeIn();
		
		$("div.lazy,img.lazy").trigger("scroll");
	});
	
    $(".close-search").click(function(){
    	$(".home-item").click();
    });
    
    $(".setting-item .switch").click(function(){
    	$(this).toggleClass("on");
    });
    
    $(".setting-item .options").click(function(){
    	$(this).closest(".setting-item").find(".opt-dropdown").toggle();
    	$(this).toggle();
    });
    
     $(".opt-dropdown a").click(function(){
     	$(this).closest(".opt-dropdown").find("a").removeClass("active");
     	$(this).addClass("active");
     	$(this).closest(".setting-item").find(".options").toggle();
     	$(this).closest(".opt-dropdown").toggle();
     	
     	var value = $(this).attr("data-info");
     	
     	var setting = $(this).closest(".setting-item").attr("data-info");
     	
     	if (setting == 'quality')
     	{
     		localStorage.quality = value;
     		alert(value);
     	}
    });
    
    $("#pages").on("click", ".video-page", function(){
    	$("#pages .tab-content").hide();
    	$("#menu .tab-item").removeClass("active");
    	
    	var video = $(this).attr("data-info");
    	
    	$(".ajax_page").html("<div class='section loading'><img src='img/load.gif' /></div>");
    	$(".ajax_page").show();
    	
    	$.post("http://pmc.tv/tablet-app/video-page.html", {video: ""+video+"", uuid: ""+device.uuid+"", quality: ""+localStorage.quality+"" }, function(data) {
			setTimeout(function(){
				$(".ajax_page").html(data);
			},1000);
		});
    });
    
    $("#pages").on("click", ".track-page", function(){
    	$("#pages .tab-content").hide();
    	$("#menu .tab-item").removeClass("active");
    	
    	var single = $(this).attr("data-info");
    	
    	$(".ajax_page").html("<div class='section loading'><img src='img/load.gif' /></div>");
    	$(".ajax_page").show();
    	
    	$.post("http://pmc.tv/tablet-app/track-page.html", { single: ""+single+"", uuid: ""+device.uuid+"" }, function(data) {
			setTimeout(function(){
				$(".ajax_page").html(data);
			},1000);
		});
    });
    
    $("#pages").on("click", ".royale-page", function(){
    	$("#pages .tab-content").hide();
    	$("#menu .tab-item").removeClass("active");
    	
    	var royale = $(this).attr("data-info");
    	
    	$(".ajax_page").html("<div class='section loading'><img src='img/load.gif' /></div>");
    	$(".ajax_page").show();
    	
    	$.post("http://pmc.tv/tablet-app/royale-page.html", { royale: ""+royale+"", uuid: ""+device.uuid+"" }, function(data) {
			setTimeout(function(){
				$(".ajax_page").html(data);
			},1000);
		});
    });
    
    $("#pages").on("click", ".mp-page", function(){
    	$("#pages .tab-content").hide();
    	$("#menu .tab-item").removeClass("active");
    	
    	var single = $(this).attr("data-info");

		$(".ajax_page").html("<div class='section loading'><img src='img/load.gif' /></div>");
    	$(".ajax_page").show();
    	
    	$.post("http://pmc.tv/tablet-app/my-playlist.html", { single: ""+single+"", uuid: ""+device.uuid+"" }, function(data) {
			setTimeout(function(){
				$(".ajax_page").html(data);
			},1000);
		});
    });

    $("#pages").on("click", ".login-email", function(){
    	$("#pages .tab-content").hide();
    	$(".ajax_page").hide();
    	$("#menu .tab-item").removeClass("active");
    	
    	$(".loginemail_page").show();
    });
    
    $("#pages").on("click", ".login-facebook", function(){
    	$("#pages .tab-content").hide();
    	$(".ajax_page").hide();
    	$("#menu .tab-item").removeClass("active");
    	
    	$(".loginfb_page").show();
    });
    
    $("#pages").on("click", ".signup", function(){
    	$("#pages .tab-content").hide();
    	$(".ajax_page").hide();
    	$("#menu .tab-item").removeClass("active");
    	
    	$(".signup_page").show();
    });
   
	$("#log-in").submit(function(e){
        e.preventDefault();
        
        var email = $(".loginemail_page").find("input[name='email']").val();
        var password = $(".loginemail_page").find("input[name='password']").val();
        
        $.post("http://pmc.tv/tablet-app/settings/login-using-email.html", {email: ""+email+"", pass: ""+password+"", uuid: ""+device.uuid+"" }, function(data) {
			if (data != 'invalid')
			{
				var str = data.split("=");
				
				localStorage.userid = str[0];
				localStorage.fullname = str[1];
			}
		});
    });
    
    $("#sign-up").submit(function(e){
        e.preventDefault();
        
        var fullname = $(".signup_page").find("input[name='fullname']").val();
        var email = $(".signup_page").find("input[name='email']").val();
        var password = $(".signup_page").find("input[name='password']").val();
        var cpassword = $(".signup_page").find("input[name='cpassword']").val();
        
        $.post("http://pmc.tv/tablet-app/settings/register.html", { fullname: ""+fullname+"", email: ""+email+"", password: ""+password+"", cpassword: ""+cpassword+"", uuid: ""+device.uuid+"" }, function(data) {
			if (data != 'invalid')
			{
				$("#sign-up").find(".errors").html(data).fadeIn();
			}
		});
    });

	$(".ajax_page").on("click", ".add-to-playlist", function(){
		var track = $(this).attr("data-info");
	
   		$.post("http://pmc.tv/tablet-app/ajax/tablet-myplaylist.html", {track: ""+track+"", uuid: ""+device.uuid+"" }, function(data) {});
   		
   		$(this).addClass("add-to-playlist-active");
    });

    /*$(".ajax_page").on("click", ".add-to-playlist", function(){
   		$(".create-playlist").fadeIn();
   		$(".video-page-gradient").addClass("gradient-active");
    });
    
    $(".ajax_page").on("click", ".add-playlist", function(){
		$("#new_playlist").fadeToggle();
		$("#playlist_name").focus();
	});
    
    $(".ajax_page").on("click", ".pl-add", function(){
		var video = $(".video_id").html();
		var playlist_id = $(this).attr("data-info");
		
		$(".create-playlist").fadeOut();
		$(".video-page-gradient").removeClass("gradient-active");
	});
    
    $(".ajax_page").on("click", "#new_playlist .submit", function(){
		var playlist_name = $("#playlist_name").val();
		
		if (playlist_name == '')
		{
			$("#new_playlist .error").html("ERROR: Playlist Name cannot be empty");
		}
		else
		{
			$("#playlist_name").val("");
			$("#new_playlist .error").html("");
			var video = $(".video_id").html();
			var track = $(".single_id").html();
			
			if (track)
			{
				$.post("http://pmc.tv/tablet-app/ajax/add-mp3-to-playlist.html", {create: "new", playlist: ""+playlist_name+"", track: ""+track+"", userid: ""+localStorage.userid+""}, function(data) {
					$(".create-playlist").fadeOut();
					$(".video-page-gradient").removeClass("gradient-active");
				});
			}
			else if (video)
			{
				$.post("http://pmc.tv/tablet-app/ajax/add-video-to-playlist.html", {create: "new", playlist: ""+playlist_name+"", video: ""+video+"", userid: ""+localStorage.userid+""}, function(data) {
					$(".create-playlist").fadeOut();
					$(".video-page-gradient").removeClass("gradient-active");
				});
			}
		}
	});
	
	$(".ajax_page").on("click", ".close-playlist", function(){
		$(".create-playlist").fadeOut();
		$(".video-page-gradient").removeClass("gradient-active");
	});*/
	
	$("#pages").on("click", ".all-videos", function(){
		$(".videos-icon").closest(".tab-item").click();
	});
	$("#pages").on("click", ".all-tracks", function(){
		$(".mp3-icon").closest(".tab-item").click();
	});
	
	var typingTimer;
	var doneTypingInterval = 400;
	
	$("#pages .search-input").keyup(function(e){
		clearTimeout(typingTimer);
		typingTimer = setTimeout(search(), doneTypingInterval);
	});
	
	function search (field) 
	{
		var query = $(".search-input").val();
		
		if(query.length > 1) 
		{	
			$.post("http://pmc.tv/tablet-app/search.html", {search: ""+query+""}, function(data) {
				$(".search-results").html(data);
			});
		}
	}
	
	$.post("http://pmc.tv/tablet-app/home.html", {get: "home"}, function(data) {
		$("#home .posted-data").html(data);
	});
	
	$("#app").on("click", ".burger-menu", function(){
		
		if ($(this).hasClass("bactive"))
		{
			$("#pages").show();
			$("#menu").css("position", "fixed");
			$(".burger-menu").css("position", "fixed");
			$("#menu").css("height", "80px");
			$("#menu").css("min-height", "10px");
			$(".tab-pad").css("display", "none");
			$(this).removeClass("bactive");
		}
		else
		{
			$("#menu").css("position", "relative");
			$(".burger-menu").css("position", "absolute");
			$("#menu").css("min-height", ($(window).height()-20)+"px");
			$("#menu").css("height", "auto");
			$(".tab-pad").css("display", "block");
			$(this).addClass("bactive");
			$("#pages").hide();
		}
	});
	
	$("#pages").on("click", ".back-videos", function(){
		$(".ajax_page").html("").hide();
		$(".video-item").click();
	});
	
	$("#pages").on("click", ".back-tracks", function(){
		$(".ajax_page").html("").hide();
		$(".track-item").click();
	});
	
	$("#pages").on("click", ".back-myplaylist,.back-royale", function(){
		$(".ajax_page").html("").hide();
		$(".playlists-item").click();
	});	
  		    
    $(window).resize(function(){
    	heights();
    });
    
    heights();

    function heights(){
    	$(".loginemail_page,.signup_page").css({ "min-height": ($(window).height()-100)+"px" });
    }    
    
    setTimeout(function(){
	    if (localStorage.userid != '')
	    {			   
	    	$.post("http://pmc.tv/tablet-app/settings/authenticate-user.html", { userid: ""+localStorage.userid+"", uuid: ""+device.uuid+"" }, function(data) {
	    		if (data != 1)
				{
					localStorage.userid = "";
					localStorage.fullname = "";
				}
			});
		}
		
		$.post("http://pmc.tv/tablet-app/ajax/generate-user-playlist.html", { uuid: ""+device.uuid+"" }, function(data) {});
	},2000);
});

function star2(value)
{
	var vote_details = value.split("-");
	var star = vote_details[0];
	var type = vote_details[1];
	var object = vote_details[2];
	
	$.post("http://www.pmc.tv/rate.html", {rate: ""+star+"", type: ""+type+"", object: ""+object+""}, function(data) {});
}

function star(div)
{
	var type = $(div).closest(".object_rating").attr("data-type");
	var object = $(div).closest(".object_rating").attr("data-object");
	var star = $(div).attr("data-rate");
	
	var width = star*14;
	$(div).closest(".object_rating").find(".filter_active_stars").width(width);
	
	$.post("http://www.pmc.tv/rate.html", {rate: ""+star+"", type: ""+type+"", object: ""+object+""}, function(data) {});
	
	$(div).closest(".object_rating").css("pointer-events", "none");
	$(div).closest(".object_rating").css("opacity", "1");
}