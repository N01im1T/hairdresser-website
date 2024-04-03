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
}

function closeAllDivs() {
    womenHaircutDiv.classList.add('none');
    menHaircutDiv.classList.add('none');
    coloringDiv.classList.add('none');
    document.getElementById('overlay').classList.add('none');
}

// Portfolio slider

document.addEventListener('DOMContentLoaded', function () {
    fetch('/img/portfolio/slider/images.json')
                .then(response => response.json())
                .then(data => {
                    const slider = document.getElementById('slider');

                    data.images.forEach(image => {
                        const imageDiv = document.createElement('div');

                        imageDiv.setAttribute('itemprop', 'itemListElement');
                        imageDiv.setAttribute('itemscope', '');
                        imageDiv.setAttribute('itemtype', 'http://schema.org/HairSalon')

                        const img = document.createElement('img');
                        img.src = `/img/portfolio/slider/${image.name}`;
                        img.alt = image.alt;
                        img.setAttribute('itemprop', 'image');

                        const meta = document.createElement('meta');
                        meta.setAttribute('itemprop', 'description');
                        meta.content = image.description;

                        imageDiv.appendChild(img);
                        imageDiv.appendChild(meta);
                        
                        slider.appendChild(imageDiv);

                        slider.slick({
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            autoplay: true,
                            autoplaySpeed: 2000
                        });
                    });
                })
                .catch(error => console.error('Ошибка загрузки изображений:', error));
});