// Nav section

document.addEventListener('DOMContentLoaded', function() {
    function scrollToElement(elementId) {
        var element = document.getElementById(elementId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
        }
    }

    document.getElementById('to-about-me-nav').addEventListener('click', function() {
        scrollToElement('about-me');
    });

    document.getElementById('to-services-nav').addEventListener('click', function() {
        scrollToElement('services');
    });

    document.getElementById('to-portfolio-nav').addEventListener('click', function() {
        scrollToElement('portfolio');
    });

    document.getElementById('to-contacts-nav').addEventListener('click', function() {
        scrollToElement('contacts');
    });
});

// About section

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('to-portfolio').addEventListener('click', function() {
        var portfolioElement = document.getElementById('portfolio');
        if (portfolioElement) {
            window.scrollTo({
                top: portfolioElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Service section

// Service prices show/hide

const womenHaircutsButton = document.getElementById('women-haircuts-button');
const menHaircutsButton = document.getElementById('men-haircuts-button');
const coloringButton = document.getElementById('coloring-button');

const womenHaircutsDiv = document.getElementById('prices-women-haircuts');
const menHaircutsDiv = document.getElementById('prices-men-haircuts');
const coloringDiv = document.getElementById('prices-coloring');

womenHaircutsButton.addEventListener('click', function() {
    toggleDiv(womenHaircutsDiv, 'overlay-women-haircuts');
});
menHaircutsButton.addEventListener('click', function() {
    toggleDiv(menHaircutsDiv, 'overlay-men-haircuts');
});
coloringButton.addEventListener('click', function() {
    toggleDiv(coloringDiv, 'overlay-coloring');
});

function toggleDiv(div, overlay) {
    div.classList.toggle('none');
    document.getElementById(overlay).classList.toggle('none');
    document.body.style.overflowY = "hidden";
}

document.getElementById('overlay-women-haircuts').addEventListener('click', function() {
    closeDiv(womenHaircutsDiv, 'overlay-women-haircuts');
});
document.getElementById('overlay-men-haircuts').addEventListener('click', function() {
    closeDiv(menHaircutsDiv, 'overlay-men-haircuts');
});
document.getElementById('overlay-coloring').addEventListener('click', function() {
    closeDiv(coloringDiv, 'overlay-coloring');
});

function closeDiv(div, overlay) {
    div.classList.add('none');
    document.getElementById(overlay).classList.add('none');
    document.body.style.overflowY = "auto";
}

// Portfolio section

// Portfolio slider

document.addEventListener('DOMContentLoaded', function () {
    fetch('/img/portfolio/slider/images.json')
        .then(response => response.json())
        .then(data => {
            const splideList = document.querySelector('.splide__list');
            
            var splide = new Splide( '#slider-container', {
                type   : 'loop',
                perPage: 3,
                focus  : 'center',
                drag   : 'free',
                snap   : true,
                gap    : '70px',
                lazyLoad: 'nearby',
                autoWidth: true,
                arrows : true,
            } );

            splide.on('mounted', function () {
                splide.go(splide.length / 2);
            });

            splide.mount();

            data.images.forEach((image, index) => {
                const splideSlide = document.createElement('li');
                splideSlide.classList.add('splide__slide');
                splideSlide.setAttribute('itemprop', 'itemListElement');
                splideSlide.setAttribute('itemscope', '');
                splideSlide.setAttribute('itemtype', 'http://schema.org/HairSalon');
                
                const img = document.createElement('img');
                img.src = `/img/portfolio/slider/${image.name}`;
                img.alt = image.alt;
                img.setAttribute('itemprop', 'image');

                const meta = document.createElement('meta');
                meta.setAttribute('itemprop', 'description');
                meta.content = image.description;

                splideSlide.appendChild(img);
                splideSlide.appendChild(meta);

                splideList.appendChild(splideSlide);

                splide.add(splideSlide);
            });
        })
        .catch(error => console.error('Ошибка загрузки изображений:', error));
});


// Online registration

// Date and time pickers
// document.addEventListener('DOMContentLoaded', function () {\
//     const currentDate = new Date();
//     const currentHour = currentDate.getHours();
//     const currentMinutes = currentDate.getMinutes();

//     const minDate = currentDate;
//     const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

//     const minTime = (currentHour < 10 || (currentHour === 10 && currentMinutes === 0)) ? "10:00" : "20:00";
//     const maxTime = (currentHour >= 20) ? "20:00" : "23:59";

//     flatpickr("#date", {
//         dateFormat: "d-m-Y",
//         minDate: minDate,
//         maxDate: maxDate,
//         locale: "ru"
//     });

//     flatpickr("#time", {
//         enableTime: true,
//         noCalendar: true,
//         dateFormat: "H:i",
//         time_24hr: true,
//         minTime: minTime,
//         maxTime: maxTime,
//         minuteIncrement: 5,
//         locale: "ru"
//     });
// });
document.addEventListener('DOMContentLoaded', async function () {
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');

    let selectedService = null;

    document.getElementById('service-type').addEventListener('change', function () {
        selectedService = this.value;
        updateDateTimePicker();
    });

    dateInput.addEventListener('change', function () {
        updateDateTimePicker();
    });

    async function updateDateTimePicker() {
        if (!selectedService || !dateInput.value) return;

        // Request to server for time avaibility
        const availability = await checkAvailability(selectedService, dateInput.value);

        // Get time borders for chosen service
        const timeLimits = getServiceTimeLimits(selectedService, availability);

        // Set time borders for time input
        flatpickr(timeInput, {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true,
            minTime: timeLimits.minTime,
            maxTime: timeLimits.maxTime,
            minuteIncrement: 5,
            defaultDate: "today",
            onChange: function(selectedDates, dateStr, instance) {
                // Set min time if chose current date
                if (flatpickr.formatDate(selectedDates[0], "d-m-Y") === flatpickr.formatDate(new Date(), "d-m-Y")) {
                    const roundedTime = roundToNearest5Minutes(new Date());
                    instance.set("minTime", roundedTime);
                } else {
                    instance.set("minTime", timeLimits.minTime);
                }
            }
        });
    }

    // Request from server
    async function checkAvailability(service, date) {
        // const response = await fetch(`/check-availability?service=${service}&date=${date}`);
        // return await response.json();
        // return { availableTimeSlots: ["10:00", "11:00", "12:00"], unavailableTimeSlots: ["15:15", "16:15"] };
    }

    // Функция для получения ограничений времени в зависимости от выбранной услуги и доступности времени
    function getServiceTimeLimits(service, availability) {
        let minTime = "10:00";
        let maxTime = "20:00";

        if (availability) {
            const availableTimeSlots = availability.availableTimeSlots;
            const unavailableTimeSlots = availability.unavailableTimeSlots;

            if (availableTimeSlots && availableTimeSlots.length > 0) {
                minTime = availableTimeSlots[0];
                maxTime = availableTimeSlots[availableTimeSlots.length - 1];
            }

            if (unavailableTimeSlots && unavailableTimeSlots.length > 0) {
                // Blocke unavailable time slots
                unavailableTimeSlots.forEach(slot => {
                    if (slot === minTime) minTime = incrementTime(slot);
                    if (slot === maxTime) maxTime = decrementTime(slot);
                });
            }
        }

        return { minTime, maxTime };
    }

    function roundToNearest5Minutes(date) {
        const coeff = 1000 * 60 * 5;
        return new Date(Math.ceil(date.getTime() / coeff) * coeff);
    }

    function incrementTime(time) {
        const [hours, minutes] = time.split(":").map(Number);
        let newHours = hours;
        let newMinutes = minutes + 5;
        if (newMinutes >= 60) {
            newHours++;
            newMinutes -= 60;
        }
        return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    }

    function decrementTime(time) {
        const [hours, minutes] = time.split(":").map(Number);
        let newHours = hours;
        let newMinutes = minutes - 5;
        if (newMinutes < 0) {
            newHours--;
            newMinutes += 60;
        }
        return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    }

    flatpickr(dateInput, {
        dateFormat: "d-m-Y",
        minDate: "today",
        maxDate: new Date().fp_incr(30),
        locale: "ru"
    });
});

// Button processing

const registrationButtonAboutSection = document.getElementById('about-call-to-action-button');
const registrationButtonPricesWomenHairCuts = document.getElementById('prices-women-haircuts-button');
const registrationButtonPricesMenHairCuts = document.getElementById('prices-men-haircuts-button');
const registrationButtonPricesColoring = document.getElementById('prices-coloring-button');
const registrationButtonCallToActionSection = document.getElementById('call-to-action-button');

const onlineRegistrationDiv = document.getElementById('registration-wrapper');

registrationButtonAboutSection.addEventListener('click', function() {
    toggleDiv(onlineRegistrationDiv, 'registration-overlay');
});

registrationButtonPricesWomenHairCuts.addEventListener('click', function() {
    toggleDiv(onlineRegistrationDiv, 'registration-overlay');
});

registrationButtonPricesMenHairCuts.addEventListener('click', function() {
    toggleDiv(onlineRegistrationDiv, 'registration-overlay');
});

registrationButtonPricesColoring.addEventListener('click', function() {
    toggleDiv(onlineRegistrationDiv, 'registration-overlay');
});

registrationButtonCallToActionSection.addEventListener('click', function() {
    saveFormData();
    loadFormData();
    toggleDiv(onlineRegistrationDiv, 'registration-overlay');
});

// Save local data for the registration form
function saveFormData() {
    const clientName = document.getElementById('name');
    const clientPhoneNumber = document.getElementById('phone-number');
    
    localStorage.setItem('clientName', clientName.value);
    localStorage.setItem('clientPhoneNumber', clientPhoneNumber.value);
}

// Load local data when open the registration form
function loadFormData() {
    const clientName = document.getElementById('client-name');
    const clientPhoneNumber = document.getElementById('client-phonenumber');

    clientName.value = localStorage.getItem('clientName') || '';
    clientPhoneNumber.value = localStorage.getItem('clientPhoneNumber') || '';
}

document.getElementById('registration-overlay').addEventListener('click', function() {
    if (event.target.id === 'registration-overlay') {
        closeDiv(onlineRegistrationDiv, 'registration-overlay');
    }
});

// Contacts

// Footer

document.addEventListener('DOMContentLoaded', function() {
    function scrollToElement(elementId) {
        var element = document.getElementById(elementId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
        }
    }

    document.getElementById('to-about-me-bottomnav').addEventListener('click', function() {
        scrollToElement('about-me');
    });

    document.getElementById('to-services-bottomnav').addEventListener('click', function() {
        scrollToElement('services');
    });

    document.getElementById('to-portfolio-bottomnav').addEventListener('click', function() {
        scrollToElement('portfolio');
    });

    document.getElementById('to-contacts-bottomnav').addEventListener('click', function() {
        scrollToElement('contacts');
    });
});

// Scroll To Top

document.addEventListener("DOMContentLoaded", function() {
    var scrollToTop = document.getElementById('scroll-to-top');

    function toggleGotop() {
        if (window.scrollY > 100) {
            scrollToTop.style.opacity = '1';
        } else {
            scrollToTop.style.opacity = '0';
        }
    }    

    window.addEventListener('scroll', function() {
        toggleGotop();
    });

    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});