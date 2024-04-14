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

$(document).ready(function(){
    $('#to-about-me-nav').click(function(){
        $('html, body').animate({
            scrollTop: $('#about-me').offset().top
        }, 1000);
    });

    $('#to-services-nav').click(function(){
        $('html, body').animate({
            scrollTop: $('#services').offset().top
        }, 1000);
    });

    $('#to-portfolio-nav').click(function(){
        $('html, body').animate({
            scrollTop: $('#portfolio').offset().top
        }, 1000);
    });

    $('#to-contacts-nav').click(function(){
        $('html, body').animate({
            scrollTop: $('#contacts').offset().top
        }, 1000);
    });
});

// About section

$(document).ready(function(){
    $('#to-portfolio').click(function(){
        $('html, body').animate({
            scrollTop: $('#portfolio').offset().top
        }, 1000);
    });
});

// Service section

// Service prices show/hide

const womenHaircutButton = document.getElementById('women-haircut-button');
const menHaircutButton = document.getElementById('men-haircut-button');
const coloringButton = document.getElementById('coloring-button');

const womenHaircutDiv = document.getElementById('prices-women-haircut');
const menHaircutDiv = document.getElementById('prices-men-haircut');
const coloringDiv = document.getElementById('prices-coloring');

womenHaircutButton.addEventListener('click', toggleWomenHaircutDiv);
menHaircutButton.addEventListener('click', toggleMenHaircutDiv);
coloringButton.addEventListener('click', toggleColoringDiv);

document.getElementById('overlay').addEventListener('click', closeAllDivs);

function toggleWomenHaircutDiv() {
    toggleDiv(womenHaircutDiv);
}

function toggleMenHaircutDiv() {
    toggleDiv(menHaircutDiv);
}

function toggleColoringDiv() {
    toggleDiv(coloringDiv);
}

function toggleDiv(div) {
    div.classList.toggle('none'); 
    document.getElementById('overlay').classList.toggle('none');
    document.body.style.overflowY = "hidden";
    div.style.overflowY = "auto";
}

function closeAllDivs() {
    womenHaircutDiv.classList.add('none');
    menHaircutDiv.classList.add('none');
    coloringDiv.classList.add('none');
    document.getElementById('overlay').classList.add('none');
    document.body.style.overflowY = "auto";
}

// Portfolio section

// Portfolio slider

document.addEventListener('DOMContentLoaded', function () {
    fetch('/img/portfolio/slider/images.json')
        .then(response => response.json())
        .then(data => {
            const sliderContainer = document.getElementById('slider-container');
            const slidesPerView = 3;
            let currentSlide = 0;
            let totalSlides = data.images.length;
            const slides = [];

            const duplicatedSlides = data.images.concat(data.images.slice(0, slidesPerView));

            duplicatedSlides.forEach((image) => {
                const imageDiv = document.createElement('div');
                imageDiv.classList.add('slide');
                imageDiv.setAttribute('itemprop', 'itemListElement');
                imageDiv.setAttribute('itemscope', '');
                imageDiv.setAttribute('itemtype', 'http://schema.org/HairSalon');

                const img = document.createElement('img');
                img.src = `/img/portfolio/slider/${image.name}`;
                img.alt = image.alt;
                img.setAttribute('itemprop', 'image');

                const meta = document.createElement('meta');
                meta.setAttribute('itemprop', 'description');
                meta.content = image.description;

                imageDiv.appendChild(img);
                imageDiv.appendChild(meta);

                sliderContainer.appendChild(imageDiv);
                slides.push(imageDiv)
            });

            const sliderContainerElement = document.getElementById('slider-container');
            const slideWidth = 100 / slidesPerView;

            updateSliderPosition();

            function updateSliderPosition() {
                const position = -slideWidth * currentSlide;
                sliderContainerElement.style.transition = 'none';
                sliderContainerElement.style.transform = `translateX(${position}%)`;
            }

            function moveSlide(direction) {
                currentSlide += direction;
                if (currentSlide >= totalSlides + slidesPerView) {
                    currentSlide = slidesPerView;
                    updateSliderPosition();
                } else if (currentSlide < 0) {
                    currentSlide = totalSlides - 1;
                    updateSliderPosition();
                } else {
                    const position = -slideWidth * currentSlide;
                    sliderContainerElement.style.transition = 'transform 0.5s ease';
                    sliderContainerElement.style.transform = `translateX(${position}%)`;
                }
            }

            let startX = 0;
            let isDragging = false;

            sliderContainerElement.addEventListener('mousedown', startDragging);
            sliderContainerElement.addEventListener('touchstart', startDragging);
            sliderContainerElement.addEventListener('mousemove', drag);
            sliderContainerElement.addEventListener('touchmove', drag);
            sliderContainerElement.addEventListener('mouseup', endDragging);
            sliderContainerElement.addEventListener('touchend', endDragging);
            sliderContainerElement.addEventListener('mouseleave', endDragging);

            function startDragging(event) {
                if (event.type === 'touchstart') {
                    startX = event.touches[0].clientX;
                } else {
                    startX = event.clientX;
                }
                isDragging = true;
            }

            function drag(event) {
                if (!isDragging) return;
                event.preventDefault();
                let x = 0;
                if (event.type === 'touchmove') {
                    x = event.touches[0].clientX;
                } else {
                    x = event.clientX;
                }
                const dragDistance = x - startX;
                sliderContainerElement.style.transition = 'none';
                const newPosition = -1 * currentSlide * slideWidth + dragDistance;
                sliderContainerElement.style.transform = `translateX(${newPosition}px)`;
            }

            function endDragging(event) {
                if (!isDragging) return;
                isDragging = false;
                let x = 0;
                if (event.type === 'touchend') {
                    x = event.changedTouches[0].clientX;
                } else {
                    x = event.clientX;
                }
                const dragDistance = x - startX;
                if (dragDistance > 100 && currentSlide > 0) {
                    moveSlide(-1);
                } else if (dragDistance < -100 && currentSlide < totalSlides - 1) {
                    moveSlide(1);
                } else {
                    updateSliderPosition();
                }
            }

            const prevArrow = document.getElementById('prev');
            const nextArrow = document.getElementById('next');

            prevArrow.addEventListener('click', function() {
                moveSlide(-1)
            });

            nextArrow.addEventListener('click', function() {
                moveSlide(1)
            });
        })
        .catch(error => console.error('Ошибка загрузки изображений:', error));
});
