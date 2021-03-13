document.addEventListener("DOMContentLoaded", () => {
    'use strict';


    const getData = (url, callback) => {
        const request = new XMLHttpRequest();
        request.open("GET", url);
        // console.log(request.readyState);
        request.addEventListener("readystatechange", () => {
            // console.log(request.readyState);
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                const response = JSON.parse(request.response);
                callback(response);
            } else {
                // console.log(new Error("Ошибка: " + request.status));
                alert(new Error("Ошибка при загрузке данных: " + request.status));
            }
//            console.log(request);
        });
        request.send();
    };

    
    const loadSellItems = () => {
        const cardDetailsButtonBuy = document.querySelector(".card-details__button_buy");
        
        const modal = document.querySelector(".modal");
        const modalTitle = modal.querySelector(".modal__title");
        const modalSubtitle = modal.querySelector(".modal__subtitle");
        const modalSubmit = modal.querySelector(".modal__submit");
        const modalClose = modal.querySelector(".modal__close");
        //для очистки при закрытии
        const modalLabelElems = modal.querySelectorAll(".modal__label");
        // 
        const modalTitleSubmit = modal.querySelector(".modal__title-submit");


        const crossSellAdd = document.querySelector(".cross-sell__add");

        const allGoods = [];

        const openModal = () => {
            document.addEventListener("keydown", escapeHandler);
            modal.classList.add("open");
        };

        const closeModal = () => {
            document.removeEventListener("keydown", escapeHandler);
            modal.classList.remove("open");
            modalLabelElems.forEach((labelElem) => {
                const labelInput = labelElem.querySelector(".modal__input");
                if (labelInput) {
                    labelInput.value = "";
                }
            });
        };

        modal.addEventListener("click", (event) => {
            const target = event.target;
            if (target === modalSubmit || target === modalClose || target === modal) {
                if (target === modalSubmit) {
                    event.preventDefault();
                }
                closeModal();
            }
        });
        const escapeHandler = (event) => {
            if (event.code === "Escape") {
                closeModal();
            }
        };

        const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);
       

        const createCrossSellItem = (item) => {
            const liElement = document.createElement("li");
            liElement.classList.add("cross-sell__item");
            const {id, name, photo: picture, price} = item;
            liElement.innerHTML = `
						<article class="cross-sell__item">
							<input type="text" class = "cross__sell-submit visually-hidden" name="name-sub-item" value = "${id}" disabled>
							<img class="cross-sell__image" src="${picture}" alt="${name}">
							<h3 class="cross-sell__title">${name}</h3>
							<p class="cross-sell__price">${price}₽</p>
							<button type="button" class="button button_buy cross-sell__button">Купить</button>
						</article>
            `;
            return liElement;
        };

        const clearUnsortedList = (list) => {
            while(list.hasChildNodes()) {
                list.removeChild(list.firstChild);
            }
        };

        const renderGoods = (arr, ulElem) => {
            arr.forEach((goodItem) => {
                const crossSellItem = createCrossSellItem(goodItem); 
                ulElem.append(crossSellItem);
 
                const crossSellButton = crossSellItem.querySelector(".cross-sell__button");
                crossSellButton.addEventListener("click", (event) => {
                    const target = event.target;
                    const crossSellItem = target.closest(".cross-sell__item");
                    // console.log(crossSellItem);
                    const crossSellTitle = crossSellItem.querySelector(".cross-sell__title");
                    const crossSellSubmit = crossSellItem.querySelector(".cross__sell-submit");

                    modalSubtitle.textContent = "Купить";
                    modalTitle.textContent = crossSellTitle.textContent;
                    modalTitleSubmit.value = crossSellSubmit.value;

                    modalLabelElems.forEach((labelElem, index) => {
                        if (index === 2) {
                            labelElem.classList.add("active");
                        } else {
                            labelElem.classList.remove("active");
                        }
                    });
        
                    const innerData = goodItem;
                    // console.log(innerData);
                    openModal();
                });
            });

        };

        const expandCrossSellList = (event) => {
            const crossSellList = document.querySelector(".cross-sell__list");
            const crossSellAdd = event.target;
            // crossSellAdd.removeEventListener("click", expandCrossSellList);
            crossSellAdd.classList.remove("active");
            wrapRender(allGoods, crossSellList);
            while (allGoods.length) {
                allGoods.pop();
            }

        };

        const wrapper = (fn, count) => {
            let counter = 0;
            return (...args) => {
                if (counter === count) return;
                counter++;
                return fn(...args);
            };
        };

        const wrapRender = wrapper(renderGoods, 2);

        const createCrossSellList = (goods) => {
            const crossSellList = document.querySelector(".cross-sell__list");
            const shuffleGoods = shuffleArray(goods);

            allGoods.push(...shuffleGoods);
            const fourItems = allGoods.splice(0, 4);
            //очистка
            clearUnsortedList(crossSellList);
            wrapRender(fourItems, crossSellList);
            crossSellAdd.classList.add("active");
        };

        crossSellAdd.addEventListener("click", expandCrossSellList);


        getData("./cross-sell-dbase/dbase.json", createCrossSellList);
    
    };


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
                //перезагрузка допов
                // loadSellItems();
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
        const cardDetailsTitle = document.querySelector(".card-details__title");
        
        const modal = document.querySelector(".modal");
        const modalTitle = modal.querySelector(".modal__title");
        const modalSubtitle = modal.querySelector(".modal__subtitle");
        // const modalForm = modal.querySelector("form");
        const modalSubmit = modal.querySelector(".modal__submit");
        const modalClose = modal.querySelector(".modal__close");
        //для очистки при закрытии
        const modalLabelElems = modal.querySelectorAll(".modal__label");
        // 
        const modalTitleSubmit = modal.querySelector(".modal__title-submit");

        const openModal = () => {
            modalTitle.textContent = cardDetailsTitle.textContent;
            document.addEventListener("keydown", escapeHandler);
            modal.classList.add("open");
            modalTitleSubmit.value = cardDetailsTitle.textContent;
            // console.log(modalTitleSubmit.value);
        };

        const closeModal = () => {
            document.removeEventListener("keydown", escapeHandler);
            modal.classList.remove("open");
            modalLabelElems.forEach((labelElem) => {
                const labelInput = labelElem.querySelector(".modal__input");
                if (labelInput) {
                    labelInput.value = "";
                }
            });
        };



        cardDetailsButtonBuy.addEventListener("click", (event) => {
            modalSubtitle.textContent = event.target.dataset.buttonBuy;
            modalLabelElems.forEach((labelElem, index) => {
                if (index === 2) {
                    labelElem.classList.add("active");
                } else {
                    labelElem.classList.remove("active");
                }
            });
            openModal();
        });

        cardDetailsButtonDelivery.addEventListener("click", (event) => {
            modalSubtitle.textContent = event.target.dataset.buttonBuy;
            // console.log(event.target.dataset.buttonBuy);
            modalLabelElems.forEach((labelElem, index) => {
                labelElem.classList.add("active");
            });
            openModal();
        });

        modal.addEventListener("click", (event) => {
            const target = event.target;
            if (target === modalSubmit || target === modalClose || target === modal) {
                if (target === modalSubmit) {
                    event.preventDefault();
                }
                closeModal();
            }
        });
        const escapeHandler = (event) => {
            // console.log("escapeHandler");
            if (event.code === "Escape") {
                // console.log("inside");
                closeModal();
            }
        };
    };

    tabs();
    accordion();

    modal();

    loadSellItems();

    amenu(".header__menu", ".header-menu__list", ".header-menu__item", ".header-menu__burger");
});