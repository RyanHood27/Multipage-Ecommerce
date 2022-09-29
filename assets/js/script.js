// ||menu bar for tablet/mobile devices //

const navigation = document.querySelector("header nav ul"),
  menu_bar = document.getElementById("js-menu-bar"),
  close_x = document.getElementById("close");

menu_bar.addEventListener("click", () => {
  navigation.style.right = "0";
});

close_x.addEventListener("click", () => {
  navigation.style.right = "-18.75rem";
});

// go to singleProduct page //
let Product = document.getElementsByClassName("product"),
  ProductArray = Array.from(Product);

ProductArray.forEach((product) => {
  product.addEventListener("click", () => {
    window.location.href = "singleProduct.html";
  });
});
