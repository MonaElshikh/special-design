//#region Declaration
const colors = document.querySelectorAll(".colors-list li");
const gear = document.querySelector(".setting-icon");
const settingsBox = document.querySelector(".settings");
const landingSection = document.querySelector(".landing");
const landingImgs = ["wallpaper-1.avif", "wallpaper-2.avif", "wallpaper-3.avif", "wallpaper-4.avif", "wallpaper-5.avif"];
const rootElement = document.documentElement;
let randonNo;
//#endregion

//#region Functions

function toggleSettingsBox() {
    gear.addEventListener("click", () => {
        settingsBox.classList.toggle("show");
    });
}
function loadDefultColor() {
    let colorMode = localStorage.getItem("color-mode");
    if (colorMode) {
        rootElement.style.setProperty("--main-color", colorMode);
        colors.forEach(color => {
            color.style.setProperty("opacity", ".3");
            if (color.dataset.color === colorMode) {
                color.style.setProperty("opacity", "1");
            }
        })
    } else {
        rootElement.style.setProperty("--main-color", "#00bcd4");
    }
}
function toggleColorList() {
    colors.forEach(color => {
        color.addEventListener("click", (e) => {
            colors.forEach(c => c.style.setProperty("opacity", ".3"));
            color.style.setProperty("opacity", "1");
            rootElement.style.setProperty("--main-color", e.target.dataset.color);
            localStorage.setItem("color-mode", e.target.dataset.color);
        })
    });
}
function toggleLandingImages() {
    setInterval(() => {
        randonNo = Math.floor(Math.random() * landingImgs.length);
        landingSection.style.backgroundImage = 'url("/imgs/' + landingImgs[randonNo] + '")';
    }, 10000);
}
//#endregion

//#region Calls
toggleLandingImages();
toggleSettingsBox();
toggleColorList();
loadDefultColor();
//#endregion