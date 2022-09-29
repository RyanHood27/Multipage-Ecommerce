const item_image = document.querySelector("#big-img"),
  item_name = document.querySelector("#item_name").textContent,
  item_price = document.querySelector("#item_price").value,
  item_size = document.querySelector("#item_size"),
  item_quantity = document.querySelector("#item_quantity"),
  add_item_btn = document.querySelector("#add_item_btn"),
  // Product local storage //
  localStorageKey = "productKey",
  parseKey = localStorage.getItem(localStorageKey);

let all_items = document.querySelectorAll(".product"),
  small_img = document.getElementsByClassName("small-img"),
  imgAsDataURL,
  size,
  quantity = 1,
  subtotal = item_price,
  // Product object array//
  productLocalStorage = JSON.parse(parseKey) || [],
  // initialize  Image() object//
  image_init = new Image();

add_item_btn.addEventListener("click", () => {
  if (size === undefined || size === "Select Size") {
    confirm("Please select an item size");
  } else {
    productLocalStorage.push({
      id: Date.now().toString(),
      product_image: imgAsDataURL,
      product_name: item_name,
      product_price: item_price,
      product_size: size,
      product_quantity: quantity,
      subtotal: subtotal,
    });
    localStorage.setItem(localStorageKey, JSON.stringify(productLocalStorage));

    const added_to_cart = document.querySelector("#js_added_to_cart");
    added_to_cart.style.opacity = "1";

    alert("Product added to cart.");
  }
});

image_init.src = item_image.getAttribute("src");
small_img_array = Array.from(small_img);

// singleProduct product-view image click //
small_img_array.forEach((image) => {
  image.addEventListener("click", (e) => {
    item_image.src = image.src;
    image_init.src = item_image.src;
  });
});

// Get image data url //
image_init.addEventListener(
  "load",
  () => {
    let imgCanvas = document.createElement("canvas"),
      imgContext = imgCanvas.getContext("2d");

    // Make sure canvas is as big as the picture
    imgCanvas.width = image_init.width;
    imgCanvas.height = image_init.height;

    // Draw image into canvas element
    imgContext.drawImage(image_init, 0, 0, image_init.width, image_init.height);

    // Get canvas contents as a data URL
    imgAsDataURL = imgCanvas.toDataURL("image/jpeg");
  },
  false
);

// Get select & option value //
item_size.addEventListener("change", () => {
  size = item_size.selectedOptions[0].value;
});

// Get quantity value //
item_quantity.addEventListener("change", () => {
  quantity = item_quantity.value;

  subtotal = item_price * quantity;
});
