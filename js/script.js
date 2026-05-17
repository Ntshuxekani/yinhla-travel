// ================= MOBILE MENU =================

const hamburger =
document.querySelector('.hamburger');

const navLinks =
document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {

    navLinks.classList.toggle('active');

});


// ================= ACTIVE NAVIGATION =================

const sections =
document.querySelectorAll("section");

const navLinksItems =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
        section.offsetTop;

        const sectionHeight =
        section.clientHeight;

        if(pageYOffset >= sectionTop - 200){

            current =
            section.getAttribute("id");

        }

    });

    navLinksItems.forEach(link => {

        link.classList.remove("active");

        if(
            link.getAttribute("href")
            === `#${current}`
        ){

            link.classList.add("active");

        }

    });

});


// ================= SCROLL REVEAL =================

const reveals =
document.querySelectorAll(".reveal");

function revealSections(){

    reveals.forEach(section => {

        const windowHeight =
        window.innerHeight;

        const revealTop =
        section.getBoundingClientRect().top;

        const revealPoint = 100;

        if(
            revealTop <
            windowHeight - revealPoint
        ){

            section.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    revealSections
);

/* Run On Load */

revealSections();
// ================= BACK TO TOP =================

const backToTop =
document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

});

/* Scroll To Top */

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});
// ================= BOOKING MODAL =================

const bookingModal =
document.getElementById("bookingModal");

const bookButtons = document.querySelectorAll(
    '.nav-btn, .hero-book-btn'
);

const closeModal =
document.getElementById("closeModal");

/* Open Modal */

bookButtons.forEach(button => {

    button.addEventListener("click", (e) => {

        e.preventDefault();

        bookingModal.classList.add("show");

    });

});

/* Close Modal */

closeModal.addEventListener("click", () => {

    bookingModal.classList.remove("show");

});

/* Close Outside */

window.addEventListener("click", (e) => {

    if(e.target === bookingModal){

        bookingModal.classList.remove("show");

    }

});
// ================= BOOKING FORM VALIDATION =================

const bookingForm =
document.getElementById("bookingForm");

const successPopup =
document.getElementById("successPopup");

const formMessage =
document.getElementById("formMessage");

/* Inputs */

const fullName =
document.getElementById("fullName");

const email =
document.getElementById("email");

const destination =
document.getElementById("destination");

const travelDate =
document.getElementById("travelDate");

/* Email Validation */

function isValidEmail(emailValue){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(emailValue);

}

/* Form Submit */

bookingForm.addEventListener("submit", (e) => {

    e.preventDefault();

    /* Remove Previous Classes */

    formMessage.classList.remove(
        "error",
        "success"
    );

    /* Trim Values */

    const nameValue =
    fullName.value.trim();

    const emailValue =
    email.value.trim();

    const destinationValue =
    destination.value.trim();

    const dateValue =
    travelDate.value;

    /* Validation */

    if(
        nameValue === "" ||
        emailValue === "" ||
        destinationValue === "" ||
        dateValue === ""
    ){

        formMessage.textContent =
        "Please fill in all fields.";

        formMessage.classList.add("error");

        return;
    }

    /* Email Check */

    if(!isValidEmail(emailValue)){

        formMessage.textContent =
        "Please enter a valid email address.";

        formMessage.classList.add("error");

        return;
    }

    /* Success */

    formMessage.textContent =
    "Booking submitted successfully!";

    formMessage.classList.add("success");

    /* Close Modal */

    setTimeout(() => {

        bookingModal.classList.remove("show");

        successPopup.classList.add("show");

        bookingForm.reset();

        formMessage.classList.remove(
            "success"
        );

    }, 1200);

    /* Hide Success Popup */

    setTimeout(() => {

        successPopup.classList.remove("show");

    }, 4000);

});
// ================= ANIMATED COUNTERS =================

const counters =
document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters(){

    if(counterStarted) return;

    counters.forEach(counter => {

        const target =
        +counter.getAttribute("data-target");

        let count = 0;

        const increment =
        target / 100;

        function updateCounter(){

            count += increment;

            if(count < target){

                counter.innerText =
                Math.ceil(count);

                requestAnimationFrame(
                    updateCounter
                );

            }else{

                counter.innerText =
                target + "+";

            }

        }

        updateCounter();

    });

    counterStarted = true;
}

/* Trigger On Scroll */

window.addEventListener("scroll", () => {

    const statsSection =
    document.querySelector(".stats");

    const sectionTop =
    statsSection.getBoundingClientRect().top;

    const windowHeight =
    window.innerHeight;

    if(sectionTop < windowHeight - 100){

        startCounters();

    }

});