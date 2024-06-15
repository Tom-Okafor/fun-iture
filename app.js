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
                const MENU_BTN_CLASSNAME = MENU_BUTTON.getAttribute("class");
                MENU_BUTTON.classList.add(`${MENU_BTN_CLASSNAME}Too`);
            });
        }
        handleButtonAnimationForMenuOpen();
    }

    handleMenuToggleClickEvent();
})();
