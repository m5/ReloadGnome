var gnome = {
  heard_user : new Date().getTime(), //when the gnome last heard the mouse
  timidity : 600,               //measured in seconds
  home_page : window.location,
  heard_user_at : new Date().getTime(),
  refreshed_page_at : new Date().getTime(),
  

  hears_user : function(e){
    gnome.heard_user_at = new Date().getTime();
  },

  peek : function(){
    var page_touched = gnome.heard_user_at - gnome.refreshed_page_at > 1000;
    var safety = (new Date().getTime() - gnome.heard_user_at)/1000;
    console.log( page_touched );
    console.log( gnome.heard_user_at - gnome.refreshed_page_at ); 
    
    if (page_touched && safety > gnome.timidity){
      gnome.reset_page();
    }else{
      if ( ! page_touched ){
        var interval = gnome.timidity * 1000;
      }else{
      var interval = (gnome.timidity - safety) * 1000;
      }
      setInterval(gnome.peek, interval);
    }

  },
 
  reset_page : function(){
    window.location = gnome.home_page;
    gnome.refreshed_page_at = new Date().getTime()
    gnome.heard_user_at = new Date().getTime()
  },
}

window.addEventListener("keyDown",gnome.hears_user);
window.addEventListener("mousemove",gnome.hears_user); //the gnome has very good ears

chrome.extension.sendRequest(
    {type: "config",
     keys: 'timeout,refresh_to_page'},
    function(response) {
      gnome.timidity  = response.timeout || gnome.timidity;
      gnome.home_page = response.refresh_to_page || gnome.home_page;
      gnome.peek();
    });
