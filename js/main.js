//#region Declaration
const rootElement = document.documentElement;

const header = document.querySelector(".header");
const toggleBtn = document.querySelector(".toggle-menu");
const linksContainer = document.querySelector(".links");

const settingIcon = document.querySelector(".setting-icon");
const settingsBox = document.querySelector(".settings");
const colors = Array.from(document.querySelectorAll(".colors-list li"));
const randomButtons = Array.from(document.querySelectorAll("#bg-btns span"));
const navBulletsContainer = document.querySelector(".nav-bullets");
const navBulletsButtons = Array.from(document.querySelectorAll("#bullets-btns span"));
const navBullets = Array.from(document.querySelectorAll(".nav-bullets .bullet "));
const navLinks = Array.from(document.querySelectorAll(".links a"));

const landingSection = document.querySelector(".landing");
const landingImgs = ["wallpaper-1.jpg", "wallpaper-2.jpg", "wallpaper-3.jpg", "wallpaper-4.jpg", "wallpaper-5.jpg"];
const skillsSection = document.querySelector(".skills");
const skillsProgress = Array.from(document.querySelectorAll(".skill-progress span"));
const resetButton = document.querySelector(".reset");
let upLink = document.querySelector("body > a");
let randonNo;
let interval;
//#endregion

//#region Functions
// funtion to reset active class from all elements inside the givin list and set it for the givin item.
function resetActiveStyle(list, e) {
    list.forEach((item) => item.classList.remove("active"));
    e ? e.classList.add("active") : "";
}
// function to reset all options in settings box
function resetOptions() {
    resetButton.addEventListener("click", () => {
        localStorage.removeItem("color-option");
        localStorage.removeItem("randomBg-option");
        localStorage.removeItem("navBullets-option");
        loadDefaultOptions();
    });
}
// function to set local storage values
function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
}
// function to get local storage values
function getLocalStorage(key) {
    return localStorage.getItem(key);
}
// funtion to load user default options from local storage
function loadDefaultOptions() {
    // 1- Color Option
    // check local storage for default color
    let colorMode = getLocalStorage("color-option");
    if (colorMode) {
        // set current color from local storage
        rootElement.style.setProperty("--main-color", colorMode);
        resetActiveStyle(colors, colors.filter(color => color.dataset.color === colorMode)[0]);
    }
    else {
        rootElement.style.setProperty("--main-color", "#2196f3");
        resetActiveStyle(colors, colors[0]);
    }
    // 2- Random background option
    let toggleImage = getLocalStorage("randomBg-option");
    if (toggleImage) {
        switch (toggleImage) {
            case "yes":
                resetActiveStyle(randomButtons, randomButtons[0]);
                toggleLandingImages();
                break;
            case "no":
                resetActiveStyle(randomButtons, randomButtons[1]);
                stopToggleLandingImages();
                break;
        }
    }
    else {
        toggleLandingImages();
    }
    //  3- Show/Hide nav bullets
    let toggleBullets = getLocalStorage("navBullets-option");
    if (toggleBullets) {
        switch (toggleBullets) {
            case "yes":
                resetActiveStyle(navBulletsButtons, navBulletsButtons[0]);
                navBulletsContainer.style.display = "block";
                break;
            case "no":
                resetActiveStyle(navBulletsButtons, navBulletsButtons[1]);
                navBulletsContainer.style.display = "none";
                break;
        }
    }
    else {
        navBulletsContainer.style.display = "block";
    }
}
// funtion to show/hide setting box
function toggleSettingsBox() {
    settingIcon.addEventListener("click", (e) => {
        // make header under settings box
        header.style.zIndex = "2";
        // close top menu if open
        if (linksContainer.classList.contains("open")) {
            showHideMenu();
        }
        // show settings panel
        settingsBox.classList.toggle("show");
        // rotate settings icon
        document.querySelector(".setting-icon .gear").classList.toggle("rotate");
    });
}
// funtion to enable user to toggle color option.
function toggleColorList() {
    colors.forEach(color => {
        color.addEventListener("click", (e) => {
            resetActiveStyle(colors, e.target);
            rootElement.style.setProperty("--main-color", e.target.dataset.color);
            setLocalStorage("color-option", e.target.dataset.color);
        });
    });
}
// function to enable user to toggle random backgroun option
function toggleBackground() {
    randomButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            resetActiveStyle(randomButtons, e.target);
            setLocalStorage("randomBg-option", button.innerHTML.toLowerCase());
            button.innerHTML === "Yes" ? toggleLandingImages() : stopToggleLandingImages();
        });
    });
}
// function to enable user toggle showing nav bullets
function toggleNavBullets() {
    navBulletsButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            resetActiveStyle(navBulletsButtons, e.target);
            setLocalStorage("navBullets-option", button.innerHTML.toLowerCase());
            button.innerHTML === "Yes" ? navBulletsContainer.style.display = "block" : navBulletsContainer.style.display = "none";
        });
    });
}
// funtion to set a random images for landing section.
function toggleLandingImages() {
    interval = setInterval(() => {
        // get random number within array lenght
        randonNo = Math.floor(Math.random() * landingImgs.length);
        // set the landing section background to a random image to be change every 5 seconds
        landingSection.style.backgroundImage = 'url("/imgs/landing/' + landingImgs[randonNo] + '")';
    }, 5000);
}
// function to stop random background images for landing section
function stopToggleLandingImages() {
    clearInterval(interval);
}
// funtion to animate skills on window scrolling
function animateSkills() {
    window.onscroll = function () {
        // get skills section offset top
        let skillsOffsetTop = skillsSection.offsetTop;
        // get skills section height
        let skillsHeight = skillsSection.offsetHeight;
        // get window outer height
        let windowHeight = this.outerHeight;
        // get page scrollY offset
        let windowScrollY = window.scrollY;
        // check if scroll > 700 show up link
        windowScrollY > 700 ? upLink.style.display = "block" : upLink.style.display = "none";
        if (windowScrollY > (skillsOffsetTop + skillsHeight - windowHeight)) {
            skillsProgress.forEach(skill => {
                skill.style.width = skill.dataset.progress;
            });
        }
    }
}
// function to open popup for each gallery img on click
function openGalleryImgPopup() {
    let imges = document.querySelectorAll(".imges-box img");
    imges.forEach(img => {
        img.addEventListener("click", (e) => {
            // create the modal popup
            let modal = document.createElement("div");
            modal.className = "modal";
            // create modal content
            let modalContent = document.createElement("div");
            modalContent.className = "modal-content";
            // create modal header
            let modalHeader = document.createElement("h2");
            modalHeader.innerHTML = e.target.alt || "unTitled"
            modalHeader.className = "modal-header";
            // create close button
            let closeButton = document.createElement("span");
            let closeText = document.createTextNode("x");
            closeButton.appendChild(closeText);
            closeButton.className = "close";
            // create modal image
            let modalImage = document.createElement("img");
            modalImage.src = e.target.src;
            // append elements to parents
            modalContent.appendChild(modalHeader);
            modalContent.appendChild(closeButton);
            modalContent.appendChild(modalImage);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
        });
    });
}
// function to close popups
function closePopups() {
    document.addEventListener("click", (e) => {
        // close gallery image popup when clicking on close button
        if (e.target.className === "close") {
            e.target.parentNode.parentNode.remove();
        }
        // close gallery image popup when clicking outsid.
        else if (e.target.className === "modal") {
            e.target.remove();
        }
        // close settings box if clicked anywhere outside
        else {
            e.target.className !== "main" &&
                (e.target.classList.contains("settings")
                    || e.target.parentNode.classList.contains("settings")
                    || e.target.parentNode.parentNode.classList.contains("settings")
                    || e.target.parentNode.parentNode.parentNode.classList.contains("settings"))
                ? ""
                : settingsBox.classList.remove("show");

            // close top menu 
            if (e.target !== toggleBtn && e.target.parentNode !== linksContainer) {
                if (linksContainer.classList.contains("open")) {
                    showHideMenu();
                }
            }
        }
    });
}
// function to navigate to any page sections via bullets or top links
function navigateSections(list) {
    list.forEach((element) => {
        // on click go to the section using scrollIntoView api with smooth behavior.
        element.addEventListener("click", (e) => {
            e.preventDefault();
            // close top menu if open
            if (linksContainer.classList.contains("open")) {
                showHideMenu();
            }
            document.querySelector(e.target.dataset.section).scrollIntoView({ behavior: "smooth" });
        });
    });
}
// function to show and hide the top menu links
function showHideMenu() {
    linksContainer.classList.toggle("open");
    toggleBtn.classList.toggle("active-menu");
}
// function to toggle top menu bwtween diffrenet screens
function toggleMenu() {
    toggleBtn.onclick = function (e) {
        e.stopPropagation(); // prevent clicking on chiled elements inside the main.
        showHideMenu();
        header.style.zIndex = "3";
    };
    linksContainer.onclick = function (e) {
        e.stopPropagation(); // prevent clicking on chiled elements inside the main.
    }
}
//#endregion

//#region Calls
loadDefaultOptions();
toggleSettingsBox();
toggleColorList();
toggleBackground();
toggleNavBullets();
animateSkills();
openGalleryImgPopup();
closePopups();
navigateSections(navLinks);
navigateSections(navBullets);
resetOptions();
toggleMenu();
//#endregion