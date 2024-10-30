import { openModal } from './modules/modal/Modal';
import { initScrollAnimation } from './modules/scroll/ScrollAnimation';
import { fetchData } from './modules/fetch/FetchData';

const button = document.getElementById('arrowDown');
button?.addEventListener('click', (event) => {
    event.preventDefault();
    openModal();
});

initScrollAnimation();

fetchData();
