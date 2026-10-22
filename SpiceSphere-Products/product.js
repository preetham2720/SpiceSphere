// Product information
var products = [
  { id: 1, name: "Turmeric Powder", category: "Spices", price: 199, rating: 4.8, reviews: 120, image: "products%20images/pexels-dario-mendez-3488362-5213946.jpg", tint: ["#e0a21c", "#9a6a0a"] },
  { id: 2, name: "Garam Masala", category: "Spices", price: 249, rating: 4.7, reviews: 86, image: "products%20images/garam-masala.jpg", tint: ["#a8581f", "#5a2a0e"] },
  { id: 3, name: "Basmati Rice", category: "Grains & Pulses", price: 349, rating: 4.9, reviews: 156, image: "products%20images/pexels-ganajp-18328392.jpg", tint: ["#e8d9b8", "#a8916a"] },
  { id: 4, name: "Pure Ghee", category: "Oils & Ghee", price: 599, rating: 4.8, reviews: 87, image: "products%20images/pexels-galiiya-20689446.jpg", tint: ["#f0b429", "#a8720a"] },
  { id: 5, name: "Red Chilli Powder", category: "Spices", price: 179, rating: 4.6, reviews: 74, image: "products%20images/spice-box.jpg", tint: ["#c8321a", "#6b140a"] },
  { id: 6, name: "Organic Moong Dal", category: "Grains & Pulses", price: 199, rating: 4.7, reviews: 102, image: "products%20images/pexels-mohd-adnan-khan-78969656-14965274.jpg", tint: ["#8aa84a", "#4a5e1e"] },
  { id: 7, name: "Butter Chicken Mix", category: "Ready Mixes", price: 129, rating: 4.5, reviews: 64, image: "products%20images/pexels-jack-baghel-2199968-20408442.jpg", tint: ["#d9622a", "#7a2a0e"] },
  { id: 8, name: "Idli Dosa Batter Mix", category: "Ready Mixes", price: 149, rating: 4.6, reviews: 91, image: "products%20images/pexels-katia-miasoed-624959709-19526666.jpg", tint: ["#e0c690", "#8a6a2e"] },
  { id: 9, name: "Cold Pressed Mustard Oil", category: "Oils & Ghee", price: 389, rating: 4.4, reviews: 58, image: "products%20images/pexels-maria-verkhoturtseva-21177529-9005933.jpg", tint: ["#d9b020", "#7a5e0a"] },
  { id: 10, name: "Masala Murukku", category: "Snacks", price: 99, rating: 4.7, reviews: 133, image: "products%20images/murukku.jpg", tint: ["#c98a3a", "#6b4210"] },
  { id: 11, name: "Cast Iron Kadai", category: "Kitchen Essentials", price: 1299, rating: 4.8, reviews: 49, image: "products%20images/pexels-nshakya-15014923.jpg", tint: ["#4a3a34", "#1e1412"] },
  { id: 12, name: "Premium Spice Box", category: "Kitchen Essentials", price: 2199, rating: 4.9, reviews: 37, image: "products%20images/pexels-riki-lifestyle-77353139-8649386.jpg", tint: ["#b83226", "#4a1410"] }
];

var categories = ["Spices", "Grains & Pulses", "Ready Mixes", "Oils & Ghee", "Snacks", "Kitchen Essentials"];
var priceRanges = [
  { label: "₹0 - ₹500", min: 0, max: 500 },
  { label: "₹501 - ₹1,000", min: 501, max: 1000 },
  { label: "₹1,001 - ₹2,000", min: 1001, max: 2000 },
  { label: "₹2,001+", min: 2001, max: Infinity }
];

// Page elements
var grid = document.getElementById("productGrid");
var emptyMsg = document.getElementById("emptyMsg");
var resultCount = document.getElementById("resultCount");
var searchForm = document.getElementById("searchForm");
var searchInput = document.getElementById("searchInput");
var categoryList = document.getElementById("categoryList");
var priceList = document.getElementById("priceList");
var clearBtn = document.getElementById("clearBtn");
var sidebar = document.getElementById("sidebar");
var filterToggle = document.getElementById("filterToggle");
var toast = document.getElementById("toast");
var menuToggle = document.getElementById("menuToggle");
var navLinks = document.getElementById("navLinks");

// These arrays remember which products are in the cart and wishlist.
var cart = [];
var wishlist = [];
var toastTimer;

function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}

function buildFilters() {
  var categoryHtml = "";
  var priceHtml = "";
  var i;

  for (i = 0; i < categories.length; i++) {
    categoryHtml += '<label class="check"><input type="checkbox" name="category" value="' + categories[i] + '"><span>' + categories[i] + '</span></label>';
  }

  for (i = 0; i < priceRanges.length; i++) {
    priceHtml += '<label class="check"><input type="checkbox" name="price" value="' + i + '"><span>' + priceRanges[i].label + '</span></label>';
  }

  categoryList.innerHTML = categoryHtml;
  priceList.innerHTML = priceHtml;
}

function getCheckedValues(name) {
  var inputs = document.querySelectorAll('input[name="' + name + '"]');
  var values = [];
  var i;

  for (i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      values.push(inputs[i].value);
    }
  }

  return values;
}

