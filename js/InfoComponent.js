Vue.component('info', {
    props: ['visibility'],
    template: `
    <section class="info center" v-show="visibility.value">
        <div class="info__item">
            <img src="img/info-1.svg" alt="Dlivery">
            <a href="#">
                <h4 class="info__title">Free Delivery</h4>
            </a>
            <p class="info__text">Worldwide delivery on all. Authorit tively morph next-generation innov tion with
                extensive models.</p>
        </div>
        <div class="info__item">
            <img src="img/info-2.svg" alt="Discounts">
            <a href="#">
                <h4 class="info__title">Sales & discounts</h4>
            </a>
            <p class="info__text">Worldwide delivery on all. Authorit tively morph next-generation innov tion with
                extensive models.</p>
        </div>
        <div class="info__item">
            <img src="img/info-3.svg" alt="Quality assurance">
            <a href="#">
                <h4 class="info__title">Quality assurance</h4>
            </a>
            <p class="info__text">Worldwide delivery on all. Authorit tively morph next-generation innov tion with
                extensive models.</p>
        </div>
    </section>
    `
});