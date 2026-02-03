'use strict';

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать? (Перечислите через запятую)', 'Простые, Сложные, Интерактивные');
const screenPrice = parseFloat(prompt('Сколько будет стоить данная работа?'));
const adaptive = prompt('Нужен ли адаптив на сайте?', 'Да/Нет').toLowerCase() === 'да';
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = parseFloat(prompt('Сколько это будет стоить?'));
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = parseFloat(prompt('Сколько это будет стоить?'));
const rollback = 15;

const fullPrice = screenPrice + servicePrice1 + servicePrice2;
const servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback / 100)));

console.log(servicePercentPrice);

if (fullPrice >= 30000) {
    console.log('Даем скидку в 10%');
} else if (fullPrice >= 15000) {
    console.log('Даем скидку в 5%');
} else if (fullPrice >= 0) {
    console.log('Скидка не предусмотрена');
} else {
    console.log('Что-то пошло не так');
}



// Вывести в консоль тип данных значений переменных title, fullPrice, adaptive;
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

// Вывести в консоль длину строки из переменной screens;
console.log(screens.length);

// Вывести в консоль “Стоимость верстки экранов (screenPrice) рублей/ долларов/гривен/юани”
//  и “Стоимость разработки сайта (fullPrice) рублей/ долларов/гривен/юани”
const layoutScreenPrice = `Стоимость верстки экранов ${screenPrice} песо`;
const developmentFullPrice = "Стоимость разработки сайта" + " " + fullPrice + " " + "песо";

console.log(layoutScreenPrice);
console.log(developmentFullPrice);

// Привести строку screens к нижнему регистру и разбить строку на массив, вывести массив в консоль
const toLowerScreens = screens.toLowerCase().split(', ');

console.log(toLowerScreens);

// Вывести в консоль Процент отката посреднику за работу (fullPrice * (rollback/100))
const percentRollback = (fullPrice * (rollback / 100));

console.log(percentRollback);
