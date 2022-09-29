let productLocalStorage = JSON.parse(localStorage.getItem("productKey")) || [];

const table_body = document.querySelector("#tbody"),
  table_row_template = document.querySelector("#table-row-template"),
  cart_subtotals = document.querySelector("#cart_subtotals"),
  shipping = document.querySelector("#shipping"),
  total = document.querySelector("#total"),
  shipping_fee = 50;

//  Render product cart //
function render() {
  let cart_subtotals_value = 0;

  cart_no_item_sign();

  while (table_body.firstChild) {
    table_body.removeChild(table_body.firstChild);
  }

  productLocalStorage.forEach((product) => {
    const table_row = document.importNode(table_row_template.content, true);

    const id = table_row.querySelector("td:first-child i");
    id.classList.add(".far.fa-times-circle");
    id.setAttribute("id", product.id);
    id.onclick = delete_item;

    let item_image = table_row.querySelector("#item_image");
    item_image.src = product.product_image;

    let item_name = table_row.querySelector("#item_name");
    item_name.textContent = product.product_name;

    let item_price = table_row.querySelector("#item_price");
    item_price.textContent = "$" + product.product_price;

    let item_size = table_row.querySelector("#item_size");
    item_size.textContent = product.product_size;

    let item_quantity = table_row.querySelector("#item_quantity");
    item_quantity.textContent = product.product_quantity;

    let subtotal_to_number = Number(product.subtotal),
      SUBTOTAL = subtotal_to_number.toFixed(2),
      subtotal = table_row.querySelector("#subtotal");

    subtotal.value = SUBTOTAL;
    subtotal.textContent = "$" + SUBTOTAL;

    table_body.appendChild(table_row);

    // Cart subtotal
    cart_subtotals_value += Number(product.subtotal);
    cart_subtotals.value = cart_subtotals_value.toFixed(2);
    cart_subtotals.textContent = "$" + cart_subtotals_value.toFixed(2);

    // Shipping fee
    shipping.value = shipping_fee;
    shipping.textContent = "$" + shipping_fee;

    // Total
    total.value = (cart_subtotals_value - shipping_fee).toFixed(2);
    total.textContent = "$" + (cart_subtotals_value - shipping_fee).toFixed(2);
  });

  save();
}
render();

// ||save to local storage //
function save() {
  localStorage.setItem("productKey", JSON.stringify(productLocalStorage));
}

// ||clear all element for tasks //
function cart_no_item_sign() {
  const no_item_sign = document.querySelector(".no-item-sign");
  if (productLocalStorage.length === 0) {
    no_item_sign.style.display = "block";

    cart_subtotals.value = 0;
    cart_subtotals.textContent = 0;
    shipping.value = 0;
    shipping.textContent = 0;
    total.value = 0;
    total.textContent = 0;
  } else {
    no_item_sign.style.display = "none";
  }
}

// Delete product in cart //
function delete_item(e) {
  const confirm = document.querySelector(".confirm-box"),
    btn_yes = document.querySelector(".btn-yes"),
    btn_no = document.querySelector(".btn-no");

  confirm.style.left = "0";

  btn_yes.addEventListener("click", () => {
    productLocalStorage = productLocalStorage.filter((product) => {
      if (product.id === e.target.id) {
        return false;
      } else {
        return true;
      }
    });

    save();
    render();
    confirm.style.left = "-450px";
  });

  btn_no.addEventListener("click", () => {
    confirm.style.left = "-450px";
  });
}
