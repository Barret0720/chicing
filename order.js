let dataRice = [];
let dataSideDish = [];
let dataSoup = [];
let dataDrink = [];
let allDish = [];
function getAllDishList() {
  axios
    .get(`${path}products`)
    .then(function (response) {
      allDish = response.data;
      defaultMenu()
      console.log(allDish);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getAllDishList();

//存放整理好的購物車資料格式
let dataRecordList = [];

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

const dishMenuCard = document.querySelector(".dishMenuCard");
//菜單tab
const menu1 = document.querySelector(".menu1");
const menu2 = document.querySelector(".menu2");
const menu3 = document.querySelector(".menu3");
const menu4 = document.querySelector(".menu4");
menu1.addEventListener("click", function (e) {
 defaultMenu();
});
menu2.addEventListener("click", function (e) {
  let strSideDish = "";
  allDish.forEach((item, index) => {
    if (item.category == "sideDish") {
      dataSideDish.push(item);
      console.log(dataSideDish);
      strSideDish += `<li type="button" class="cardSideDish shadow-sm m-2 rounded" id="${index}">
      <img
        class="rounded img-fluid"
        src="${item.imgUrl}"
        alt="rice"
        width="120px"
        height="120px"
      />
      <p>${item.name}<br> $ ${item.price}</p>
      </li>`;
    }
  });
  dishMenuCard.innerHTML = strSideDish;
  const cardSideDish = document.querySelectorAll(".cardSideDish");
  cardSideDish.forEach((id, index) => {
    id.addEventListener("click", function (e) {
      sortList(dataSideDish[index]);
    });
  });
});
menu3.addEventListener("click", function (e) {
  let strSoup = "";
  allDish.forEach((item, index) => {
    if (item.category == "soup") {
      dataSoup.push(item);
      console.log(dataSoup);
      strSoup += `<li type="button" class="cardSoup shadow-sm m-2 rounded" id="${index}">
      <img
        class="rounded img-fluid"
        src="${item.imgUrl}"
        alt="rice"
        width="120px"
        height="120px"
      />
      <p>${item.name}<br> $ ${item.price}</p>
      </li>`;
    }
  });
  dishMenuCard.innerHTML = strSoup;
  const cardSoup = document.querySelectorAll(".cardSoup");
  cardSoup.forEach((id, index) => {
    id.addEventListener("click", function (e) {
      sortList(dataSoup[index]);
    });
  });
});
menu4.addEventListener("click", function (e) {
  let strDrink = "";
  allDish.forEach((item, index) => {
    if (item.category == "drink") {
      dataDrink.push(item);
      console.log(dataDrink);
      strDrink += `<li type="button" class="cardDrink shadow-sm m-2 rounded" id="${index}">
      <img
        class="rounded img-fluid"
        src="${item.imgUrl}"
        alt="rice"
        width="120px"
        height="120px"
      />
      <p>${item.name}<br> $ ${item.price}</p>
      </li>`;
    }
  });
  dishMenuCard.innerHTML = strDrink;
  const cardDrink = document.querySelectorAll(".cardDrink");
  cardDrink.forEach((id, index) => {
    id.addEventListener("click", function (e) {
      sortList(dataDrink[index]);
    });
  });
});
function defaultMenu() {
  let strRice = "";
  allDish.forEach((item, index) => {
    if (item.category == "rice") {
      dataRice.push(item);

      strRice += `<li type="button" class="cardRice shadow-sm m-2 rounded" id="${index}">
      <img
        class="rounded img-fluid"
        src="${item.imgUrl}"
        alt="rice"
        width="120px"
        height="120px"
      />
      <p>${item.name}<br> $ ${item.price}</p>
      </li>`;
    }
  });

  dishMenuCard.innerHTML = strRice;
  const cardRice = document.querySelectorAll(".cardRice");
  cardRice.forEach((id, index) => {
    id.addEventListener("click", function (e) {
      sortList(dataRice[index]);
    });
  });
}
//已點餐點
const list = document.querySelector(".right .list");
const btnSecondaryReduce = document.querySelector(".btnSecondaryReduce");
const btnSecondaryNum = document.querySelector(".btnSecondaryNum");
const btnSecondaryPlus = document.querySelector(".btnSecondaryPlus");
const totalNum = document.querySelector(".totalNum");
const sendBtn = document.querySelector(".sendBtn");
//帶入桌號
const getUrlString = location.href;
const url = new URL(getUrlString);
let table = url.searchParams.get("desk");
document.querySelector(".table").innerHTML = table;

let arrToRecord = [];
function sortList(data) {
  if (arrToRecord.length === 0) {
    let obj = {};
    obj.productsId = data.id;
    obj.name = data.name;
    obj.num = 1;
    obj.price = data.price;
    arrToRecord.push(obj);
  } else {
    let obj2 = {};
    let product = arrToRecord.find((item) => item.name === data.name);
    if (!product) {
      obj2.productsId = data.id;
      obj2.name = data.name;
      obj2.num = 1;
      obj2.price = data.price;
    } else {
      product.num += 1;
      product.price = data.price * product.num;
    }
    if (Object.keys(obj2).length > 0) arrToRecord.push(obj2);
  }
  renderOrder(arrToRecord);
  arrToRecord.sort((a,b) => a.id - b.id)
  console.log(arrToRecord)
}

function renderOrder(arrToRecord) {
  let str = "";
  arrToRecord.forEach((obj, index) => {
    str += `<li><label class="orderDish col-6" id="${index}">${obj.name}</label>
<div  class="btn-group col-4">

        <button type="button" class="numCount btnNum">${obj.num}</button>

        <p class="countOfPrice">$${obj.price}</p>
      </div> 
      <button type="button" class="deleteBtn col-2">X</button></li>`;
  });
  list.innerHTML = str;
  totalRender(arrToRecord);

  //delete按鈕
  const deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((e, index) => {
    e.addEventListener("click", function (e) {
      arrToRecord.splice(index, 1);
      renderOrder(arrToRecord);
    });
  });
}
function totalRender(arrToRecord) {
  let total = 0;
  arrToRecord.forEach((obj) => {
    total += obj.price;
  });
  totalNum.innerHTML = `<p class="total">品項: ${arrToRecord.length} 項 總金額:${total}</p>`;
}

sendBtn.addEventListener("click", function (e) {
  alert("訂單送出成功");
  let cartData={
    tableId:table,
    time: regTime(),
    totalPrice : getTotalPrice(),
    paid: false,
    detail: arrToRecord
  }
  axios.post(`${path}carts?tableId=${table}`, cartData)
  .then(function (response) {
    console.log(response.data);
    debugger
  })
  .catch(function (error) {
    console.log(error);
  });
  // sortCartList(arrToRecord);
  // console.log(dataRecordList);
  // dataRecordList.forEach((item) => {
  //   axios
  //     .post(`${path}carts?tableId=${table}`, {
  //       tableId: item.tableId,
  //       productsId: item.productsId,
  //       quantity: item.quantity,
  //       price: item.price,
  //       time: item.time,
  //     })
  //     .then(function (response) {
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // });
  debugger
  entry();
});
function entry() {
  window.location.href = "table.html";
}
const checkBillBtn = document.querySelector(".checkBillBtn");
checkBillBtn.addEventListener("click", function (e) {
  let tableId = table;
  entryCarts(tableId);
});

function entryCarts(tableId) {
  window.location.href = `status.html?desk=${tableId}`;
}

function sortCartList(arrToRecord) {
  arrToRecord.forEach((item) => {
    let obj = {};
    obj.tableId = table;
    obj.productsId = fineProductsId(item);
    obj.quantity = item.num;
    obj.price = item.price;
    obj.time = `${new Date().getFullYear()}/${
      new Date().getMonth() + 1
    }/${new Date().getDate()} ${new Date().getHours()}:${new Date()
      .getMinutes()
      .toString()
      .padStart(2, 0)}`;
    dataRecordList.push(obj);
  });
}
function fineProductsId(item) {
  let id;
  allDish.find((e) => {
    if (e.name == item.name) {
      console.log(e.id);
      id = e.id;
    }
  });
  return id;
}


// 取得訂單總價
function getTotalPrice(){
  let total = 0;
  arrToRecord.forEach((obj) => {
    total += obj.price;
  });
  return total
}



//格式化時間
function regTime(){
  return `${new Date().getFullYear()}/${
    new Date().getMonth() + 1
  }/${new Date().getDate()} ${new Date().getHours()}:${new Date()
    .getMinutes()
    .toString()
    .padStart(2, 0)}`;
}