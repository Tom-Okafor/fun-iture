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

        console.log(MENU_ITEMS_LINKS);

        let numberOfMenuButtonClicks = 0;

        //create function that aids in the animation of the menu button and lines
        function handleMenuAnimationsForClickEvents() {
            MENU_BUTTON.addEventListener("click", event => {
                if (!numberOfMenuButtonClicks) {
                    handleButtonAnimationForMenuOpen();
                } else {
                    handleButtonAnimationForMenuClose();
                }
            });

            // create function that handles the animation for the menu-open click
            function handleButtonAnimationForMenuOpen() {
                assignNewClassName(MENU_BUTTON, "Too", 0);

                for (let eachMenuButtonLine of MENU_BUTTON_LINES) {
                    assignNewClassName(eachMenuButtonLine, "Too", 0);
                }
                numberOfMenuButtonClicks++;
            }

            function handleButtonAnimationForMenuClose() {
                assignNewClassName(MENU_BUTTON, "Reverse", 0);
                MENU_BUTTON.addEventListener(
                    "animationend",
                    () => {
                        removeNewClassName(MENU_BUTTON, 0);
                        console.log(MENU_BUTTON.classList);
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
                numberOfMenuButtonClicks = 0;
            }

            function handleAnimationsForDropDownMenuReveal() {
                // create a function that assigns a className to the Menu block in order to activate the drop down animation
                function handleAnimationForMenuDropDown() {
                    assignClassName(MENU, "menu-grid");
                    assignClassName(MENU, "menu-reveal");
                }

                //create function that assigns distinct classes to the menu items to enable their respective dropdown movements

                function handleAnimationForMenuItemReveal() {
                    for (let t = 0; t < MENU_ITEMS.length; t++) {
                        assignClassName(MENU_ITEMS[t], `menu-down${t + 1}`);
                        console.log(`menu-down${t + 1}`);
                    }
                }
                
                //
                function handleAnimationForMenuLinkReveal() {
                  
                }
                handleAnimationForMenuDropDown();
                handleAnimationForMenuItemReveal();
            }
            handleAnimationsForDropDownMenuReveal();
        }

        // create a function that asigns a new classname to an element by taking existing classname and modifying it.
        function assignNewClassName(target, strng, index) {
            const ITEM_CLASSNAME = target.classList[index];
            target.classList.add(`${ITEM_CLASSNAME}${strng}`);
        }

        // create a function that assigns a className to an element without using existing class
        function assignClassName(target, clsName) {
            target.classList.add(clsName);
        }

        // create a function that removes the newly assigned classname
        function removeNewClassName(target, position) {
            const NEW_CLASSNAME = target.classList[position];
            target.className = NEW_CLASSNAME;
        }

        handleMenuAnimationsForClickEvents();
    }
    /* window.addEventListener("scroll", () => {
        console.log(pageYOffset);
    });*/
    handleMenuToggleClickEvent();
})();
