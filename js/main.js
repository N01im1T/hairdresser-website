//Site scaling

//Get current browser scale
function getCurrentScale() {
    return window.devicePixelRatio;
}
  
// Checking page load scale
window.onload = function() {
    var currentScale = getCurrentScale();
    applyStylesForScale(currentScale);
};
  
// Scale check when resizing a window
window.onresize = function() {
var currentScale = getCurrentScale();
applyStylesForScale(currentScale);
};

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

// var datePicker = document.getElementById('date');

// datePicker.min = new Date().toISOString().split("T")[0];

// function blockInvalidDates() {
//     var maxDate = new Date();
//     maxDate.setMonth(maxDate.getMonth() + 1);
//     datePicker.max = maxDate.toISOString().split("T")[0];

//     var selectedDate = new Date(datePicker.value);

//     if (selectedDate > maxDate || selectedDate < new Date()) {
//         datePicker.value = ""; 
//     }
// }

// datePicker.oninput = blockInvalidDates;


// blockInvalidDates();

// const timePicker = document.getElementById('time');


// timePicker.addEventListener('input', function() {
//     const selectedTime = this.value;
//     const currentTime = new Date();
//     const selectedDateTime = new Date(currentTime.toDateString() + ' ' + selectedTime);


//     const minTime = new Date(currentTime.toDateString() + ' 10:00');
//     const maxTime = new Date(currentTime.toDateString() + ' 20:00');


//     if (selectedDateTime < minTime || selectedDateTime > maxTime) {
//         alert("Пожалуйста, выберите время между 10:00 и 20:00.");
//         this.value = ''; // Очищаем значение, если выбранное время недопустимо
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    const minDate = currentDate;
    const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

    const minTime = (currentHour < 10 || (currentHour === 10 && currentMinutes === 0)) ? "10:00" : "20:00";
    const maxTime = (currentHour >= 20) ? "20:00" : "23:59";

    flatpickr("#date", {
        dateFormat: "d-m-Y",
        minDate: minDate,
        maxDate: maxDate,
    });

    flatpickr("#time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        minTime: minTime,
        maxTime: maxTime,
        minuteIncrement: 5
    });
});

const registrationButtonAboutSection = document.getElementById('about-call-to-action-button');
const registrationButtonPricesWomenHairCuts = document.getElementById('prices-women-haircuts-button');
const registrationButtonPricesMenHairCuts = document.getElementById('prices-men-haircuts-button');
const registrationButtonPricesColoring = document.getElementById('prices-coloring-button');
const registrationButtonCallToActionSection = document.getElementById('call-to-action-button');

const onlineRegistrationDiv = document.getElementById('registration-wrapper');

registrationButtonCallToActionSection.addEventListener('click', function() {
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

registrationButtonAboutSection.addEventListener('click', function() {
    toggleDiv(onlineRegistrationDiv, 'registration-overlay');
});

document.getElementById('registration-overlay').addEventListener('click', function() {
    closeDiv(onlineRegistrationDiv, 'registration-overlay');
});