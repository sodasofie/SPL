"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function openModal() {
    var _a;
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(100, 100, 150, 0.6)';
    modal.style.color = 'white';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000'; // Високий z-index
    modal.style.transition = 'opacity 0.3s ease'; // Додати анімацію
    modal.style.opacity = '1'; // Прозорість
    modal.innerHTML = `
        <div style="text-align: center; background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 10px;">
            <h2 style="color: #414164;">Модальне Вікно</h2>
            <p style="color: #07071a;">Це вміст модального вікна!</p>
            <button id="closeModal" style="padding: 10px 20px; background: #414164; color: white; border: none; border-radius: 5px; cursor: pointer;">Закрити</button>
        </div>
    `;
    document.body.appendChild(modal);
    // Закриття модального вікна
    (_a = document.getElementById('closeModal')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        modal.remove();
    });
}
// Додавання обробника події до кнопки
const button = document.getElementById('arrowDown');
button === null || button === void 0 ? void 0 : button.addEventListener('click', (event) => {
    event.preventDefault();
    openModal();
});
// Скролл анімація
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const header = document.getElementById('header');
    if (scrollPosition > 100) {
        header === null || header === void 0 ? void 0 : header.classList.add('scrolled');
    }
    else {
        header === null || header === void 0 ? void 0 : header.classList.remove('scrolled');
    }
});
// Fetch даних з API
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://jsonplaceholder.typicode.com/posts');
            const data = yield response.json();
            const postsSection = document.querySelector('.posts');
            data.forEach((post) => {
                const article = document.createElement('article');
                article.innerHTML = `
                <header>
                    <h2>${post.title}</h2>
                </header>
                <p>${post.body}</p>
                <ul class="actions special">
                    <li><a href="#" class="button">Full Story</a></li>
                </ul>
            `;
                postsSection === null || postsSection === void 0 ? void 0 : postsSection.appendChild(article);
            });
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    });
}
// Виклик функції для отримання даних
fetchData();
