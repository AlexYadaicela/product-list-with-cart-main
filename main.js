const data = `[
    {
        "image": {
            "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
            "mobile": "./assets/images/image-waffle-mobile.jpg",
            "tablet": "./assets/images/image-waffle-tablet.jpg",
            "desktop": "./assets/images/image-waffle-desktop.jpg"
        },
        "name": "Waffle with Berries",
        "category": "Waffle",
        "price": 6.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
            "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
            "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
            "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
            "mobile": "./assets/images/image-macaron-mobile.jpg",
            "tablet": "./assets/images/image-macaron-tablet.jpg",
            "desktop": "./assets/images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
            "mobile": "./assets/images/image-tiramisu-mobile.jpg",
            "tablet": "./assets/images/image-tiramisu-tablet.jpg",
            "desktop": "./assets/images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
            "mobile": "./assets/images/image-baklava-mobile.jpg",
            "tablet": "./assets/images/image-baklava-tablet.jpg",
            "desktop": "./assets/images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
            "mobile": "./assets/images/image-meringue-mobile.jpg",
            "tablet": "./assets/images/image-meringue-tablet.jpg",
            "desktop": "./assets/images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
            "mobile": "./assets/images/image-cake-mobile.jpg",
            "tablet": "./assets/images/image-cake-tablet.jpg",
            "desktop": "./assets/images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
            "mobile": "./assets/images/image-brownie-mobile.jpg",
            "tablet": "./assets/images/image-brownie-tablet.jpg",
            "desktop": "./assets/images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
            "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
            "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
            "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50
    }
]`; 

const productList = JSON.parse(data); 
const productDisplay = document.querySelector(".product-list"); 
let totalItem = document.querySelector(".cart-quantity"); 
let total = 0; 

function generateProductListing(){
    const product = new DocumentFragment(); 

    productList.forEach(element => {

        const divElement = document.createElement("div"); 
        const productImg = document.createElement("div"); 
        const btnDisplayElement = document.createElement("div");
        const pElement = document.createElement("p");
        const btnElement = document.createElement("button");


        btnDisplayElement.classList.add("btn-position"); 
        divElement.classList.add("product-item"); 
        productImg.classList.add("product-img");
        pElement.classList.add("product-description"); 
        btnElement.classList.add("cart");

        btnElement.setAttribute("data-category", `${element.category}`);
        btnElement.setAttribute("data-price", `${element.price.toFixed(2)}`); 

        // revise 
        btnElement.setAttribute("data-quantity", `${1}`); 

        btnElement.appendChild(document.createElement("span"));
        btnElement.appendChild(document.createTextNode("Add to Cart"));

        const pictureElement = document.createElement("picture"); 

        const sourceElement = document.createElement("source"); 
        const imgElement = document.createElement("img");

        sourceElement.setAttribute("srcset", `${element.image.desktop}`);
        sourceElement.setAttribute("media", "(min-width: 40em)");
        imgElement.setAttribute("src", `${element.image.mobile}`);


        pictureElement.appendChild(sourceElement); 
        pictureElement.appendChild(imgElement);

        btnDisplayElement.appendChild(btnElement); 
        productImg.appendChild(pictureElement);
        productImg.appendChild(btnDisplayElement);

        const productName = document.createElement("span"); 
        const productCategory = document.createElement("span"); 
        productCategory.classList.add("product-category");
        const productPrice = document.createElement("span"); 
        productPrice.classList.add("product-price"); 
        
        const name = document.createTextNode(`${element.name}`);
        const category = document.createTextNode(`${element.category}`);
        const price = document.createTextNode(`$${element.price.toFixed(2)}`);
        
        productCategory.appendChild(category); 
        productName.appendChild(name);
        productPrice.appendChild(price); 
        
        pElement.appendChild(productCategory); 
        pElement.appendChild(productName); 
        pElement.appendChild(productPrice);
        
        divElement.appendChild(productImg); 
        divElement.appendChild(pElement); 

        product.appendChild(divElement); 
    });

    productDisplay.appendChild(product); 
    addToCart(); 
}

