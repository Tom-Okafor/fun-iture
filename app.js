(() => {
    "use strict";

    function handleMenuToggleClickEvent() {
        const MENU_BUTTON = document.querySelector(".menu-holder");

        const MENU_BUTTON_LINES =
            document.querySelectorAll(".menu-holder > div");

        const MENU = document.querySelector(".menu");

        const MENU_ITEMS = document.querySelectorAll(".menu-item");

        function handleButtonAnimationForMenuOpen() {
            MENU_BUTTON.addEventListener("click", event => {
                 assignNewClassName(MENU_BUTTON);
            for (let eachMenuButtonLine of MENU_BUTTON_LINES) {
                assignNewClassName(eachMenuButtonLine);
            }
            });
         
        }

        function assignNewClassName(target) {
            const ITEM_CLASSNAME = target.getAttribute("class");
            target.classList.add(`${ITEM_CLASSNAME}Too`);
        }
        handleButtonAnimationForMenuOpen();
    }

    handleMenuToggleClickEvent();
})();
