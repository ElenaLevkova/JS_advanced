Vue.component('subscribe', {
    props: ['visibility'],
    template: `
       <section class="subscribe center"  v-show="visibility.value">
        <div class="subscribe__item">
            <img src="img/subscribe info.png" alt="foto" class="subscribe__foto">
            <p class="subscribe__quote">“Vestibulum quis porttitor dui! Quisque viverra nunc mi, <span
                    class="subscribe__quote_select">a pulvinar purus
                    condimentum“</span> </p>
        </div>
        <div class="subscribe__item">
            <h3 class="subscribe__title">SUBSCRIBE</h3>
            <p class="subscribe__text">FOR OUR NEWLETTER AND
                PROMOTION</p>
            <form class="subscribe__email">
                <input type="email" placeholder="Enter Your Email" class="subscribe__input">
                <button class="subscribe__button">Subscribe</button>
            </form>
        </div>
    </section>
    `
});
