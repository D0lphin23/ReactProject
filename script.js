"use strict";

// let title;
// let screens;
// let screenPrice;
// let adaptive;
// let rollback = 15;
// let layoutScreenPrice;
// let developmentFullPrice;
// let toLowerScreens;
// let percentRollback;
// let fullPrice;
// let servicePercentPrice;
// let allServicePrices;
// let service1;
// let service2;

const appData = {
    title: "",
    screens: "",
    screenPrice: 0,
    adaptive: true,
    rollback: 15,
    layoutScreenPrice: "",
    developmentFullPrice: "",
    toLowerScreens: "",
    percentRollback: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,
    service1: "",
    service2: "",
    saleMessage: "",
    asking: function () {
        appData.title = appData.answerNonEmpty("Как называется ваш проект?");

        appData.screens = appData.answerNonEmpty(
            "Какие типы экранов нужно разработать? (Перечислите через запятую)",
            "Простые, Сложные, Интерактивные",
        );

        do {
            appData.screenPrice = prompt("Сколько будет стоить данная работа?");
        } while (!appData.isNumber(appData.screenPrice));

        appData.screenPrice = +appData.screenPrice;

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },
    answerNonEmpty: function (question, placeholder = "") {
        let answer;

        do {
            answer = prompt(question, placeholder);

            if (answer === null) {
                continue;
            }

            answer = answer.trim();
        } while (!answer);

        return answer;
    },
    isNumber: function (num) {
        return (
            !isNaN(parseFloat(num)) &&
            isFinite(num) &&
            num.includes(" ") === false
        );
    },
    getAllServicePrices: function () {
        let sum = 0;

        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                appData.service1 = appData.answerNonEmpty(
                    "Какой дополнительный тип услуги нужен?",
                );
            } else if (i === 1) {
                appData.service2 = appData.answerNonEmpty(
                    "Какой дополнительный тип услуги нужен?",
                );
            }

            let servicePrice = prompt("Сколько это будет стоить?");

            while (!appData.isNumber(servicePrice)) {
                servicePrice = prompt("Сколько это будет стоить?");
            }

            sum += +servicePrice;
        }

        return sum;
    },
    getRollbackMessage: function (price) {
        if (price >= 30000) {
            return "Даем скидку в 10%";
        } else if (price >= 15000) {
            return "Даем скидку в 5%";
        } else if (price >= 0) {
            return "Скидка не предусмотрена";
        } else {
            return "Что-то пошло не так";
        }
    },
    getTitle: function (nameProject) {
        return (
            nameProject[0].toUpperCase() + nameProject.slice(1).toLowerCase()
        );
    },
    getServicePercentPrices: function (price, sumRollback) {
        return price - sumRollback;
    },
    getFullPrice(layoutСost, allServicePrices) {
        return layoutСost + allServicePrices;
    },
    start: function () {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice(
            appData.screenPrice,
            appData.allServicePrices,
        );
        appData.title = appData.getTitle(appData.title);

        // Привести строку screens к нижнему регистру и разбить строку на массив
        appData.toLowerScreens = appData.screens.toLowerCase().split(", ");

        // Процент отката посреднику за работу (fullPrice * (rollback/100))
        appData.percentRollback = appData.fullPrice * (appData.rollback / 100);

        appData.servicePercentPrice = appData.getServicePercentPrices(
            appData.fullPrice,
            appData.percentRollback,
        );

        appData.layoutScreenPrice = `Стоимость верстки экранов ${appData.screenPrice} песо`;
        appData.developmentFullPrice =
            "Стоимость разработки сайта" +
            " " +
            appData.fullPrice +
            " " +
            "песо";
        appData.saleMessage = appData.getRollbackMessage(appData.fullPrice);
        appData.logger();
    },
    logger: function () {
        for (let key in appData) {
            console.log(`${key}: ${appData[key]}`);
        }
    },
};

appData.start();
