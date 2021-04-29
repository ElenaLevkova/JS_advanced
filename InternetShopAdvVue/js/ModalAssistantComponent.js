class ValidatedField{
    constructor(name, input, pattern, errorTxt, type, placeholder, rows = '') {
        this.name = name;
        this.input = input;
        this.pattern = pattern;
        this.errorTxt = errorTxt;
        this.type = type;
        this.placeholder = placeholder;
        this.rows = rows;
    }
    isInvalid() {
        if (!this.pattern.test(this.input)) {
            console.log('err', this.input);
            return true;
        }
        else {
            console.log('valid', this.input);
            return false;
        }
    }
}

Vue.component('modal-assistant', {
    data() {
        return {
            show: false,
            show_content: true,
            inputFields: [
                new ValidatedField(
                    'name', 
                    '', 
                    /^[А-ЯЁ][а-я\s]*$|^[A-Z][a-z\s]*$/,
                    'Имя должно начинаться с заглавной буквы  содержать только буквы',
                    'text',
                    'Alex'
                    ),
                new ValidatedField(
                    'phone', 
                    '', 
                    /\+7\d{10}/, 
                    'Телефон подчиняется шаблону +70000000000',
                    'tel',
                    '+70000000000'
                    ),
                new ValidatedField(
                    'email', 
                    '', 
                    /^[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~][A-Za-z0-9!#$%&'*+\-/=?^_`{|}~.]*@[a-zа-я]+\.[a-z]{2,4}/i, 
                    'E-mail должен выглядеть как mymail@mail.ru',
                    'email',
                    'mymail@mail.ru'
                    ),
                new ValidatedField(
                    'mess', 
                    '',
                    /./, 
                    'Поле не должно быть пустым',
                    'text',
                    '',
                    '3'
                    ),
            ],
            message: {
                loading: 'Загрузка',
                success: 'Спасибо, мы с вами свяжемся', 
                failure: 'Что-то пошло не так..'
            },
            messageResult:'',
       }
        
    },
    template: `<div id="app_modal">
                <section class="assistant">
                    <div class="assistant__position">
                        <a @click="showModal()" href="#" tabindex="0" class="assistant__btn" data-modal>
                            <div>Your assistant!</div>
                        </a>
                        <span v-if="show" @click="showModal()" tabindex="0" class="assistant__close"data-close>
                            <svg @click="showModal()" data-close width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path  @click="showModal()" data-close
                                    d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z"
                                    fill="#575757" />
                            </svg>
                        </span>
                        <form v-if="show"  class="assistant__window" id="formElem">
                            <div v-if="show_content" class="assistant__window_content">
                                <p class="assistant__window_title">Can I help you?</p>
                                <div v-for="vField in inputFields" class="assistant__window_for">
                                    <label :for="vField.name">Your {{vField.name}}:</label>
                                    <input v-model="vField.input" :type="vField.type" :name="vField.name" :class="vField.name" :placeholder="vField.placeholder" required :autocomplete="vField.name" :rows="vField.rows">
                                    <div v-if="vField.isInvalid()" class="name_error__valid">{{vField.errorTxt}}</div>
                                </div>
                                  <input @click="postData" type="submit" name="btn" class="assistant__window_btn" value="Send"></input>
                            </div>
                            <div v-else="show_content" class="assistant__window_content">
                                <div>{{this.messageResult}}</div>
                            </div> 
                        </form>
                    </div>
                </section>
            </div>
    `,
    methods: {
        // checkForm() { //сделать проверку на валид всех полей и тогда доступность кнопки
        //     console.log('checkForm')
        //     Object.values(this.inputFields).forEach(value => {
        //         if (value.validate()){
        //         } else{
        //         }
        //     })
         // },
        postData() {
            this.messageResult = this.message.loading;
            this.show_content = false;
            fetch('./server.php', {
                method: "POST",
                headers:{'Content-type': 'application/json'
                },
                body: JSON.stringify(this.inputFields)
            }).then(data => {
                console.log(data.body);
                this.messageResult = this.message.success;
                console.log(this.message.success);

            }).catch((e) => {
                console.log(e);
                this.messageResult = this.message.failure;
            }).finally(() => {
                this.inputFields.forEach(el => el.input = '');
                setTimeout(() => {
                    this.show = false;
                 }, 4000);
            })
        },
        showModal() {
                 if (!this.show) this.show_content = true;
                 this.show = !this.show;
           
        }    
    }
});   

//     const app_modal = new Vue({
//         el: '#app_modal',
//         data: {
//             show: false,
//             show_content: true,
//             inputFields: [
//                 new ValidatedField(
//                     'name', 
//                     '', 
//                     /^[А-ЯЁ][а-я\s]*$|^[A-Z][a-z\s]*$/,
//                     'Имя должно начинаться с заглавной буквы  содержать только буквы',
//                     'text',
//                     'Alex'
//                     ),
//                 new ValidatedField(
//                     'phone', 
//                     '', 
//                     /\+7\d{10}/, 
//                     'Телефон подчиняется шаблону +70000000000',
//                     'tel',
//                     '+70000000000'
//                     ),
//                 new ValidatedField(
//                     'email', 
//                     '', 
//                     /^[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~][A-Za-z0-9!#$%&'*+\-/=?^_`{|}~.]*@[a-zа-я]+\.[a-z]{2,4}/i, 
//                     'E-mail должен выглядеть как mymail@mail.ru',
//                     'email',
//                     'mymail@mail.ru'
//                     ),
//                 new ValidatedField(
//                     'mess', 
//                     '',
//                     /./, 
//                     'Поле не должно быть пустым',
//                     'text',
//                     '',
//                     '3'
//                     ),
//             ],
//             message: {
//                 loading: 'Загрузка',
//                 success: 'Спасибо, мы с вами свяжемся', 
//                 failure: 'Что-то пошло не так..'
//             },
//             messageResult:'',
//             validate() {
                   
//             }
//         },
//         methods: {
//             // checkForm() { //сделать проверку на валид всех полей и тогда доступность кнопки
//             //     console.log('checkForm')
//             //     Object.values(this.inputFields).forEach(value => {
//             //         if (value.validate()){
//             //         } else{
//             //         }
//             //     })
//              // },
//             postData() {
//                 this.messageResult = this.message.loading;
//                 this.show_content = false;
//                 fetch('./server.php', {
//                     method: "POST",
//                     headers:{'Content-type': 'application/json'
//                     },
//                     body: JSON.stringify(this.inputFields)
//                 }).then(data => {
//                     console.log(data.body);
//                     this.messageResult = this.message.success;
//                     console.log(this.message.success);

//                 }).catch((e) => {
//                     console.log(e);
//                     this.messageResult = this.message.failure;
//                 }).finally(() => {
//                     this.inputFields.forEach(el => el.input = '');
//                     setTimeout(() => {
//                         this.show = false;
//                      }, 4000);
//                 })
//             },
//             showModal() {
//                      if (!this.show) this.show_content = true;
//                      this.show = !this.show;
               
//             }    
//     }
//     });
// });
