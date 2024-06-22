(() => {
    "use strict";

    function handleMenuToggleClickEvent() {
        //define neccesary variables
        const MENU_BUTTON = document.querySelector(".menu-holder");

        const MENU_BUTTON_LINES =
            document.querySelectorAll(".menu-holder > div");

        const MENU = document.querySelector(".menu");

        const MENU_ITEMS = document.querySelectorAll(".menu-item");

        const MENU_ITEMS_FOR_LARGER_SCREENS = document.querySelectorAll(
            ".menu-item-larger-scrn"
        );
        const MENU_ITEMS_LINKS_FOR_LARGER_SCRNS = document.querySelectorAll(
            ".menu-item-larger-scrn > a"
        );
        const MENU_ITEMS_LINKS = document.querySelectorAll(".menu-item > a");

        let numberOfMenuButtonClicks = 0;

        //create function that aids in the animation of the menu button and lines
        function handleMenuAnimationsForClickEvents() {
            MENU_BUTTON.addEventListener("click", event => {
                if (!numberOfMenuButtonClicks) {
                    handleButtonAnimationForMenuOpen();
                    handleAnimationsForDropDownMenuReveal();
                    handleMenuItemLinkClick();
                    numberOfMenuButtonClicks++;
                } else {
                    handleButtonAnimationForMenuClose();
                    handleAnimationsForDropDownMenuRetract();

                    numberOfMenuButtonClicks = 0;
                }
            });

            // create function that handles the animation for the menu-open click
            function handleButtonAnimationForMenuOpen() {
                assignNewClassName(MENU_BUTTON, "Too", 0);

                for (let eachMenuButtonLine of MENU_BUTTON_LINES) {
                    assignNewClassName(eachMenuButtonLine, "Too", 0);
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
                // function handleAnimationForMenuLinkReveal() {
                //     handleMenuLinkAnimations(
                //         MENU_ITEMS_LINKS,
                //         900,
                //         200,
                //         "menu-link-reveal"
                //     );
                // }
                handleAnimationForMenuDropDown();
                handleAnimationForMenuItemReveal();

                // handleAnimationFMenuLinkReveal();
            }
        }

        function handleAnimationsForDropDownMenuRetract() {
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

        // create function that runs the Menu Item animation
        function handleMenuItemsAnimations(clsName) {
            for (let t = 0; t < MENU_ITEMS.length; t++) {
                assignClassName(MENU_ITEMS[t], `${clsName + (t + 1)}`);
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

        function handleMenuItemLinkClick() {
            for (let eachMenuItemLink of MENU_ITEMS_LINKS) {
                eachMenuItemLink.addEventListener("click", evt => {
                    handleSmoothscroll(evt);
                    handleButtonAnimationForMenuClose();
                    handleAnimationsForDropDownMenuRetract();
                });
            }
        }

        function handleMenuItemForLargerScrnLinkClick() {
            for (let eachMenuItemLink of MENU_ITEMS_LINKS_FOR_LARGER_SCRNS) {
                eachMenuItemLink.addEventListener("click", evt => {
                    handleSmoothscroll(evt);
                });
            }
        }
        function handleSmoothscroll(evt) {
            evt.preventDefault();
            const DESTINATION_ID = evt.target.getAttribute("href");

            const SCROLL_DESTINATION = document.querySelector(DESTINATION_ID);
            const DESTINATION_POSITION =
                SCROLL_DESTINATION.getBoundingClientRect().top;
            window.scrollBy({
                top: DESTINATION_POSITION,
                left: 0,
                behavior: "smooth"
            });
            numberOfMenuButtonClicks = 0;
        }
        handleMenuItemForLargerScrnLinkClick();
        handleMenuAnimationsForClickEvents();
    }
    function animateElementsOnScroll(elem, class1, class2) {
        let hasAnimationRan = false;
        const GET_ELEM = document.querySelector(elem);
        const ELEM_ORIGINAL_CLSNAME = GET_ELEM.className;

        let ELEM_POSITION;
        let heightScrolled;
        window.addEventListener("scroll", () => {
            ELEM_POSITION =
                GET_ELEM.getBoundingClientRect().top + window.scrollY;
            heightScrolled = window.scrollY + 300;

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

        window.addEventListener("resize", resetPositions);
        function resetPositions() {
            ELEM_POSITION =
                GET_ELEM.getBoundingClientRect().top + window.scrollY;
            heightScrolled = window.scrollY + 250;
        }
    }

    function assignClassName(target, clsName) {
        target.classList.add(clsName);
    }
    function removeNewClassName(target, position) {
        const NEW_CLASSNAME = target.classList[position];
        target.className = NEW_CLASSNAME;
    }

    // create a function that slides the icons on the icon display element

    function slideIcons() {
        function slideRightSideIcons() {
            handleNormalSlide(
                ".list-right-box > li",
                ".list-right-box",
                0,
                1500
            );
        }
        function slideLeftSideIcons() {
            handleNormalSlide(".list-left", ".list-left-box", -100, 1400);
        }

        slideRightSideIcons();
        slideLeftSideIcons();

        function handleNormalSlide(selector1, selector2, right, newright) {
            const BOX_LIST_ITEMS = document.querySelectorAll(selector1);
            const BOX_LIST_ITEMS_PARENTS_NUMBER =
                document.querySelectorAll(selector2).length;
            const BOX_LIST_ITEMS_LENGTH = BOX_LIST_ITEMS.length;
            const NUMBER_OF_REQUIRED_SLIDES =
                BOX_LIST_ITEMS_LENGTH / BOX_LIST_ITEMS_PARENTS_NUMBER;
            let slideCounter = 0;
            let rightPosition = right;
            let slideInterval = setInterval(() => {
                rightPosition += 100;
                for (let boxListItem of BOX_LIST_ITEMS) {
                    boxListItem.style.right = `${rightPosition}%`;
                }

                slideCounter++;
                if (slideCounter == NUMBER_OF_REQUIRED_SLIDES) {
                    clearInterval(slideInterval);
                    handleReverseSlide(selector1, selector2, right, newright);
                }
            }, 1500);
        }

        function handleReverseSlide(selector1, selector2, right, newright) {
            const BOX_LIST_ITEMS = document.querySelectorAll(selector1);
            const BOX_LIST_ITEMS_PARENTS_NUMBER =
                document.querySelectorAll(selector2).length;
            const BOX_LIST_ITEMS_LENGTH = BOX_LIST_ITEMS.length;
            const NUMBER_OF_REQUIRED_SLIDES =
                BOX_LIST_ITEMS_LENGTH / BOX_LIST_ITEMS_PARENTS_NUMBER;
            let slideCounter = NUMBER_OF_REQUIRED_SLIDES;
            let rightPosition = newright;
            let slideInterval = setInterval(() => {
                rightPosition -= 100;
                for (let boxListItem of BOX_LIST_ITEMS) {
                    boxListItem.style.right = `${rightPosition}%`;
                }

                slideCounter--;
                if (slideCounter == 0) {
                    clearInterval(slideInterval);
                    handleNormalSlide(selector1, selector2, right, newright);
                }
            }, 1500);
        }
    }

    function handleCarouselSlide() {
        const CAROUSEL_SLIDES = document.querySelectorAll(
            ".carousel > div > ul > li"
        );
        let leftPosition = 0;
        let newLeft;
        const NUMBER_OF_SLIDES = CAROUSEL_SLIDES.length;
        const SLIDE_IMAGES = document.querySelectorAll(
            ".carousel > div > ul > li > img"
        );
        function handleForwardSlide() {
                  let sliderInterval = setInterval(() => {
            leftPosition++;
            newLeft = leftPosition * 100;
            for (let eachSlideImage of SLIDE_IMAGES) {
                eachSlideImage.className = "";
            }
            for (let eachCarouselSlide of CAROUSEL_SLIDES) {
                eachCarouselSlide.style.left = `-${newLeft}%`;
            }

            SLIDE_IMAGES[leftPosition].className = "imageSlide";

            if (leftPosition == NUMBER_OF_SLIDES - 1) {
                clearInterval(sliderInterval);
                handleReverseSlide();
            }
        }, 3600);

        }
        
        function handleReverseSlide() {
                            let sliderInterval = setInterval(() => {
            leftPosition--;
            newLeft = leftPosition * 100;
            for (let eachSlideImage of SLIDE_IMAGES) {
                eachSlideImage.className = "";
            }
            for (let eachCarouselSlide of CAROUSEL_SLIDES) {
                eachCarouselSlide.style.left = `-${newLeft}%`;
            }

            SLIDE_IMAGES[leftPosition].className = "imageSlide";

            if (leftPosition == 0) {
                clearInterval(sliderInterval);
                handleForwardSlide()
            }
        }, 3600);

        }
        
        handleForwardSlide();
    }
    handleCarouselSlide();

    slideIcons();
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
    animateElementsOnScroll(
        ".carousel > div > ul > li > img",
        "imageSlide",
        ""
    );
    animateElementsOnScroll(".pLine", "pLine-show", "pLine");

    animateElementsOnScroll(
        "article:nth-of-type(1) .pLine",
        "pLine-show",
        "pLine"
    );

    animateElementsOnScroll(
        "article:nth-of-type(2) .pLine",
        "pLine-show",
        "pLine"
    );

    animateElementsOnScroll(
        "article:nth-of-type(3) .pLine",
        "pLine-show",
        "pLine"
    );

    animateElementsOnScroll(
        "article:nth-of-type(4) .pLine",
        "pLine-show",
        "pLine"
    );

    animateElementsOnScroll(".pHide1", "pUnhide", "pHide");

    animateElementsOnScroll(".pHide2", "pUnhide", "pHide");

    animateElementsOnScroll(".pHide3", "pUnhide", "pHide");

    animateElementsOnScroll(".pHide4", "pUnhide", "pHide");

    animateElementsOnScroll(".pHide5", "pUnhide", "pHide");

    animateElementsOnScroll(".pHide6", "pUnhide", "pHide");

    animateElementsOnScroll(".pHide7", "pUnhide", "pHide");

    animateElementsOnScroll("article:first-of-type .hide", "appear", "hideToo");
    animateElementsOnScroll(
        "article:nth-of-type(2) .hide",
        "appear",
        "hideToo"
    );
    animateElementsOnScroll(
        "article:nth-of-type(3) .hide",
        "appear",
        "hideToo"
    );
    animateElementsOnScroll(
        "article:nth-of-type(4) .hide",
        "appear",
        "hideToo"
    );

    handleMenuToggleClickEvent();
})();
// (() => {
//     "use strict";

//     function handleMenuToggleClickEvent() {
//         //define neccesary variables
//         const MENU_BUTTON = document.querySelector(".menu-holder");

//         const MENU_BUTTON_LINES =
//             document.querySelectorAll(".menu-holder > div");

//         const MENU = document.querySelector(".menu");

//         const MENU_ITEMS = document.querySelectorAll(".menu-item");

//         const MENU_ITEMS_FOR_LARGER_SCREENS = document.querySelectorAll(
//             ".menu-item-larger-scrn"
//         );
//         const MENU_ITEMS_LINKS_FOR_LARGER_SCRNS = document.querySelectorAll(
//             ".menu-item-larger-scrn > a"
//         );
//         const MENU_ITEMS_LINKS = document.querySelectorAll(".menu-item > a");

//         let numberOfMenuButtonClicks = 0;

//         //create function that aids in the animation of the menu button and lines
//         function handleMenuAnimationsForClickEvents() {
//             MENU_BUTTON.addEventListener("click", event => {
//                 if (!numberOfMenuButtonClicks) {
//                     handleButtonAnimationForMenuOpen();
//                     handleAnimationsForDropDownMenuReveal();
//                     handleMenuItemLinkClick();
//                     numberOfMenuButtonClicks++;
//                 } else {
//                     handleButtonAnimationForMenuClose();
//                     handleAnimationsForDropDownMenuRetract();

//                     numberOfMenuButtonClicks = 0;
//                 }
//             });

//             // create function that handles the animation for the menu-open click
//             function handleButtonAnimationForMenuOpen() {
//                 assignNewClassName(MENU_BUTTON, "Too", 0);

//                 for (let eachMenuButtonLine of MENU_BUTTON_LINES) {
//                     assignNewClassName(eachMenuButtonLine, "Too", 0);
//                 }
//             }

//             function handleAnimationsForDropDownMenuReveal() {
//                 // create a function that assigns a className to the Menu block in order to activate the drop down animation
//                 function handleAnimationForMenuDropDown() {
//                     assignClassName(MENU, "menu-grid");
//                     assignClassName(MENU, "menu-reveal");
//                 }

//                 //create function that assigns distinct classes to the menu items to enable their respective dropdown movements

//                 function handleAnimationForMenuItemReveal() {
//                     handleMenuItemsAnimations("menu-down");
//                 }

//                 // create a function that adds a class to the menu items' anchor elements to initiate their animation
//                 // function handleAnimationForMenuLinkReveal() {
//                 //     handleMenuLinkAnimations(
//                 //         MENU_ITEMS_LINKS,
//                 //         900,
//                 //         200,
//                 //         "menu-link-reveal"
//                 //     );
//                 // }
//                 handleAnimationForMenuDropDown();
//                 handleAnimationForMenuItemReveal();

//                 // handleAnimationFMenuLinkReveal();
//             }
//         }

//         function handleAnimationsForDropDownMenuRetract() {
//             function handleAnimationForMenuItemRetract() {
//                 setTimeout(() => {
//                     handleMenuItemsAnimations("menu-up");
//                     setTimeout(() => {
//                         for (let eachMenuItem of MENU_ITEMS) {
//                             removeNewClassName(eachMenuItem, 0);
//                         }
//                     }, 1500);
//                 }, 800);
//             }

//             function handleAnimationForMenuRetract() {
//                 setTimeout(() => {
//                     assignClassName(MENU, "menu-remove");
//                     setTimeout(() => {
//                         removeNewClassName(MENU, 0);
//                     }, 550);
//                 }, 2500);
//             }
//             handleAnimationForMenuItemRetract();

//             handleAnimationForMenuRetract();
//         }

//         // create a function that asigns a new classname to an element by taking existing classname and modifying it.
//         function assignNewClassName(target, strng, index) {
//             const ITEM_CLASSNAME = target.classList[index];
//             target.classList.add(`${ITEM_CLASSNAME}${strng}`);
//         }

//         // create a function that assigns a className to an element without using existing class

//         // create a function that removes the newly assigned classname

//         // create a function that assigns the necessary class required for the menu link text reveal

//         // create function that runs the Menu Item animation
//         function handleMenuItemsAnimations(clsName) {
//             for (let t = 0; t < MENU_ITEMS.length; t++) {
//                 assignClassName(MENU_ITEMS[t], `${clsName + (t + 1)}`);
//             }
//         }
//         function handleButtonAnimationForMenuClose() {
//             assignNewClassName(MENU_BUTTON, "Reverse", 0);
//             MENU_BUTTON.addEventListener(
//                 "animationend",
//                 () => {
//                     removeNewClassName(MENU_BUTTON, 0);
//                 },
//                 { once: true }
//             );

//             for (let eachMenuButtonLine of MENU_BUTTON_LINES) {
//                 assignNewClassName(eachMenuButtonLine, "Reverse", 0);
//                 eachMenuButtonLine.addEventListener(
//                     "animationend",
//                     () => {
//                         removeNewClassName(eachMenuButtonLine, 0);
//                     },
//                     { once: true }
//                 );
//             }
//         }

//         function handleMenuItemLinkClick() {
//             for (let eachMenuItemLink of MENU_ITEMS_LINKS) {
//                 eachMenuItemLink.addEventListener("click", evt => {
//                     handleSmoothscroll(evt);
//                     handleButtonAnimationForMenuClose();
//                     handleAnimationsForDropDownMenuRetract();
//                 });
//             }
//         }

//         function handleMenuItemForLargerScrnLinkClick() {
//             for (let eachMenuItemLink of MENU_ITEMS_LINKS_FOR_LARGER_SCRNS) {
//                 eachMenuItemLink.addEventListener("click", evt => {
//                     handleSmoothscroll(evt);
//                 });
//             }
//         }
//         function handleSmoothscroll(evt) {
//             evt.preventDefault();
//             const DESTINATION_ID = evt.target.getAttribute("href");

//             const SCROLL_DESTINATION = document.querySelector(DESTINATION_ID);
//             const DESTINATION_POSITION =
//                 SCROLL_DESTINATION.getBoundingClientRect().top;
//             window.scrollBy({
//                 top: DESTINATION_POSITION,
//                 left: 0,
//                 behavior: "smooth"
//             });
//             numberOfMenuButtonClicks = 0;
//         }
//         handleMenuItemForLargerScrnLinkClick();
//         handleMenuAnimationsForClickEvents();
//     }
//     function animateElementsOnScroll(elem, class1, class2) {
//         let hasAnimationRan = false;
//         const GET_ELEM = document.querySelector(elem);
//         const ELEM_ORIGINAL_CLSNAME = GET_ELEM.className;

//         let ELEM_POSITION;
//         let heightScrolled;
//         window.addEventListener("scroll", () => {
//             ELEM_POSITION =
//                 GET_ELEM.getBoundingClientRect().top + window.scrollY;
//             heightScrolled = window.scrollY + 300;

//             if (heightScrolled >= ELEM_POSITION && !hasAnimationRan) {
//                 assignClassName(GET_ELEM, class1);
//                 hasAnimationRan = true;
//             } else if (heightScrolled < ELEM_POSITION && hasAnimationRan) {
//                 assignClassName(GET_ELEM, class2);

//                 hasAnimationRan = false;
//                 setTimeout(() => {
//                     GET_ELEM.className = ELEM_ORIGINAL_CLSNAME;
//                 }, 1020);
//             }
//         });

//         window.addEventListener("resize", resetPositions);
//         function resetPositions() {
//             ELEM_POSITION =
//                 GET_ELEM.getBoundingClientRect().top + window.scrollY;
//             heightScrolled = window.scrollY + 250;
//         }
//     }

//     function assignClassName(target, clsName) {
//         target.classList.add(clsName);
//     }
//     function removeNewClassName(target, position) {
//         const NEW_CLASSNAME = target.classList[position];
//         target.className = NEW_CLASSNAME;
//     }

//     // create a function that slides the icons on the icon display element

//     function slideIcons() {
//         function slideRightSideIcons() {
//             handleNormalSlide(
//                 ".list-right-box > li",
//                 ".list-right-box",
//                 0,
//                 1500
//             );
//         }
//         function slideLeftSideIcons() {
//             handleNormalSlide(".list-left", ".list-left-box", -100, 1400);
//         }

//         slideRightSideIcons();
//         slideLeftSideIcons();

//         function handleNormalSlide(selector1, selector2, right, newright) {
//             const BOX_LIST_ITEMS = document.querySelectorAll(selector1);
//             const BOX_LIST_ITEMS_PARENTS_NUMBER =
//                 document.querySelectorAll(selector2).length;
//             const BOX_LIST_ITEMS_LENGTH = BOX_LIST_ITEMS.length;
//             const NUMBER_OF_REQUIRED_SLIDES =
//                 BOX_LIST_ITEMS_LENGTH / BOX_LIST_ITEMS_PARENTS_NUMBER;
//             let slideCounter = 0;
//             let rightPosition = right;
//             let slideInterval = setInterval(() => {
//                 rightPosition += 100;
//                 for (let boxListItem of BOX_LIST_ITEMS) {
//                     boxListItem.style.right = `${rightPosition}%`;
//                 }

//                 slideCounter++;
//                 if (slideCounter == NUMBER_OF_REQUIRED_SLIDES) {
//                     clearInterval(slideInterval);
//                     handleReverseSlide(selector1, selector2, right, newright);
//                 }
//             }, 1500);
//         }

//         function handleReverseSlide(selector1, selector2, right, newright) {
//             const BOX_LIST_ITEMS = document.querySelectorAll(selector1);
//             const BOX_LIST_ITEMS_PARENTS_NUMBER =
//                 document.querySelectorAll(selector2).length;
//             const BOX_LIST_ITEMS_LENGTH = BOX_LIST_ITEMS.length;
//             const NUMBER_OF_REQUIRED_SLIDES =
//                 BOX_LIST_ITEMS_LENGTH / BOX_LIST_ITEMS_PARENTS_NUMBER;
//             let slideCounter = NUMBER_OF_REQUIRED_SLIDES;
//             let rightPosition = newright;
//             let slideInterval = setInterval(() => {
//                 rightPosition -= 100;
//                 for (let boxListItem of BOX_LIST_ITEMS) {
//                     boxListItem.style.right = `${rightPosition}%`;
//                 }

//                 slideCounter--;
//                 if (slideCounter == 0) {
//                     clearInterval(slideInterval);
//                     handleNormalSlide(selector1, selector2, right, newright);
//                 }
//             }, 1500);
//         }
//     }

//     function handleCarouselSlide() {
//         const CAROUSEL_SLIDES = document.querySelectorAll(
//             ".carousel > div > ul > li"
//         );
//         const SLIDE
//         let leftPosition = 0;
//         let newLeft;
//         const NUMBER_OF_SLIDES = CAROUSEL_SLIDES.length;
//         function handleForwardSlide(){
//                   let sliderInterval = setInterval(() => {
//             leftPosition++;
//             newLeft = leftPosition * 100;
//             for (let eachCarouselSlide of CAROUSEL_SLIDES) {
//                 eachCarouselSlide.className = "imageSlide";

//                 eachCarouselSlide.style.left = `-${newLeft}%`;
//             }
//             if (leftPosition == NUMBER_OF_SLIDES - 1) {
//                 clearInterval(sliderInterval);
//                         handleReverseSlide();

//             }
//         }, 3600);

//         }
//         function handleReverseSlide(){   let sliderInterval = setInterval(() => {
//             leftPosition--;
//             newLeft = leftPosition * 100;
//             for (let eachCarouselSlide of CAROUSEL_SLIDES) {
//                 eachCarouselSlide.className = "imageSlide";

//                 eachCarouselSlide.style.left = `-${newLeft}%`;
//             }
//             if (leftPosition == 0) {
//                 clearInterval(sliderInterval);
//                 handleForwardSlide();

//             }
//         }, 3600);
//         }
//         handleForwardSlide();
//     }
//     handleCarouselSlide();

//     slideIcons();
//     animateElementsOnScroll("h1", "background-shift", "background-unshift");
//     animateElementsOnScroll(
//         ".specialH1",
//         "background-shift-too",
//         "background-unshift-too"
//     );
//     animateElementsOnScroll(
//         ".about h3",
//         "background-shift-too",
//         "background-unshift-too"
//     );
//     animateElementsOnScroll(
//         ".features h3",
//         "background-shift-too",
//         "background-unshift-too"
//     );
//     animateElementsOnScroll(".carousel > div > ul > li", "imageSlide", "");
//     animateElementsOnScroll(".pLine", "pLine-show", "pLine");

//     animateElementsOnScroll(
//         "article:nth-of-type(1) .pLine",
//         "pLine-show",
//         "pLine"
//     );

//     animateElementsOnScroll(
//         "article:nth-of-type(2) .pLine",
//         "pLine-show",
//         "pLine"
//     );

//     animateElementsOnScroll(
//         "article:nth-of-type(3) .pLine",
//         "pLine-show",
//         "pLine"
//     );

//     animateElementsOnScroll(
//         "article:nth-of-type(4) .pLine",
//         "pLine-show",
//         "pLine"
//     );

//     animateElementsOnScroll(".pHide1", "pUnhide", "pHide");

//     animateElementsOnScroll(".pHide2", "pUnhide", "pHide");

//     animateElementsOnScroll(".pHide3", "pUnhide", "pHide");

//     animateElementsOnScroll(".pHide4", "pUnhide", "pHide");

//     animateElementsOnScroll(".pHide5", "pUnhide", "pHide");

//     animateElementsOnScroll(".pHide6", "pUnhide", "pHide");

//     animateElementsOnScroll(".pHide7", "pUnhide", "pHide");
//     console.log(
//         document.querySelector(
//             "article:first-of-type .hide"
//         )
//     );
//     animateElementsOnScroll(
//         "article:first-of-type .hide",
//         "appear",
//         "hide"
//     );
//     animateElementsOnScroll(
//         "article:nth-of-type(2) .hide",
//         "appear",
//         "hide"
//     );
//     animateElementsOnScroll(
//         "article:nth-of-type(3) .hide",
//         "appear",
//         "hide"
//     );
//     animateElementsOnScroll(
//         "article:nth-of-type(4) .hide",
//         "appear",
//         "hide"
//     );

//     handleMenuToggleClickEvent();
// })();
