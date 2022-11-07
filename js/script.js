// import books from "./data.js";
// console.log(books);

let books = [
  {
    id: 1,
    name: "Luật tâm thức",
    price: 220000,
    provider: "Fahasha",
  },
  {
    id: 2,
    name: "Chiến binh cầu vồng",
    price: 140000,
    provider: "Fahasha",
  },
  {
    id: 3,
    name: "Nghệ thuật tập trung",
    price: 90000,
    provider: "Tuổi trẻ",
  },
  {
    id: 4,
    name: "Bye Béo",
    price: 305000,
    provider: "Kmin Books",
  },
  {
    id: 5,
    name: "Sát thủ bán hàng",
    price: 180000,
    provider: "Fahasha",
  },
  {
    id: 6,
    name: "Hoàng tử bé",
    price: 50000,
    provider: "Kmin Books",
  },
  {
    id: 7,
    name: "Tâm lý học tội phạm",
    price: 400000,
    provider: "Kmin Books",
  },
  {
    id: 8,
    name: "Hiểu về trái tim",
    price: 130000,
    provider: "Tuổi trẻ",
  },
];

function importBookList(){
  let bookList = document.getElementById('list')
  for (let index = 0; index < books.length; index++) {
    const bookDivResult = addItemToBookDiv(index)
    bookList.appendChild(bookDivResult);
  }
}
importBookList()

function addItemToBookDiv(index){
  //Create div
  const bookDiv = document.createElement("div")
  bookDiv.className="item"

  //Create img
  const bookImage = document.createElement("img")
  bookImage.src = './images/0' + books[index].id + '.jpg'

  //Create name
  const bookName = document.createElement("h2")
  const bookNameContext = document.createTextNode(books[index].name)
  bookName.appendChild( bookNameContext )

  //Create price
  const bookPrice = document.createElement("p")
  const bookPriceContext = document.createTextNode(books[index].price)
  bookPrice.appendChild(bookPriceContext)

  //AppendChilde img/name/price into div
  bookDiv.appendChild(bookImage)
  bookDiv.appendChild(bookName)
  bookDiv.appendChild(bookPrice)

  return bookDiv
}

//Đổi màu banner: Người dùng nhấn vào màu nào thì banner sẽ đổi màu tương ứng//
function changeBackgroundColor(color){
  let header = document.getElementsByTagName("header")[0]
  header.style.background = color;
}

function backgroundColor(){
  let yellowButton = document.getElementById("yellow")
  yellowButton.addEventListener("click", function() {
    changeBackgroundColor("#fcbf16")
  } )
  
  let redButton = document.getElementById("red")
  redButton.addEventListener("click", function() {
    changeBackgroundColor("#992154")
  } )
  
  let blueButton = document.getElementById("blue")
  blueButton.addEventListener("click", function() {
    changeBackgroundColor("#173451")
  })
}
  let gradientButton = document.getElementById("gradient")
  gradientButton.addEventListener("click", function() {
    changeBackgroundColor("linear-gradient(to right, #fcbf16, #992154)")
  })  

backgroundColor()

//Tìm kiếm: Người dùng gõ từ khóa → Web sẽ hiển thị các sản phẩm có tên gần giống với từ khóa

function searchBox(){
  document.getElementById("search").onkeyup = function() {checkValue()}
}

function checkValue(){
  let input = document.getElementById("search")
  for (let index = 0; index < books.length; index++){
    if( input.value === '' ) {
      document.getElementsByClassName("item")[index].style.display = "block";
    }
    else if ( !books[index].name.includes(input.value) ){
      document.getElementsByClassName("item")[index].style.display = "none";
    }
  }
}

searchBox()
//==> VẤN ĐỀ: Nếu nhập các từ từ không dấu thì được, nhưng khi nhập từ có dấu thì không được?

//Lọc theo giá: Người dùng nhập khoảng giá và nhấn nút Áp dụng → Web sẽ hiển thị các sản phẩm có giá nằm trong khoảng đó.

function getParseIntMinPrice(){
  let minPrice = document.getElementById("min-price").value
  return parseInt(minPrice)
}

function getParseIntMaxPrice(){
  let maxPrice = document.getElementById("max-price").value
  return parseInt(maxPrice)
}

function priceApplyButton(){
  let applyButton = document.getElementById("apply-price-filter")
  applyButton.addEventListener("click", function() {
    checkPrice()
  })
}

function checkPrice(){
  let minPriceValue = getParseIntMinPrice()
  let maxPriceValue = getParseIntMaxPrice()
  for (let index = 0; index < books.length; index++) {
    document.getElementsByClassName("item")[index].style.display = "block";
    if( ( minPriceValue === 0 || minPriceValue === '' ) && ( maxPriceValue === 0 || maxPriceValue === '' )   ){
      document.getElementsByClassName("item")[index].style.display = "block";
    } else if ( 
      !(
        books[index].price >= minPriceValue &&
        books[index].price <= maxPriceValue
      ) ) {
      document.getElementsByClassName("item")[index].style.display = "none";
    }
  }
}
priceApplyButton()

//Lọc theo nhà cung cấp: Người dùng tick vào nhà cung cấp nào thì web sẽ hiển thị sản phẩm của nhà cung cấp đó. 
//Lưu ý: Có thể lựa chọn nhiều nhà cung cấp.
