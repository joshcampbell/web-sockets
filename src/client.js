//
// Wire up the form.
//

var button = document.querySelector("button")
var textarea = document.querySelector("textarea")

var log = function(message){
  textarea.value += message
}

button.onclick = function(){
  connection.send("yo dog")
}

//
// Set up the web socket:
//
var connection = new WebSocket('ws://127.0.0.1:8088');

connection.onopen = function(){
  console.log("Opened!");
}

connection.onerror = function(error){
  console.log("Error!: " + error);
}

connection.onmessage = function(message){
  log(message.data)
}
