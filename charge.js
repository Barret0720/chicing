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

// 帶入桌號
const getUrlString = location.href;
const url = new URL(getUrlString);
let tableId = url.searchParams.get("desk");
document.querySelector(".tableId").innerHTML = tableId;

//取得購物車資料
let cart = [];
let total = 0;
function getCartList() {
  axios
    .get(`${path}carts?tableId=${tableId}&paid=false`)
    .then(function (response) {
      cart = response.data;
      console.log(cart);
      total = cart[0].totalPrice;
      renderTotal(total);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getCartList();

let money;
const totalMoney = document.querySelector(".totalMoney");
function renderTotal(money) {
  console.log(total)
  // 替換訂單總金額
  let totalMoneyStr = `<input type="text" id="totalMoney" class="totalMoney form-control fs-26" placeholder="$${money}">`;
  totalMoney.innerHTML = totalMoneyStr;
}

//計算機
const reciveMoney = document.getElementById("reciveMoney");
const backMoney = document.getElementById("backMoney");
const clear = document.getElementById("clear");
const panel = document.querySelector(".panel");
console.log(backMoney);

panel.addEventListener("click", function (e) {
  if (e.target.id == "clear") {
    reciveMoney.value = "";
    backMoney.value = "";
  } else {
    let str = "";
    str += e.target.id;
    reciveMoney.value += `${str}`;
  }
});
//結帳按鈕
const confirmCheck = document.querySelector(".confirmCheck");
const chargeBtn = document.querySelector(".chargeBtn");

confirmCheck.addEventListener("click", function (e) {
  backMoney.value = `${Number(reciveMoney.value) - money}`;
});
chargeBtn.addEventListener("click", function (e) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success m-2",
      cancelButton: "btn btn-danger m-2",
    },
    buttonsStyling: true,
  });
  swalWithBootstrapButtons
    .fire({
      title: "確認付款?",
      text: "將進行結帳作業!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, 結帳!",
      cancelButtonText: "No, 取消!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire("付款完成!", "訂單已結帳", "success");
        addBills();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire("取消", "訂單尚未付款", "error");
      }
    });
});
function entry() {
  window.location.href = "table.html";
}
function addBills() {
  axios
    .post(`${path}bills`, {
      tableId: tableId,
      total: total,
      time: `${new Date().getFullYear()}/${
        new Date().getMonth() + 1
      }/${new Date().getDate()} ${new Date().getHours()}:${new Date()
        .getMinutes()
        .toString()
        .padStart(2, 0)}`,
    })

    .then(function (response) {
      console.log(response.data);
    deleteCart();
    })
    .catch(function (error) {
      console.log(error);
    })
}

//取得所有購物車資料
let allCart = [];
function getAllCartList() {
  axios
    .get(`${path}carts`)
    .then(function (response) {
      allCart = response.data;
      console.log(allCart);
    })
    .catch(function (error) {
      console.log(error);
    })
}
getAllCartList();

function deleteCart() {
  let cartIdRecord = [];
  allCart.forEach((item) => {
    if (item.tableId == tableId) {
      cartIdRecord.push(item.id);
    }
  });
  console.log(cartIdRecord);
  cartIdRecord.forEach((item) => {
    axios.delete(`${path}carts/${item}`)
      .then(function (response) {
       setTimeout(() => {
       entry();
       }, 2000);
    })
    .catch(function (error) {
      console.log(error);
    })
  });
  
}
console.log(cart);
