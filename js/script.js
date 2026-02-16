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
        this.addTitle();
        this.blockedStartButton();

        this.subscriptionEvents();

        startBtn.addEventListener("click", () => this.start());
        buttonPlus.addEventListener("click", () => {
            this.addScreenBlock();
            this.validateScreens();
        });

        resetBtn.addEventListener("click", () => this.reset());
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    resetData: function () {
        this.screens = [];
        this.servicesPercent = {};
        this.servicesNumber = {};
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.screenPrice = 0;
        this.fullPrice = 0;
        this.rollback = 0;
    },
    subscriptionEvents: function () {
        screens.forEach((screen) => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");

            select.addEventListener("change", () => this.validateScreens());
            input.addEventListener("input", () => this.validateScreens());
        });

        rangeInputValue.addEventListener("input", () =>
            this.rangeChangeValue(),
        );
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
        this.rollback = +rangeInputValue.value;
    },
    start: function () {
        this.resetData();
        this.addScreens();
        this.addServices();
        this.addPrices();
        this.showResult();
        this.toggleInterface(false);

        // this.logger();
    },
    addScreens: function () {
        screens = document.querySelectorAll(".screen");

        screens.forEach((screen, index) => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            const selectName = select.options[select.selectedIndex].textContent;

            this.screens.push({
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
                this.servicesPercent[label.textContent] = +input.value;
            }
        });

        otherItemNumber.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addScreenBlock: function () {
        screens = document.querySelectorAll(".screen");

        const clonScreen = screens[0].cloneNode(true);

        clonScreen.querySelector("input").value = "";

        const select = clonScreen.querySelector("select");
        const input = clonScreen.querySelector("input");

        select.addEventListener("change", () => this.validateScreens());
        input.addEventListener("input", () => this.validateScreens());

        screens[screens.length - 1].after(clonScreen);
    },
    addPrices: function () {
        this.screenPrice = +this.screens.reduce(
            (acc, screen) => acc + screen.price,
            0,
        );

        this.totalCountScreens = +this.screens.reduce(
            (acc, screen) => acc + screen.count,
            0,
        );

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent +=
                this.screenPrice * (this.servicesPercent[key] / 100);
        }

        this.fullPrice =
            +this.screenPrice +
            this.servicePricesNumber +
            this.servicePricesPercent;

        this.servicePercentPrice =
            this.fullPrice - this.fullPrice * (this.rollback / 100);
    },
    showResult: function () {
        total.value = this.screenPrice;
        totalCount.value = this.totalCountScreens;
        totalCountOther.value =
            this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.fullPrice;
        totalCountRollBack.value = this.servicePercentPrice;
    },
    blockedStartButton: function () {
        startBtn.disabled = true;
        startBtn.style.backgroundColor = "#ccc";
        startBtn.style.cursor = "not-allowed";
    },
    reset: function () {
        this.resetData();
        this.removeAddedScreens(); // Оставить только один селект, остальные удалить
        this.clearInterface(); // Очищение интерфейса и всех заполненных полей
        this.toggleInterface(true); // Включение интерфейса и всех полей
        this.resetResults(); // Сброс результатов
        this.blockedStartButton(); // блокировка кнопки "Рассчитать"
    },
    toggleInterface: function (enabled) {
        const leftSide = document.querySelector(".main-controls");

        const allInputs = leftSide.querySelectorAll(
            ".main-controls__item.screen input[type=text]",
        );
        const allSelects = leftSide.querySelectorAll("select");
        const allChecks = leftSide.querySelectorAll("input[type=checkbox]");

        buttonPlus.disabled = !enabled;
        buttonPlus.style.backgroundColor = enabled ? "" : "#ccc";
        buttonPlus.style.cursor = enabled ? "pointer" : "not-allowed";

        allInputs.forEach((input) => (input.disabled = !enabled));
        allSelects.forEach((select) => (select.disabled = !enabled));
        allChecks.forEach((check) => (check.disabled = !enabled));

        startBtn.style.display = enabled ? "block" : "none";
        resetBtn.style.display = enabled ? "none" : "block";

        rangeInputValue.disabled = !enabled;
    },
    removeAddedScreens: function () {
        const leftSide = document.querySelector(".main-controls");

        const allChecks = leftSide.querySelectorAll("input[type=checkbox]");

        screens = document.querySelectorAll(".screen");

        screens.forEach((screen, index) => {
            if (index > 0) {
                screen.remove();
            }
        });

        allChecks.forEach((check) => (check.checked = false));

        rangeInputValue.value = 0;
        rangeValue.textContent = rangeInputValue.value + "%";
    },
    clearInterface: function () {
        screens = document.querySelectorAll(".screen");

        screens.forEach((screen) => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            select.value = "";
            input.value = "";
        });
    },
    resetResults: function () {
        const rightSide = document.querySelector(".main-total");

        const allInputs = rightSide.querySelectorAll("input");
        allInputs.forEach((input) => (input.value = "0"));
    },
    logger: function () {
        for (let key in this) {
            console.log(`${key}: ${this[key]}`);
        }
        console.log(this.services);
        console.log(this.screens);
    },
};

appData.init();
