"use strict";

let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 15;
let layoutScreenPrice;
let developmentFullPrice;
let toLowerScreens;
let percentRollback;
let fullPrice;
let servicePercentPrice;
let allServicePrices;
let formatedTitle;
let servicePrice;
let service1;
let service2;

const answerNonEmpty = function (question, placeholder = "") {
    let answer;

    do {
        answer = prompt(question, placeholder);

        if (answer === null) {
            continue;
        }

        answer = answer.trim();
    } while (!answer);

    return answer;
};

// Первое усложненное задание проверка на пробелы в вводе числа произвел модификацией функции isNumber
const isNumber = function (num) {
    return (
        !isNaN(parseFloat(num)) && isFinite(num) && num.includes(" ") === false
    );
};

const asking = function () {
    title = answerNonEmpty("Как называется ваш проект?");

    screens = answerNonEmpty(
        "Какие типы экранов нужно разработать? (Перечислите через запятую)",
        "Простые, Сложные, Интерактивные",
    );

    do {
        screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (!isNumber(screenPrice));

    screenPrice = +screenPrice;

    adaptive = confirm("Нужен ли адаптив на сайте?");
};

const getAllServicePrices = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = answerNonEmpty("Какой дополнительный тип услуги нужен?");
        } else if (i === 1) {
            service2 = answerNonEmpty("Какой дополнительный тип услуги нужен?");
        }

        servicePrice = prompt("Сколько это будет стоить?");

        while (!isNumber(servicePrice)) {
            servicePrice = prompt("Сколько это будет стоить?");
        }

        sum += +servicePrice;
    }

    return sum;
};

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
    if (price >= 30000) {
        return "Даем скидку в 10%";
    } else if (price >= 15000) {
        return "Даем скидку в 5%";
    } else if (price >= 0) {
        return "Скидка не предусмотрена";
    } else {
        return "Что-то пошло не так";
    }
};

const getTitle = function (nameProject) {
    return nameProject[0].toUpperCase() + nameProject.slice(1).toLowerCase();
};

const getServicePercentPrices = function (price, sumRollback) {
    return price - sumRollback;
};

function getFullPrice(layoutСost, allServicePrices) {
    return layoutСost + allServicePrices;
}

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
formatedTitle = getTitle(title);

// Привести строку screens к нижнему регистру и разбить строку на массив
toLowerScreens = screens.toLowerCase().split(", ");

// Процент отката посреднику за работу (fullPrice * (rollback/100))
percentRollback = fullPrice * (rollback / 100);

servicePercentPrice = getServicePercentPrices(fullPrice, percentRollback);

// “Стоимость верстки экранов (screenPrice) рублей/ долларов/гривен/юани”
//  и “Стоимость разработки сайта (fullPrice) рублей/ долларов/гривен/юани”
layoutScreenPrice = `Стоимость верстки экранов ${screenPrice} песо`;
developmentFullPrice =
    "Стоимость разработки сайта" + " " + fullPrice + " " + "песо";

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(getRollbackMessage(fullPrice));
console.log(toLowerScreens);
console.log(servicePercentPrice);
