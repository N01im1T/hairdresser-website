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