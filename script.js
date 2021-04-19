'use strict';
 const API = '';
window.addEventListener('DOMContentLoaded', () => {

   

    class Product{
        constructor(product,  img = '') {
            console.log('constructor', product);
            this.idProduct = product.id_product;
            this.productName = product.product_name;
            //this.model = '';
            this.description = product.description;
            this.size = product.size;
            this.price = product.price;
            this.imgPreview = product.imgPreview;
            //this.imgFull = '';
        }
    
        render() {
            console.log('render', this);
            return `<figure class="catalog__item">
                <div class="catalog__item_img">
                    <a href="product.html">
                        <img class="catalog__img" src=${this.imgPreview} alt="catalog" class="catalog__img">
                    </a>
                    <button class="catalog__button_overlay" data-id_product="${this.idProduct}">
                        <img src="img/catalog-cart.svg" alt="cart">Add to Cart</button>
                </div>
                <div class="catalog__text">
                    <a href="product.html">
                        <fidcaption class="catalog__heading">${this.productName}</fidcaption>
                    </a>
                    <p class="catalog__p">${this.description}</p>
                    <p class="catalog__price">$${this.price}</p>
                </div>
            </figure>`;
        }


}

    class ProductCatalog {
        constructor(transferCart, container = '.catalog__items') {
        this.transferCart = transferCart;
        this.catalogItems = document.querySelector(container);
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                console.log(data);
                this.goods = [...data];
                this.render()
        });
    }

        _getProducts(){
            return fetch(`${API}/json/product.json`)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        }

        render() {
            for (let product of this.goods){
                const productObj = new Product(product);
                this.allProducts.push(productObj);
                this.catalogItems.insertAdjacentHTML('beforeend', productObj.render());
            }
            this.initClick();
        }

        initClick() {
            this.catalogItems.addEventListener('click', (event) => {
                    this.ClickHandler(event);
            });
        }

        ClickHandler(event) {
            if (event.target.className === 'catalog__button_overlay')  this.ClickHandlerAddToCart(event)
            if (event.target.className === 'catalog__img')  this.ClickHandlerIMG(event)
            else {return};
        }
    
        ClickHandlerAddToCart(event) {
            console.log(this.allProducts, this.allProducts[0].idProduct, +event.target.dataset.id_product);
            let goodItem = this.allProducts.find(item => item.idProduct === +event.target.dataset.id_product);
            this.transferCart.addGoods(goodItem);
        }

        ClickHandlerIMG(event) {

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
            console.log(localStorage["goods"]);
        }

        addGoods(goodItemNew) {
            console.log(goodItemNew);
            //проверка в массиве корзины, нет ли такого уже товара
            this.goodsInCart = this.getCart();
            console.log(this.goodsInCart);
            let goodNew = this.goodsInCart.find(el => el.item.idProduct === +goodItemNew.idProduct);
            if (goodNew === undefined) 
                this.goodsInCart.push({item:goodItemNew, quantity: 1}) //Добавляем новый товар в массив корзины
            else {
                let index = this.goodsInCart.indexOf(goodNew);
                if (~index) {
                    this.goodsInCart[index].quantity += 1;
                }
            }
            this.setCart(this.goodsInCart);
            console.log(this.goodsInCart);
            
        }

    }

    let transferCartBase = new TransferCart();
    let productCatalogBase = new ProductCatalog(transferCartBase);


    //productCatalogBase.render();

 
















});