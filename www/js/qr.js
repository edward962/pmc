/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


    var fileName ;
    var st;
function removeNode(name) {
    var elem = document.getElementById(name);
    elem.parentNode.removeChild(elem);
    return false;
}

function cut_mp3(string){

            var tm=string;
        string = string.toLowerCase();
        var str= string.search(".mp3");
        string =tm.substring(0,str);
        return string;
}

function removeSong(file){
    window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory + "Music/Persian music channel/"+file, remove, fai);
    function fai(e) {
	console.log("FileSystem Error");
	console.dir(e);
	alert("Error while removing song");
}
function succ(entry) {
    alert("Succeccfully removed "+cut_mp3(file));
     removeNode(cut_mp3(file));
}

function remove(fileEntry){
	var del=confirm("Are You Sure You Want to Delete This Track?");
	if(del == true){
		fileEntry.remove(succ, fai);
	}
    return false;
}
}



//reads song name from tmp.txt
function slice_file(str){
	var fileName_details = str.split("=");
	return fileName_details[0]+"="+fileName_details[1]+"="+fileName_details[2]+".mp3";
        //var pipe=str.indexOf("|");
        //return str.substr(pipe+1,str.length)+"-"+str.substr(0,pipe)+".mp3"
}
//returns proper mp3 name
  function get_name(string){
        string=string.toLowerCase();
        var slash = string.lastIndexOf('/');
        slash++;
        var str=string;
        string =string.substring(slash,str.length);
        return string;
}


//URL of our asset
var asset = "http://pmc.tv/get-data.html?track=";

//temporary txt file , where song name is placed, is deleted just after reading data
var file = "tmp.txt";
//Path to folder with mp3's
var mp3 = "Music/Persian music channel/";

//variables for player 
var myMedia = null;
var playing = false;


//checkes if scanned by qr link belongs to media.pmc domain
function is_pmc_domain(string){
    string=string.toLowerCase();
    var flag=string.search("media.pmc.tv");
    return (flag != -1)? true:false;
    }
    
function playAudio() {
	if (!playing) {
		myMedia.play(); 
        document.getElementById('play').innerHTML = "Pause";
        $("#play").addClass("pause");
		playing = true; 
	} else {
		myMedia.pause();
        document.getElementById('play').innerHTML = "Play";
        $("#play").removeClass("pause");    
		playing = false; 
    }
}

function stopAudio() {
    myMedia.stop();
    playing = false;
	document.getElementById('play').innerHTML = "Play";   
	$("#play").removeClass("pause");   
	document.getElementById('audio_position').innerHTML = "0.000 sec";
}


  



  
   
   function updateMedia(src,div) {
        // Clean up old file
        if (myMedia != null) {
            myMedia.release();
        }
        
        if (src != undefined)
		{
			song_name = src.replace('.mp3','');
			var song_details = song_name.split("=");
			
			$(".downloaded-song").removeClass("d-active");
			$("."+div).addClass("d-active");
			$(".button-options .add-icon").attr("data-info", song_details[2]);
			$(".button-options > span").html("Listening to:<br/>"+song_details[0]);
			$(".button-options").fadeIn();
		}
		
		myMedia = new Media("Music/Persian music channel/"+src+".mp3", stopAudio, null);
		
		setTimeout(function(){
			
		    playAudio();
		    
		    // Update media position every second
			var mediaTimer = setInterval(function() {
		    	// get media position
				myMedia.getCurrentPosition(
			    	// success callback
					function(position) {
				   		if (position > -1) {
				        	document.getElementById('audio_position').innerHTML = (position/1000) + " sec";
				   		}
					},
					
					// error callback
					function(e) {
				    	console.log("Error getting pos=" + e);
					}
				);
			}, 1000);
		},1000);
   }
   
   function setAudioPosition(position) {
		document.getElementById('audio_position').innerHTML =position;
	}


