//#region Declaration
const colors = document.querySelectorAll(".colors-list li");
const randomButtons = document.querySelectorAll(".random-btns span");
const settingIcon = document.querySelector(".setting-icon");
const settingsBox = document.querySelector(".settings");
const landingSection = document.querySelector(".landing");
const landingImgs = ["wallpaper-1.jpg", "wallpaper-2.jpg", "wallpaper-3.jpg", "wallpaper-4.jpg", "wallpaper-5.jpg"];
const rootElement = document.documentElement;
const skillsSection = document.querySelector(".skills");
const skillsProgress = document.querySelectorAll(".skill-progress span");
let upLink = document.querySelector("body > a");
let randonNo;
let interval;
//#endregion

//#region Functions
// funtion to remove active class from all elements inside the givin list.
function reset(list) {
    list.forEach((item) => item.classList.remove("active"));
}
// funtion to show/hide setting box
function toggleSettingsBox() {
    settingIcon.addEventListener("click", (e) => {
        settingsBox.classList.toggle("show");
        document.querySelector(".setting-icon .gear").classList.toggle("rotate");
    });
}
// funtion to load the user default options from local storage
function loadDefaultOptions() {
    // 1- Color Option
    // check local storage for default color
    let colorMode = localStorage.getItem("color-option");
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
    let toggleImage = localStorage.getItem("randomBg-option");
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
// funtion to enable user to toggle color option.
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
            localStorage.setItem("color-option", e.target.dataset.color);
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
                localStorage.setItem("randomBg-option", "yes");
            } else {
                stopToggleLandingImages();
                localStorage.setItem("randomBg-option", "no");
            }
        });
    });
}
// funtion to set a random images for landing section.
function toggleLandingImages() {
    interval = setInterval(() => {
        // get random number within array lenght
        randonNo = Math.floor(Math.random() * landingImgs.length);
        // set the landing section background to a random image to be change every 5 seconds
        landingSection.style.backgroundImage = 'url("/imgs/' + landingImgs[randonNo] + '")';
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
    // console.log(imges);
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
        }
    });
}
//#endregion

//#region Calls
loadDefaultOptions();
toggleSettingsBox();
toggleColorList();
toggleBackground();
animateSkills();
openGalleryImgPopup();
closePopups();
//#endregion