//設定時間
const currentTime = document.querySelector(".currentTime");
let showTime = () => {
  let Today = new Date();
  currentTime.innerHTML = `<li>${Today.getFullYear()} 年 ${Today.getMonth() + 1}
  月 ${Today.getDate()} 日 ${Today.getHours()}:${Today.getMinutes()
    .toString()
    .padStart(2, 0)}</li>`;
};
setInterval(showTime, 1000);
//帶入桌號
const getUrlString = location.href;
const url = new URL(getUrlString);
let tableId = url.searchParams.get("desk");
document.querySelector(".tableId").innerHTML = tableId;
//取得產品資料
let allDish = [];
function getAllDishList() {
  axios
    .get(`${path}products`)
    .then(function (response) {
      allDish = response.data;
      console.log(allDish);
      getCartList();
    })
    .catch(function (error) {
      console.log(error);
    });
}
getAllDishList();

//取得購物車資料
let cart = [];
function getCartList() {
  axios
    .get(`${path}carts?tableId=${tableId}&paid=false`)
    .then(function (response) {
      cart = response.data[0];
      detail = cart.detail
      console.log(cart);
      console.log(detail);
      render(detail);
    })
    .catch(function (error) {
      console.log(error);
    });
}

const orderContent = document.querySelector(".orderContent");
//組出購物車資料
function render(cart) {
  let contentOfCart = [];
  cart.forEach((item) => {
    console.log(item)
    let obj = {};
    console.log(allDish[item.productsId - 1]);
    obj.name = allDish[item.productsId - 1].name;
    obj.quantity = item.num;
    obj.price = allDish[item.productsId - 1].price;
    obj.time = cart.time;
    contentOfCart.push(obj);
  });
  console.log(contentOfCart);
  renderDetail(contentOfCart);
}

function renderDetail(data) {
  let str = "";
  data.forEach((item, index) => {
    str += `<tr>
<td>${index + 1}.</td>
<td>${item.name}</td>
<td>${item.quantity}</td>
<td>$${item.quantity * item.price}</td>
<td>${cart.time}</td>
</tr>`;
  });
  orderContent.innerHTML = str;
}

const chargeBtn = document.querySelector(".chargeBtn");
chargeBtn.addEventListener("click", function (e) {
  entry();
});

function entry() {
  window.location.href = `charge.html?desk=${tableId}`;
}
