// Элементы взаимодействия
const elements = {
    // DOMelements
    userSurname: document.querySelector("#surname"),
    userName: document.querySelector("#name"),
    goodsElements: document.querySelectorAll('[name="goods"]'),
    countElements: document.querySelectorAll('[type="number"]'),
    buttonOrder: document.querySelector("#button-order"),
    totalSum: document.querySelector(".sum"),

    // PriceArray - Корзина для размещения товаров, их количества, цены и итоговой суммы
    Price: [
        (position1 = { name: "expresso", amount: 0, price: 0, totalPrice: 0 }),
        (position2 = { name: "americano", amount: 0, price: 0, totalPrice: 0 }),
        (position3 = { name: "latte", amount: 0, price: 0, totalPrice: 0 }),
        (position4 = { name: "capuchino", amount: 0, price: 0, totalPrice: 0 }),
        (position5 = { name: "chocolate_muffin", amount: 0, price: 0, totalPrice: 0 }),
        (position6 = { name: "blueberry_muffin", amount: 0, price: 0, totalPrice: 0 }),
        (position7 = { name: "apple_tart", amount: 0, price: 0, totalPrice: 0 }),
    ],
};

// Вызов функций
const init = () => {
    checkboxChecked();
    inputChange();
    buttonOrdering();
};

// Очистка данных после оформления заказа
const clearInputs = () => {
    // Очистка полей имени, фамилии и вывода итоговой суммы
    elements.userName.value = "";
    elements.userSurname.value = "";
    elements.totalSum.textContent = "0 р.";

    //  Деактивация чекбоксов
    for (let elem of elements.goodsElements) {
        if (elem.checked) elem.checked = false;
    }

    // Обнуление значений инпутов
    for (let elem of elements.countElements) {
        if (elem.value > 0) elem.value = 0;
    }
};

// Отображение итоговой суммы
const calcSum = (object) => {
    // Создание нового массива с итоговой суммой каждого продукта
    const total = object.map((item) => item.totalPrice);

    // Подсчёт итоговой суммы из массива итоговых сум каждого продукта
    const sum = total.reduce((a, b) => a + b);

    // Вывод подсчёта на экран
    elements.totalSum.textContent = `${sum} р.`;
};

// Отображение изменений при взаимодействии с чекбоксом
const checkboxChecked = () => {
    // Перебор всех товаров
    elements.goodsElements.forEach((elem) => {
        // Прослушка клика по товару
        elem.addEventListener("click", () => {
            // Перебор всех инпутов
            elements.countElements.forEach((input) => {
                // Перебор корзины товаров
                elements.Price.forEach((item) => {
                    // Если чекбокс товара активиен, то =>
                    if (elem.checked) {
                        // => при соответствии их обозначений у товара по "data-goods" и у инпута по "id", =>
                        if (elem.dataset.goods === input.id) {
                            // => значение инпута = 1 и, =>
                            input.value = 1;

                            // => при соответствии обзначений у товара по "data-goods" и наеменование товара в корзине  =>
                            if (elem.dataset.goods === item.name) {
                                // => количество товара в корзине = значение инпута, =>
                                item.amount = input.value;

                                // => значение цены товара в корзине = значение цены у товара, =>
                                item.price = elem.value;

                                // => и значение итоговой суммы товара в корзине = значение инпута * значение цены у товара
                                item.totalPrice = input.value * elem.value;
                            }
                        }
                        // если товар не активен, при соответствии их обозначений у товара по "data-goods" и у инпута по "id", =>
                    } else if (elem.dataset.goods === input.id) {
                        // => значение инпута обнуляется, и =>
                        input.value = 0;

                        // => при соответствии обзначений у товара по "data-goods" и наеменование товара в корзине  =>
                        if (elem.dataset.goods === item.name) {
                            // => обнуляются все значения по товару в корзине товаров
                            item.amount = 0;
                            item.price = 0;
                            item.totalPrice = 0;
                        }
                    }
                });
                // Вывод итоговой суммы из корзины товаров на экран
                calcSum(elements.Price);
            });
        });
    });
};

// Отображение изменений при взаимодействии с инпутом
const inputChange = () => {
    // Перебор всех инпутов
    elements.countElements.forEach((input) => {
        // Прослушка изменения по инпуту
        input.addEventListener("change", () => {
            // Перебор всех товаров
            elements.goodsElements.forEach((elem) => {
                // Перебор корзины товаров
                elements.Price.forEach((item) => {
                    // Если значение инпута > 0 и обозначения у товара по "data-goods" и у инпута по "id" совпадают, то =>
                    if (input.value > 0 && input.id === elem.dataset.goods) {
                        // => чекбокс товара становится активным, и =>
                        elem.checked = true;

                        // => при соответствии обзначений у товара по "data-goods" и наеменование товара в корзине  =>
                        if (elem.dataset.goods === item.name) {
                            // => количество товара в корзине = значение инпута, =>
                            item.amount = input.value;

                            // => значение цены товара в корзине = значение цены у товара, =>
                            item.price = elem.value;

                            // => и значение итоговой суммы товара в корзине = значение инпута * значение цены у товара
                            item.totalPrice = input.value * elem.value;
                        }

                        // если значение инпута не > 0, при соответствии их обозначений у товара по "data-goods" и у инпута по "id", =>
                    } else if (input.id === elem.dataset.goods) {
                        // => чекбокс товара становится неактивным и, =>
                        elem.checked = false;

                        // => при соответствии обзначений у товара по "data-goods" и наеменование товара в корзине  =>
                        if (elem.dataset.goods === item.name) {
                            // => обнуляются все значения по товару в корзине товаров
                            item.amount = 0;
                            item.price = 0;
                            item.totalPrice = 0;
                        }
                    }
                });

                // Вывод итоговой суммы из корзины товаров на экран
                calcSum(elements.Price);
            });
        });
    });
};

// Действие при нажатии на кнопку "Оформить заказ"
const buttonOrdering = () => {
    // Прослушка событий по клику
    elements.buttonOrder.addEventListener("click", (e) => {
        // Остановка действий кнопки по умолчанию
        e.preventDefault();

        // Создание нового массива из выбранных товаров, количество которых > 0
        const totalPrice =
            elements.Price.length > 0 ? elements.Price.filter((item) => item.amount > 0) : [];

        // Создание нового массива из значений итоговой суммы каждого товара из массива totalPrice
        const totalPriceSum =
            totalPrice.length > 0 ? totalPrice.map((item) => item.totalPrice) : [];

        // Подсчёт итоговой суммы из массива totalPriceSum
        const sum = totalPriceSum.length > 0 ? totalPriceSum.reduce((a, b) => a + b) : 0;

        // Если не указаны данные в полях "Имя" и "Фамилия", то установятся по умолчанию
        const name = elements.userName.value.trim() !== "" ? elements.userName.value : "Анатолий";
        const surName =
            elements.userSurname.value.trim() !== "" ? elements.userSurname.value : "Осипов";

        // Данные для вывода ФИ заказчика и итоговой суммы
        const client = `
                Заказчик: ${name} ${surName}  
                Сумма: ${sum} ₽
                      `;

        // Вывод позиций из корзины с выбранными товарами, =>
        // => но будет вывод каждой позиции по отдельности, =>
        // => расскоментируйте кусочек кода ниже и попробуйте

        // for (let elem of totalPrice) {
        // const markup = `${elem.name} - ${elem.amount} * ${elem.price} р. = ${elem.totalPrice} р.`;
        // alert (markup) }

        // Вывод окна заявки
        alert(client);

        // Очистка формы
        clearInputs();
    });
};

// Вызов фнкции init
init();
