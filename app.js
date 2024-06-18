(() => {
    "use strict";

    function handleMenuToggleClickEvent() {
        //define neccesary variables
        const MENU_BUTTON = document.querySelector(".menu-holder");

        const MENU_BUTTON_LINES =
            document.querySelectorAll(".menu-holder > div");

        const MENU = document.querySelector(".menu");

        const MENU_ITEMS = document.querySelectorAll(".menu-item");

        const MENU_ITEMS_LINKS = document.querySelectorAll(".menu-item > a");

        let numberOfMenuButtonClicks = 0;

        //create function that aids in the animation of the menu button and lines
        function handleMenuAnimationsForClickEvents() {
            MENU_BUTTON.addEventListener("click", event => {
                if (!numberOfMenuButtonClicks) {
                    handleButtonAnimationForMenuOpen();
                    handleAnimationsForDropDownMenuReveal();
                } else {
                    handleButtonAnimationForMenuClose();
                    handleAnimationsForDropDownMenuRetract();
                }
            });

            // create function that handles the animation for the menu-open click
            function handleButtonAnimationForMenuOpen() {
                assignNewClassName(MENU_BUTTON, "Too", 0);

                for (let eachMenuButtonLine of MENU_BUTTON_LINES) {
                    assignNewClassName(eachMenuButtonLine, "Too", 0);
                }
            }

            function handleButtonAnimationForMenuClose() {
                assignNewClassName(MENU_BUTTON, "Reverse", 0);
                MENU_BUTTON.addEventListener(
                    "animationend",
                    () => {
                        removeNewClassName(MENU_BUTTON, 0);
                    },
                    { once: true }
                );

                for (let eachMenuButtonLine of MENU_BUTTON_LINES) {
                    assignNewClassName(eachMenuButtonLine, "Reverse", 0);
                    eachMenuButtonLine.addEventListener(
                        "animationend",
                        () => {
                            removeNewClassName(eachMenuButtonLine, 0);
                        },
                        { once: true }
                    );
                }
            }

            function handleAnimationsForDropDownMenuReveal() {
                // create a function that assigns a className to the Menu block in order to activate the drop down animation
                function handleAnimationForMenuDropDown() {
                    assignClassName(MENU, "menu-grid");
                    assignClassName(MENU, "menu-reveal");
                }

                //create function that assigns distinct classes to the menu items to enable their respective dropdown movements

                function handleAnimationForMenuItemReveal() {
                    handleMenuItemsAnimations("menu-down");
                }

                // create a function that adds a class to the menu items' anchor elements to initiate their animation
                function handleAnimationForMenuLinkReveal() {
                    handleMenuLinkAnimations(
                        MENU_ITEMS_LINKS,
                        900,
                        200,
                        "menu-link-reveal"
                    );
                }
                handleAnimationForMenuDropDown();
                handleAnimationForMenuItemReveal();

                handleAnimationForMenuLinkReveal();
            }
        }

        function handleAnimationsForDropDownMenuRetract() {
            function handleAnimationForMenuLinkRetract() {
                handleMenuLinkAnimations(
                    MENU_ITEMS_LINKS,
                    0,
                    200,
                    "menu-link-retract"
                );
                setTimeout(() => {
                    for (let eachMenuItemLink of MENU_ITEMS_LINKS) {
                        eachMenuItemLink.className = "";
                    }
                }, 1500);
            }

            function handleAnimationForMenuItemRetract() {
                setTimeout(() => {
                    handleMenuItemsAnimations("menu-up");
                    setTimeout(() => {
                        for (let eachMenuItem of MENU_ITEMS) {
                            removeNewClassName(eachMenuItem, 0);
                        }
                    }, 1500);
                }, 800);
            }

            function handleAnimationForMenuRetract() {
                setTimeout(() => {
                    assignClassName(MENU, "menu-remove");
                    setTimeout(() => {
                        removeNewClassName(MENU, 0);
                    }, 550);
                }, 2500);
            }
            handleAnimationForMenuLinkRetract();
            handleAnimationForMenuItemRetract();

            handleAnimationForMenuRetract();
        }

        // create a function that asigns a new classname to an element by taking existing classname and modifying it.
        function assignNewClassName(target, strng, index) {
            const ITEM_CLASSNAME = target.classList[index];
            target.classList.add(`${ITEM_CLASSNAME}${strng}`);
        }

        // create a function that assigns a className to an element without using existing class

        // create a function that removes the newly assigned classname

        // create a function that assigns the necessary class required for the menu link text reveal

        function handleMenuLinkAnimations(
            target,
            interval1,
            interval2,
            clsName
        ) {
            let linksAnimated;
            if (!numberOfMenuButtonClicks) {
                linksAnimated = 0;
            } else {
                linksAnimated = target.length - 1;
            }
            setTimeout(() => {
                const LINK_ANIMATION_INTERVAL = setInterval(() => {
                    assignClassName(target[linksAnimated], clsName);
                    if (!numberOfMenuButtonClicks) {
                        linksAnimated++;
                        if (linksAnimated == target.length) {
                            clearInterval(LINK_ANIMATION_INTERVAL);
                            numberOfMenuButtonClicks++;
                        }
                    } else {
                        linksAnimated--;
                        if (linksAnimated < 0) {
                            clearInterval(LINK_ANIMATION_INTERVAL);
                            numberOfMenuButtonClicks = 0;
                        }
                    }
                }, interval2);
            }, interval1);
        }

        // create function that runs the Menu Item animation
        function handleMenuItemsAnimations(clsName) {
            for (let t = 0; t < MENU_ITEMS.length; t++) {
                assignClassName(MENU_ITEMS[t], `${clsName + (t + 1)}`);
            }
        }

        handleMenuAnimationsForClickEvents();
    }
    function animateElementsOnScroll(elem, class1, class2) {
        let hasAnimationRan = false;
        const GET_ELEM = document.querySelector(elem);
        const ELEM_ORIGINAL_CLSNAME = GET_ELEM.className;

        const ELEM_POSITION =
            GET_ELEM.getBoundingClientRect().top + window.scrollY;
        let heightScrolled;
        window.addEventListener("scroll", () => {
            heightScrolled = window.scrollY + 250;

            if (heightScrolled >= ELEM_POSITION && !hasAnimationRan) {
                assignClassName(GET_ELEM, class1);
                hasAnimationRan = true;
            } else if (heightScrolled < ELEM_POSITION && hasAnimationRan) {
                assignClassName(GET_ELEM, class2);

                hasAnimationRan = false;
                setTimeout(() => {
                    GET_ELEM.className = ELEM_ORIGINAL_CLSNAME;
                }, 1020);
            }
        });
    }

    function assignClassName(target, clsName) {
        target.classList.add(clsName);
    }
    function removeNewClassName(target, position) {
        const NEW_CLASSNAME = target.classList[position];
        target.className = NEW_CLASSNAME;
    }
    animateElementsOnScroll("h1", "background-shift", "background-unshift");
    animateElementsOnScroll(
        ".specialH1",
        "background-shift-too",
        "background-unshift-too"
    );
    animateElementsOnScroll(
        ".about h3",
        "background-shift-too",
        "background-unshift-too"
    );
    animateElementsOnScroll(
        ".features h3",
        "background-shift-too",
        "background-unshift-too"
    );
    handleMenuToggleClickEvent();
})();
