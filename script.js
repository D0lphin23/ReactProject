"use strict";

const title = prompt("Как называется ваш проект?");
const screens = prompt(
  "Какие типы экранов нужно разработать? (Перечислите через запятую)",
  "Простые, Сложные, Интерактивные",
);
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");
const rollback = 15;

let layoutScreenPrice = "";
let developmentFullPrice = "";
let toLowerScreens = [];
let percentRollback = 0;
let fullPrice = 0;
let servicePercentPrice = 0;
let allServicePrices = 0;
let formatedTitle = "";

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

const getAllServicePrices = function (addService1, addService2) {
  return addService1 + addService2;
};

const getTitle = function (nameProject) {
  let deleteSpaces = "";

  deleteSpaces = nameProject.trim();

  return deleteSpaces[0].toUpperCase() + deleteSpaces.slice(1).toLowerCase();
};

const getServicePercentPrices = function (price, sumRollback) {
  return price - sumRollback;
};

function getFullPrice(layoutСost, allServicePrices) {
  return layoutСost + allServicePrices;
}

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

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
