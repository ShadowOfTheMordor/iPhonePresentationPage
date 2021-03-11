document.addEventListener("DOMContentLoaded", () => {
    'use strict';

    const tabs = () => {

        const cardDetailChangeElems = document.querySelectorAll(".card-detail__change");
        const cardDetailsTitleElem = document.querySelector(".card-details__title");
        const cardImageItemElem = document.querySelector(".card__image_item");
        const cardDetailsPriceElem = document.querySelector(".card-details__price");

        const descriptionScreen = document.querySelector(".description__screen");
        const descriptionTechScreen = document.querySelector(".description__tech-screen");
        const descriptionProcessor = document.querySelector(".description__processor");
        const descriptionMemory = document.querySelector(".description__memory");
        const descriptionCamera = document.querySelector(".description__camera");

        const data = [
            {
                name : "Смартфон Apple iPhone 12 Pro 128GB Graphite",
                img : "img/iPhone-graphite.png",
                desription : {
                    screen : 'Экран 6.1"/2532x1170 Пикс',
                    techScreen : "Технология экрана OLED",
                    processor : "Тип процессора A14 Bionic",
                    memory : 128,
                    camera : "Основная камера МПикс 12/12/12/LiDAR"
                },
                price : 95990
            },
            {
                name : "Смартфон Apple iPhone 12 Pro 256GB Silver",
                img : "img/iPhone-silver.png",
                desription : {
                    screen : 'Экран 6.1"/2532x1170 Пикс',
                    techScreen : "Технология экрана OLED",
                    processor : "Тип процессора A14 Bionic",
                    memory : 256,
                    camera : "Основная камера МПикс 12/12/12/LiDAR"
                },
                price : 120990
            },
            {
                name : "Смартфон Apple iPhone 12 Pro 128GB Pacific Blue",
                img : "img/iPhone-blue.png",
                desription : {
                    screen : 'Экран 6.1"/2532x1170 Пикс',
                    techScreen : "Технология экрана OLED",
                    processor : "Тип процессора A14 Bionic",
                    memory : 128,
                    camera : "Основная камера МПикс 12/12/12/LiDAR"
                },
                price : 99990
            }
        ];

        const deactivateButtons = () => {
            cardDetailChangeElems.forEach((btn) => {
                btn.classList.remove("active");
            });
        };

        const changeParameters = (index) => {
            const dataElem = data[index];

            cardDetailsTitleElem.textContent = dataElem.name;
            cardImageItemElem.src = dataElem.img;
            cardImageItemElem.alt = dataElem.name;
            cardDetailsPriceElem.textContent = dataElem.price + "₽";
            descriptionScreen.textContent = dataElem.desription.screen;
            descriptionTechScreen.textContent = dataElem.desription.techScreen;
            descriptionProcessor.textContent = dataElem.desription.processor;
            descriptionMemory.textContent = `Встроенная память (ROM) ${dataElem.desription.memory} ГБ`;
            descriptionCamera.textContent = dataElem.desription.camera;
        };

        cardDetailChangeElems.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                if (btn.classList.contains("active")) {
                    return;
                }

                deactivateButtons();
                
                btn.classList.add("active");
                changeParameters(index);
            });
        });
    };



    tabs();
});