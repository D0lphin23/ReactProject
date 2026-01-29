const title = 'ReactProject';
const screens = 'Простые, Сложные, Интерактивные, Очень сложные, Гиперсложные';
const screenPrice = 50;
const rollback = 15;
const fullPrice = 350;
const adaptive = true;

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
const percentRollback = (fullPrice * (rollback/100));

console.log(percentRollback);