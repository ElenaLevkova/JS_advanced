Vue.component('cart', {
    props: ['acartitems', 'visibility'],
    template: 

    `
    <div v-show="visibility.value">
    <section class="page-info center">
        <div class="page-info__title page-info__title_center">SHOPPING CART</div>
   </section>
   <section class="cart__content center" >
    <div class="cart__content_left">
        <div class="cart__products">
            <carti v-for="aitem of acartitems.goodsInCart" :bcartitem="aitem" :acartitems="acartitems">
            </carti>

        </div>
        <div class="cart_buttons">
            <button @click="acartitems.clearCart()" class="cart_buttons_clear" data-type = "clear">CLEAR SHOPPING CART</button>
            <button @click="$root.getShowCartProduct">CONTINUE SHOPPING</button>
        </div>
    </div>
    <div class="cart__content_right">
        <form action="" class="cart__form">
            <h4 class="cart__form_title">SHIPPING ADRESS</h4>
            <input type="text" placeholder="Bangladesh" class="cart__form_input">
            <input type="text" placeholder="State" class="cart__form_input">
            <input type="text" placeholder="Postcode / Zip" class="cart__form_input">
            <button class="cart__form_btn">GET A QUOTE</button>
        </form>
        <div class="cart__results">
            <div class="cart__results_sub">
                <p>SUB TOTAL</p>
                <p class="sum_sub">{{acartitems.sumSub}}</p>
            </div>
            <div class="cart__results_grand">
                <p>GRAND TOTAL</p>
                <p class="sum_grand">{{acartitems.sumGrand}}</p>
            </div>
            <div class="cart__results_line"></div>
            <button class="cart__results_btn">PROCEED TO CHECKOUT</button>

        </div>
    </div>


</section>
</div>
`
});

Vue.component('carti', {
    props: ['bcartitem', 'acartitems'],
    template:  `
            <div class="cart__product_card"  :data-id_product="bcartitem.item.id_product">
                <img class="cart__product_card_img" :src="bcartitem.item.imgPreview" alt="foto">
                <div class="cart__product_card_text">
                    <div class="cart__product_card_title">
                        <a href="product.html"> {{ bcartitem.item.product_name }}</a>
                        <button @click="acartitems.deleteGood(bcartitem.item.id_product)" class="cart__product_card_close">
                        <svg @click="acartitems.deleteGood(bcartitem.item.id_product)" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" fill="#575757"/>
                            </svg>
                        </button>
                    </div>
                    <p>Price: <span class="cart__product_card_text_red">{{ bcartitem.item.price }}$</span></p>
                    <p>Color: Red</p>
                    <p>Size: Xl</p>
                    <div class="cart__product_quantity">
                        <p>Quantity:</p>
                        <input v-model="bcartitem.q"  
                        type="number"  min = "1">
                    </div>
                </div>
            </div>`
}) 