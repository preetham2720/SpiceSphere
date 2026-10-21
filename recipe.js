
var slide_menu = document.querySelector(".slide_menu")
var side_menu = document.querySelector(".side_menu")
var close_menu = document.getElementById("close_menu")

side_menu.addEventListener("click",function(){
    slide_menu.style.left="0%"
})
close_menu.addEventListener("click",function(){
    slide_menu.style.left="-60%"
})
var bannerimg = document.querySelectorAll(".banner_img");
var bannerslide = document.querySelector(".banner_slide");
var nextButton = document.getElementById("next_btn");
var prevButton = document.getElementById("prev_btn");

var currentIndex = 0;

if (bannerimg.length > 0 && bannerslide && nextButton && prevButton) {
    nextButton.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % bannerimg.length;
        bannerslide.style.transform =
            `translateX(-${currentIndex * 100}%)`
    });

    prevButton.addEventListener("click", function () {
        currentIndex =
            (currentIndex - 1 + bannerimg.length) % bannerimg.length;
        bannerslide.style.transform =
            `translateX(-${currentIndex * 100}%)`
    });
}

var buttons = document.querySelectorAll(".recipe_filter button");

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        buttons.forEach(function(btn) {
            btn.classList.remove("active")
        });

        button.classList.add("active")

    });

});
var filterButtons = document.querySelectorAll(".recipe_filter button");
var recipeCards = document.querySelectorAll(".recipe_card");
filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
       
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active")
        });
        button.classList.add("active")
      
        var selectedCategory = button.id
   
        recipeCards.forEach(function(card) {
            var categories = card.dataset.category.split(" ");
            if (
                selectedCategory === "all" ||
                categories.includes(selectedCategory)
            ) {
                card.style.display = "flex"
            } else {
                card.style.display = "none"
            }
        });
    });
});
var recipes = document.querySelectorAll(".recipe_card")
var search = document.querySelector(".search_bar input")

search.addEventListener("keyup", function () {
    var enteredValue = search.value.toUpperCase()

    for (var count = 0; count < recipes.length; count=count+1) {
        var recipe = recipes[count]
        var heading = recipe.querySelector("h2")

        
            var recipeName = heading.textContent.toUpperCase()

            if (recipeName.includes(enteredValue)) {
                recipe.style.display = "block"
            } else {
                recipe.style.display = "none"
            }
        }
    }
)