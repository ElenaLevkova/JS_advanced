'use strict';

const ingridients = [
    {id: '1', name: 'Cheese', price: 10, kkal: 20},
    {id: '2', name: 'Salat', price: 20, kkal: 5},
    {id: '3', name: 'Potat', price: 15, kkal: 10},
    {id: '4', name: 'Flavoring', price: 15, kkal: 0},
    {id: '5', name: 'Mayonnaise', price: 20, kkal: 5}
];

const gamburgers = [
    {id: '1', name: 'Big', price: 100, kkal: 40},
    {id: '2', name: 'Small', price: 50, kkal: 20}
];


class ElementItem {
    constructor(element, htmlClass, htmlInputType) {
        this.id = element.id;
        this.name = element.name;
        this.price = element.price;
        this.kkal = element.kkal;
        this.htmlClass = htmlClass;
        this.htmlInputType = htmlInputType;
    }

    render() {
        return `<div class="${this.htmlClass}" data-id="${this.id}">
                    <h3>Name: ${this.name}</h3>
                    <p>Price: ${this.price}</p>
                    <p>Kkal: ${this.kkal}</p>
                    <input  class="${this.htmlClass}_check" data-id="${this.id}" name="${this.htmlClass}" value="${this.name}" type="${this.htmlInputType}" > - Add<Br>
                </div>`
    }
}




class ElementsList{
    constructor(container, htmlClass, htmlInputType, elements, currentG, setOn, setOff){
        this.elements = elements;
        this.blockHTML = document.querySelector(container);
        this.htmlClass = htmlClass;
        this.htmlInputType = htmlInputType;
        this.currentG = currentG;
        this.setOn = setOn;
        this.setOff = setOff;
    } 

    render(){
       // console.log(this.ingridients);
        for(let element of this.elements){
            const elementObj = new ElementItem(element, this.htmlClass, this.htmlInputType);
            //console.log(ingridientObj);
            this.blockHTML.insertAdjacentHTML('beforeend', elementObj.render());
        };

        this.initClick();
    }

    initClick() {
        this.blockHTML.addEventListener('change', (event) => {
                this.ClickHandler(event);
                //console.log(event.target.className);
        });

    }

    ClickHandler(event) {
        if (event.target.className === `${this.htmlClass}_check`)  this.ClickHandlerAddElement(event)
        //if (event.target.className === `${this.htmlClass}_check`)  this.ClickHandlerIMG(event)
        else {return};
    }

    ClickHandlerAddElement(event) {
        console.log(event, [this.elements.find(item => item.id === event.target.dataset.id)]);
        if (event.target.type === 'checkbox' && (event.target.checked)) this.setOn(event, this);
        if (event.target.type === 'checkbox' && !(event.target.checked)) this.setOff(event, this);
        if (event.target.type === 'radio' && (event.target.checked)) this.setOn(event, this);
        
        this.currentG.renderTotal();
        console.log(this.currentG.ingridients)
    }
}



class Gamburger{
    constructor(ingridients = []) {
        this.ingridients = ingridients;
        this.price = 0;
        this.kkal = 0;
    }

    addIngridient(ingridients) {
        this.ingridients = this.ingridients.concat(ingridients);
    }

    removeIngridient(ingridient) {
        console.log(this.ingridients, ingridient, this.ingridients.indexOf(ingridient));
        return this.ingridients.splice(this.ingridients.indexOf(ingridient),1);
        console.log(this.ingridients);
    }

    setType(newType) {
        this.price = newType.price;
        this.kkal = newType.kkal;
    }

     getTotalPrice() {
        return this.price + this.ingridients.reduce((acc, el) => acc + el.price, 0);
    }

    getTotalKkal() {
        return this.kkal + this.ingridients.reduce((acc, el) => acc + el.kkal, 0);
    }

    renderTotal() {
        const totalBlock = document.querySelector('.total');
        totalBlock.innerHTML = `Итоговая стоимость гамбургера составляет ${this.getTotalPrice()} рублей.
        Итоговая калорийность гамбургера составляет ${this.getTotalKkal()} калорий.`
    }

}
const currentG = new Gamburger();

let ingridientsList = new ElementsList(
    '.ingridients', 
    'ingridientItem', 
    'checkbox', 
    ingridients, 
    currentG, 
    (event, el) => {el.currentG.addIngridient([el.elements.find(item => item.id === event.target.dataset.id)])},
    (event, el) => {el.currentG.removeIngridient(el.elements.find(item => item.id === event.target.dataset.id))}
);

ingridientsList.render();

let gamburgersList = new ElementsList(
    '.gamburgers', 
    'gamburgerItem', 
    'radio', 
    gamburgers, 
    currentG,
    (event, el) => {el.currentG.setType(el.elements.find(item => item.id === event.target.dataset.id))},
    ''
);

gamburgersList.render();










