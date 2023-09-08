// **********Selectors**********
const shoppingListTb = document.getElementById("shoppingListTb");
const shipping = document.getElementById("shipping");
const tax = document.getElementById("tax");
const totalShopping = document.getElementById("totalShopping");
const totalPrice = document.getElementById("totalPrice");
const delAllProducts = document.getElementById("delAllProducts");
const totalProduct = document.getElementById("totalProduct");
// **********Variables**********
let shippingPrice = 0;
let shoppingData = [
  {
    id: 101,
    image: "110000290631182.jpg",
    productName: "Hp 15S-FQ5003NT Intel Core i7-1255U",
    productPrice: 699.99,
    discountPrice: 999.99,
    productQuantity: 1,
  },
  {
    id: 102,
    image: "110000109045163.jpg",
    productName: "MX Keys S & MX Keys Mini",
    productPrice: 109.99,
    discountPrice: 99.99,
    productQuantity: 3,
  },
  {
    id: 103,
    image: "10471209467954.jpg",
    productName: "SteelSeries Rival 3 RGB Mouse",
    productPrice: 59.99,
    discountPrice: 49.99,
    productQuantity: 2,
  },
];
// **********EventListeners**********
shoppingListTb.addEventListener("click", (event) => {
  if (event.target.tagName == "I") {
    shoppingData = shoppingData.filter((item) => item.id != event.target.id);
    event.target.closest("tr").remove();
    // decrease quantity
  } else if (event.target.innerHTML == "➖") {
    const shoppingDataMap = shoppingData.map((item) => {
      if (item.id == event.target.parentElement.nextElementSibling.id) {
        item.productQuantity--;

        if (item.productQuantity == 0) {
          shoppingData = shoppingData.filter(
            (quantity) => quantity.productQuantity != 0
          );
          event.target.closest("tr").remove();
        }
      }
    });
    // increase quantity
  } else if (event.target.innerHTML == "➕") {
    const shoppingDataMap = shoppingData.map((item) => {
      if (item.id == event.target.parentElement.nextElementSibling.id) {
        item.productQuantity++;
      }
    });
  }
  shoppingData.forEach((item) => shoppingListTb.firstElementChild.remove());
  displayShoppingList();
  totalShoppingTable();
});
delAllProducts.addEventListener("click", () => {
  shoppingData.forEach((item) => shoppingListTb.firstElementChild.remove());
  shoppingData = [];
  displayShoppingList();
  totalShoppingTable();
});
// **********Functions**********
function displayShoppingList() {
  shoppingData.forEach((shoppingItem) => {
    //   image is adding
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const img = document.createElement("img");
    img.setAttribute("src", "./assets/" + shoppingItem.image);
    td1.appendChild(img);
    tr.appendChild(td1);
    //   content is adding
    const td2 = document.createElement("td");
    const h5 = document.createElement("h5");
    const h5TextNode = document.createTextNode(shoppingItem.productName);
    const p = document.createElement("p");
    const pTextNode = document.createTextNode("$" + shoppingItem.discountPrice);
    const del = document.createElement("del");
    const delTextNode = document.createTextNode(
      "$" + shoppingItem.productPrice
    );
    // Increase and decrease buttons and remove icon
    const div = document.createElement("div");
    const spanContainer = document.createElement("span");
    const spanMinus = document.createElement("span");
    const spanMinusNode = document.createTextNode("➖");
    const spanAmount = document.createElement("span");
    const spanAmoundNode = document.createTextNode(
      shoppingItem.productQuantity
    );
    const spanPlus = document.createElement("span");
    const spanPlusNode = document.createTextNode("➕");
    const delIcon = document.createElement("i");
    delIcon.setAttribute("id", shoppingItem.id); //i tagına id atandı
    div.setAttribute("class", "amountUpDown");
    h5.appendChild(h5TextNode);
    td2.appendChild(h5);
    del.appendChild(delTextNode);
    p.appendChild(pTextNode);
    p.appendChild(del);
    td2.appendChild(p);
    tr.appendChild(td2);
    // total prise of the product is adding
    const td3 = document.createElement("td");
    const h6 = document.createElement("h6");
    const h6TextNode = document.createTextNode(
      "$" +
        (shoppingItem.discountPrice * shoppingItem.productQuantity).toFixed(2)
    );
    h6.appendChild(h6TextNode);
    td3.appendChild(h6);
    tr.appendChild(td3);
    delIcon.setAttribute("class", "fa-regular fa-trash-can fa-lg");
    spanMinus.appendChild(spanMinusNode);
    spanContainer.appendChild(spanMinus);
    spanAmount.appendChild(spanAmoundNode);
    spanContainer.appendChild(spanAmount);
    spanPlus.appendChild(spanPlusNode);
    spanContainer.appendChild(spanPlus);
    div.appendChild(spanContainer);
    div.appendChild(delIcon);
    td2.appendChild(div);
    // All elements that have been created append to table body
    shoppingListTb.appendChild(tr);
  });
}
displayShoppingList();
function totalShoppingTable() {
  const shoppingSum = shoppingData.reduce(
    (acc, item) => acc + item.discountPrice * item.productQuantity,
    0
  );
  tax.innerText = "$" + (shoppingSum * 0.18).toFixed(2);
  if (shoppingSum <= 3000 && shoppingSum > 0) {
    shippingPrice = 25;
  } else shippingPrice = 0;
  shipping.innerText = "$" + shippingPrice.toFixed(2);
  totalShopping.innerText = "$" + shoppingSum.toFixed(2);
  totalPrice.innerText = "$" + (shoppingSum * 1.18 + shippingPrice).toFixed(2);
  totalProduct.innerText = shoppingData.length;
}
totalShoppingTable();
