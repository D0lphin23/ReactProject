"use strict";

const appData = {
    title: "",
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 15,
    layoutScreenPrice: "",
    developmentFullPrice: "",
    percentRollback: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,
    services: {},
    saleMessage: "",
    asking: function () {
        appData.title = appData.answerNonEmpty("Как называется ваш проект?");

        for (let i = 0; i < 2; i++) {
            let name = appData.answerNonEmpty(
                "Какие типы экранов нужно разработать?",
            );
            let price;

            do {
                price = prompt("Сколько будет стоить данная работа?");
            } while (!appData.isNumber(price));

            appData.screens.push({
                id: i,
                name,
                price: +price,
            });
        }

        for (let i = 0; i < 2; i++) {
            let name = appData.answerNonEmpty(
                "Какой дополнительный тип услуги нужен?",
            );

            let servicePrice = prompt("Сколько это будет стоить?");

            while (!appData.isNumber(servicePrice)) {
                servicePrice = prompt("Сколько это будет стоить?");
            }

            appData.services[`${name}_${i + 1}`] = +servicePrice;
        }

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },
    addPrices: function () {
        appData.screenPrice = +appData.screens.reduce(
            (acc, screen) => acc + screen.price,
            0,
        );

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },
    answerNonEmpty: function (question, placeholder = "") {
        let answer;

        do {
            answer = prompt(question, placeholder);

            if (answer === null) {
                continue;
            }

            answer = answer.trim();
        } while (!answer || appData.isNumber(answer));

        return answer;
    },
    isNumber: function (num) {
        return (
            !isNaN(parseFloat(num)) &&
            isFinite(num) &&
            num.includes(" ") === false
        );
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
        appData.title =
            nameProject[0].toUpperCase() + nameProject.slice(1).toLowerCase();
    },
    getServicePercentPrices: function (price, sumRollback) {
        appData.servicePercentPrice = price - sumRollback;
    },
    getFullPrice() {
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
    },
    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getTitle(appData.title);

        // Процент отката посреднику за работу (fullPrice * (rollback/100))
        appData.percentRollback = appData.fullPrice * (appData.rollback / 100);

        appData.getServicePercentPrices(
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
        console.log(appData.services);
        console.log(appData.screens);
    },
};

appData.start();
