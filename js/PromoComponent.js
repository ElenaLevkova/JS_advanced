Vue.component('promo-sale', {
    props: ['visibility'],
    template: `
    <div v-show="visibility.value">
    <section class="promo">
    <div class="promo__img">
        <img class="promo__photo" src="img/promo.png" alt="photo">
    </div>
    <div class="promo__text">
        <div class="promo__content">
            <h1 class="promo__heading">THE BRAND</h1>
            <p class="promo__info">OF LUXERIOUS <span class="promo__select">FASHION</span></p>
        </div>
    </div>
</section>
</section>
<section class="ticker center">
<a href="catalog.html" class="ticker__text">WINTER COLLECTION SALE!!!</a>
</section>

<section class="sale center">
<div class="sale__top">
    <div class="sale__item">
        <a href="#">
            <img class="sale__img" src="img/item-1.png" alt="item">
            <div class="sale__text">
                <p class="sale__p">30% OFF</p>
                <h3 class="sale__heading">FOR WOMEN</h3>

            </div>
        </a>
    </div>
    <div class="sale__item">
        <a href="#"><img class="sale__img" src="img/item-2.png" alt="item">
            <div class="sale__text">
                <p class="sale__p">HOT DEAL</p>
                <h3 class="sale__heading">FOR MEN</h3>
            </div>
        </a>
    </div>
    <div class="sale__item">
        <a href="#"><img class="sale__img" src="img/item-3.png" alt="item">
            <div class="sale__text">
                <p class="sale__p">NEW ARRIVALS</p>
                <h3 class="sale__heading">FOR KIDS</h3>
            </div>
        </a>
    </div>
</div>
<div class="sale__bottom">
    <div class="sale__item">
        <a href="#"><img class="sale__img sale__img_big" src="img/item-big.png" alt="item">
            <div class="sale__text">
                <p class="sale__p">LUXIROUS & TRENDY</p>
                <h3 class="sale__heading">ACCESORIES</h3>
            </div>
        </a>
    </div>
</div>
</section>
</div>
    `
});