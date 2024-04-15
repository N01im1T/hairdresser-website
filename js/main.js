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
            
            data.images.forEach(image => {
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
            });
   
            var splide = new Splide( '.splide', {
                type   : 'loop',
                perPage: 3,
                perMove: 1,
            } );
            
            splide.mount();
        })
        .catch(error => console.error('Ошибка загрузки изображений:', error));
});


