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
                omitEnd: true,
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

//Call to action handler

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('call-to-action-button').addEventListener('click', function(event) {
        event.preventDefault();

        var formData = new FormData();
        formData.append('name', document.getElementById('name').value);
        formData.append('phone-number', document.getElementById('phone-number').value);

        fetch('/submit-from', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            // Дополнительные действия
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
    });
});

// Online registration

// const registrationButtonAboutSection = document.getElementById('about-call-to-action-button');
// const registrationButtonPricesWomenHairCuts = document.getElementById('prices-women-haircuts-button');
// const registrationButtonPricesMenHairCuts = document.getElementById('prices-men-haircuts-button');
// const registrationButtonPricesColoring = document.getElementById('prices-coloring-button');
// const registrationButtonCallToActionSection = document.getElementById('call-to-action-button');

// const onlineRegistrationDiv = document.getElementById('registration-wrapper');

// registrationButtonAboutSection.addEventListener('click', function() {
//     toggleDiv(onlineRegistrationDiv, 'registration-overlay');
// });

// registrationButtonPricesWomenHairCuts.addEventListener('click', function() {
//     toggleDiv(onlineRegistrationDiv, 'registration-overlay');
// });

// registrationButtonPricesMenHairCuts.addEventListener('click', function() {
//     toggleDiv(onlineRegistrationDiv, 'registration-overlay');
// });

// registrationButtonPricesColoring.addEventListener('click', function() {
//     toggleDiv(onlineRegistrationDiv, 'registration-overlay');
// });

// registrationButtonCallToActionSection.addEventListener('click', function() {
//     saveFormData();
//     loadFormData();
//     toggleDiv(onlineRegistrationDiv, 'registration-overlay');
// });

// // Save local data for the registration form
// function saveFormData() {
//     const clientName = document.getElementById('name');
//     const clientPhoneNumber = document.getElementById('phone-number');
    
//     localStorage.setItem('clientName', clientName.value);
//     localStorage.setItem('clientPhoneNumber', clientPhoneNumber.value);
// }

// // Load local data when open the registration form
// function loadFormData() {
//     const clientName = document.getElementById('client-name');
//     const clientPhoneNumber = document.getElementById('client-phonenumber');

//     clientName.value = localStorage.getItem('clientName') || '';
//     clientPhoneNumber.value = localStorage.getItem('clientPhoneNumber') || '';
// }

// document.getElementById('registration-overlay').addEventListener('click', function() {
//     if (event.target.id === 'registration-overlay') {
//         closeDiv(onlineRegistrationDiv, 'registration-overlay');
//     }
// });

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