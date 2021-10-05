var productsBike = [{
    name: "Cube 2019",
    image: "./img/cube2019.jpeg",
    price: 3200.00,
    qtty: 1
}, {
    name: "GT Avalanche",
    image: "./img/gtavalanche.jpg",
    price: 2100.00,
    qtty: 1
}, {
    name: "Trek 8",
    image: "./img/trekfull8.jpg",
    price: 4500.00,
    qtty: 1
}];

let products = [
    {
        qtty: 1,
        price: 15.99,
        image: "./img/f-1.jpeg",
        name: "Azalea"
    },
    {
        qtty: 1,
        price: 33.99,
        image: "./img/f-2.jpeg",
        name: "Tibouchina"
    },
    {
        qtty: 1,
        price: 12.99,
        image: "./img/f-3.jpeg",
        name: "Hibiscus"
    },
    {
        qtty: 1,
        price: 5.99,
        image: "./img/f-4.jpeg",
        name: "Plectranthus"
    },
    {
        qtty: 1,
        price: 15.99,
        image: "./img/f-5.jpeg",
        name: "Camellia Japonica"
    },
    {
        qtty: 1,
        price: 10.99,
        image: "./img/f-6.jpeg",
        name: "Bougainvillea Spectabilis"
    },
    {
        qtty: 1,
        price: 22.99,
        image: "./img/f-7.jpeg",
        name: "Rosa Burgundy"
    },
    {
        qtty: 1,
        price: 22.99,
        image: "./img/fl-1.jpeg",
        name: "Rosa Iceberg"
    },
    {
        qtty: 1,
        price: 45.99,
        image: "./img/fl-2.jpeg",
        name: "Bonsai Tree"
    },
    {
        qtty: 1,
        price: 12.99,
        image: "./img/fo-1.jpeg",
        name: "Calibrachoa Noa"
    },
    {
        qtty: 1,
        price: 14.99,
        image: "./img/fo-3.jpeg",
        name: "Cymbidium Aestivum"
    }];

for (let val of products) {
    document.getElementsByClassName("products")[0].innerHTML += `<div class="product col-12 col-md-6 col-lg-4 text-center fw-bold mt-5">
   <p class ="product-title h4 m-3">${val.name}</p>
   <img class ="product-image" src="${val.image}" width="200"  height="200">
   <div class="product-details" >
       <p class="product-price h5 m-3">${val.price} €</p>
       <button class="btn btn-primary product-button"  type="button">ADD  TO CART</button>
   </div>
   </div>
   `
    /* Select all add-buttons and add an event to each one */
    let btns = document.getElementsByClassName("product-button");


    for (let i = 0; i < btns.length; i++) {

        btns[i].addEventListener("click", function () {

            addToCart(products[i], i);

        })

    }
}



var cart = [];
let totalShoppingItems = 0;

function addToCart(product, index) {

    if (cart.length == 0) {
        cart.push(product);
        totalShoppingItems++;
    } else if (cart.find((val) => val.name == product.name)) {
        product.qtty++;
        totalShoppingItems++;
    } else {
        cart.push(product);
        totalShoppingItems++
    }

    console.table(cart);
    createRows();
    Total();

    /* Display total items in the cart*/
    document.getElementById("total-qtty").innerHTML = totalShoppingItems;

}

/* go through the elements inside the cart array and print them in the div with id “cart-items”. */
function createRows() {
    var result = "";
    totalShoppingItems = 0;

    for (let val of cart) {
        result += `
    <div class="cart-row row d-flex">
        <div class="cart-item col-6 my-3 ">
            <img class="cart-item-image" src="${val.image}" width="100" height="100">
            <span class="cart-item-title h5 ">${val.name}</span>
        </div>

        <span class="cart-price col-3 h4 my-3">${val.price} €</span>

        <div class="cart-qtty-action col-3 d-flex">            
            <i class="minus fa fa-minus-circle my-auto" ></i>            
            <div class="cart-quantity p-4 h4">${val.qtty}</div>            
            <i class="plus fa fa-plus-circle my-auto"></i>        
            <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> X </button>            
        </div>

    </div>
    `;

        totalShoppingItems += val.qtty;
    }

    document.getElementById("cart-items").innerHTML = result;

    /* Selects all the plus buttons */
    let plus = document.getElementsByClassName("plus");
    /* Selects all the minus buttons */
    let minus = document.getElementsByClassName("minus");
    /* Selects all the minus buttons */
    let del = document.getElementsByClassName("del");

    /* Loop through plus &minus buttons to add an event listener*/
    for (let i = 0; i < plus.length; i++) {

        /* Add an event listener t0 plus btns */
        plus[i].addEventListener("click", function () {
            plusQtty(i);
            Total();
        });

        /* Add an event listener to minus btns */
        minus[i].addEventListener("click", function () {
            minusQtty(i);
            Total();
        });
        /* Add an event listener to delete btns */
        del[i].addEventListener("click", function () {
            deleteItem(i);
            Total();
        });
    }

    /* Update total items in the cart*/
    document.getElementById("total-qtty").innerHTML = totalShoppingItems;
}

/* Calculate the total price of the elements in the cart */
function Total() {
    let total = 0;
    for (let val of cart) {
        total = total + (val.price * val.qtty);
    }

    /* Display subtotal*/
    document.getElementById("sub-total-price").innerHTML = total.toFixed(2) + " €";

    /* Calculate price after discount*/
    total = total - Discount(total);

    /* Display order total*/
    document.getElementById("total-price").innerHTML = total.toFixed(2) + " €";
}

/*Apply 10% discount when price is over 100 € */
function Discount(total) {
    let discount = 0;
    let discountFrom = 100;

    if (total >= discountFrom) {
        discount = (total * 10) / 100;
    }

    /* Display discount*/
    document.querySelector("#discount").innerHTML = "- " + discount.toFixed(2) + " €"

    return discount;
}

/* Increase the quantity by 1 */
function plusQtty(i) {

    cart[i].qtty++;
    document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;

    /* Update total items in the cart*/
    totalShoppingItems++;
    document.getElementById("total-qtty").innerHTML = totalShoppingItems;
}

/* Decrease the quantity by 1 */
function minusQtty(i) {
    if (cart[i].qtty == 1) {
        cart.splice(i, 1);
        createRows();
    } else {
        cart[i].qtty -= 1;
        document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;

        /* Update total items in the cart*/
        totalShoppingItems--;
        document.getElementById("total-qtty").innerHTML = totalShoppingItems;
    }
}

/* Delet item from the card */
function deleteItem(i) {
    cart[i].qtty = 1;
    cart.splice(i, 1);
    createRows();
}