function getVisibleProducts() {
  var searchText = searchInput.value.toLowerCase().trim();
  var selectedCategories = getCheckedValues("category");
  var selectedPrices = getCheckedValues("price");
  var visibleProducts = [];
  var i;
  var j;
  var selectedPrice;
  var productMatchesPrice;
  var temporaryProduct;

  for (i = 0; i < products.length; i++) {
    var product = products[i];
    var productMatchesCategory = selectedCategories.length === 0 || selectedCategories.indexOf(product.category) !== -1;
    var productMatchesSearch = product.name.toLowerCase().indexOf(searchText) !== -1;
    productMatchesPrice = selectedPrices.length === 0;

    for (j = 0; j < selectedPrices.length; j++) {
      selectedPrice = priceRanges[parseInt(selectedPrices[j], 10)];
      if (product.price >= selectedPrice.min && product.price <= selectedPrice.max) {
        productMatchesPrice = true;
      }
    }

    if (productMatchesCategory && productMatchesSearch && productMatchesPrice) {
      visibleProducts.push(product);
    }
  }

  // Keep the products in popularity order.
  for (i = 0; i < visibleProducts.length; i++) {
    for (j = i + 1; j < visibleProducts.length; j++) {
      if (visibleProducts[j].reviews > visibleProducts[i].reviews) {
        temporaryProduct = visibleProducts[i];
        visibleProducts[i] = visibleProducts[j];
        visibleProducts[j] = temporaryProduct;
      }
    }
  }

  return visibleProducts;
}

function renderProducts() {
  var visibleProducts = getVisibleProducts();
  var productHtml = "";
  var i;
  var product;
  var isInCart;
  var isInWishlist;

  for (i = 0; i < visibleProducts.length; i++) {
    product = visibleProducts[i];
    isInCart = cart.indexOf(product.id) !== -1;
    isInWishlist = wishlist.indexOf(product.id) !== -1;

    productHtml += '<article class="product-card recipe-card">';
    productHtml += '<div class="product-img" style="background: linear-gradient(135deg, ' + product.tint[0] + ', ' + product.tint[1] + ')">';
    productHtml += '<img src="' + product.image + '" alt="' + product.name + '" loading="lazy" onerror="this.remove()">';
    productHtml += '<button class="wish ' + (isInWishlist ? "active" : "") + '" data-id="' + product.id + '" aria-label="Add ' + product.name + ' to wishlist" aria-pressed="' + isInWishlist + '">' + (isInWishlist ? "♥" : "♡") + '</button>';
    productHtml += '</div>';
    productHtml += '<div class="product-body">';
    productHtml += '<h3>' + product.name + '</h3>';
    productHtml += '<p class="price">' + formatPrice(product.price) + '</p>';
    productHtml += '<p class="rating"><span class="star">★</span> ' + product.rating + ' (' + product.reviews + ')</p>';
    productHtml += '<button class="add-btn ' + (isInCart ? "added" : "") + '" data-id="' + product.id + '">' + (isInCart ? "Added ✓" : "Add to Cart") + '</button>';
    productHtml += '</div>';
    productHtml += '</article>';
  }

  grid.innerHTML = productHtml;
  emptyMsg.hidden = visibleProducts.length > 0;

  if (visibleProducts.length === 1) {
    resultCount.textContent = "1 product";
  } else {
    resultCount.textContent = visibleProducts.length + " products";
  }

  addProductButtonEvents();
}

function addProductButtonEvents() {
  var cartButtons = grid.querySelectorAll(".add-btn");
  var wishlistButtons = grid.querySelectorAll(".wish");
  var i;

  for (i = 0; i < cartButtons.length; i++) {
    cartButtons[i].addEventListener("click", handleCartClick);
  }

  for (i = 0; i < wishlistButtons.length; i++) {
    wishlistButtons[i].addEventListener("click", handleWishlistClick);
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 2200);
}

function hideToast() {
  toast.classList.remove("show");
}

function handleCartClick() {
  var productId = parseInt(this.getAttribute("data-id"), 10);
  var productName = "";
  var cartIndex = cart.indexOf(productId);
  var i;

  for (i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      productName = products[i].name;
      break;
    }
  }

  if (cartIndex === -1) {
    cart.push(productId);
    showToast(productName + " added to cart");
  } else {
    cart.splice(cartIndex, 1);
    showToast(productName + " removed from cart");
  }

  renderProducts();
}

function handleWishlistClick() {
  var productId = parseInt(this.getAttribute("data-id"), 10);
  var wishlistIndex = wishlist.indexOf(productId);

  if (wishlistIndex === -1) {
    wishlist.push(productId);
  } else {
    wishlist.splice(wishlistIndex, 1);
  }

  renderProducts();
}

function handleSearch(event) {
  event.preventDefault();
  renderProducts();
}

function clearFilters() {
  var checkboxes = sidebar.querySelectorAll('input[type="checkbox"]');
  var i;

  for (i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }

  searchInput.value = "";
  renderProducts();
}

function toggleFilters() {
  var isOpen = sidebar.classList.toggle("open");
  filterToggle.setAttribute("aria-expanded", isOpen);
}

function toggleMenu() {
  var isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
}

buildFilters();
renderProducts();

searchForm.addEventListener("submit", handleSearch);
searchInput.addEventListener("input", renderProducts);
sidebar.addEventListener("change", renderProducts);
clearBtn.addEventListener("click", clearFilters);
filterToggle.addEventListener("click", toggleFilters);
menuToggle.addEventListener("click", toggleMenu);
