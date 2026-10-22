var navbar_menu_icon = document.getElementById("navbar_menu-icon");
var sidebar_sub_links = document.getElementById("sidebar-sub-links");

navbar_menu_icon.addEventListener("click",function(){
    sidebar_sub_links.classList.toggle("hide");
})

// add favorites
var heartfavlist = document.querySelector(".heartfav");

heartfavlist.addEventListener("click",function(){
    if(this.classList.contains("fa-regular")){
        this.classList.replace("fa-regular", "fa-solid")
    }else{
        this.classList.replace("fa-solid", "fa-regular")
    }
})