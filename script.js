'use strict';

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать? (Перечислите через запятую)', 'Простые, Сложные, Интерактивные');
const screenPrice = parseFloat(prompt('Сколько будет стоить данная работа?'));
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = parseFloat(prompt('Сколько это будет стоить?'));
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = parseFloat(prompt('Сколько это будет стоить?'));
const rollback = 15;

let layoutScreenPrice = '';
let developmentFullPrice = '';
let toLowerScreens = [];
let percentRollback = 0;
let fullPrice = 0;
let servicePercentPrice = 0;
let allServicePrices = 0;
let formatedTitle = '';


const getAllServicePrices = function(addService1, addService2) {
    return addService1 + addService2;
}

const getTitle = function(nameProject) {
    let deleteSpaces = '';

    deleteSpaces = nameProject.trim();

    return deleteSpaces[0].toUpperCase() + deleteSpaces.slice(1).toLowerCase();

}

function getFullPrice(layoutСost, allServicePrices) {
    return layoutСost + allServicePrices;
}

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

fullPrice = getFullPrice(screenPrice, allServicePrices);

formatedTitle = getTitle(title);

// Привести строку screens к нижнему регистру и разбить строку на массив
toLowerScreens = screens.toLowerCase().split(', ');

// Процент отката посреднику за работу (fullPrice * (rollback/100))
percentRollback = (fullPrice * (rollback / 100));

servicePercentPrice = Math.ceil(fullPrice - percentRollback);

if (fullPrice >= 30000) {
    console.log('Даем скидку в 10%');
} else if (fullPrice >= 15000) {
    console.log('Даем скидку в 5%');
} else if (fullPrice >= 0) {
    console.log('Скидка не предусмотрена');
} else {
    console.log('Что-то пошло не так');
}

// “Стоимость верстки экранов (screenPrice) рублей/ долларов/гривен/юани”
//  и “Стоимость разработки сайта (fullPrice) рублей/ долларов/гривен/юани”
layoutScreenPrice = `Стоимость верстки экранов ${screenPrice} песо`;
developmentFullPrice = "Стоимость разработки сайта" + " " + fullPrice + " " + "песо";

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(layoutScreenPrice);
console.log(developmentFullPrice);
console.log(toLowerScreens);
console.log(percentRollback);
console.log(servicePercentPrice);

