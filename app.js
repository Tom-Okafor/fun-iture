(() => {
    "use strict";

    function handleMenuToggleClickEvent() {
        //define neccesary variables
        const MENU_BUTTON = document.querySelector(".menu-holder");

        const MENU_BUTTON_LINES =
            document.querySelectorAll(".menu-holder > div");

        const MENU = document.querySelector(".menu");

        const MENU_ITEMS = document.querySelectorAll(".menu-item");
        let numberOfMenuButtonClicks = 0;

        //create function that aids in the animation of the menu button and lines
        function handleButtonAnimationForClickEvents() {
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
                console.log(numberOfMenuButtonClicks);

                console.log(MENU_BUTTON.classList);
                assignNewClassName(MENU_BUTTON, "Reverse", 0);
                MENU_BUTTON.addEventListener("animationend", () => {
                    removeNewClassName(MENU_BUTTON, 0);
                    console.log(MENU_BUTTON.classList);
                }, {once: true});

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
        }

        // create a function that asigns a new classname to an element
        function assignNewClassName(target, strng, index) {
            const ITEM_CLASSNAME = target.classList[index];
            target.classList.add(`${ITEM_CLASSNAME}${strng}`);
        }

        // create a function that removes the newly assigned classname
        function removeNewClassName(target, position) {
            const NEW_CLASSNAME = target.classList[position];
            target.className = NEW_CLASSNAME;
        }

        handleButtonAnimationForClickEvents();
    }
    /* window.addEventListener("scroll", () => {
        console.log(pageYOffset);
    });*/
    handleMenuToggleClickEvent();
})();
