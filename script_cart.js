'use strict';

window.addEventListener('DOMContentLoaded', () => {
    
    class CartItem {
        constructor(good) {
            this.idProduct = good.item.idProduct;
            this.productName = good.item.productName;
            this.price = good.item.price;
            this.imgPreview = good.item.imgPreview;
            this.quantity = good.quantity;
        }
    
        render() {
            return `
            <div class="cart__product_card"  data-id_product="${this.idProduct}">
                <img class="cart__product_card_img" src="${this.imgPreview}" alt="foto">
                <div class="cart__product_card_text">
                    <div class="cart__product_card_title">
                        <a href="product.html"> ${this.productName}</a>
                        <button class="cart__product_card_close">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" fill="#575757"/>
                            </svg>
                        </button>
                    </div>
                    <p>Price: <span class="cart__product_card_text_red">$${this.price}</span></p>
                    <p>Color: Red</p>
                    <p>Size: Xl</p>
                    <div class="cart__product_quantity">
                        <p>Quantity:</p>
                        <input   data-id_product="${this.idProduct}" type="number" value = ${this.quantity} min = "1">
                    </div>
                </div>
            </div>`
        }
}

class TransferCart {
    constructor() {
        this.goodsInCart = [];
    }
    
    getCart () {
        if ((localStorage.getItem('goods') === null) || (localStorage["goods"] === '') || (localStorage["goods"] === 'undefined')) {
            this.setCart([]);
        }
        let cart = JSON.parse(localStorage["goods"]);
        return cart;
    }

    setCart (cart) {
        if (localStorage["goods"] === '') localStorage["goods"] = JSON.stringify([]);
        localStorage["goods"] = JSON.stringify(cart);
    }

    addGoods(goodItemNew) {
        console.log(goodItemNew);
        //проверка в массиве корзины, нет ли такого уже товара
        this.goodsInCart = this.getCart();
        let goodNew = this.goodsInCart.find(el => el.item.idProduct === goodItemNew.idProduct);
        if (goodNew === undefined) 
            this.goodsInCart.push({item:goodItemNew, quantity: 1}) //Добавляем новый товар в массив корзины
        else {
            let index = this.goodsInCart.indexOf(goodNew);
            if (~index) {
                this.goodsInCart[index].quantity += 1;
            }
        }
        this.setCart(this.goodsInCart)
    }

    updateGoods(idGoodNew, inputValue) {
        this.goodsInCart = this.getCart();
        let goodNew = this.goodsInCart.find(el => el.item.idProduct === idGoodNew);
        let index = this.goodsInCart.indexOf(goodNew);
            if (~index) {
                this.goodsInCart[index].quantity = +inputValue;
            }
        this.setCart(this.goodsInCart);
    }
}


    class Cart {
        constructor(cartItemCurrent = '', transferCartCurrent){
            this.cartListBlock = null;
            this.cartBlock = null;
            this.cartButton = null;
            this.cartItemCurrent = cartItemCurrent;
            this.transferCartCurrent = transferCartCurrent;
            this.goodsInCart =[];
            this.sumSub = document.querySelector('.sum_sub');
            this.sumGtand = document.querySelector('.sum_grand');
        }
        

        init() {
            //очистка содержимого корзины
           let cartList = document.querySelector('.cart__products');
            if (cartList !== null) cartList.remove();
            //создание корзины
            this.cartBlock = document.querySelector('.cart__content_left');
            this.cartListBlock = document.createElement('div');
            this.cartBlock.insertAdjacentElement('afterbegin', this.cartListBlock);
            this.cartListBlock.classList.add('cart__products');
            //console.log(this.cartBlock);
            this.cartButton = this.cartBlock.querySelector('.cart_buttons_clear');

            this.cartButton.addEventListener('click', this.clearCart.bind(this));
    
            this.render();

            this.cartBlock.addEventListener('input', (event) => this.updateCart(event));
        }

        render() {
            this.goodsInCart = this.transferCartCurrent.getCart();
            if (this.goodsInCart.length) {
                this.goodsInCart.forEach(good => {
                    const cartItemObj = new CartItem(good);
                    this.cartListBlock.insertAdjacentHTML('beforeend', cartItemObj.render());
                });
                this.sumSub.textContent = `$${this.countCartPrice()}`;
                this.sumGtand.textContent = `$${this.countCartPrice()}`;
            } else {
                this.sumSub.textContent = `$0`;
                this.sumGtand.textContent = `$0`;
            };
            console.log('1',this.goodsInCart);
        }

        clearCart() {
            this.goodsInCart = [];
            this.transferCartCurrent.setCart(this.goodsInCart);
            this.init();
        }

        countCartPrice() {
            this.goodsInCart = this.transferCartCurrent.getCart();
            console.log(this.goodsInCart);
            return this.goodsInCart.reduce((accum, el) => accum + el.item.price * el.quantity, 0);
        }

        countCart() {
            this.goodsInCart = this.transferCartCurrent.getCart();
            return this.goodsInCart.length;
        }

        updateCart(event) {
            console.log(event.target.dataset.id_product, event.target.value);
            this.transferCartCurrent.updateGoods(event.target.dataset.id_product, event.target.value);
            this.sumSub.textContent = `$${this.countCartPrice()}`;
            this.sumGtand.textContent = `$${this.countCartPrice()}`;

        }
    
};

    
    let transferCartCurrent = new TransferCart();
    //let cartItemCurrent = new CartItem();
    //let cartCurrent = new Cart(cartItemCurrent, transferCartCurrent);
    let cartCurrent = new Cart('', transferCartCurrent);
    cartCurrent.init();










});