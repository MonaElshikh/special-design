//#region Declaration
const colors = document.querySelectorAll(".colors-list li");
const randomButtons = document.querySelectorAll(".random-btns span");
const settingIcon = document.querySelector(".setting-icon");
const settingsBox = document.querySelector(".settings");
const landingSection = document.querySelector(".landing");
const landingImgs = ["wallpaper-1.avif", "wallpaper-2.avif", "wallpaper-3.avif", "wallpaper-4.avif", "wallpaper-5.avif"];
const rootElement = document.documentElement;
let randonNo;
let interval;
//#endregion

//#region Functions
function reset(list) {
    list.forEach((item) => item.classList.remove("active"));
}
// funtion to show/hide setting box
function toggleSettingsBox() {
    settingIcon.addEventListener("click", () => {
        settingsBox.classList.toggle("show");
    });
}
// funtion to load the current color stored in local storage
function loadDefaultOptions() {
    // 1- Color Option
    // check local storage for default color
    let colorMode = localStorage.getItem("color-mode");
    if (colorMode) {
        // set current color from local storage
        rootElement.style.setProperty("--main-color", colorMode);
        colors.forEach(color => {
            // clear active class
            color.classList.remove("active");
            // if the clicked color match the stored on set the color bullet to active
            if (color.dataset.color === colorMode) {
                color.classList.add("active");
            }
        })
    }
    else {
        rootElement.style.setProperty("--main-color", "#2196f3");
    }
    // 2- Random background option
    let toggleImage = localStorage.getItem("toggle-imgs");
    if (toggleImage) {
        switch (toggleImage) {
            case "yes":
                toggleLandingImages();
                reset(randomButtons);
                randomButtons[0].classList.add("active");
                break;
            case "no":
                stopToggleLandingImages();
                reset(randomButtons);
                randomButtons[1].classList.add("active");
                break;
        }
    }
    else {
        toggleLandingImages();
    }
}
// funtion to enable user to toggle color.
function toggleColorList() {
    colors.forEach(color => {
        color.addEventListener("click", (e) => {
            // set main color to chosen one
            rootElement.style.setProperty("--main-color", e.target.dataset.color);
            // reset all colors to be in active
            reset(colors);
            // colors.forEach(c => c.classList.remove("active"));
            // make the cliked color active
            color.classList.add("active");
            // save the chosen color to local storage.
            localStorage.setItem("color-mode", e.target.dataset.color);
        });
    });
}
// function to enable user to toggle random backgroun option
function toggleBackground() {
    randomButtons.forEach((button) => {
        button.addEventListener("click", () => {
            reset(randomButtons);
            button.classList.add("active");
            if (button.innerHTML === "Yes") {
                toggleLandingImages();
                localStorage.setItem("toggle-imgs", "yes");
            } else {
                stopToggleLandingImages();
                localStorage.setItem("toggle-imgs", "no");
            }
        });
    });
}
// funtion to set a random image for landing section.
function toggleLandingImages() {
    interval = setInterval(() => {
        // get random number within array lenght
        randonNo = Math.floor(Math.random() * landingImgs.length);
        // set the landing section background to a random image to be change every 5 seconds
        landingSection.style.backgroundImage = 'url("/imgs/' + landingImgs[randonNo] + '")';
    }, 5000);
}
function stopToggleLandingImages() {
    clearInterval(interval);
    landingSection.style.backgroundImage = 'url("/imgs/' + landingImgs[0] + '")';
}
//#endregion

//#region Calls
loadDefaultOptions();
toggleSettingsBox();
toggleColorList();
toggleBackground();
//#endregion