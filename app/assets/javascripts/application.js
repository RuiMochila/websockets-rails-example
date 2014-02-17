// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
// require_tree .
//= require websocket_rails/main

	// var dispatcher;
	
 //  function init () {
 //    dispatcher = new WebSocketRails('localhost:3000/websocket');

 //    dispatcher.bind('message', function(){
 //      console.log("yeaaahh");
 //    });

 //    dispatcher.on_open = function(data) {
 //      console.log('Connection has been established');
 //      // You can trigger new server events inside this callback if you wish.
 //      var data = { message: "hello" }
 //      dispatcher.trigger('connect', data);  
 //    }

 //  }

	


  var wsUri = "ws://localhost:3000/websocket";
  var websocket;

  function init()
  {
    var ws = window.WebSocket || window.MozWebSocket;
    websocket = new ws(wsUri);
    
    websocket.onopen = function(evt) { 
    	console.log("CONNECTED");
    	// console.log("SENT: " + "WebSocket rocks");
    	websocket.send(JSON.stringify(["connect",{"id":77226,"data":{"message":"hello"}}]));
    };
    
    websocket.onclose = function(evt) { 
    	console.log("DISCONNECTED");
    };
    
    websocket.onmessage = function(evt) { 
    	// console.log('RESPONSE: ' + evt.data);
      var data = JSON.parse(evt.data);
      // console.log(evt.data);
      if (data[0][0]==='websocket_rails.ping') {
        console.log("ping received");
        websocket.send(JSON.stringify(['websocket_rails.pong', {}, 22]));  
      }else if(data[0][0]==='message'){
        console.log("message: " + data[0][1].data.message);
      }else if(data[0][0]==='client_connected'){
        console.log("Connected message received");
      }else{
        console.log("Unrecognized message");
      }
    	// websocket.close();
    };
    
    websocket.onerror = function(evt) { 
    	console.log('ERROR: ' + evt.data);
    }; 
  }

  window.addEventListener("load", init, false);
