const c = `One: 'Hi Mary.' Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
    One: 'Not too bad. The weather is great isn't it?'
    Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store.'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
    Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure. Bye.'`;

console.log(c.replace(/'/g,'"'));
console.log(c.replace(/\s'\b|\b([.,!?])'/g, '$1"'));

// let str = 'Addd ff';
// let reges = /^[А-ЯЁ][а-я\s]*$|^[A-Z][a-z\s]*$/;
// console.log(reges.test(str));

// let str = '+7-917-747-7285';
// let reges = /\+7-\d{3}-\d{3}-\d{4}/;
// console.log(reges.test(str));

// let str = 'a4.aa@mail.ru';
// let reges = /^[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~][A-Za-z0-9!#$%&'*+\-/=?^_`{|}~.]*@[a-zа-я]+\.[a-z]+$/;
// console.log(reges.test(str));