function displayItemOnCart(category, price){

    const fragementItem = new DocumentFragment(); 

    const items = document.querySelector(".items"); 
    const cartDisplay = document.querySelector(".your-cart-display"); 
    
    const emptyIcon = document.querySelector(".icon-empty");
    const emptyMsg = document.querySelector(".empty-cart-msg");

    let itemElement ; 
    let pElement; 
    let spanCategory; 
    let spanPrice; 
    let removeItem; 

    if(emptyIcon !== null && emptyMsg !== null){
        cartDisplay.removeChild(emptyIcon); 
        cartDisplay.removeChild(emptyMsg);
        
    }

    itemElement = document.createElement("div");
    itemElement.classList.add("item");
    pElement = document.createElement("p"); 

    spanCategory = document.createElement("span"); 
    spanPrice = document.createElement("span");

    
    spanPrice.classList.add(`${category.replace(/ /g,'')}`); 
    spanPrice.setAttribute("data-num", 1);
    pElement.appendChild(spanCategory); 
    pElement.appendChild(spanPrice); 
    removeItem = document.createElement("button");
    itemElement.appendChild(pElement);  
    itemElement.appendChild(removeItem); 

    removeItem.addEventListener("click", (element) => {
        const upperNode = element.target.parentNode; 
        const num = spanPrice.getAttribute("data-num"); 
        total-=num; 
        totalItem.textContent = `Your Cart (${total})`;
        upperNode.remove(); 
        
    })

    spanCategory.textContent = `${category}`;
    spanPrice.textContent = `1 @ ${price} ${(price * 1).toFixed(2)}`; 


    fragementItem.appendChild(itemElement);
    items.appendChild(fragementItem); 
}

function addToCart(){
    const btnArr = document.querySelectorAll(".cart"); 
    btnArr.forEach(btn => {
        btn.addEventListener("click", (event) =>{

            total+=1; 

            const parentElement = event.target.parentNode; 

            
            const btnChange = document.createElement("div"); 
            const removeItem = document.createElement("button");  
            const addItem = document.createElement("button"); 
            
            btnChange.classList.add("add-remove-item");
            
            removeItem.classList.add("remove-item");
            addItem.classList.add("add-item");
            
            const category = btn.getAttribute("data-category"); 
            const price = btn.getAttribute("data-price"); 
            let quantity = btn.getAttribute("data-quantity"); 

            const spanElement = document.createElement("span");
            spanElement.classList.add("item-count");
            spanElement.setAttribute("data-quantity", "1"); 
            spanElement.textContent = "1"; 
            
            btnChange.appendChild(removeItem);
            btnChange.appendChild(spanElement);
            btnChange.appendChild(addItem); 

            
            spanElement.setAttribute("data-category", `${category.replace(/ /g,'')}`); 
            spanElement.setAttribute("data-price", `${price}`);

            displayItemOnCart(category, price);
            
            removeItem.addEventListener("click", () =>{
                quantity--; 
                spanElement.textContent = `${quantity}`;  
                spanElement.setAttribute("data-quantity", `${quantity}`);
                const itemName = spanElement.getAttribute("data-category"); 

                total-=1; 
                totalItem.textContent = `Your Cart (${total})`; 

                let itemDisplay = document.querySelector(`.${itemName}`);
                itemDisplay.setAttribute("data-num", quantity); 

                itemDisplay.textContent = `${quantity}x @ ${price} ${(price * quantity).toFixed(2)}`; 

            });
            
            addItem.addEventListener("click", () => {
                quantity++;
                spanElement.textContent = `${quantity}`; 
                spanElement.setAttribute("data-quantity", `${quantity}`);
                const itemName = spanElement.getAttribute("data-category"); 

                total+=1; 
                totalItem.textContent = `Your Cart (${total})`; 
                let itemDisplay = document.querySelector(`.${itemName}`);
                itemDisplay.setAttribute("data-num", `${quantity}`); 
                itemDisplay.textContent = `${quantity}x @ ${price} ${(price * quantity).toFixed(2)}`; ;

            }); 
            
            totalItem.textContent = `Your Cart (${total})`; 

            btn.remove();
            parentElement.appendChild(btnChange);  
        });
    });
}

generateProductListing();
