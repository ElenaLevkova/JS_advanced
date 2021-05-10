Vue.component('products', {
   props: ['products', 'visibility'],
   template: `
            <section class="catalog center"  v-show="visibility.value">
               <div class="catalog__title">
                   <h3 class="catalog__title_h3">Fetured Items</h3>
                   <p class="catalog__title_p">Shop for items based on what we featured in this week</p>
               </div>
               <div class="catalog__items">
                    <product v-for="aitem of products" 
                    :key="aitem.id_product" 
                    :product="aitem"></product>
                </div>
   
               <div class="catalog__bottom">
                   <button class="catalog__button"><a href="catalog.html">Browse All Product</a></button>
               </div>
           </section>`
});
Vue.component('product', {
    props: ['product'],
    template: `
            <figure class="catalog__item">
                <div class="catalog__item_img">
                    <a href="product.html">
                        <img class="catalog__img" :src="product.imgPreview" alt="catalog">
                    </a>
                    <button @click="$parent.$emit('add-product', product)" class="catalog__button_overlay">
                        <img @click="$parent.$emit('add-product', product)" src="img/catalog-cart.svg" alt="cart">Add to Cart</button>
                </div>
                <div class="catalog__text">
                    <a href="product.html">
                        <figcaption class="catalog__heading">{{product.product_name}}</figcaption>
                    </a>
                    <p class="catalog__p">{{product.description}}</p>
                    <p class="catalog__price">{{product.price}}$</p>
                </div>
            </figure>`
});