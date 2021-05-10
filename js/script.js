'use strict';
 const API = '';

    
 

window.addEventListener('DOMContentLoaded', () => {

    const app = new Vue({
        el: '#app',
        data: {
            catalogUrl: '/json/product.json',
            products: [],
            //userSearch: '',
            showProduct: {value: true},
            showCart: {value: false}, 
            showFilter: {value: true},
            showPromo: {value: true},
            showInfo: {value: true},
            showSubscribe: {value: true},
            showFooter: {value: true},
            filteredProducts: [],
            filterField: {value: ''},
            cart: {value:{}},
        },
        methods: {
            getJson(url){
                return fetch(url)
                    .then(result => {
                        console.log(result);
                        return result.json();
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            addProduct(product){
                //console.log(this.cart, product.id_product);
                this.cart.value.addGoods(product);
            },
            filter(filterField){ 
                 const regexp = new RegExp(filterField.value, 'i');
                 this.filteredProducts = this.products.filter(product => {
                     console.log(product);
                     return regexp.test(product.product_name);
                    });
                console.log('filtered', this.filteredProducts, filterField, regexp);
          
            },
            getShowCartProduct(){
                this.showCart.value = !(this.showCart.value);
                this.showProduct.value = !(this.showProduct.value); 
                this.showFilter.value = !(this.showFilter.value);
                this.showPromo.value = !(this.showPromo.value);
                this.showInfo.value = !(this.showInfo.value);
                // this.showSubscribe.value = !(this.showSubscribe.value);
                // this.showFooter.value = !(this.showFooter.value);
            }
        },
        mounted(){
            
           this.getJson(`${API + this.catalogUrl}`)
               .then(data => {
                   console.log(data);
                   for(let el of data){
                       this.products.push(el);
                   }
               });
               this.filteredProducts = this.products;
        }
    });
    
    

   
 ///если данные необходимо передавать в json формате///
    //                 // request.setRequestHeader('Content-type', 'application/json');
    //                 // const object = {};
    //                 // formData.forEach(function(value, key) {
    //                 //     object[key] = value;
    //                 // });
    //                 // const json = JSON.stringify(object);
    //                 // request.send(json);
    //             ////////////////////
    //ValidationForm(event) { 
        //         let sw = event.target.className
        //         //console.log('ValidationForm',sw);
        //         if (event.target.className.includes('assistant__window_name')) {
        //             const windowName = document.querySelector('.assistant__window_name');
        //             //console.log('windowName', windowName.value, windowName);
        //             let reges =/^[А-ЯЁ][а-я\s]*$|^[A-Z][a-z\s]*$/;
        //             this.AddValidationClass(windowName, reges);
        //         }
        //         if (event.target.className.includes('assistant__window_tel')) {
        //             const windowTel = document.querySelector('.assistant__window_tel');
        //             console.log('windowTel', windowTel.value);
        //             //let reges = /\+7-\d{3}-\d{3}-\d{4}/;
        //             let reges = /\+7\d{10}/;
        //             console.log('windowTel', windowTel.value, reges.test(windowTel.value));
        //             this.AddValidationClass(windowTel, reges);
        //         }
        //         if (event.target.className.includes('assistant__window_email')) {
        //             const windowEmail = document.querySelector('.assistant__window_email');
        //             console.log('windowEmail', windowEmail.value);
        //             let reges = /^[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~][A-Za-z0-9!#$%&'*+\-/=?^_`{|}~.]*@[a-zа-я]+\.[a-z]{2,4}/i;
        //             console.log('windowEmail', windowEmail.value, reges.test(windowEmail.value));
        //             this.AddValidationClass(windowEmail, reges);
        //         }
        //         if (event.target.className.includes('assistant__window_mess')) {
        //             const windowMess = document.querySelector('.assistant__window_mess');
        //             console.log('windowMess', windowMess.value);
        //             let reges = /./;
        //             console.log('windowMess', windowMess.value, reges.test(windowMess.value));
        //             this.AddValidationClass(windowMess, reges);
        //         }
        //     }
    
        //     AddValidationClass(windowInput, reges) {
        //         console.log('windowInput', windowInput);
        //         if (!reges.test(windowInput.value))  {
        //             console.log('windowNameValid', '1');
        //             if (!windowInput.classList.contains('not_valid')) windowInput.classList.add('not_valid');
        //             if (windowInput.classList.contains('valid')) windowInput.classList.remove('valid');
        //         }
        //         else  {
        //             if (windowInput.classList.contains('not_valid')) {
        //                 console.log('windowNameValid', '1');
        //                 windowInput.classList.remove('not_valid');
        //             }
        //             windowInput.classList.add('valid');
        //         }
                
    // class Product{
    //     constructor(product,  img = '') {
    //         console.log('constructor', product);
    //         this.idProduct = product.id_product;
    //         this.productName = product.product_name;
    //         //this.model = '';
    //         this.description = product.description;
    //         this.size = product.size;
    //         this.price = product.price;
    //         this.imgPreview = product.imgPreview;
    //         //this.imgFull = '';
    //     }
    
    //     render() {
    //         console.log('render', this);
    //         return `<figure class="catalog__item" data-id_product="${this.idProduct}">
    //             <div class="catalog__item_img">
    //                 <a href="product.html">
    //                     <img class="catalog__img" src=${this.imgPreview} alt="catalog" class="catalog__img">
    //                 </a>
    //                 <button class="catalog__button_overlay" data-id_product="${this.idProduct}">
    //                     <img src="img/catalog-cart.svg" alt="cart">Add to Cart</button>
    //             </div>
    //             <div class="catalog__text">
    //                 <a href="product.html">
    //                     <fidcaption class="catalog__heading">${this.productName}</fidcaption>
    //                 </a>
    //                 <p class="catalog__p">${this.description}</p>
    //                 <p class="catalog__price">$${this.price}</p>
    //             </div>
    //         </figure>`;
    //     }


    // }

    // class ProductCatalog {
    //     constructor(transferCart, container = '.catalog__items') {
    //     this.transferCart = transferCart;
    //     this.catalogItems = document.querySelector(container);
        
    //     this.goods = [];//массив товаров
    //     this.allProducts = [];//массив объектов
    //     this.filtered = [];
    //     this._getProducts()
    //         .then(data => { //data - объект js
    //             console.log(data);
    //             this.goods = [...data];
    //             this.render()
    //     });
    // }

    //     _getProducts(){
    //         return fetch(`${API}/json/product.json`)
    //             .then(result => result.json())
    //             .catch(error => {
    //                 console.log(error);
    //             })
    //     }

    //     render() {
    //         for (let product of this.goods){
    //             const productObj = new Product(product);
    //             this.allProducts.push(productObj);
    //             this.catalogItems.insertAdjacentHTML('beforeend', productObj.render());
    //         }
    //         this.initClick();
    //     }

    //     initClick() {
    //         this.catalogItems.addEventListener('click', (event) => this.ClickHandler(event));
            
    //         document.querySelector('.search-form').addEventListener('submit', event => {
    //             event.preventDefault();
    //             this.filter(document.querySelector('.search-field').value);
    //             console.log('filter', document.querySelector('.search-field').value)
    //         })
    //     }

    //     ClickHandler(event) {
    //         if (event.target.className === 'catalog__button_overlay')  this.ClickHandlerAddToCart(event);
    //         if (event.target.className === 'catalog__img')  this.ClickHandlerIMG(event);
    //         else {return};
    //     }
    
    //     ClickHandlerAddToCart(event) {
    //         console.log(this.allProducts, this.allProducts[0].idProduct, +event.target.dataset.id_product);
    //         let goodItem = this.allProducts.find(item => item.idProduct === +event.target.dataset.id_product);
    //         this.transferCart.addGoods(goodItem);
    //     }

    //     ClickHandlerIMG(event) {

    //     }



    //     filter(value){
    //         const regexp = new RegExp(value, 'i');
    //         this.filtered = this.allProducts.filter(product => regexp.test(product.productName));
    //         console.log('filtered', this.filtered);
    //         this.allProducts.forEach(el => {
    //             const block = document.querySelector(`.catalog__item[data-id_product="${el.idProduct}"]`);
    //             if(!this.filtered.includes(el)){
    //                 block.classList.add('invisible');
    //             } else {
    //                 block.classList.remove('invisible');
    //             }
    //         })
    //     }

    // }

    // class TransferCart {
    //     constructor() {
    //         this.goodsInCart = [];
    //     }
        
    //     getCart () {
    //         if ((localStorage.getItem('goods') === null) || (localStorage["goods"] === '') || (localStorage["goods"] === 'undefined')) {
    //             this.setCart([]);
    //         }
    //         let cart = JSON.parse(localStorage["goods"]);
    //         return cart;
    //     }

    //     setCart (cart) {
    //         if (localStorage["goods"] === '') localStorage["goods"] = JSON.stringify([]);
    //         localStorage["goods"] = JSON.stringify(cart);
    //         console.log(localStorage["goods"]);
    //     }

    //     addGoods(goodItemNew) {
    //         console.log(goodItemNew);
    //         //проверка в массиве корзины, нет ли такого уже товара
    //         this.goodsInCart = this.getCart();
    //         console.log(this.goodsInCart);
    //         let goodNew = this.goodsInCart.find(el => el.item.idProduct === +goodItemNew.idProduct);
    //         if (goodNew === undefined) 
    //             this.goodsInCart.push({item:goodItemNew, quantity: 1}) //Добавляем новый товар в массив корзины
    //         else {
    //             let index = this.goodsInCart.indexOf(goodNew);
    //             if (~index) {
    //                 this.goodsInCart[index].quantity += 1;
    //             }
    //         }
    //         this.setCart(this.goodsInCart);
    //         console.log(this.goodsInCart);
            
    //     }

    // }

    // class Modal {
    //     constructor(containerModalWindow = '.assistant__window') {
    //         this.containerModalWindow = containerModalWindow;
    //         this.modal = document.querySelector('.assistant');
    //         this.modalBtn = document.querySelector('[data-modal]');
    //         this.modalCloseBtn = document.querySelector('[data-close]');
    //         this.modalWindow = document.querySelector(this.containerModalWindow);
    //         this.modalTimerID = setTimeout(this.modalShow, 300000);
    //         this.formWindow = document.querySelector('#formElem');
    //         this.message = {
    //             loading: 'Загрузка',
    //             success: 'Спасибо, мы с вами свяжемся', 
    //             failure: 'Что-то пошло не так..'};
    //         this.init();
    //     }



    //     init(){
    //         console.log('modalBtn',this.modalBtn);
    //         this.modalBtn.addEventListener('click', () => this.modalShow()); //открытие модального окна по кнопкам у которых есть атрибут data-modal
    //             console.log('this.modalBtn',this.modalBtn);
                        
    //         this.modal.addEventListener('click', (e) => {
    //             if (e.target == this.modal || e.target.getAttribute('data-close') == '') this.modalClose(); //закрытие по щелчку мимо окна или по кнопке с атрибутом data-close
    //         });
            
    //         document.addEventListener('keydown', (e) => {
    //             if (e.code == 'Escape' && this.modal.classList.contains('show')) this.modalClose(); //закрытие по кнопке Escape
    //         });

    //         //window.addEventListener('scroll', this.showModalByScroll);
            
    //         this.modalWindow.addEventListener('input', (event) => this.ValidationForm(event)); 
                
    //         console.log('formWindow',this.formWindow);
    //         this.formWindow.addEventListener('submit', (event) => this.postData(event, this.formWindow))
    //     }
        
    //     modalShow() {
    //         //this.modalWindow = document.querySelector('.assistant__window');
    //         console.log('modalShow',this.modalWindow);   
    //         this.modalWindow.classList.add('visible');
    //         this.modalWindow.classList.remove('invisible');

    //         this.modalWindow.querySelectorAll('input').forEach((el) => {
    //             el.classList.add('not_valid');
    //         });

    //         this.modalCloseBtn.classList.add('visible');
    //         this.modalCloseBtn.classList.remove('invisible');

    //         // this.modalCloseBtn.forEach((el) => {
    //         //     el.classList.add('visible');
    //         //     el.remove('invisible');
    //         // });
    //         // const BtnSend = this.modalWindow.querySelector('.assistant__window_btn');
    //         // BtnSend.style.disabled = true;

    //         document.body.style.overflow = 'hidden'; //прокрутка экрана
                 
    //         clearInterval(this.modalTimerID);
    //     }

    //     modalClose() {
    //         console.log('modalClose',this.modalWindow);   
    //         this.modalWindow.classList.remove('visible');
    //         this.modalWindow.classList.add('invisible');

    //         this.modalCloseBtn.classList.remove('visible');
    //         this.modalCloseBtn.classList.add('invisible');

    //         document.body.style.overflow = '';
    //     }
      
    // //    showModalByScroll() {//показывать модальное окно, если долистали страницу до конца
    // //         if (window.pageYOffset + document.documentElement.clientHeight == document.documentElement.scrollHeight) {
    // //             this.modalShow();
    // //             window.removeEventListener('scroll', this.showModalByScroll);
    // //         }
    // //     }
        
    //     ValidationForm(event) { 
    //         let sw = event.target.className
    //         //console.log('ValidationForm',sw);
    //         if (event.target.className.includes('assistant__window_name')) {
    //             const windowName = document.querySelector('.assistant__window_name');
    //             //console.log('windowName', windowName.value, windowName);
    //             let reges =/^[А-ЯЁ][а-я\s]*$|^[A-Z][a-z\s]*$/;
    //             this.AddValidationClass(windowName, reges);
    //         }
    //         if (event.target.className.includes('assistant__window_tel')) {
    //             const windowTel = document.querySelector('.assistant__window_tel');
    //             console.log('windowTel', windowTel.value);
    //             //let reges = /\+7-\d{3}-\d{3}-\d{4}/;
    //             let reges = /\+7\d{10}/;
    //             console.log('windowTel', windowTel.value, reges.test(windowTel.value));
    //             this.AddValidationClass(windowTel, reges);
    //         }
    //         if (event.target.className.includes('assistant__window_email')) {
    //             const windowEmail = document.querySelector('.assistant__window_email');
    //             console.log('windowEmail', windowEmail.value);
    //             let reges = /^[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~][A-Za-z0-9!#$%&'*+\-/=?^_`{|}~.]*@[a-zа-я]+\.[a-z]{2,4}/i;
    //             console.log('windowEmail', windowEmail.value, reges.test(windowEmail.value));
    //             this.AddValidationClass(windowEmail, reges);
    //         }
    //         if (event.target.className.includes('assistant__window_mess')) {
    //             const windowMess = document.querySelector('.assistant__window_mess');
    //             console.log('windowMess', windowMess.value);
    //             let reges = /./;
    //             console.log('windowMess', windowMess.value, reges.test(windowMess.value));
    //             this.AddValidationClass(windowMess, reges);
    //         }
    //     }

    //     AddValidationClass(windowInput, reges) {
    //         console.log('windowInput', windowInput);
    //         if (!reges.test(windowInput.value))  {
    //             console.log('windowNameValid', '1');
    //             if (!windowInput.classList.contains('not_valid')) windowInput.classList.add('not_valid');
    //             if (windowInput.classList.contains('valid')) windowInput.classList.remove('valid');
    //         }
    //         else  {
    //             if (windowInput.classList.contains('not_valid')) {
    //                 console.log('windowNameValid', '1');
    //                 windowInput.classList.remove('not_valid');
    //             }
    //             windowInput.classList.add('valid');
    //         }
            
    //     }

    //     postData(event, form) {
            
    //         event.preventDefault();
        
    //         const statusMessage = document.createElement('div');
    //         statusMessage.classList.add('status');
    //         statusMessage.textContent = this.message.loading;
    //         form.append(statusMessage);
        
    //             // const request = new XMLHttpRequest();
    //             // request.open('POST', 'server.php');

               
    //         console.log('form', this.formWindow);
    //             //request.setRequestHeader('Content-type', 'multipart/form-data');  //при формате данных FormData строку с заголовками не указываем!!!!
    //         const formData = new FormData(this.formWindow); //обязательно в форме в input должны быть указана атрибуты name!!!!!
    //         console.log('formData', formData, formData.getAll('name'), formData.getAll('phone'), formData.getAll('email'), formData.getAll('mess'));
        
    //             ///если данные необходимо передавать в json формате///
    //                 // request.setRequestHeader('Content-type', 'application/json');
    //                 // const object = {};
    //                 // formData.forEach(function(value, key) {
    //                 //     object[key] = value;
    //                 // });
    //                 // const json = JSON.stringify(object);
    //                 // request.send(json);
    //             ////////////////////
        
    //             //request.send(formData);
    //         fetch('./server.php', {
    //                     method: "POST",
    //                     // headers:{'Content-type': 'application/json'
    //                     // },
    //                     body: formData
    //                 }).then(data => {
    //                     console.log(data.body);
    //                     this.showThanksModal(this.message.success);
    //                     console.log(this.message.success);
                        
    //                     statusMessage.remove();
    //                 }).catch((e) => {
    //                     console.log(e);
    //                     this.showThanksModal(this.message.failure);
    //                 }).finally(() => {
    //                     form.reset();
    //                 })




    //             // request.addEventListener('load', () => {
    //             //     console.log(request.status);
    //             //     if (request.status === 200) {
    //             //         console.log(request.response);
    //             //         this.showThanksModal(this.message.success);
    //             //         console.log(this.message.success);
    //             //         form.reset();
    //             //         statusMessage.remove();
                
    //             //     } else {
    //             //         this.showThanksModal(this.message.failure);
    //             //         console.log(this.message.failure);
    //             //     }
                    
    //             // })
    //     }
        
        
    //     showThanksModal(message) {
    //         let modalWindowContent = this.modalWindow.querySelector('.assistant__window_content');
    //         modalWindowContent.classList.add('invisible');
    //         modalWindowContent.classList.remove('visible');

    //         //this.modalWindow.innerHTML =`<div class="modal__title">${message}</div>`;
        
    //         const thanksModal = document.createElement('div');
    //         thanksModal.classList.add('thanksModal');
    //         thanksModal.innerHTML =`<div class="modal__title">${message}</div>`;
    //         this.modalWindow.insertAdjacentElement('beforeend', thanksModal);
        
    //         setTimeout(() => {
    //            // this.modalWindow.innerHTML ='';
    //            thanksModal.remove()
    //            modalWindowContent.classList.add('visible');
    //            modalWindowContent.classList.remove('invisible');
    //            this.modalWindow.querySelectorAll('input').forEach((el) => {
    //                 el.classList.add('not_valid');
    //                 el.classList.remove('valid');
    //         });
    //         }, 4000);
    //     }
    // }


    // let transferCartBase = new TransferCart();
    // let productCatalogBase = new ProductCatalog(transferCartBase);
    // let FormBase = new Modal();


    // //productCatalogBase.render();

 
















});