"use strict";

const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemPercent = document.querySelectorAll(".other-items.percent");
const otherItemNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback input");
const inputRangeValue = document.querySelector(".rollback .range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollBack = document.getElementsByClassName("total-input")[4];

let screens = document.querySelectorAll(".screen");

const rangeInputValue = document.querySelector("input[type='range']");
const rangeValue = document.querySelector(".range-value");

console.log(rangeInputValue);
console.log(rangeValue);

const appData = {
    title: "",
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
    fullPrice: 0,
    totalCountScreens: 0,
    servicePercentPrice: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    servicesPercent: {},
    servicesNumber: {},
    init: function () {
        appData.addTitle();
        startBtn.disabled = true;
        startBtn.style.backgroundColor = "#ccc";
        startBtn.style.cursor = "not-allowed";

        appData.subscriptionEvents();

        startBtn.addEventListener("click", appData.start);
        buttonPlus.addEventListener("click", () => {
            appData.addScreenBlock();
            appData.validateScreens();
        });
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    resetData: function () {
        appData.screens = [];
        appData.servicesPercent = {};
        appData.servicesNumber = {};
        appData.servicePricesPercent = 0;
        appData.servicePricesNumber = 0;
        appData.screenPrice = 0;
        appData.fullPrice = 0;
    },
    subscriptionEvents: function () {
        screens.forEach((screen) => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");

            select.addEventListener("change", appData.validateScreens);
            input.addEventListener("input", appData.validateScreens);
        });

        rangeInputValue.addEventListener("input", appData.rangeChangeValue);
    },
    validateScreens: function () {
        screens = document.querySelectorAll(".screen");

        const isValid = Array.from(screens).every((screen) => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");

            const count = +input.value;

            return select.value !== "" && count > 0;
        });

        startBtn.disabled = !isValid;
        if (!isValid) {
            startBtn.style.backgroundColor = "#ccc";
            startBtn.style.cursor = "not-allowed";
        } else {
            startBtn.style.backgroundColor = "";
            startBtn.style.cursor = "pointer";
        }
    },
    rangeChangeValue: function () {
        rangeValue.textContent = rangeInputValue.value + "%";
        appData.rollback = +rangeInputValue.value;
    },
    start: function () {
        appData.resetData();
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        appData.showResult();

        // appData.logger();
    },
    addScreens: function () {
        screens = document.querySelectorAll(".screen");

        screens.forEach((screen, index) => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value,
            });
        });
    },
    addServices: function () {
        otherItemPercent.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });

        otherItemNumber.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
        console.log(appData);
    },
    addScreenBlock: function () {
        screens = document.querySelectorAll(".screen");

        const clonScreen = screens[0].cloneNode(true);

        clonScreen.querySelector("input").value = "";

        const select = clonScreen.querySelector("select");
        const input = clonScreen.querySelector("input");

        select.addEventListener("change", appData.validateScreens);
        input.addEventListener("input", appData.validateScreens);

        screens[screens.length - 1].after(clonScreen);
    },
    addPrices: function () {
        appData.screenPrice = +appData.screens.reduce(
            (acc, screen) => acc + screen.price,
            0,
        );

        appData.totalCountScreens = +appData.screens.reduce(
            (acc, screen) => acc + screen.count,
            0,
        );

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent +=
                appData.screenPrice * (appData.servicesPercent[key] / 100);
        }

        appData.fullPrice =
            +appData.screenPrice +
            appData.servicePricesNumber +
            appData.servicePricesPercent;

        appData.servicePercentPrice =
            appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCount.value = appData.totalCountScreens;
        totalCountOther.value =
            appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
        totalCountRollBack.value = appData.servicePercentPrice;
    },
    logger: function () {
        for (let key in appData) {
            console.log(`${key}: ${appData[key]}`);
        }
        console.log(appData.services);
        console.log(appData.screens);
    },
};

appData.init();
