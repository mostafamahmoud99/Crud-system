"use strict";
// global variables
let productNameInput = document.getElementById("productName"),
  productPriceInput = document.getElementById("productPrice"),
  productCategoryInput = document.getElementById("productCategory"),
  productDescribtionInput = document.getElementById("productDescribtion"),
  allInput = document.querySelectorAll("input , textarea"),
  searchInput = document.getElementById("search"),
  alertName = document.getElementById("alertName"),
  alertPrice = document.getElementById("alertPrice"),
  alertCategory = document.getElementById("alertCategory"),
  alertDesc = document.getElementById("alertDesc"),
  addBtn = document.getElementById("addBtn"),
  productContainer = [],
  currentIndex = 0;

// check localstorge
if (localStorage.getItem("storgeData") !== null) {
  productContainer = JSON.parse(localStorage.getItem("storgeData"));
  displayProducts();
}


// add product
addBtn.addEventListener("click", add);

function addProduct() {
  if (validationInput() === true) {
    let product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      describtion: productDescribtionInput.value,
    };
    productContainer.push(product);
    localStorage.setItem("storgeData", JSON.stringify(productContainer));
    displayProducts();
    clearInput();
  }
}

// switch add and update

function add() {
  if (addBtn.innerHTML == "Add Product") {
    addProduct();
  } else {
    submitUpdate();
  }
}

// clear inputs
function clearInput() {
  for (let i = 0; i < allInput.length; i++) {
    allInput[i].value = "";
  }
  productNameInput.classList.remove("is-valid");
  alertName.classList.add("d-none");

  productPriceInput.classList.remove("is-valid");
  alertPrice.classList.add("d-none");
  
  productCategoryInput.classList.remove("is-valid");
  productDescribtionInput.classList.remove("is-valid");


  alertCategory.classList.add("d-none");
  alertDesc.classList.add("d-none");
}



// display Data
function displayProducts() {
  let box = ``;
  for (let i = 0; i < productContainer.length; i++) {
    box += `<tr>
    <td>${i + 1}</td>
    <td>${productContainer[i].name}</td>
    <td>${productContainer[i].price}</td>
    <td>${productContainer[i].category}</td>
    <td>${productContainer[i].describtion}</td>
    <td><button class='btn btn-delete' onclick='deleteProduct(${i})'><i class="fa-solid fa-trash"></i></button></td>
    <td><button class='btn btn-update' onclick='updateProduct(${i})'><i class="fa-sharp fa-solid fa-pen-to-square"></i></button></td>
  </tr>`;
  }
  document.getElementById("rowData").innerHTML = box;
}

// delete product

function deleteProduct(index) {
  productContainer.splice(index, 1);
  localStorage.setItem("storgeData", JSON.stringify(productContainer));
  displayProducts();
}

// return update product

function updateProduct(index) {
  productNameInput.value = productContainer[index].name;
  productPriceInput.value = productContainer[index].price;
  productCategoryInput.value = productContainer[index].category;
  productDescribtionInput.value = productContainer[index].describtion;
  currentIndex = index;
  addBtn.innerHTML = "Update Product";
}

// submit update product
function submitUpdate() {
  if (
    validationProductName() ==true&&
    validationProductPrice() ==true&&
    validationProductCategory() ==true&&
    validationProductDesc() ==true
  ) {
    productContainer[currentIndex].name = productNameInput.value;
    productContainer[currentIndex].price = productPriceInput.value;
    productContainer[currentIndex].category = productCategoryInput.value;
    productContainer[currentIndex].describtion = productDescribtionInput.value;
    localStorage.setItem("storgeData", JSON.stringify(productContainer));
    displayProducts();
    clearInput();
  }else{
    return false;
  }
  addBtn.innerHTML = "Add Product";
}

// Search Product

searchInput.addEventListener("keyup", function () {
  let searchValue = this.value;
  let box = ``;
  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      box += `<tr>
    <td>${i + 1}</td>
    <td>${productContainer[i].name}</td>
    <td>${productContainer[i].price}</td>
    <td>${productContainer[i].category}</td>
    <td>${productContainer[i].describtion}</td>
    <td><button class="btn" onclick='deleteProduct(${i})'>Delete</button></td>
    <td><button class="btn" onclick='updateProduct(${i})'>Update</button></td>
  </tr>`;
    }
  }
  document.getElementById("rowData").innerHTML = box;
});


// validation inputs
function validationInput() {
  if (
    validationProductName() &&
    validationProductPrice() &&
    validationProductCategory() &&
    validationProductDesc()
  ) {
    return true;
  } else {
    return false;
  }
}

// validation product name

function validationProductName() {
  let Regex = /^[A-Z][a-z]{2,}([0-9]{1,4})?$/;
  if (Regex.test(productNameInput.value)) {
    alertName.style.display = "none";
    productNameInput.classList.add("is-valid");
    addBtn.disabled=false;
    return true;
  } else {
    alertName.style.display = "block";
    productNameInput.classList.remove("is-valid");
    addBtn.disabled=true;
    return false;
  }
}
productNameInput.addEventListener("keyup", validationProductName);

// validation product price

function validationProductPrice() {
  let regex = /^[1-9][0-9]{0,6}$/;
  if (regex.test(productPriceInput.value)) {
    alertPrice.style.display = "none";
    productPriceInput.classList.add("is-valid");
    addBtn.disabled=false;
    return true;
  } else {
    alertPrice.style.display = "block";
    productPriceInput.classList.remove("is-valid");
    addBtn.disabled=true;
    return false;
  }
}
productPriceInput.addEventListener("keyup", validationProductPrice);


// validation product category

function validationProductCategory() {
  let regex = /^[a-z ]{3,}$/;
  if (regex.test(productCategoryInput.value)) {
    alertCategory.style.display = "none";
    productCategoryInput.classList.add("is-valid");
    addBtn.disabled=false;
    return true;
  } else {
    alertCategory.style.display = "block";
    productCategoryInput.classList.remove("is-valid");
    addBtn.disabled=true;
    return false;
  }
}

productCategoryInput.addEventListener("keyup", validationProductCategory);

// validation product describtion

function validationProductDesc() {
  let regex = /^[a-zA-Z]{2,}$/;
  if (regex.test(productDescribtionInput.value)) {
    alertDesc.style.display = "none";
    productDescribtionInput.classList.add("is-valid");
    addBtn.disabled=false;
    return true;
  } else {
    alertDesc.style.display = "block";
    productDescribtionInput.classList.remove("is-valid");
    addBtn.disabled=true;
    return false;
  }
}

productDescribtionInput.addEventListener("keyup", validationProductDesc);




// back to top


$(window).scroll(function(){
  let scrollTop=$(window).scrollTop()
  if(scrollTop>=300){
    $('.back-top').css('display','block');
  }else{
    $('.back-top').css('display','none');
  }
})

$('.back-top').click(function(){
  $('html,body').animate({scrollTop:0},2000)
})