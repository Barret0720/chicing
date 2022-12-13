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

let cart = [];

function init() {
  getCartList();
}
init();

//取得購物車資料
function getCartList() {
  axios
    .get(`${path}carts`)
    .then(function (response) {
      console.log(response.data);
      cart = response.data;
      renderTable();
    })
    .catch(function (error) {
      console.log(error);
    });
}

//渲染畫面，購物車若有資料，桌號會變色
function renderTable() {
  const tables = document.querySelector(".tables");
  const takeout = document.querySelector(".takeout");
  let tableStr = "";
  for (let j = 1; j <= 12; j++) {
    if (cart.find((item) => item.tableId == j)) {
      tableStr += `<li data-order class="tableNum tableBtn2" data-status='exists' id="${j}">${j}</li>`;
    } else {
      tableStr += `<li data-order class="tableNum tableBtn" id="${j}">${j}</li>`;
    }
  }
  tables.innerHTML = tableStr;
  cart.find((item) => {
    if (item.tableId === "外帶") {
      takeout.innerHTML = `<li data-order class="takeoutNum takeoutBtn2" data-status='exists' id="外帶">外帶</li>`;
    } else {
      takeout.innerHTML = `<li data-order class="takeoutNum takeoutBtn" id="外帶">外帶</li>`;
    }
  });
  const dataOrder = document.querySelectorAll("[data-order]");
  dataOrder.forEach((item) => {
    item.addEventListener("click", (e) => {
      let id = e.target.id; //新增這串
      let status = e.target.dataset.status
      entry(id,status); // 然後帶值
    });
  });
}

function entry(table,status) {
  if(status === 'exists'){
    window.location.href = `status.html?desk=${table}`; //網址導向的時候，帶入desk
  }else{
     window.location.href = `order.html?desk=${table}&status=${status}`; //網址導向的時候，帶入desk
  }
 
}
