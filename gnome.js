(function(){
  var gnome = (function(){
    var motionDetected = false;
    var i = {};
    i.motion = function(){
      motionDetected = true;
    };
    i.update = function(){
      chrome.extension.sendRequest({type:"update", motionDetected:motionDetected}, function(response){
        if(response.load){
          top.window.location.href = response.load;
        }
      });
      motionDetected = false;
    };
    return i;
  }());
  window.addEventListener("keyDown",gnome.motion);
  window.addEventListener("mousemove",gnome.motion); 
  setInterval(gnome.update, 1000);
}());
