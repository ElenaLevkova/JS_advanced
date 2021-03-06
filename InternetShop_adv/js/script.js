'use strict';

window.addEventListener('DOMContentLoaded', () => {

    class Product{
        constructor(idProduct, productName, model, description, size, price, imgPreview, imgFull) {
            this.idProduct = idProduct;
            this.productName = productName;
            this.model = model;
            this.description = description;
            this.size = size;
            this.price = price;
            this.imgPreview = imgPreview;
            this.imgFull = imgFull;
        }
    
        render() {
            return `<figure class="catalog__item">
                <div class="catalog__item_img">
                    <a href="product.html">
                        <img class="catalog__img" src=${this.imgPreview} data-full_image_url=${this.imgFull} alt="catalog" class="catalog__img">
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

    const productCatalog = {
        goods: [
            new Product( 
                '1',
                "ELLERY X M'O CAPSULE",
                '0001024',
                'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', 
                'S', 
                10, 
                'img/cat-1.jpg', 
                'img/max/cat-1' 
            ),
            new Product( 
                '2',
                "ELLERY X M'O CAPSULE",
                '001554',
                'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', 
                'L', 
                30 , 
                'img/cat-2.jpg', 
                'img/max/cat-2'
            ),
            new Product( 
                '3',
                "ELLERY X M'O CAPSULE",
                '001166334',
                'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', 
                'XL', 
                20, 
                'img/cat-3.jpg', 
                'img/max/cat-3'
            ),
            new Product( 
                '4',
                "ELLERY X M'O CAPSULE",
                '00117774',
                'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', 
                'XXL', 
                10 , 
                'img/cat-4.jpg', 
                'img/max/cat-4'
            ),
            new Product( 
                '5',
                "ELLERY X M'O CAPSULE",
                '00118884',
                'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', 
                'XS', 
                15 , 
                'img/cat-5.jpg', 
                'img/max/cat-5'
            ),
            new Product( 
                '6',
                "ELLERY X M'O CAPSULE",
                '0099955',
                'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', 
                'XS', 
                25 , 
                'img/cat-6.jpg', 
                'img/max/cat-6'
            )
        ],
         settings: {
            catalogItems: document.querySelector('.catalog__items'),

        //     previewSelector: '.galleryPreviewsContainer',
        //     openedImageWrapperClass: 'galleryWrapper',
        //     openedImageClass: 'galleryWrapper__image',
        //     openedImageScreenClass: 'galleryWrapper__screen',
        //     openedImageCloseBtnClass: 'galleryWrapper__close',
        //     openedImageCloseBtnSrc: 'img/close.png',
        //     num: 1,
        //     fullIMG:''
        },
    
        render() {
            this.settings.catalogItems = document.querySelector('.catalog__items');
     
            //this.goods.forEach(el => item.insertAdjacentHTML('beforeend', el.render())); //?????????????? ?????????????????????????? ???????????? map
        
            const goodsList = this.goods.map(el => el.render()); //?????????????? ?????????????????????????? ???????????? forEach
            this.settings.catalogItems.innerHTML = goodsList.join("");
    
            this.initClick();
        },

        initClick() {
            this.settings.catalogItems.addEventListener('click', (event) => {
                    this.ClickHandler(event);
            });
    
        },

        ClickHandler(event) {
            if (event.target.className === 'catalog__button_overlay')  this.ClickHandlerAddToCart(event)
            if (event.target.className === 'catalog__img')  this.ClickHandlerIMG(event)
            else {return};
        },
    
        ClickHandlerAddToCart(event) {
            pCart.addGoods(event.target.dataset.id_product);
        },

        ClickHandlerIMG(event) {

        },


    };

    const pCart = {
        goodsInCart: [],

        getCart () {
            if ((localStorage["goods"] === '') || (localStorage["goods"] === 'undefined')) {
                this.setCart([]);
            }
            let cart = JSON.parse(localStorage["goods"]);
            return cart;
        },

        setCart (cart) {
            if (localStorage["goods"] === '') localStorage["goods"] = JSON.stringify([]);
            localStorage["goods"] = JSON.stringify(cart);
        },

        addGoods(idGoodNew) {
            console.log(idGoodNew);
            //???????????????? ?? ?????????????? ??????????????, ?????? ???? ???????????? ?????? ????????????
            this.goodsInCart = this.getCart();
            let goodNew = this.goodsInCart.find(el => el.item.idProduct === idGoodNew);
            if (goodNew === undefined) 
                this.goodsInCart.push({item:productCatalog.goods.find(item => item.idProduct === idGoodNew), quantity: 1}) //?????????????????? ?????????? ?????????? ?? ???????????? ??????????????
            else {
                let index = this.goodsInCart.indexOf(goodNew);
                if (~index) {
                    this.goodsInCart[index].quantity += 1;
                }
            }
            this.setCart(this.goodsInCart)
        },


    }

    productCatalog.render();

 
















});