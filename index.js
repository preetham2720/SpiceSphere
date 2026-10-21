var navbar_menu_icon = document.getElementById("navbar_menu-icon");
var sidebar = document.getElementById("sidebar");
var sidebar_close = document.getElementById("sidebar-close");
var sidebar_sub_links = document.getElementById("sidebar-sub-links");

navbar_menu_icon.addEventListener("click",function(){
    sidebar.style.left = 0
})

sidebar_sub_links.addEventListener("click",function(){
    sidebar.style.left = "-50%"
})

sidebar_close.addEventListener("click",function(){
    sidebar.style.left = "-50%"
})

// add favorites
var heartfavlist = document.querySelectorAll(".heartfav");

heartfavlist.forEach((icon) => {
    icon.addEventListener("click",function(){
        if(this.classList.contains("fa-regular")){
            this.classList.replace("fa-regular", "fa-solid")
        }else{
            this.classList.replace("fa-solid", "fa-regular")
        }
    })
})