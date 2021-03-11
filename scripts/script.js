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



    const accordion = () => {
        const characteristicsListElem = document.querySelector(".characteristics__list");
        const characteristicsItemElems = document.querySelectorAll(".characteristics__item");

        const open = (button, dropDown) => {
            closeAllDrops();

            dropDown.style.height = `${dropDown.scrollHeight}px`;
            button.classList.add("active");
            dropDown.classList.add("active");
        };

        const close = (button, dropDown) => {
            button.classList.remove("active");
            dropDown.classList.remove("active");
            dropDown.style.height = "";
        };

        const closeAllDrops = () => {
            characteristicsItemElems.forEach((item) => {
                // console.log(item);
                const button = item.querySelector(".characteristics__title");
                const dropDown = item.querySelector(".characteristics__description");
                if (button.classList.contains("active")) {
                    close(button, dropDown);
                }
                
            });
        };

        characteristicsListElem.addEventListener("click", (event) => {
            const target = event.target;
            if (!target.classList.contains("characteristics__title")) {
                return;
            }

            const parent = target.closest(".characteristics__item");
            // console.log(parent);
            const dropDown = parent.querySelector(".characteristics__description");

            dropDown.classList.contains("active") ?
                close(target, dropDown) :
                open(target, dropDown);
        });
    };

    const modal = () => {
        const cardDetailsButtonBuy = document.querySelector(".card-details__button_buy");
        const cardDetailsButtonDelivery = document.querySelector(".card-details__button_delivery");
        
        const modal = document.querySelector(".modal");
        const modalTitle = modal.querySelector(".modal__title");
        const modalSubtitle = modal.querySelector(".modal__subtitle");
        // const modalForm = modal.querySelector("form");
        const modalSubmit = modal.querySelector(".modal__submit");
        const modalClose = modal.querySelector(".modal__close");

        const closeModal = (event) => {
            const target = event.target;
            console.log(target);
            console.log("contains " + target.classList.contains(".modal__submit"));
            if (target === modalSubmit || target === modalClose || target === modal) {
                if (target === modalSubmit) {
                    event.preventDefault();
                }
                modal.classList.remove("open");
                console.log(modal);
            }
            // modal.classList.remove("open");
        };

        // modalSubmit.addEventListener("click", (event) => {
        //     event.preventDefault();
        // });

        // modalClose.addEventListener("click", closeModal);

        const getTitle = () => {
            const cardDetailsTitleElem = document.querySelector(".card-details__title");
            return cardDetailsTitleElem.textContent;
        };

        cardDetailsButtonBuy.addEventListener("click", (event) => {
            modalTitle.textContent = getTitle();
            modalSubtitle.textContent = "Оплата";
            modal.classList.add("open");
        });

        cardDetailsButtonDelivery.addEventListener("click", (event) => {
            modalTitle.textContent = getTitle();
            modalSubtitle.textContent = "Доставка и оплата";
            modal.classList.add("open");
        });

        modal.addEventListener("click", closeModal);
        modal.addEventListener("keydown", (event) => {
            console.log(event);
            if (event.key === "Escape") {
                closeModal(event);
            }
        });
    };

    tabs();
    accordion();

    modal();
});