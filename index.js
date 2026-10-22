var navbar_menu_icon = document.getElementById("navbar_menu-icon");
var sidebar_sub_links = document.getElementById("sidebar-sub-links");

navbar_menu_icon.addEventListener("click",function(){
    sidebar_sub_links.classList.toggle("hide");
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

// Sumbit mail
var footer_section2_sub2_mail_btn = document.getElementById("footer-section2-sub2-mail-btn");
var notify = document.getElementById("notify");
var mailerror = document.querySelector(".mailerror");
var email = document.getElementById("email");
var mailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

email.addEventListener("keyup",function(){
        mailerror.style.display = "none";
})

footer_section2_sub2_mail_btn.addEventListener("click",function(){
    if(mailpattern.test(email.value)){
        mailerror.style.display = "none";
        email.value = ""
        notify.style.top = "10px";

        setTimeout(function() {
            notify.style.top = "-50%";
        }, 3000);
    }else{
        mailerror.style.display = "block";
    }
})