var app = {




    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('qrscan').addEventListener('click', this.scan, false);
        document.getElementById('download').addEventListener('click', this.download, false);
        document.getElementById('mp3').addEventListener('click', this.list, false);
       
    },

    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
       
         updateMedia();
    },

    scan: function() {
        
        
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");


        scanner.scan( function (result) { 
             if(is_pmc_domain(result.text)){

  

window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null); 

function onRequestFileSystemSuccess(fileSystem) { 
        var entry=fileSystem.documents; 
        entry.getDirectory("Music", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail); 
} 

function onGetDirectorySuccess(dir) { 
      console.log("Created dir "+dir.name); 
} 

function onGetDirectoryFail(error) { 
      console.log("Error "+dir.name); 
} 
window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null); 

function onRequestFileSystemSuccess(fileSystem) { 
        var entry=fileSystem.documents; 
        entry.getDirectory("Music/Persian music channel", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail); 
} 

function onGetDirectorySuccess(dir) { 
      console.log("Created dir "+dir.name); 
} 

function onGetDirectoryFail(error) { 
      console.log("Error "+dir.name); 
}
               asset = "http://pmc.tv/get-data.html?track=";
            
                asset+=get_name(result.text)+".mp3";
               
initit();
 


function data() {

   
    //This alias is a read-only pointer to the app itself
    window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory + "Music/Persian music channel/tmp.txt", gotFile, fai);

}
function initit() {
    
    

    st = cordova.file.dataDirectory;

    //Check for the file. 
    window.resolveLocalFileSystemURL(st + file, down, down);

}





function down() {
    var fileT = new FileTransfer();
    fileT.download(asset, cordova.file.externalRootDirectory + mp3+file, 
        function(entry) {
         data();
       
        }, 
        function(err) {
            console.log("Error");
            console.dir(err);
        });
}




function fai(e) {
alert("Error");
}

function gotFile(fileEntry) {
        
  var reader = new FileReader();
  

        

    fileEntry.file(function(file) {
      reader.onloadend = function(e) {
            fileName = slice_file(reader.result);
            init();
            }
        reader.readAsText(file);
       
    });
  
del();
}





var store;
//Used for status updates

//URL of our asset
var assetURL = result.text;

//File name of our important data file we didn't ship with the app

var mp3Folder = "Persian music channel/";
 var music='Music/';
function init() {
    
    

    store = cordova.file.dataDirectory;

    //Check for the file. 
    window.resolveLocalFileSystemURL(store + music+mp3Folder+fileName, appStart, downloadAsset);

}

 
function downloadAsset() {
    var fileTransfer = new FileTransfer();
    console.log("About to start transfer");
    var statusDom = document.querySelector('#status');
       fileTransfer.onprogress = function(progressEvent) {
        if (progressEvent.lengthComputable) {
            var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
            statusDom.innerHTML = perc + "% loaded...";
        } else {
            if(statusDom.innerHTML == "") {
                statusDom.innerHTML = "Loading";
            } else {
                statusDom.innerHTML += ".";
                statusDom.innerHTML += ".";
                statusDom.innerHTML += ".";
                statusDom.innerHTML += ".";
                statusDom.innerHTML += ".";
                statusDom.innerHTML = "";
            }
        }
    };

    fileTransfer.download(assetURL, cordova.file.externalRootDirectory + music+ mp3Folder+fileName, 
        function(entry) {
                 statusDom.innerHTML = "";
                 alert('Downloaded');
                 $("#status").html('<p class="empty_playlist">Track downloaded successfully.<br/><br/><span class="go-to-downloads">Go to my Downloads</span></p>');
        }, 
        function(err) {
            alert("Error");
            console.dir(err);
        });
}

//I'm only called when the file exists or has been downloaded.
function appStart() {
    alert('Downloaded');
}
          
            /*
            if (args.format == "QR_CODE") {
                window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
            }
            */

  

}
else{ alert("Not PMC domain");}
    }, function (error) { 
            console.log("Scanning failed: ", error); 
            alert("Something gone wrong, please try again");
        }


 
         );
    },

    download: function() {
        console.log('listing');
        $(".offline-music").hide();

mp3Folder = "Music/Persian music channel";
        result = document.querySelector("#results");


    window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory + mp3Folder,
    function(dirEntry) {
            
                    // Get a directory reader
var directoryReader = dirEntry.createReader();

// Get a list of all the entries in the directory
directoryReader.readEntries(success,fail);



function success(entries) {
    var i;
    if(entries.length > 0){
         result.innerHTML ='';
    for (i=0; i<entries.length; i++) {
    	var song = cut_mp3(entries[i].name);
					song = song.replace('.mp3','');
					var song_details = song.split("=");
					
					//song = song.replace(/-/g,' ');
			    	
					result.innerHTML += '<div id="'+cut_mp3(entries[i].name)+'" class="downloaded-song"><div class="caption" onclick="updateMedia(\''+cut_mp3(entries[i].name)+'\',\''+song_details[2]+'\')">'+song_details[1]+'<br/><span>'+song_details[0]+'</span><br></div><button style="float:right; margin-bottom:15px;margin-right:20px;width:100px;height:30px;"  onclick="removeSong(\''+entries[i].name+'\');"><span  style="color:red;">delete</span></button></div>';
        //result.innerHTML += '  <p class="list_songs" >'+cut_mp3(entries[i].name)+"</p></br>";
    }
    }else{

       //result.innerHTML = '<p class="list_songs" >'+"Folder is empty!"+"</p>";
       result.innerHTML = '<p class="empty_playlist">'+"Folder is empty!"+"</p>";
    }
    
}

function fail(error) {
    //result.innerHTML = '<p class="list_songs" >'+"Are you sure that such folder exists?!"+"</p>";
    result.innerHTML = '<p class="empty_playlist" >'+"Are you sure that such folder exists?!"+"</p>";
}



            

    });
    

 
         
    },

   list:  function() {
        console.log('listing');
        

mp3Folder = "Music/Persian music channel";
        result = document.querySelector("#playlist");


    window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory + mp3Folder,
    function(dirEntry) {
            
                    // Get a directory reader
var directoryReader = dirEntry.createReader();

// Get a list of all the entries in the directory
directoryReader.readEntries(success,fail);


function cut_mp3(string){

            var tmp=string;
        string = string.toLowerCase();
        var str= string.search(".mp3");
        string =tmp.substring(0,str);
        return string;
}

function success(entries) {
    var i;
    if(entries.length > 0){
        result.innerHTML ="<select id='playlist' onchange='updateMedia()''><option value='' disabled selected>Select</option></select>";
    for (i=0; i<entries.length; i++) {
        result.innerHTML += " <option  value='Music/Persian music channel/"+entries[i].name+"'>"+cut_mp3(entries[i].name)+"</option>";
    }
    }else{

       result.innerHTML = '<p class="list_songs" >'+"Folder is empty!"+"</p>";
    }
     
}

function fail(error) {
    result.innerHTML = '<p class="list_songs" >'+"Are you sure that such folder exists?!"+"</p>";
}



            

    });
    

 
         
    }
  

};
