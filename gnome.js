var gnome = {
  heard_user : new Date().getTime(), //when the gnome last heard the mouse
  timidity : 600,               //measured in seconds
  home_page : window.location,

  hears_user : function(e){
    gnome.heard_user = new Date().getTime();
  },

  peek : function(){
    if (not gnome.heard_user){
      return false;
    }
    safety = (new Date().getTime() - gnome.heard_user)/1000;
    if (safety > gnome.timidity){
      gnome.reset_page();
    }else{
      setInterval(gnome.peek, (gnome.timidity - safety)*1000);
    }
  },

  reset_page : function(){
    window.location = gnome.home_page;
    gnome.heard_user = false;
  },
};

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
